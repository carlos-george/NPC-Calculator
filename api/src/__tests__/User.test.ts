import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';
import { getConnection } from 'typeorm';

describe('Users', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('Should be able to create a new user!', async () => {
        const response = await request(app).post('/users').send({
            name: 'User Example',
            email: 'userexample@test.com'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('Should not be able to create a new user with exist email!', async () => {

        const response = await request(app).post('/users').send({
            name: 'User Example',
            email: 'userexample@test.com'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User already exists!');
    });
});