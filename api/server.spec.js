const request = require('supertest');

const db = require('../data/dbConfig');
const server = require('./server.js');

afterEach(async () => {
    await db('games').truncate();
  });

describe('server.js', () => {
    describe('GET /games endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return an array, even if there are no games to return', async () => {
            // const expected = typeof Array; // I don't think this is right. Need to come back to it.

            let response = await request(server).get('/games');

            expect(response.body).toEqual([]);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return an array with two game objects', async () => {
            const body1 = { name: 'Pacman', genre: 'Arcade', releaseYear: '1980' };
            const body2 = { name: 'Halo', genre: 'FPS', releaseYear: '2000' };

            await request(server).post('/games').send(body1);
            await request(server).post('/games').send(body2);

            let responseGet = await request(server).get('/games');

            expected = [
                { id: 1, name: 'Pacman', genre: 'Arcade', releaseYear: '1980' },
                { id: 2, name: 'Halo', genre: 'FPS', releaseYear: '2000' }
            ]

            expect(responseGet.body).toHaveLength(2);
            expect(responseGet.body).toEqual(expected);

        });
    });

    describe('POST /games endpoint', () => {
        it('should respond with code 422 when required fields are not included in body', async () => {
            // The body is missing the genre key, which is required.
            const body = { name: 'Pacman' }

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.status).toBe(422);
        });

        it('should respond with code 201', async () => {
            // The body includes all of the required fields.
            const body = { name: 'Pacman', genre: 'Arcade', releaseYear: '1980' };

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.status).toBe(201);
        });

        it('should return response { message: "Game successfully added" }', async () => {
            // The body includes all of the required fields.
            const body = { name: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
            const expected = { message: 'Game successfully added' };

            let response = await request(server)
                .post('/games')
                .send(body);

            expect(response.body).toEqual(expected);
        });
    });
});