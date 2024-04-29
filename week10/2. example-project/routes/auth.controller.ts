import { Router } from 'express';
import { compareSync, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { RefreshTokenModel } from '../models/token.model';

import { verifyToken } from '../middlewares/verify-token';

import { saveRefreshToken, signToken } from '../utils/token.utils';

import { IAuthenticatedUserRequest, IUser } from '../interfaces/user.interface';
import { IRefreshToken, ITokens } from '../interfaces/tokens.interface';

const authController = Router();

authController.post('/token', async (req, res) => {
	const token: string = req.body.token;

	if (!token || token === '') {
		return res.status(400).json({ error: 'Invalid parameter - token' })
	}

	const tokenDocument = await RefreshTokenModel.findOne({ token: token });
	if (!tokenDocument) {
		return res.sendStatus(403);
	}

	const refreshToken: string = (tokenDocument.toJSON() as IRefreshToken).refreshToken;

	let user: IUser;
	try {
		user = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IUser;

		const accessToken: string = sign(user, process.env.ACCESS_TOKEN_SECRET as string);
		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(400).json(err);
	}
});

authController.post('/login', async (req, res) => {
	const email: string = req.body.email;
	if (!email || email === '') {
		return res.status(400).json({ error: 'Invalid email address' })
	}

	const userDocument = await UserModel.findOne({ email });
	if (!userDocument) {
		return res.status(404).json({ error: 'User does not exist' })
	}

	const user: IUser = userDocument.toJSON() as IUser;
	if (!compareSync(req.body.password, user.password)) {
		return res.status(403).json({ error: 'Invalid credentials' })
	}

	const tokens: ITokens = signToken(user);

	try {
		await saveRefreshToken(tokens.refreshToken);

		return res.json(tokens);
	} catch (err) {
		return res.json(err);
	};
});

authController.post('/register', async (req, res) => {
	const newUser = req.body as IUser;

	const today: Date = new Date();

	const userDocument = await UserModel.findOne({
		email: req.body.email
	});

	if (!userDocument) {
		const hashed: string = await hash(newUser.password, 10);

		const user = new UserModel({
			id: new mongoose.Types.ObjectId(),
			email: newUser.email,
			password: hashed,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			username: newUser.username
		});

		const validation: NativeError = user.validateSync();
		if (validation) {
			return res.status(400).json(validation);
		}

		await user.save();

		try {
			const tokens: ITokens = signToken(user.toJSON() as IUser);

			await saveRefreshToken(tokens.refreshToken)
			return res.json(tokens);
		} catch (err) {
			res.send({ error: 'There was an error signing your token' });
		}
	}

	return res.json({ error: 'User already exists' });
});

authController.post('/logout', async (req, res) => {
	const refreshToken: string = req.body.token;

	if (!refreshToken || refreshToken === '') {
		return res.status(400).json({ error: 'Invalid parameter - token' })
	}

	const tokenDocument = await RefreshTokenModel.findOneAndRemove({ refreshToken })
	if (!tokenDocument) {
		return res.status(403);
	}

	return res.status(204).send('You have been logged out');
});

authController.get('/user-info', verifyToken, async (req, res)=> {
	const user: IUser = (await UserModel.findOne(
		{ email: (req as IAuthenticatedUserRequest).user.email }))
			.toJSON() as IUser;

	return res.json(
		user
	);
});

export default authController;