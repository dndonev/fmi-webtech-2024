import { Application, Router } from 'express';

import authController from './auth.controller';

const router = Router();

export const connect = (app: Application, path: string): void => {
    router.use('/auth', authController);

    // examples
    // router.use('/files', filesController);
    // router.use('/directories', directoriesController);
    // router.use('/statistics', statisticsController);
    // router.use('/share', shareController);

    app.use(path, router);
}