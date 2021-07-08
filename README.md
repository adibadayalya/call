# <Center>Video Chat Application </Center>

-------------------------------------------------
>A free application for one on one Video Calling on the web

>Deployed on Heroku at [link](https://clone-ms-eng-adi.herokuapp.com/)  

## Demo
> Video Demo will be added here?

## Features:
- [X] Free
- [X] User Authentication
- [X] In-Call Chat 
- [X] Ability to have a one on one Video conversation
- [X] Freedom to control your Video and Audio stream transmission 
- [X] Screen Share

## Technologies used:
* React-JS
* Socket.io
* WebRTC
* Firebsase (for authentication)

-------------------------------------------------  
## Setting up locally:

* Clone the repo on to your system
* Installing dependancies
  * Run <code>npm i</code> at the root level
  * Navigate to the client folder using <code>cd client</code> and run <code>npm i</code>

* Set up a Firebase Project and add the required environment variables to the file `firebase.js`
* run `npm start` in the client folder and the application should be up and running by default at **PORT 3000** 

--------------------------------------------------
## Creating a development build: 

* run `npm run build` in the client folder
* Paste the contents of the build folder in the Public folder at root level before deploying 
* The development build will be up and running on **PORT 3001** when the server is started