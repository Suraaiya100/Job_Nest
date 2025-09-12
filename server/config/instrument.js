import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://1b705074824fbd091a9992ce0d4d725c@o4510003186171904.ingest.us.sentry.io/4510003195019264",
  sendDefaultPii: true,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()

  ],
//  tracesSampleRate: 1.0, // Capture 100% of the transactions
});

// No need to export anything; just import this file at the top of your server.js