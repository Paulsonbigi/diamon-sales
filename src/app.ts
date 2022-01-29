import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db";
import indexRoute from "./routes/v1";
import errorMiddleware from "./exceptions/AppError";

const app: Application = express();

// middleware initialization
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

const port: number | string = process.env.PORT || 4090;

// Route declaration
app.use(indexRoute);

// global Error
app.use(errorMiddleware);

async function bootstrap():Promise<void> {
	try {
		connectDB();
		app.listen(port, () => {
			console.log(`Your is app listening on port number ${port}`);
		});
	} catch (e) {
		process.exit(1);
	}
}

bootstrap();