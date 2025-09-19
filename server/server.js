import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhook } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js'; // <-- Import jobRoutes
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express';
const app = express();

await connectDB();
await connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Sentry request handler middleware (before all routes)
if (Sentry.Handlers?.requestHandler) {
    app.use(Sentry.Handlers.requestHandler());
}

app.get('/', (req, res) => res.send("API WORKING"));
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Sentry error handler middleware (after all routes)
if (Sentry.Handlers?.errorHandler) {
    app.use(Sentry.Handlers.errorHandler());
}

// Optional: Custom error handler (remove for default HTML error page)
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end((res.sentry || '') + "\n");
});

app.post('/webhook/clerk', clerkWebhook);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes); // <-- Add job routes
app.use('/api/user', userRoutes);
const Port = process.env.Port || 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});