import { sign } from 'jsonwebtoken';

import { ITokens } from '../interfaces/tokens.interface';
import { IUser } from '../interfaces/user.interface';

import { RefreshTokenModel } from '../models/token.model';

export const signToken = (payload: IUser): ITokens => {
	const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
	const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET as string);

	return { accessToken, refreshToken };
}

export const saveRefreshToken = (refreshToken: string) => {
	const token = new RefreshTokenModel({
		refreshToken
	});

	return token.save();
}