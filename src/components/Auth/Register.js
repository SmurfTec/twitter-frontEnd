import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import ThemeButton from '../ThemeButton/ThemeButton';
import TextBody from '../Text/body';
import TextTitle from '../Text/title';
import { Twitter } from '../icons';
import Button from '../Button/Button';

import { UserContext } from '../../context/UserContext';
import { client } from '../../utils';

function Register({ setAuth }) {
   const { setUser } = useContext(UserContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const [loading, setLoading] = useState(false);

   const handleLogin = async (e) => {
      e.preventDefault();

      if (!username || !password) {
         return toast.error('You need to fill in all the fields');
      }

      const body = { username: username, password: password };
      setLoading(true);
      try {
         const { token } = await client('/auth/signup', { body });
         localStorage.setItem('token', token);
      } catch (err) {
         return toast.error(err.message);
      } finally {
         setLoading(false);
      }

      const user = await client('/auth/me');
      setUser(user.data);

      localStorage.setItem('user', JSON.stringify(user.data));

      setUsername('');
      setPassword('');
   };

   return (
      <>
         <form onSubmit={handleLogin}>
            <div className='auth-page__logo'>
               <Button icon>
                  <Twitter />
               </Button>
            </div>
            <TextTitle
               title
               style={{ fontSize: '23px', marginBottom: '5px' }}
            >
               Twitter Register
            </TextTitle>

            <div className='form-control'>
               <input
                  type='text'
                  placeholder='Username or Email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div
               className='form-control'
               style={{ marginBottom: '15px' }}
            >
               <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <ThemeButton full size='large' type='submit'>
               {loading ? 'Signing in' : 'Sign up'}
            </ThemeButton>
            <div style={{ margin: '5px' }}>
               <TextBody bold>or</TextBody>
            </div>
            <ThemeButton
               full
               size='large'
               primary
               type='button'
               onClick={setAuth}
            >
               Login
            </ThemeButton>
         </form>
      </>
   );
}

export default Register;
