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
			return res.status(200).json({ isSuccess: true, message: existingUser });
		}

		const userDetails = {
			name,
			lastUsed: new Date(),
		};

		logger.info(userDetails);

		const user = new User(userDetails);
		await user.save();

		res.status(200).json({ isSuccess: true, message: user });
	} catch (error) {
		logger.error(`Error in addUser: ${error}`);
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
};

const updateCount = async (req: any, res: any) => {
	console;
	try {
		const { name } = req.body;
		if (!name) {
			return res
				.status(401)
				.json({ isSuccess: false, message: 'No data received from client' });
		}

		const user = await User.findOne({ name });
		if (!user) {
			return res
				.status(401)
				.json({ isSuccess: false, message: `User doesn't exist` });
		}
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Check if the date matches today
		if (user.numberOfUsagePerDay?.date?.getTime() === today.getTime()) {
			// Check the usage limit
			if (user.numberOfUsagePerDay.number >= 3) {
				// Limit exceeded
				return res
					.status(406)
					.json({ isSuccess: false, message: `User has exist the limit` });
			} else {
				user.numberOfUsagePerDay.number++;
			}
		} else {
			// No entry for today, create one
			user.numberOfUsagePerDay = { number: 1, date: today };
		}
		await user.save();
		return res.status(204).json({ isSuccess: true, message: `Go ahead` });
	} catch (error) {
		logger.error(`Error in addUser: ${error}`);
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
};

module.exports = { addUser, updateCount };
