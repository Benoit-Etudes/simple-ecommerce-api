export const LoginAuthDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['email', 'password'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                token: { type: 'string' },
            },
            required: ['name', 'email', 'token'],
        }
    }
}

export const SignUpAuthDto = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['email', 'password'],
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
            required: ['id', 'email', 'created_at', 'updated_at'],
        }
    }
}