import React, { useContext } from 'react';

import './ProfileBox.css';
import { ArrowBottom } from '../icons';
import Button from '../Button/Button';
import TextBody from '../Text/body';
import Avatar from '../Avatar/Avatar';
import { UserContext } from '../../context/UserContext';

const ProfileBox = ({ flat = false }) => {
   const { user } = useContext(UserContext);
   return (
      <Button className='profil-box'>
         <Avatar />
         {!flat && (
            <>
               <div className='profil-box__body'>
                  <TextBody bold>
                     {user &&
                        user.username &&
                        user.username.slice(0, 10)}
                  </TextBody>
                  <TextBody className='profil-box__slug'>
                     @
                     {user &&
                        user.username &&
                        user.username.slice(0, 10)}
                  </TextBody>
               </div>
               <ArrowBottom className='profil-box__icon' />
            </>
         )}
      </Button>
   );
};

export default ProfileBox;
