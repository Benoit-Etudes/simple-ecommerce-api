export function registerErrorMiddleware(fastify) {
    fastify.setErrorHandler(function (error, request, reply) {
        if (error.name === "NotFoundError") {
            reply.status(404).send({ ok: false, message: error.message });
        } else {
            console.error(error);
            reply.status(500).send({ ok: false, message: "Internal Server Error" });
        }
    });
}