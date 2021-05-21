import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';
import TextBody from '../Text/body';

import './FollowSuggestion.css';
import Follow from '../Follow/Follow';

function FollowSuggestion({ user, icon = true }) {
   const history = useHistory();

   return (
      <div className='extra__FollowSuggestion'>
         <div>
            <Avatar
               size='medium'
               src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}`
               }
               onClick={() => history.push(`/${user.username}`)}
            />

            <div className='extra__FollowSuggestion--info'>
               <Link to={`${user.username}`}>
                  <TextBody bold>{user.username}</TextBody>
               </Link>

               <TextBody>{user.fullname ?? user.username}</TextBody>
            </div>
         </div>
         {icon && (
            <Follow
               isFollowing={user.isFollowing}
               userId={user._id}
               username={user.username}
            >
               Takip
            </Follow>
         )}
      </div>
   );
}

export default FollowSuggestion;
