import { Schema, model } from 'mongoose';

const refreshTokenSchema = new Schema({
	refreshToken: Schema.Types.String
});

export const RefreshTokenModel = model('Token', refreshTokenSchema);