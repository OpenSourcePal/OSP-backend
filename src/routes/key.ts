const KeyRouter = require('express').Router();
const checkKey = require('../controllers/key');

KeyRouter.route('/checkKey').post(checkKey);

module.exports = KeyRouter;
