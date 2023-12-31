const crypto = require('crypto-js');

const { User } = require('../models/User');
const logger = require('../utils/logger');
const { SECRET } = require('../utils/config');

const encryptedKey: string[] = [
	'U2FsdGVkX1/e16lPpyRpRmDFBr92LfAxo4v5uCyMnmI=',
	'U2FsdGVkX19QxGujtDBChA4Ux8Yn6U3GEoLnmybpLAY=',
	'U2FsdGVkX194CbSf4+J+5cPRj9Eg5tYU92RXUSzOj3Q=',
	'U2FsdGVkX1/yzese3Wt+3EFnAAtLAQQcKMFBPZKRGmU=',
	'U2FsdGVkX1/PG96mpntmt+ueRlIlmOlocQ3aMbiE8Cc=',
	'U2FsdGVkX19vXR/SJPJWLcmD57pKbDSJsVrzqTY7XLE=',
	'U2FsdGVkX1/DQwoEqwl5xtw/E3hh+VHSTwbae+PgaUI=',
	'U2FsdGVkX18XdwLqhfb4FX1nq/rloC0W7EnUmJwz1lg=',
	'U2FsdGVkX1/HGvpTudyLvzDBErmedVHLOHIj0X/i9m0=',
	'U2FsdGVkX1+ZSSkFeBGmkIlpsoEEfXQjYUOYtvqEcNY=',
	'U2FsdGVkX1/GO1016CxPdabXuSpS8MBzJCgTLbfBDXI=',
	'U2FsdGVkX18cM1xwurUq3LjxZSsF32cekvz/ZBn82b0=',
	'U2FsdGVkX18CCSrz6BsLbXqOOxbviNYXt/sVmYD2fxg=',
	'U2FsdGVkX19jwOm8gZC41iBIZTNMWg7kEutUPQnBv+k=',
	'U2FsdGVkX18pZAKLzsqNS+l4BKdpxkT0B8/PETNj0pw=',
	'U2FsdGVkX18tk1/2FHPSP1rNsXsFy5ffEvfHypoOlNA=',
	'U2FsdGVkX18j4nX7Pi+SGTmIsWdm/xqmXLL+DCOH9B4=',
	'U2FsdGVkX1+YeeX1cHVYGnamF5HjeANdChPuvrDPS9Y=',
	'U2FsdGVkX1/P6GJVMUKlwvS2IdJSoLTP4n7nXtEwAuY=',
	'U2FsdGVkX1/1Sldf1lE6+1iSgDM4OLKPcMwWRnXYRvk=',
	'U2FsdGVkX1+Nj0fAux+aTduXloYWLFZIKtLco3bsjlU=',
	'U2FsdGVkX1/3ppxQb7bUMcpZMyX9J6yt91d8+W4FZUg=',
	'U2FsdGVkX1/E3MtmrPIsbdQSM03RGzJgb83mgzhQ0tg=',
	'U2FsdGVkX1+dWZmyhx0gKvWXcQzG7G6O5xgPnRxk7Jw=',
	'U2FsdGVkX1+yrEPw6abvzA55VuNlpBGynIUD5nvXVCk=',
	'U2FsdGVkX1+3VIDaJD+e3Y7IqudQ1BA+UK7zrGQlwZ8=',
	'U2FsdGVkX189sIPLqCjQ/jwEv9Lb8DiFnK0SZmveZiE=',
	'U2FsdGVkX1+XFhEdLNKdlxb9J4mYZ3LaIqxfD4dypTw=',
	'U2FsdGVkX187539EX6vAwyhloYYu4eNsmvsKbDJf73A=',
	'U2FsdGVkX18zT72/2fW1xe4FvpdpjBaztFlOs5UItP0=',
	'U2FsdGVkX1/pMv36x7uiZJWwdmvDAl6gC0KDF/yerr4=',
	'U2FsdGVkX19M0R/HTDEayitXeE+EVjvZSZCf+rLivVs=',
	'U2FsdGVkX18gyJp0iDSGcFCvjYL3J3u7YxmKS4SDQlw=',
	'U2FsdGVkX18C+m2nPFWC164dT5TpruIhQZ2w6JgHq8g=',
	'U2FsdGVkX182J7IhReI71mI1gdmRVcq+pbFjTHA7U8c=',
	'U2FsdGVkX1/BwU1hRJZp8c0ShogcOniHvB9nm9sum9E=',
	'U2FsdGVkX1/t2yA5R1ZT7CzEuv7c9Q9aO+fynHhEAd8=',
	'U2FsdGVkX1+snVy+aANt4PfeYPwSZ+3WGMN3GY9FUXc=',
	'U2FsdGVkX1+32i2h/1yQ00uy88Bohvas7m+aUxfdqik=',
	'U2FsdGVkX19XuuOhWckIlZSImZ7d2pxHq58QAIkjBUU=',
	'U2FsdGVkX19CYuONqSL3NfM8JsWoeWTMGjYzsj5lvMM=',
	'U2FsdGVkX18thhsN4JSb/ycMjSJJfkIMC/w6JqHD+BE=',
	'U2FsdGVkX19VFnIBnu6HypKjU0N/XkLsOtScUGBkwh0=',
	'U2FsdGVkX1+4igQexa2Gkp2QpuvFiJPtoHgC/jrVnhY=',
	'U2FsdGVkX1/F0mKwrS6TIODb5kSP2ciqC/7RkuKJjec=',
	'U2FsdGVkX185M23sYnt9y0blS+xlFG6nY2HT/9Ppc5o=',
	'U2FsdGVkX1854SHfnlQUKLOGlFgFVb5cWB1ZUr1jvr8=',
	'U2FsdGVkX1/x5Z9HOvZpKIfvmj7LQHGOu/RgbnAPuC8=',
	'U2FsdGVkX19seoZTRQINl8WleYieJ92wfJ84q4OWMUQ=',
	'U2FsdGVkX1+51UiPU4lPPjTegFC44SXYj0PtK0hfV/w=',
	'U2FsdGVkX18fVXuTfsU0x5kPzrcHQaXh5xxZgB7g8ac=',
	'U2FsdGVkX19GH4LWrLeY54b+nd74NFtoRT4XEQPEz64=',
	'U2FsdGVkX18pSSdoknCfpP74DtbNX9Vy2H3GtOeCshI=',
	'U2FsdGVkX19I6PwPNnx23npY9gDhsveOAxHYz5yfqKA=',
	'U2FsdGVkX1+yoZoyj5iCgajffAaxtlhwFSOJk/8dITM=',
	'U2FsdGVkX1/PHUYb8YuBQdpoNRnrN67/3ldhSsJ2mgs=',
	'U2FsdGVkX19kXiM8oPA7sqwbJYODPdUyOHRg2OJh4V8=',
	'U2FsdGVkX190nBOASnNMaOci+aRyOjL3t0Wjyy5ZHp4=',
	'U2FsdGVkX19KK6YcSiHE0F89xEWhNtpQSqwXZGqcfuE=',
	'U2FsdGVkX1+sd1Mp3sFHAw88xsBtZ4Rx/0Mg7XSk3QU=',
	'U2FsdGVkX182ITh0k53zIQAWy0QAWCfG8EftTkzlbrM=',
	'U2FsdGVkX1+6BaTBQf/Ko7jW0Kx9U3Kep85vNoOwvY4=',
	'U2FsdGVkX1/ow2/nx9tQONIMsZbQgRrWOWaNjL3PWE8=',
	'U2FsdGVkX1+mfVQjXmUC0YcKKEIPGhzSuIPNA01XLH4=',
	'U2FsdGVkX1+hqJbbpuZuV0ULCzH6Yv1O8xUJ9yMoh+8=',
	'U2FsdGVkX18yC9fhMODvTPX0sIZ43tScRHnNuZBQMAQ=',
	'U2FsdGVkX1+sMG342ODDWxLJb7FDVmvE33GNNe5z5x8=',
	'U2FsdGVkX1+yJOjWu2/05q8lcokSXdzF5GhvfrvCjiM=',
	'U2FsdGVkX180MR7oK6lJ3vvo5s44ruHCVKtpHFQOd10=',
	'U2FsdGVkX1+ibpEbzh+XBzB3YM+VBv/kz4NApoCQwk0=',
	'U2FsdGVkX1/We+UcU5bn5GhvcQkfE1ZdjAYZxyHz9uU=',
	'U2FsdGVkX1/RIDz973avXNyhnzHmbT3reqS+5up+WD4=',
	'U2FsdGVkX1+yNZwbBffoz09m6lgH2MthX7CQ5UfeG8Q=',
	'U2FsdGVkX18SQsvkki16lcD1JOvlpzg3PSzsACJ5tUQ=',
	'U2FsdGVkX18hAJDx+Z5OnMfoR/4hGiK3lNUAYPOLKyU=',
	'U2FsdGVkX18xAJjHKMuaNNKkGokc+Ez4FLt28Q/BXeI=',
	'U2FsdGVkX19YXIDIiV0r7lTRY+83C6eQepjRNm8rge0=',
	'U2FsdGVkX18K7hzTiXGhnfVvOhACYEnsxOZQyYvNpi4=',
	'U2FsdGVkX18DUz7yNwb/fOjnWca34wpl/ukwCZGdh8A=',
	'U2FsdGVkX1/VQrbLUPgltZgsNkHI8PkCf4vtYNJi9RA=',
	'U2FsdGVkX1+oQ3a9UjwrmzXNNJczCjx7flj76faIHYs=',
	'U2FsdGVkX19yMIwDYyduXS5/Kk7CQUVkSw3NfNfSywc=',
	'U2FsdGVkX1/pCH5LQdzSaTjhzwTtqLEd/AZc3a9VRwo=',
	'U2FsdGVkX198nTj3LA64J5uCSbUb686EuOqUJHCE2OM=',
	'U2FsdGVkX18Ry7RBi9UDm0PBbmLHuSQjEOSZVPyc5Bo=',
	'U2FsdGVkX19QEHqJmZU14csWT5YJDAAGq4bJr/VJk2g=',
	'U2FsdGVkX18JF5wEdnk3XOTopAyv5ehRVMTPdGMGbQ4=',
	'U2FsdGVkX1/uisctiq22WMbCmnc8VojH4bwfZUHEYas=',
	'U2FsdGVkX1/zajiJ88ZKQZxL1i89yMp2brRmk5ak4wU=',
	'U2FsdGVkX18UZySSHhjU5D7EgoWjilD6WBRqaUOoX4U=',
	'U2FsdGVkX18SU7oKUYQjzZjEwVwYXKLVSZ6W1axqbDg=',
	'U2FsdGVkX1871sXesMBEfCqhNyECid3+aBpzkzSdtLc=',
	'U2FsdGVkX183pfguRVDKUyNr/5C8ycYWWBkkfQ8sVK4=',
	'U2FsdGVkX1+LxnNgJtM/qqAjg/W0ahL2o8v19Hq433M=',
	'U2FsdGVkX1+eZ+M5pQ7attu19aH9Pfs0keUxwq5PejE=',
	'U2FsdGVkX1+BlyuDnd8S8QhxmdlxbQ2fztdBwlr89QQ=',
	'U2FsdGVkX19rOJXAMZHi+oP6w4Cn/S/eWG43KHThmk0=',
	'U2FsdGVkX1+zuGiL84iAycvxWR7tvBXnnjCpc2Y4aTE=',
	'U2FsdGVkX1+Zmcb8RxooFglnp6xnJafP1j3oEqEwzEQ=',
	'U2FsdGVkX1+ch8r1s20phO9wWAHOhQYecP8uDL5kaHs=',
];

const checkKey = async (req: any, res: any) => {
	try {
		const { key, name } = req.body;
		if (!key || !name) {
			return res
				.status(401)
				.json({ isSucces: false, messgae: 'No data received from client' });
		}

		const user = await User.findOne({ name });

		if (user.isAllowed) {
			return res
				.status(204)
				.json({ isSuccess: true, message: 'Key is correct' });
		}

		let isAKey = false;

		encryptedKey.forEach((item, index) => {
			const bytes = crypto.AES.decrypt(item, SECRET as string);
			const decrypted = bytes.toString(crypto.enc.Utf8);
			if (decrypted !== key) return;
			isAKey = true;
			encryptedKey.splice(index, 1);
		});

		if (isAKey) {
			await User.findOneAndUpdate({ name }, { isAllowed: isAKey });
			return res
				.status(204)
				.json({ isSuccess: isAKey, message: 'Key is correct' });
		} else {
			return res
				.status(406)
				.json({ isSuccess: isAKey, message: 'Key is incorrect' });
		}
	} catch (error) {
		logger.error(`Error in key: ${error}`);
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
};

module.exports = checkKey;
