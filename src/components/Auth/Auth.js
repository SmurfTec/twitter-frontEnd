import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';
import ConfirmMail from './ConfirmMail';

import './Auth.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const LoginOrRegister = () => {
   const [auth, setAuth] = useState('LOGIN');

   const changeToLogin = () => setAuth('LOGIN');
   const changeToSignup = () => setAuth('SIGNUP');
   return (
      <div className='auth-page__container'>
         {auth === 'LOGIN' ? (
            <Login setAuth={changeToSignup} />
         ) : (
            <Register setAuth={changeToLogin} />
         )}
      </div>
   );
};

function Auth() {
   return (
      <div className='auth-page__container'>
         <BrowserRouter>
            <Switch>
               <Route
                  exact
                  path='/confirmMail/:activationToken'
                  component={ConfirmMail}
               />
               <Route exact path='/' component={LoginOrRegister} />
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default Auth;
