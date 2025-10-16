import {createHash} from "crypto";
import {UserRepository} from '../repositories/user.js';
import {CreateUserDto, DeleteUserDto, GetUserDto, GetUsersDto, UpdateUserDto} from "../dto/UserDtos.js";
import {UserService} from "../services/user.js";

export function registerUserRoutes(fastify) {

    fastify.get("/users/:id", { preHandler: fastify.auth([fastify.authUser]), schema: GetUserDto }, async function getUserById(request, reply) {
        const userId = request.params.id;
        return await UserRepository.getUser(userId);
    });

    fastify.post("/users", {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreateUserDto
    }, async function createUser(request, reply) {
        const body = request.body;

        body.password = createHash('sha256')
            .update(body.password + process.env.PASSWORD_HASH_SALT)
            .digest('hex');

        const createdUser = await UserRepository.createUser(body);
        reply.status(201);
        return createdUser;
    });

    fastify.put("/users/:id", { preHandler: fastify.auth([fastify.authUser]), schema: UpdateUserDto }, async function updateUserById(request, reply) {
        const userId = request.params.id;

        if (!UserService.hasUserPermission(userId, request.user)) {
            reply.code(403).send({ error: "You do not have permission to modify this user" });
            return;
        }

        const body = request.body;

        return await UserRepository.updateUser(userId, body);
    });

    fastify.delete("/users/:id", { preHandler: fastify.auth([fastify.authUser]), schema: DeleteUserDto }, async function deleteUserById(request, reply) {
        const userId = request.params.id;

        if (!UserService.hasUserPermission(userId, request.user)) {
            reply.code(403).send({ error: "You do not have permission to modify this user" });
            return;
        }

        await UserRepository.deleteUser(userId);
        return {message: "User deleted"};
    });
}