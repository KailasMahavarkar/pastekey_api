import env from "@/env";
import mongoose from "mongoose";
import express from "express";
import SHA512 from "crypto-js/sha512";
import { withMode, withModeDB } from "@/helper";
// import CounterModel from "@/models/counter.model";
import cors from "cors";

import _authAPI, { _authAPILoose } from "@/middlewares/_authAPI";
import memberRegister from "@/controllers/users/member.register";
import mailVerify from "@/controllers/users/mail.verify";
import memberLogin from "@/controllers/users/member.login";
import resetPassword from "@/controllers/users/reset.password";
import renewToken from "@/controllers/auth/renew.token";


// paste imports
import createPaste from "@/controllers/pastes/create.default";
import readPaste from "@/controllers/pastes/read.default";
import updatePaste from "@/controllers/pastes/update.default";
import deletePaste from "@/controllers/pastes/delete.default";
import PasteModel from "@/models/paste.model";

const app = express();
app.use(express.json({ limit: "0.5mb" }));

app.use(
    cors({
        origin: "*",
    })
);

app.use(async (req, res, next) => {
    const body = req.body as any;
    const testkey = req.headers["x-test-key"] || "";
    const isTestHeaderOK = SHA512(testkey).toString() === env.X_TEST_KEY;

    req.locals = {
        hash: body?.options?.hash === true,
        compress: body?.options?.compress === true,
        encrypt: body?.options?.encrypt === true,
        decrypt: body?.options?.decrypt === true,

        owner: "default",
        role: "member",
        user: {},

        // checks
        checks: {
            testkey: isTestHeaderOK,
        },
        headers: {
            testkey: testkey,
        },
    };

    return next();
});

app.post("/auth/register", memberRegister);
app.post("/auth/mailverify", mailVerify);
app.post("/auth/login", memberLogin);
app.post("/auth/reset", resetPassword);
app.post("/auth/renewtoken", renewToken);

// working of loose auth
// if present and not token not valid then it will allow the request
// if not present then it will allow the request
app.post("/paste", _authAPILoose, createPaste);
app.get("/paste", _authAPILoose, readPaste);
app.patch("/paste", _authAPILoose, updatePaste);
app.delete("/paste", _authAPILoose, deletePaste);


// dashboard
// app.patch('/dashboard/profile', _authAPI, updateProfile);

app.get("/paste/tagcheck", async (req, res) => {
    const tag = req.query.tag as string;

    if (!tag) {
        return res.status(400).send({
            msg: "tag is required",
            status: "failed"
        });
    }

    if (tag.length > 20) {
        return res.status(400).send({
            msg: "tag is too long",
            status: "failed"
        });
    }


    try {
        const isAvailable = await PasteModel.exists({
            _id: tag,
        });

        if (!isAvailable) {
            return res.status(200).send({
                msg: "tag is available",
                available: true,
            });
        } else {
            return res.status(200).send({
                msg: "tag is not available",
                available: false,
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            msg: "internal server error",
        });
    }
});

app.use((req, res) => {
    return res.status(404).send({
        msg: "no route found",
    });
});


let cachedDB;
async function connectToDatabase(uri) {
    if (!cachedDB) {
        cachedDB = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
        });
    }
}

app.listen(process.env.PORT || 2000, async () => {
    console.log("db url -->",
        withModeDB(env.DB_URL)
    );
    await connectToDatabase(
        withModeDB(env.DB_URL)
    );
    console.log({
        msg: "paste api is live",
        status: "success",
    })
})