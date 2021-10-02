const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
const formidable = require('formidable');
const credentials = require('./credentials.json');

// Google app config
const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(
	client_id,
	client_secret,
	redirect_uris[0]
);

const SCOPE = [
	'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file',
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(' API Running'));

/**
 * Get auth url from Google API
 */
app.get('/getAuthURL', (req, res) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPE,
	});
	console.log(authUrl);
	return res.send(authUrl);
});

/**
 * Get access token using auth code
 */
app.post('/getToken', (req, res) => {
	if (req.body.code == null) return res.status(400).send('Invalid Request');
	oAuth2Client.getToken(req.body.code, (err, token) => {
		if (err) {
			console.error('Error retrieving access token', err);
			return res.status(400).send(err);
		}
		res.send(token);
	});
});

/**
 * Upload image to Google drive
 */
app.post('/fileUpload', (req, res) => {

	const form = new formidable.IncomingForm();
    
	form.parse(req, async (err, fields, files) => {
		// Handle form errors
		if (err) return res.status(400).send(err);
		const token = JSON.parse(fields.token);

		if (token == null) return res.status(400).send('Token not found');
		oAuth2Client.setCredentials(token);

		// Init the drive service to handle the authorization
		const drive = google.drive({ version: 'v3', auth: oAuth2Client });

		// Metadata of the new file
		const fileMetadata = {
			name: files.file.name,
		};

		// Media definition
		const media = {
			mimeType: files.file.type,
			body: fs.createReadStream(files.file.path),
		};

		// Create the request
		drive.files
			.create({
				resource: fileMetadata,
				media: media,
				fields: 'id',
			})
			.then((response) => {
				// Handle the response
				switch (response.status) {
					case 200:
						console.log('File Created Id: ', response.data.id);
						res.status(201).send(`File uploaded successfully. File id: ${response.data}`);
						break;
					default:
						console.log(
							'Failed to Create File: ' + response.errors
						);
						res.status(400).send('File upload failed');
						break;
				}
			});
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));
