const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll,
  findByName,
  findById,
};

async function insert(game) {
  // returns [1]
  const [id] = await db('games').insert(game);

  return db('games')
    .where({ id })
    .first();
}

function getAll() {
  return db('games');
}

function findByName(name) {
  return db('games')
    .where({ name })
    .first();
}

function findById(id) {
  return db('games')
    .where('id', id)
    .first();
}