import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/callStyles.css'
import './styles/dashBoard.css'
import './styles/login.css'
import './styles/signUp.css'


document.addEventListener('DOMContentLoaded', ()=> {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})


