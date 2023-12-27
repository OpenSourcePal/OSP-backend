const KeyRouter = require('express').Router();
const checkKey = require('../controllers/key');
const { protectedRoute } = require('../controllers/user');

KeyRouter.route('/checkKey').post(protectedRoute, checkKey);

module.exports = KeyRouter;
