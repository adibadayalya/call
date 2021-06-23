import React from 'react'
import SignUp from './SignUp';
import { AuthProvider } from '../contexts/AuthContext';
import {Container} from 'react-bootstrap'
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile'
import CallMenu from './CallMenu';
import Meeting from './Meeting';
import RoomContext from '../contexts/RoomContext';

import {BrowserRouter as Router, Switch } from 'react-router-dom' 

function App() {
  return (
        <Container className = "d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
          <div className ="w-100">
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path ="/" component ={Dashboard} />
                  <PrivateRoute path ="/update-profile" component ={UpdateProfile} />
                  <PrivateRoute path ="/call-menu" component ={CallMenu} />
                  
                  <PrivateRoute path ="/meeting/:roomID" component ={RoomContext} />
                  <PublicRoute path="/signup" component = {SignUp}/>
                  <PublicRoute path = "/login" component = {Login} />
                  <PublicRoute path = "/forgot-password" component = {ForgotPassword} />
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
  );
}

export default App;
