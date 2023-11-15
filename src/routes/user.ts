const express = require('express');
const { addUser, updateCount } = require('../controllers/user');

const UserRouter = express.Router();

UserRouter.route('/addUser').post(addUser);
UserRouter.route('/updateCount').post(updateCount);

module.exports = UserRouter;
