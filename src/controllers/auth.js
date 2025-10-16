import JWT from "jsonwebtoken";
import {createHash} from "crypto";
import {UserRepository} from "../repositories/user.js";
import {LoginAuthDto, SignUpAuthDto} from "../dto/AuthDtos.js";

export function registerAuthRoutes(fastify) {

    fastify.post("/signup", { schema: SignUpAuthDto }, async function signUp(request, reply) {
        const body = request.body;
        console.log("Signup with data:", body);

        if (!body.email || !body.password) {
            reply.status(400);
            return {error: "Email and password are required"};
        }

        body.password = createHash('sha256')
            .update(body.password + process.env.PASSWORD_HASH_SALT)
            .digest('hex');

        return await UserRepository.createUser(body);
    });

    fastify.post("/login", { schema: LoginAuthDto }, async function login(request, reply) {
        const body = request.body;
        console.log("Login with data:", body);

        if (!body.email || !body.password) {
            reply.status(400);
            return {error: "Email and password are required"};
        }

        let {email, password} = body;

        password = createHash('sha256')
            .update(password + process.env.PASSWORD_HASH_SALT)
            .digest('hex');

        const user = await UserRepository.getUserByCredentials(email, password);
        if (!user) {
            reply.status(401);
            return {error: "Invalid credentials"};
        }

        user.token = JWT.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return user;
    });

}