# Secure Software Development (SE4030)
### Assignment 2 | OAuth 2.0 Framework
This application facilitates users to retrive their all the Facebook photos and upload them to their Google drive.

### Group Members

|**Registration Number**	|**Name with Initials**	|**Contribution**	|
|-------------------|-------------------|---------------|
|IT18001112	|Tharaka W.C.M.K.	| Facebook Use case	|
|IT18009132	|Dilanka R.M.T.	| Facebook Use case	|
|IT18007848	|Rathnayake R.H.C.S	| Google Drive Use case	|
|IT18006544	|H.D.D.S Perera	|	Google Drive Use Case |

### Configuration
* Clone the repository using `git clone https://github.com/Kavindu-Tharaka/SSD_Assignment_2.git` command.
* Add your Facebook App ID and App Secret to the Facebook Auth URL in the `SigninPage.jsx` and `CallbackPage.jsx` respectively.
* Add your Google Client ID to the `index.js` in the `server` directory.

### Deployment and Run
**1. Run the file upload server - Navigate to `server` directory and run following commands**
* `npm install` - Install dependancies
* `nodemon` - Run the server

**2. Run the client application - Navigate to the root directory and enter the following commads**
* `npm install` - Install dependancies
* `npm start` - Run the client application
