const logger = require('../utils/logger');

const { User } = require('../models/User');

const addUser = async (req: any, res: any) => {
  try {
		const { name } = req.body;
		if (!name) {
			return res
				.status(401)
				.json({ isSuccess: false, message: 'No data received from client' });
		}

		const existingUser = await User.findOne({ name });
		if (existingUser) {
			return res
				.status(409)
				.json({ isSuccess: false, message: 'User already exists' });
		}

		const userDetails = {
			name,
			lastUsed: new Date(),
		};

		logger.info(userDetails);

		const user = new User(userDetails);
		await user.save();

		res.status(200).json({ isSuccess: true, message: `User Added` });
	} catch (error) {
		logger.error(`Error in addUser: ${error}`);
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
};

module.exports = { addUser };
