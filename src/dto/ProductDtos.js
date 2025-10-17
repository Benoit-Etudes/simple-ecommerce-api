export const CreateProductDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
        },
        required: ['name', 'description', 'price'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'description', 'price', 'created_at'],
        }
    }
}

export const GetProductsDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    created_at: { type: 'string', format: 'date-time' },
                },
                required: ['id', 'name', 'description', 'price', 'created_at'],
            },
        }
    }
}

export const GetProductDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'description', 'price', 'created_at'],
        },
    }
}

export const UpdateProductDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
        },
        required: [],
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'description', 'price', 'created_at'],
        }
    }
}

export const DeleteProductDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
        }
    }
}