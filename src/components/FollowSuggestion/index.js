import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';
import TextBody from '../Text/body';

import './FollowSuggestion.css';
import Follow from '../Follow/Follow';
import { UserContext } from '../../context/UserContext';

function FollowSuggestion({ suggestionUser, icon = true }) {
   const history = useHistory();
   const { user } = useContext(UserContext);

   const [isFollowing, setIsFollowing] = useState(false);

   useEffect(() => {
      if (!suggestionUser || suggestionUser == null) return;
      if (!user || user == null) return;
      console.log(
         `suggestionUser.followers`,
         suggestionUser.followers
      );
      suggestionUser.followers &&
      suggestionUser.followers.includes(user && user._id)
         ? setIsFollowing(true)
         : setIsFollowing(false);
   }, [user, suggestionUser]);
   return (
      <div className='extra__FollowSuggestion'>
         {suggestionUser && (
            <>
               <div>
                  <Avatar
                     size='medium'
                     src={
                        suggestionUser.avatar ||
                        `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${suggestionUser.name}`
                     }
                     onClick={() =>
                        history.push(
                           `/${suggestionUser.username}/${suggestionUser._id}`
                        )
                     }
                  />

                  <div className='extra__FollowSuggestion--info'>
                     <Link
                        to={`/${suggestionUser.username}/${suggestionUser._id}`}
                     >
                        <TextBody bold>
                           {suggestionUser.username}
                        </TextBody>
                     </Link>

                     <TextBody>{suggestionUser.email}</TextBody>
                  </div>
               </div>
               {icon && (
                  <Follow
                     isFollowing={isFollowing}
                     userId={suggestionUser._id}
                     username={suggestionUser.username}
                  >
                     Follow
                  </Follow>
               )}
            </>
         )}
      </div>
   );
}

export default FollowSuggestion;
