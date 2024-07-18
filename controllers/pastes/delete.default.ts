import PasteModel from "@/models/paste.model";
import { validatePasteDelete } from "./default";
import { decryptAES } from "@/encryption";
import { showAJVErrors } from "@/helper";

const PasteDelete = async (req, res) => {
	const body: any = req.body;
	const tag = body.tag;
	const eseed = body.eseed;

	// validate update schema
	try {
		const valid = validatePasteDelete(body);
		if (!valid) {
			return res.status(400).send({
				msg: "invalid schema",
				errors: showAJVErrors(validatePasteDelete.errors),
			});
		}
	} catch (err) {
		return res.status(400).send({
			msg: "invalid schema",
		});
	}

	// paste can be deleted in 2 ways
	// 1. client side: eseed is required
	// 2. server side: masterkey is required

	if (req.locals.checks.testkey) {
		// delete is happening at server side

		// find paste by tag
		const paste = await PasteModel.findById(
			{
				_id: tag,
				// status is either active or inactive
				status: { $in: ["active", "inactive"] },
			},
			{
				_id: 0,
				eseed: 1,
				ect: 1,
			}
		);

		if (!paste) {
			return res.status(400).send({
				msg: "no active or inactive paste found",
			});
		}

		// check if masterkey is correct
		const ect = paste.ect || "";

		// decrypt eseed
		const eseed = decryptAES(ect, body.masterkey);

		if (eseed !== paste.eseed) {
			return res.status(400).send({
				msg: "incorrect masterkey",
			});
		}

		// delete paste
		const deleteResult = await PasteModel.deleteOne({
			_id: tag,
		});

		if (deleteResult.deletedCount === 0) {
			return res.status(400).send({
				msg: "no active or inactive paste found",
			});
		}

		return res.status(200).send({
			msg: "paste deleted",
		});
	} else {
		// delete is happening at client side

		// check if eseed is correct
		if (eseed !== body.eseed) {
			return res.status(400).send({
				msg: "incorrect eseed",
			});
		}

		// delete paste
		const deleteResult = await PasteModel.deleteOne({
			_id: tag,
		});

		if (deleteResult.deletedCount === 0) {
			return res.status(400).send({
				msg: "no active or inactive paste found",
			});
		}

		return res.status(200).send({
			msg: "paste deleted",
		});
	}
};

export default PasteDelete;
