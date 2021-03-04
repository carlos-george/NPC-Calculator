import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './router';
import { AppErrors } from './errors/AppErrors';

createConnection();

const app = express();
app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {

    if (err instanceof AppErrors) {
        return res.status(err.statusCod).json({ error: err.message });
    }

    return res.status(500).json({
        status: 'Error',
        message: `Internal server error ${err.message}`
    })
});

const isRunning = `Server is running on port ${process.env.PORT}!`;

app.get("/", (request, response) => {
    return response.json({
        message: isRunning
    });
});

export { app, isRunning }