import {ProductRepository} from '../repositories/product.js';
import {CreateProductDto, DeleteProductDto, GetProductDto, GetProductsDto, UpdateProductDto} from "../dto/ProductDtos.js";
import {UserService} from "../services/user.js";

export function registerProductRoutes(fastify) {

    fastify.get('/products', { schema: GetProductsDto }, async function getProducts(request, reply) {
        const page = request.query.page || 1;
        const limit = request.query.limit || 10;
        return ProductRepository.getProducts(page, limit);
    });

    fastify.get("/products/:id", { preHandler: fastify.auth([fastify.authUser]), schema: GetProductDto }, async function getProductById(request, reply) {
        const productId = request.params.id;
        return await ProductRepository.getProduct(productId);
    });

    fastify.post("/products", {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreateProductDto
    }, async function createProduct(request, reply) {
        const body = request.body;

        const createdProduct = await ProductRepository.createProduct(body);
        reply.status(201);
        return createdProduct;
    });

    fastify.put("/products/:id", { preHandler: fastify.auth([fastify.authUser]), schema: UpdateProductDto }, async function updateProductById(request, reply) {
        const productId = request.params.id;

        if (!UserService.hasAdminPermission(request.user)) {
            reply.code(403).send({ error: "You do not have permission to modify this product" });
            return;
        }

        const body = request.body;

        return await ProductRepository.updateProduct(productId, body);
    });

    fastify.delete("/products/:id", { preHandler: fastify.auth([fastify.authUser]), schema: DeleteProductDto }, async function deleteProductById(request, reply) {
        const productId = request.params.id;

        if (!UserService.hasAdminPermission(request.user)) {
            reply.code(403).send({ error: "You do not have permission to modify this product" });
            return;
        }

        await ProductRepository.deleteProduct(productId);
        return {message: "Product deleted"};
    });
}