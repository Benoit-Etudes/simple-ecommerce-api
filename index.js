import Fastify from "fastify";
import dotenv from "dotenv";
import FastifyAuth from "@fastify/auth";
import FastifyCors from "@fastify/cors";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import {registerAuthRoutes} from "./src/controllers/auth.js";
import {registerAuthMiddlewares} from "./src/middlewares/auth.js";
import {registerUserRoutes} from "./src/controllers/user.js";
import {registerErrorMiddleware} from "./src/middlewares/error.js";

dotenv.config();

const logger = {
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: true,
            colorize: true
        },
    },
};

const fastify = Fastify({
    logger
});

await fastify.register(FastifyAuth);
await fastify.register(FastifyCors, {
    origin: process.env.NODE_ENV === 'production' ? process.env.HOST : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});
await fastify.register(FastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    }
});

await fastify.register(FastifySwaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "list"
    }
});


fastify.get("/", async function handler(request, reply) {
    return {hello: 'world'};
});

registerAuthMiddlewares(fastify);
registerErrorMiddleware(fastify);

registerUserRoutes(fastify);
registerAuthRoutes(fastify);

console.log("Environment:", process.env.NODE_ENV, 'Host:', process.env.HOST, 'Port:', process.env.PORT);

try {
    await fastify.listen({
        port: process.env.PORT || 4000,
        host: process.env.HOST || 'localhost'
    });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}

await fastify.ready();
