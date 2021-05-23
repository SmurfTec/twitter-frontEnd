import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import Header from '../../components/Header/Header';
import TextTitle from '../../components/Text/title';
import SearchBox from '../../components/SearchBox/SearchBox';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import { client } from '../../utils';

import './EditProfile.css';

function EditProfile() {
   const history = useHistory();
   const { user, setUser } = useContext(UserContext);

   const [state, setState] = useState({
      email: user.email || '',
      username: user.username || '',
      bio: user.bio || '',
      website: user.website || '',
   });

   const handleEdit = (e) => {
      e.preventDefault();
      if (!state.username) {
         return toast.error('The name field should not be empty');
      }

      if (!state.bio) {
         return toast.error('The username field should not be empty');
      }

      const body = {
         email: state.email || '',
         username: state.username || '',
         bio: state.bio || '',
         website: state.website || '',
      };

      client('/users/me', { method: 'PATCH', body }, 'PATCH')
         .then((data) => {
            console.clear();
            console.log(`data`, data);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            // history.push(`/${user.username}`);
            toast.success(`Profile Updated Successfully !`);
         })
         .catch((err) => toast.error(err.message));
   };

   const handleTextChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div>
         <Header border>
            <TextTitle xbold>Profile Edit</TextTitle>
         </Header>

         <div className='edit-profile__container'>
            <SearchBox
               value={state.username}
               onChange={handleTextChange}
               icon={false}
               name={'username'}
               text='Username'
            />
            <SearchBox
               value={state.email}
               onChange={handleTextChange}
               icon={false}
               name={'email'}
               text='Email'
            />

            <SearchBox
               value={state.bio}
               onChange={handleTextChange}
               icon={false}
               name={'bio'}
               text='bio'
            />

            <SearchBox
               value={state.website}
               onChange={handleTextChange}
               icon={false}
               name={'website'}
               text='Website'
            />

            <ThemeButton primary onClick={handleEdit}>
               Update Profile
            </ThemeButton>
         </div>
      </div>
   );
}

export default EditProfile;
