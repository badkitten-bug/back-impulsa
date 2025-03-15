const express = require("express");
const googleAuthRouter = express.Router();
const {OAuth2Client} = require("google-auth-library")
require("dotenv").config();


googleAuthRouter.post("/google", async (req, res) => {
    const redirectURL = "auth/google/callback";

    const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectURL);

    const authorizeURL = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.profile openid",
        prompt: "consent"
    })

    res.status(200).json({url: authorizeURL})
})

