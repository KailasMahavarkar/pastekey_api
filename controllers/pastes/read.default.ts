import { runDev, showAJVErrors } from "@/helper";
import { decryptAES, hash512 } from "@/encryption";
import PasteModel from "@/models/paste.model";

const readPaste = async (req, res) => {
    const query = req.query as any;
    const body = req.body as any;

    const tag = body?.tag || query?.tag;
    const password = body?.password || query?.password;

    try {
        if (!tag) {
            return res.status(400).send({
                msg: "Bad Request",
                status: "failed",
            });
        }

        const meta: any = await PasteModel.findOne(
            {
                _id: tag,
                status: "active",
            },
            {
                _id: 1,
                title: 1,
                privacy: 1,
                owner: 1,
                category: 1,
                eseed: 1,
                vseed: 1,
                ect: 1,
                vct: 1,
                language: 1,
                maxViews: 1,
                totalViews: 1,
                expireAt: 1,
            }
        ).lean();

        if (!meta) {
            return res.status(404).send({
                msg: "Not Found",
                status: "failed",
            });
        }

        // check if max views reached
        if (meta.totalViews >= meta.maxViews) {
            return res.status(403).send({
                msg: "Max views reached",
                status: "failed",
            });
        }

        // check if paste is expired
        if (meta.expireAt < Date.now()) {
            return res.status(403).send({
                msg: "Paste expired",
                status: "failed",
            });
        }

        if (meta.privacy === "public") {
            const findResult: any = await PasteModel.findOne({
                _id: tag,
            });

            const devInfo = runDev({
                vseed: findResult["vseed"],
                eseed: findResult["eseed"],
            });

            findResult["vseed"] = undefined;
            findResult["eseed"] = undefined;

            // update view count
            await PasteModel.updateOne(
                { _id: tag },
                { $inc: { totalViews: 1 } }
            );

            return res.status(200).send({
                msg: "paste found",
                status: "success",
                data: findResult,
                dev: devInfo,
            });
        }

        // paste is private at this point
        // ---- 2 ways to read private paste  ----
        // 1. password & masterkey (unsafe way) (not recommended)
        // 2. vseed & eseed (safe way) (recommended)

        // 1. password & masterkey (unsafe way) (not recommended)
        if (password) {
            const findResult: any = await PasteModel.findOne({
                _id: tag,
            });

            const devInfo = runDev({
                vseed: findResult.vseed,
                eseed: findResult.eseed,
            });

            // const generate password hash
            const passwordHash = hash512(password);
            let compare_veed = decryptAES(findResult.vct, passwordHash);

            if (compare_veed === findResult.vseed) {
                // delete vseed from object
                findResult["vseed"] = undefined;
                // delete eseed from object
                findResult["eseed"] = undefined;

                // update view count
                await PasteModel.updateOne(
                    { _id: tag },
                    { $inc: { totalViews: 1 } }
                );

                return res.status(200).send({
                    msg: "paste found",
                    status: "success",
                    data: findResult,
                    dev: devInfo,
                });
            }
        }

        // 2. vseed & eseed (safe way) (recommended)
        const vseed = query?.vseed;
        if (vseed && !password) {
            const findResult: any = await PasteModel.findOne({
                _id: tag,
                vseed: vseed,
            });

            if (findResult?.vseed === vseed) {
                const devInfo = runDev({
                    vseed: findResult.vseed,
                    eseed: findResult.eseed,
                });

                // delete vseed from object
                findResult["vseed"] = undefined;
                // delete eseed from object
                findResult["eseed"] = undefined;

                // update view count
                await PasteModel.updateOne(
                    { _id: tag },
                    { $inc: { totalViews: 1 } }
                );

                return res.status(200).send({
                    msg: "paste found",
                    status: "success",
                    data: findResult,
                    dev: devInfo,
                });
            }
        }

        const devObject = runDev({
            vseed: meta.vseed,
            eseed: meta.eseed,
        });

        meta["eseed"] = undefined;
        meta["vseed"] = undefined;

        return res.status(403).send({
            msg: "paste found but not authorized",
            status: "failed",
            meta: meta,
            dev: devObject,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            msg: "Internal Server Error",
            status: "failed",
        });
    }
};

export default readPaste;
