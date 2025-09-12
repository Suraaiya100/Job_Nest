import { Webhook } from "svix";
import User from "../models/User.js";
import express from "express";

const router = express.Router();

export const clerkWebhook = async (req, res) => {
    try {
        // Create a svix instance
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the request
        const payload = wh.verify(
            req.body,
            {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            }
        );

        // Clerk sends event data in payload.data
        const { type, data } = payload;

        switch (type) {
            case 'user.created': {
                const userdata = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.profile_image_url,
                    resume: ""
                };
                await User.create(userdata);
                res.json({ });
                break;
            }

            case 'user.updated': {
                // Example: update user info
                const userdata = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.profile_image_url,

                };
                await User.findByIdAndUpdate(data.id,userdata);
                res.json({  });
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }

            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success:false, message: "Invalid webhook signature" });
    }
};

