import { FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { FastifyInstance } from "fastify";
import createPaste from "../controllers/pastes/create.default";
import readPaste from "../controllers/pastes/read.default";
import { DecoTypeV1, v1Decorators } from "../decorators/deco.map";

type callbackTypeV1 = (
	req: FastifyRequest,
	res: FastifyReply,
	deco: DecoTypeV1
) => any;

const useAPIv1 = async (callback: callbackTypeV1) => {
	return async (req: FastifyRequest, res: FastifyReply) => {
		return await callback(req, res, v1Decorators);
	};
};

const apiv1 = async (
	app: FastifyInstance,
	opts: FastifyPluginOptions,
	next: any
) => {
	const url = (endpoint) => `/v1${endpoint}`;

	app.post(url("/paste"), createPaste);
	app.get(url("/paste"), readPaste);

	// app.post(url("/paste"), useAPIv1(PasteCreate));

	// app.patch("/paste", PasteUpdate);
	// app.delete("/paste", PasteDelete);

	// app.post("/auth/login", memberLogin);
	// app.post("/auth/register", memberRegister);
	// app.post('/auth/mailverify', mailVerify)
	// app.post('/auth', mailVerify)

	// app.get(url("/ping"), async (req, res) => {
	// 	res.send("pong v1");
	// });
	return next();
};

export default apiv1;
