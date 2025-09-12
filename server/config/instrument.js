import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profilling-node";
import express from "express";

Sentry.init({
  dsn: "https://1b705074824fbd091a9992ce0d4d725c@o4510003186171904.ingest.us.sentry.io/4510003195019264",
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
  ],
});

const app = express();

app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000);