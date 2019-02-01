const express = require('express');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    const games = await db('games');
    
    res.status(200).json(games)
});