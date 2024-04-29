import { Request } from 'express'

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	username: string;
	createDate: Date;
	id: string;
}
export interface IAuthenticatedUserRequest extends Request {
	user: IUser
}