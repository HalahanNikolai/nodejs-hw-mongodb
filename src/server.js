import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import routes from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUiExpress from 'swagger-ui-express';
dotenv.config();

const setupServer = () => {
    const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve('docs', 'swagger.json'), 'utf-8'));
    // console.log(swaggerDocument);
    const app = express();
    app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));
    app.use('/uploads', express.static(path.resolve('src', 'uploads')));

    app.use(express.json());

    app.use(cookieParser());
    app.use(routes);

    //***          PORT - from process.env          ***//
    const PORT = getEnvVar('PORT', 3000);

    app.use(cors());
    app.use(pino());

    app.get('/', (_req, res) => {
        res.json({ message: 'Hello my Friends!' });
    });

    //***          Handling 404 error         ****/
    app.use(notFoundHandler);

    //***          Handling 500 error         ****/
    app.use(errorHandler);

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    return server;
};

export default setupServer;



