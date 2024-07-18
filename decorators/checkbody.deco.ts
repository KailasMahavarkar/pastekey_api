import { FastifyReply, FastifyRequest } from "fastify";
import { CONSTANT } from "@/data";
import { cres } from "@/helper";

const checkbodyDecorate = (req: FastifyRequest, res: FastifyReply) => {
	let contentLength = req.headers["content-length"];
	// 500 for extra note | other for payload
	if (!contentLength || typeof contentLength !== "string") {
		return cres({
			msg: "Content-Length header is missing",
			status: "failed",
			code: 400,
		});
	}
	if (Number(contentLength) > CONSTANT.MAX_CONTENT_LENGTH) {
		return cres({
			msg: "Paste size is too large",
			fix: {
				"max payload size": CONSTANT.MAX_CONTENT_LENGTH,
				"current payload size": Number(contentLength),
			},
			status: "failed",
			code: 413,
		});
	}
	return cres({
        msg: "ok",
        status: "success",
        code: 200,
    })
};

export default checkbodyDecorate;