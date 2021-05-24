import React, { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from './components/Auth/Auth';
import Router from './Router';
import { UserContext } from './context/UserContext';

import './styles/index.css';
import 'emoji-mart/css/emoji-mart.css';

function App() {
   const { token } = useContext(UserContext);

   return (
      <>
         <ToastContainer autoClose={2000} closeButton={false} />
         {token && token !== null ? <Router /> : <Auth />}
      </>
   );
}

export default App;
