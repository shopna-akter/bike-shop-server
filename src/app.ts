import cors from 'cors';
import express from 'express';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import sendResponse from './app/utilities/sendResponse';
import type { Application, Request, Response } from 'express';
import {
	catchAllErrors,
	handleRouteNotFound,
} from './app/middlewares/errorHandlers';
const app: Application = express();

app.use(
	cors({
	  origin: [
		"http://localhost:5000",  // API Server
		"http://localhost:5173",  // Vite Frontend
	  ],
	  credentials: true,
	})
  );

app.use(cookieParser());
app.use(express.json());

app.get(['/', '/api'], (_req: Request, res: Response) => {
	sendResponse(res, 'N/A', 'OK', null, 'bike shop Server is Running');
});

app.use('/api', router);

app.use(handleRouteNotFound);

app.use(catchAllErrors);

export default app;
