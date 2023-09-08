const UserRouter = require('express').Router();
const { addUser } = require('../controllers/user');

UserRouter.route('/addUser').post(addUser);

module.exports = UserRouter;
