import React from 'react'
import SignUp from './routes/SignUp';
import { AuthProvider } from './firebase/AuthContext';
import {Container} from 'react-bootstrap'
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import ForgotPassword from './routes/ForgotPassword';
import UpdateProfile from './routes/UpdateProfile'
import Room from './routes/Room';
import {BrowserRouter as Router } from 'react-router-dom' 
import {AnimatedSwitch} from 'react-router-transition'

function App() {
  return (
        <Container className = "d-flex align-items-center justify-content-center" style={{maxHeight:"100vh", maxWidth:"100vw"}}>
          <div className ="w-100">
            <Router>
              
              <AuthProvider>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                  >
                  <PrivateRoute exact path ="/" component ={Dashboard} />
                  <PrivateRoute path ="/update-profile" component ={UpdateProfile} />
                  <PrivateRoute path ="/meeting/:roomID" component ={Room} />
                  <PublicRoute path="/signup" component = {SignUp}/>
                  <PublicRoute path = "/login" component = {Login} />
                  <PublicRoute path = "/forgot-password" component = {ForgotPassword} />
                </AnimatedSwitch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
  );
}

export default App;
