# JobNest - MERN Job Portal

This project is a Job Portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows job seekers to view job listings and recruiters to post jobs.  
## Available Scripts

In the frontend directory, you can run:

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  

The page reloads when you make changes.  

### `npm test`
Launches the test runner in the interactive watch mode.  
See the section about running tests for more information.

### `npm run build`
Builds the app for production into the `build` folder.  
It bundles React in production mode and optimizes the build for best performance.  

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

## Backend Setup (Express + MongoDB)

In the **backend** directory, you can run:

### `npm run dev`
Runs the backend server in development mode using **nodemon**.  
The API runs on [http://localhost:5000](http://localhost:5000). 

##Authentication (Clerk)
JobNest uses Clerk for secure authentication and role management.

##Frontend Setup:
npm install @clerk/clerk-react
##Wrap the app with ClerkProvider:
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
##Access the current user:
import { useUser } from '@clerk/clerk-react';
function Dashboard() {
  const { user } = useUser();
  return <h1>Welcome, {user.firstName}!</h1>;
}

##Backend Setup:
npm install @clerk/clerk-sdk-node




