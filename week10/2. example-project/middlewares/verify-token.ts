import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IAuthenticatedUserRequest, IUser } from '../interfaces/user.interface';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ').pop();
	if (!token) {
		return res.status(401).send('Invalid token format');
	}

	let user: IUser;
	try {
		user = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as IUser;
        (req as IAuthenticatedUserRequest).user = user;
	} catch (err) {
		res.status(403).json({ ...(err as Error), message: 'Unable to verify token' });
	}

	next();
}