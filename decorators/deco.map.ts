import { FastifyReply, FastifyRequest } from "fastify";
import { commonResponseType } from "../helper";
import checkbodyDecorate from "./checkbody.deco";

export type DecoTypeV1 = {
    checkbody: (req: FastifyRequest, res: FastifyReply) => commonResponseType;
}

export type DecoTypeV2 = {
    checkbody: (req: FastifyRequest, res: FastifyReply) => any;
}

export const v1Decorators: DecoTypeV1 = {
    checkbody: checkbodyDecorate,
}

export const v2Decorators: DecoTypeV2 = {
    checkbody: checkbodyDecorate,
}