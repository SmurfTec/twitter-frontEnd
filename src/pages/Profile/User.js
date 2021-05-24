import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Loading from '../../components/loading';
import * as Icons from '../../components/icons';
import Tweet from '../../components/Tweet/Tweet';
import TextTitle from '../../components/Text/title';
import TextBody from '../../components/Text/body';
import Follow from '../../components/Follow/Follow';
import Button from '../../components/Button/Button';
import Avatar from '../../components/Avatar/Avatar';
import ThemeButton from '../../components/ThemeButton/ThemeButton';

import './Profile.css';
import { UserContext } from '../../context/UserContext';

const User = () => {
   const { user } = useContext(UserContext);
   const { handle } = useParams();
   const [profile, setProfile] = useState({});
   const [loading, setLoading] = useState(true);
   const [deadend, setDeadend] = useState(false);

   const [followersState, setFollowers] = useState(0);
   const incFollowers = () => setFollowers(followersState + 1);
   const decFollowers = () => setFollowers(followersState - 1);

   useEffect(() => {
      if (!user || user == null) {
         setDeadend(true);
         return;
      }

      setLoading(false);
      setDeadend(false);
      setProfile(user);
   }, [user]);

   if (!deadend && loading) {
      return (
         <div className='loading'>
            <Loading />
         </div>
      );
   }

   if (deadend) {
      return <div>Sorry, this page isn't available</div>;
   }
   return (
      <div className='profile-page'>
         <Header border>
            <div className='profile-page__header--body'>
               <Button icon>
                  <Icons.Options />
               </Button>
               <div style={{ marginLeft: '15px' }}>
                  <TextTitle xbold>
                     {profile.fullname ?? profile.username}
                  </TextTitle>
                  <TextBody gray>
                     {profile?.posts?.length
                        ? `${profile.posts.length} Tweets`
                        : 'No Tweets'}
                  </TextBody>
               </div>
            </div>
         </Header>

         <div
            style={{
               height: '200px',
               background: 'var(--profile-top)',
            }}
         ></div>

         <div className='profile-page__container'>
            <div>
               <Avatar size='xlarge' border src={profile.avatar} />

               <div>
                  <ThemeButton primary href='/accounts/edit'>
                     Edit Profile
                  </ThemeButton>
               </div>
            </div>

            <div className='profile-page__detail'>
               <TextTitle xbold>
                  {profile.fullname ?? profile?.username}
               </TextTitle>
               <TextBody>@{profile?.username}</TextBody>
               <TextBody>{profile.createdAt}</TextBody>
               <div className='profile-page__detail--b'>
                  <TextBody>
                     <span className='bold'>
                        {profile.followingCount}
                     </span>{' '}
                     following
                  </TextBody>
                  <TextBody>
                     <span className='bold'>
                        {profile.followersCount}
                     </span>{' '}
                     followers
                  </TextBody>
               </div>
            </div>
         </div>

         {profile?.posts &&
            profile.posts.map((post) => (
               <Tweet
                  key={post._id}
                  post={post}
                  pusername={profile?.username}
               />
            ))}
      </div>
   );
};

export default User;
