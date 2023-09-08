const logger = require('./logger');

const requestLogger = (request: any, response: any, next: any) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndPoint = (request: any, response: any) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: any, request: any, response: any, next: any) => {
	logger.error(error.message);

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndPoint,
	errorHandler,
};
