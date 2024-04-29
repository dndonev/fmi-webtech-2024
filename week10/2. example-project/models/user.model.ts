import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
	id: Schema.Types.ObjectId,
	firstName: {
		type: Schema.Types.String,
		required: true
	},
	lastName: {
		type: Schema.Types.String,
		required: true
	},
	email: {
		type: Schema.Types.String,
		required: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
	},
	password: {
		type: Schema.Types.String,
		required: true
	},
	username: {
		type: Schema.Types.String,
		required: true
	},
	createDate: {
		type: Schema.Types.Date,
		default: Date.now
	},
	lastEdited: {
		type: Schema.Types.Date,
		default: Date.now
	},
});

export const UserModel = model('User', userSchema);