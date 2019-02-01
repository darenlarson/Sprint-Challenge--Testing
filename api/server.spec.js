const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('GET /games endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });
    });
});