# <Center>Video Chat Application </Center>
###### <Center>Client Side </Center>

## Technologies Used: 
* React JS
* Socket.io -client 
* Bootstrap (at a few places)
* React Routers 
* Firebase

> For setting up the application refer to the [this](../README.md) 

## Directory Breakdown: 

>[Index.js](./src/index.js)

>[App.js](./src/App.js)

### Authentication:
> Refer to [AuthContext.js](./src/firebase/AuthContext.js) for the authentication logic

> Refer to [firebase.js](./src/firebase/firebase.js) for setting up firebase


### Routes:

>For Login route refer to [Login.js](./src/routes/Login.js)

>For Sign Up route refer to [SignUp.js](./src/routes/SignUp.js)

>For Public Route Contraint refer to [PublicRoute.js](./src/routes/PublicRoute.js)

>For Private Route Constraint refer to [PrivateRoute.js](./src/routes/PrivateRoute.js)

>For Forgot Password route refer to [ForgotPassword.js](./src/routes/ForgotPassword.js)

>For Dashboard route refer to [Dashboard.js](./src/routes/Dashboard.js)

>For Update Profile route refer to [UpdateProfile.js](./src/routes/UpdateProfile.js)

>For the Room or the Meeting route refer to [CreateMeeting.js](./src/routes/CreateMeeting.js) and [Room.js](./src/routes/Room.js)

### Components:
> [callComponents](./src/components/callComponents) contains all the the JSX components used in the call menu

>[formComponents](./src/components/formComponents/) contains all the form/sign in components seen throughout the application

### Styles:
>All styles can be found in the folder [styles](./src/styles)