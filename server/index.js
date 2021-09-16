const express = require("express");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
const got = require("got");
const app = express();
app.use(express.json());

const CLIENT_ID =
  "132620122654-ij2jqq591tmp3726366j4veh92806vkv.apps.googleusercontent.com";
const CLIENT_SECRET = "_WHhVdjkglEZEfOcAGx6OphH";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04L2z0DhgyeYzCgYIARAAGAQSNwF-L9IrfQMCgAOhJzu3h3ftSvGcLmACmAzLjKlTpuXNy-Z8juJ1o6l8iKvsFGV5EA-wtOMNtYU";

const oAuthtoClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const drive = google.drive({
  version: "v3",
  auth: oAuthtoClient,
});

oAuthtoClient.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

app.post("/upload", async (req, res) => {
  try {
    const res = await drive.files.create({
      requestBody: {
        name: req.body.data.file.name,
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: req.body.data.file.url,
      },
    });
    UploadPage;

    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
