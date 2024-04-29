import express, { Application, NextFunction, Request, Response } from 'express';


const app: Application = express();

app.get('api/users', (req: Request, res: Response, next: NextFunction) => {
    res.json({});
});

app.listen();