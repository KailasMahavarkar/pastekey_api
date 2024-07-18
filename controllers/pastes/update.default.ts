import { decryptAES, encryptAES, fakeNumString, hash512 } from "@/encryption";
import { showAJVErrors } from "@/helper";
import PasteModel from "@/models/paste.model";
import { validatePasteUpdate } from "./default";
const PasteUpdate = async (req, res) => {
    const body: any = req.body;
    const query: any = req.query;

    const tag = body?.tag || query?.tag;

    // max size of req body cannot exceed 0.35 MB
    if (body.data?.length > 0.35 * 1024 * 1024) {
        return res.status(400).send({
            message: "Request body too large",
            status: "error",
        });
    }

    // validate update schema
    try {
        const valid = validatePasteUpdate(body);
        if (!valid) {
            return res.status(400).send({
                msg: "invalid schema",
                errors: showAJVErrors(validatePasteUpdate.errors),
            });
        }
    } catch (err) {
        return res.status(400).send({
            msg: "invalid schema",
        });
    }

    // check if tag is valid
    if (!(await PasteModel.exists({ _id: tag }))) {
        return res.status(400).send({
            msg: "paste does not exist to update",
        });
    }

    // find paste by tag
    const paste = await PasteModel.findById({
        _id: tag,
        // status is either active or inactive
        status: { $in: ["active", "inactive"] },
    });

    if (!paste) {
        return res.status(400).send({
            msg: "paste does not exist to update",
        });
    }

    // paste can be updated in 2 ways
    // 1. client side: both new vct and new vseed are required with eseed to be correct
    // 2. server side: both new vct and new vseed will be auto generated but eseed will be required
    // also masterkey should be correct

    if (req.locals.checks.testkey) {
        // update is happening at server side
        // check if masterkey is correct

        // check if eseed is correct
        if (body.eseed !== paste.eseed) {
            return res.status(400).send({
                msg: "eseed does not match",
            });
        }

        // generate vseed and vct
        let vseed = fakeNumString(64);
        const passwordHash = hash512(body.password || "123");

        let vct = encryptAES(vseed, passwordHash).toString();
        let encryptedPasteMap: any = [];

        // is data being updated?
        if (body.updateProps.data) {
            // encrypt data
            for (let i = 0; i < body.updateProps.data.length; i++) {
                const encryptedData = encryptAES(
                    body.updateProps.data[i],
                    passwordHash
                );
                encryptedPasteMap.push(encryptedData);
            }
            paste.size = body.updateProps.data.length;
        }

        // update paste
        paste.data = encryptedPasteMap;
        paste.title = body.updateProps.title;

        // vseed and vct are independent factors
        // when paste is updated, vseed and vct are updated
        paste.vseed = vseed;
        paste.vct = vct;

        // update paste language
        paste.language = (body.updateProps?.language || paste.language) || 'text';

        // update in db
        await paste.save();

        return res.status(200).send({
            msg: "paste updated",
        });
    } else {
        // update is happening at client side
        if (body.eseed && body.updateProps.vseed && body.updateProps.vct) {
            // check if eseed is correct
            if (paste.eseed !== body.eseed) {
                return res.status(400).send({
                    msg: "invalid eseed",
                });
            }

            // update paste
            paste.title = body.updateProps?.title || paste.title || "";
            paste.category = (body.updateProps?.category ||
                paste.category) as any;

            if (
                paste.status === "active" &&
                body.updateProps?.status === "inactive"
            ) {
                paste.status = "inactive";
            } else if (
                paste.status === "inactive" &&
                body.updateProps?.status === "active"
            ) {
                paste.status = "active";
            }

            // update paste data
            paste.data = (body.updateProps?.data || paste.data) as any;

            // update paste adtype
            paste.adtype = (body.updateProps?.adtype || "medium") as any;

            // update paste vct
            paste.vct = body.updateProps?.vct || paste.vct;

            // update paste vseed
            paste.vseed = body.updateProps?.vseed || paste.vseed;

            // update paste language
            paste.language = (body.updateProps?.language || paste.language) || 'text';

            // save paste
            await paste.save();

            return res.status(200).send({
                msg: "paste updated",
            });
        } else {
            return res.status(400).send({
                msg: "eseed, vseed and vct are required",
            });
        }
    }
};

export default PasteUpdate;
