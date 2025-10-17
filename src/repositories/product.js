import {prisma} from "../services/db.js";
import {NotFoundError} from "../utils/errors.js";

export const ProductRepository = {
    getProducts: async function (page, limit) {
        const intPage = parseInt(page);
        const intLimit = parseInt(limit);
        if (isNaN(intPage) || intPage < 1) {
            throw new Error("Invalid page number");
        }
        if (isNaN(intLimit) || intLimit < 1) {
            throw new Error("Invalid limit number");
        }
        return prisma.products.findMany({
            skip: (intPage - 1) * intLimit,
            take: intLimit,
        });
    },
    getProduct: async function (productId) {
        const product = prisma.products.findUnique({
            where: { id: parseInt(productId) }
        });
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    },
    createProduct: async function (productData) {
        try {
            return prisma.products.create({
                data: productData
            });
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async function (id, productData) {
        try {
            return prisma.products.update({
                where: { id: parseInt(id) },
                data: {
                    ...productData,
                    updated_at: new Date()
                }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundError("Product not found");
            }
            throw error;
        }
    },

    deleteProduct: async function (productId) {
        try {
            await prisma.products.delete({
                where: { id: parseInt(productId) }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundError("Product not found");
            }
            throw error;
        }
    },
};