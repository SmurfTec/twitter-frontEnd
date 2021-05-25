import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import ThemeButton from '../ThemeButton/ThemeButton';
import TextBody from '../Text/body';
import TextTitle from '../Text/title';
import Twitter from '@material-ui/icons/LibraryBooks';

import Button from '../Button/Button';

import { UserContext } from '../../context/UserContext';
import { client } from '../../utils';

function Register({ setAuth }) {
   const { setUser } = useContext(UserContext);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [email, setEmail] = useState('');

   const [loading, setLoading] = useState(false);

   const handleSignUp = async (e) => {
      e.preventDefault();

      if (!username || !password || !email || !passwordConfirm) {
         return toast.error('You need to fill in all the fields');
      }

      if (password !== passwordConfirm)
         return toast.error('Password Confirm Must match Password !');

      const body = {
         username: username,
         password: password,
         passwordConfirm: passwordConfirm,
         email: email,
      };
      setLoading(true);
      try {
         const data = await client('/users/signup', { body }, 'POST');

         console.clear();
         console.log(`data`, data);

         const { token, user } = data;
         console.log(`token`, token);
         localStorage.setItem('token', token);

         setUsername('');
         setPassword('');
         setEmail('');
         setPasswordConfirm('');
         toast.success(
            `Signed Up Successfully! Plz activate your Account by Link sent to your Email ${user.email}`,
            {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            }
         );
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
         <form onSubmit={handleSignUp}>
            <div className='auth-page__logo'>
               <Button icon>
                  <Twitter />
               </Button>
            </div>
            <TextTitle
               title
               style={{ fontSize: '23px', marginBottom: '5px' }}
            >
               Register
            </TextTitle>

            <div className='form-control'>
               <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className='form-control'>
               <input
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            <div
               className='form-control'
               style={{ marginBottom: '15px' }}
            >
               <input
                  type='password'
                  placeholder='Password Confirm'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
