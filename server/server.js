import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";

const app = express();

await connectDB();
app.use(cors());
app.use(express.json());

// Sentry request handler middleware (before all routes)
if (Sentry.Handlers?.requestHandler) {
    app.use(Sentry.Handlers.requestHandler());
}

app.get('/', (req, res) => res.send("API WORKING"));

// Sentry error handler middleware (after all routes)
if (Sentry.Handlers?.errorHandler) {
    app.use(Sentry.Handlers.errorHandler());
}

// Optional: Custom error handler
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end((res.sentry || '') + "\n");
});

const Port = process.env.Port || 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});