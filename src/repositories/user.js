import {prisma} from "../services/db.js";
import {NotFoundError} from "../utils/errors.js";

export const UserRepository = {
    getUserByCredentials: async function (email, password) {
        const user = prisma.users.findFirst({
            where: { email, password }
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        return user;
    },
    getUser: async function (userId) {
        const user = prisma.users.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    },
    createUser: async function (userData) {
        try {
            return prisma.users.create({
                data: userData
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error("Email already in use");
            }
            throw error;
        }
    },

    updateUser: async function (id, userData) {
        try {
            return prisma.users.update({
                where: { id: parseInt(id) },
                data: {
                    ...userData,
                    updated_at: new Date()
                }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundError("User not found");
            }
            throw error;
        }
    },

    deleteUser: async function (userId) {
        try {
            await prisma.users.delete({
                where: { id: parseInt(userId) }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundError("User not found");
            }
            throw error;
        }
    },
};