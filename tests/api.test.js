import {expect, test} from "vitest";
import got from "got";

const client = got.extend({
    prefixUrl: "http://localhost:4000",
    responseType: "json",
    throwHttpErrors: false,
});

// LOGIN
let loginToken;
test("Login", async () => {
    const response = await client.post("login", {
        json: {
            email: "hello@benoit.fun",
            password: "azerty",
        },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    loginToken = response.body.token;
});

// USER (Create, Get, Update, Delete)
let createdUserId;
test("Create User", async () => {
    const response = await client.post("users", {
        json: {
            name: "Test User",
            email: "test@test.fr",
            password: "password123"
        },
        headers: { Authorization: `Bearer ${loginToken}` },
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdUserId = response.body.id;
});

test("Get User", async () => {
    const response = await client.get(`users/${createdUserId}`, {
        headers: { Authorization: `Bearer ${loginToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdUserId);
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "test@test.fr");
});

test("Update User", async () => {
    const response = await client.put(`users/${createdUserId}`, {
        json: {
            name: "Updated User",
        },
        headers: { Authorization: `Bearer ${loginToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdUserId);
    expect(response.body).toHaveProperty("name", "Updated User");
});

test("Delete User", async () => {
    const response = await client.delete(`users/${createdUserId}`, {
        headers: { Authorization: `Bearer ${loginToken}` },
    });
    expect(response.statusCode).toBe(200);
});
