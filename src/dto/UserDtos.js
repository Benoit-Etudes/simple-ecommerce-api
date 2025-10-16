export const CreateUserDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['name', 'email', 'password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'email', 'created_at'],
        }
    }
}

export const GetUsersDto = {
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
                    email: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                },
                required: ['id', 'name', 'email', 'created_at'],
            },
        }
    }
}

export const GetUserDto = {
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
                email: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'email', 'created_at'],
        },
    }
}

export const UpdateUserDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
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
                email: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'email', 'created_at'],
        }
    }
}

export const DeleteUserDto = {
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