const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('GET /games endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return an array, even if there are no games to return', async () => {
            // const expected = typeof Array; // I don't think this is right. Need to come back to it.

            let response = await request(server).get('/games');

            expect(response.body).toBe(typeof Array);

        });
    });

    describe('POST /games endpoint', () => {
        it('should respond with code 422 when required fields are not included in body', async () => {
            // The body is missing the genre key, which is required.
            const body = { title: 'Pacman' }

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.status).toBe(422);
        });

        it('should respond with code 201', async () => {
            // The body includes all of the required fields.
            const body = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.status).toBe(201);
        });

        it('should return response { message: "Game successfully added" }', async () => {
            // The body includes all of the required fields.
            const body = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
            const expected = { message: 'Game successfully added' };

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.body).toEqual(expected);
        });
    });
});