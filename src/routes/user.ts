const jwt = require('jsonwebtoken');
const express = require('express');
const UserRouter = express.Router();

const { addUser, updateCount, protectedRoute } = require('../controllers/user');
const { SECRET } = require('../utils/config');
const { User } = require('../models/User');

UserRouter.route('/addUser').post(addUser);
UserRouter.route('/updateCount').post(protectedRoute, updateCount);
UserRouter.route('/protected').get(async (req: any, res: any) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		try {
			jwt.verify(token, SECRET, async (err: any, decoded: any) => {
				if (err) {
					res.status(401).json({ isSuccess: false, message: 'invalid token' });
				} else {
					const user = await User.findOne({ name: decoded.name });
					if (!user) {
						return res.status(400).json({
							isSuccess: false,
							message: 'User doesn`t exist',
						});
					}
					res.status(200).json({ isSuccess: true, message: decoded.name });
				}
			});
		} catch (err) {
			return res
				.status(401)
				.json({ isSuccess: false, message: 'Invalid token' });
		}
	} else {
		return res
			.status(401)
			.json({ isSuccess: false, message: 'Missing authorization header' });
	}
});

module.exports = UserRouter;
