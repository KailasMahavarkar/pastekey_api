import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

const bodyLimiterHook = fp((fastify, options, next)=>{
    fastify.addHook('onRequest', (req: FastifyRequest, res: FastifyReply)=>{
        let contentLength = req.headers["content-length"];


        // 500 for extra note | other for payload
        const MAX_CONTENT_LENGTH = (0.36 * 1024 * 1024) + 500;
    
        if (!contentLength || typeof contentLength !== "string") {
            return res.send({
                error: {
                    message: "Content-Length header is missing",
                },
            });
        }
    
        if (Number(contentLength) > MAX_CONTENT_LENGTH) {
            return res.status(413).send({
                message: "Paste size is too large",
                fix: {
                    "max payload size": MAX_CONTENT_LENGTH,
                    "current payload size": Number(contentLength)
                },
                status: "failed",
            });
        }
    })
    return next();
})

export default bodyLimiterHook;