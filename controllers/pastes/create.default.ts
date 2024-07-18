import { encryptAES, fakeNumString, hash512 } from "@/encryption";
import { showAJVErrors } from "@/helper";
import { PASTE } from "../actions";
import PasteModel from "@/models/paste.model";
import { timeAt } from "@/utils/timing";
import { validateServerPasteCreate } from "./default";
import qqid from "qqid";
import mongoose from "mongoose";
import CounterModel from "@/models/counter.model";
import base62 from "base62";
import util from "@/utils/util";

const incrementCounter = async (session) => {
	return await CounterModel.updateOne(
		{ server: "paste" },
		{
			$inc: {
				counter: 1,
			},
		},
		{
			session,
		}
	);
};

const createPaste = async (req, res) => {
	const body: any = req.body;
	const currentTime = Date.now();
	let newpaste;

	const tools = body.tools;

	// create a transaction for this paste
	const session = await mongoose.startSession();
	try {
		const basePaste = {
			_id: body.tag || qqid(),
			title: body.title,
			privacy: body.privacy,
			owner: req.locals.owner,
			category: "general",
			maxviews: body.maxviews,
			note: body.note || "add note",

			// settings
			adtype: "medium",
			expiry: "5 years",
			status: "active",

			paidViews: 0,
			uniqueViews: 0,
			totalViews: 0,
			viewsMap: {},
			// end views

			paidEarnings: 0,
			unpaidEarnings: 0,

			// reports
			reportedCount: 0,

            // langugage
            language: body?.tools?.language || "text",

			// timestamps
			createdAt: currentTime,
			expireAt: timeAt(body.expiry) || timeAt("5 years"),
			updateAt: currentTime,

			burnByUnique: body.options?.burnByUnique || true,
			version: 1,

			tools: tools,
		};

		// check if tag is already in use
		const tagExists = await PasteModel.exists({ _id: basePaste._id });
		if (tagExists) {
			return res.status(400).send({
				msg: `Tag (${body.tag}) already in use`,
				status: "failed",
			});
		}

		// is paste creation happening at client side or server side?
		// by default it is client side

		// but if header[x-test-key] is valid then it will be server side
		if (req.locals.checks.testkey) {
			let valid;
			// validate server side schema
			try {
				valid = validateServerPasteCreate(body);
				if (!valid) {
					return res.status(400).send({
						msg: "invalid schema",
						errors: showAJVErrors(validateServerPasteCreate.errors),
					});
				}
			} catch (err) {
				return res.status(400).send({
					msg: "invalid schema",
				});
			}

			// generate eseed and vseed
			let eseed = fakeNumString(64);
			let vseed = fakeNumString(64);

			// generate hashes
			const passwordHash = hash512(body.password || "123");
			const masterkeyHash = hash512(body.masterkey || "1234");

			// generate vct and ect
			let vct = encryptAES(vseed, passwordHash);
			let ect = encryptAES(eseed, masterkeyHash);

			let encryptedPasteMap: any = [];

			if (body.privacy === "public") {
				eseed = "";
				vseed = "";
				ect = "";
				vct = "";
			}

			const pasteMapSize = body.data?.map((tab: any) => {
				return tab.length / 1024;
			});

			const pasteMapSizeSum = pasteMapSize?.reduce(
				(a: number, b: number) => {
					return a + b;
				},
				0
			);

			if (body.privacy === "private") {
				encryptedPasteMap = body.data?.map((tab: any) => {
					return encryptAES(tab, passwordHash);
				});
			} else {
				encryptedPasteMap = body.data;
			}

			newpaste = new PasteModel(
				{
					...basePaste,
					data: encryptedPasteMap,
					size: pasteMapSizeSum,
					eseed,
					vseed,
					ect,
					vct,
				},
				{
					_id: false,
				}
			);
		} else {
			// validate client side schema
			try {
				const valid = validateServerPasteCreate(body);
				if (!valid) {
					res.status(400).send({
						msg: "invalid schema",
						errors: showAJVErrors(validateServerPasteCreate.errors),
					});
				}
			} catch (err) {
				return res.status(400).send({
					msg: "invalid schema",
				});
			}

			// generate eseed and vseed
			let pasteProps = {
				...basePaste,
				size: util.arraySizeKB(body.data || []),
				eseed: body.eseed,
				vseed: body.vseed,
				ect: body.ect,
				vct: body.vct,
				data: body.data,
			};
			newpaste = new PasteModel(pasteProps);
		}

		const getCounter = await CounterModel.findOne(
			{
				service: "paste",
			},
			{
				_id: false,
			}
		);

		if (!getCounter) {
			return res.status(400).send({
				msg: "error saving paste",
			});
		}

		if (!body.tag) {
			const counter = getCounter.counter || 0;
			newpaste._id = base62.encode(counter + 1) || qqid();
		}

		await session.withTransaction(async () => {
			return await Promise.all([
				newpaste.save({ session }),
				incrementCounter(session),
			]);
		});
		await session.endSession();

		return res.status(200).send({
			msg: PASTE.CREATE_SUCCESS,
			status: "success",
			data: {
				tag: newpaste._id,
			},
		});
	} catch (error) {
		// console.log(error);
		await session.endSession();
		res.status(500).send({
			msg: "error saving paste",
			error: error,
		});
	}
};

export default createPaste;
