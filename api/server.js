const express = require('express');

const server = express();
const db = require('../games/gamesModel');


server.use(express.json());

server.get('/games/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(game => {
            if (game) {
                res.status(200).json(game)
            } else {
                res.status(404).json({ message: 'game does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/games', async (req, res) => {
    db.getAll()
        .then(games => {
            res.status(200).json(games);
        });
});

server.post('/games', async (req, res) => {
    const game = req.body;

    if (game.name && game.genre) {
        db.insert(game)
            .then(game => {
                res.status(201).json({ message: 'Game successfully added' });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else {
        res.status(422).json({ message: 'Game not added. Please provide all required fields.' });
    };
});

module.exports = server;