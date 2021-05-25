import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Header from '../../components/Header/Header';
import Loading from '../../components/loading';
import * as Icons from '../../components/icons';
import Tweet from '../../components/Tweet/Tweet';
import TweetEditor from '../../components/TweetEditor/TweetEditor';

import { FeedContext } from '../../context/FeedContext';
import { client } from '../../utils';

import './Home.css';
import Button from '../../components/Button/Button';
import TextTitle from '../../components/Text/title';
import { UserContext } from '../../context/UserContext';
import { CloudCircle } from '@material-ui/icons';

const Home = () => {
   const { feed, setFeed } = useContext(FeedContext);
   const { user } = useContext(UserContext);
   const [loading, setLoading] = useState(true);
   const [morePosts, setMorePosts] = useState([]);

   useEffect(() => {
      (async () => {
         window.scrollTo(0, 0);

         setLoading(true);
         setFeed(null);

         if (!user || user === null) return;

         const res = await client(`/users/feed`, {}, 'GET');

         console.clear();
         console.log(`res`, res);

         setFeed(res.data);
         setLoading(false);
      })();
   }, [user]);

   return (
      <div className=''>
         <Header border>
            <TextTitle xbold>Home</TextTitle>
         </Header>

         <TweetEditor />

         {feed?.map((post) => (
            <Tweet key={post._id} post={post} />
         ))}

         {morePosts &&
            morePosts.map((post) => (
               <Tweet key={post._id} post={post} />
            ))}

         {loading && (
            <div className='loading'>
               <Loading />
            </div>
         )}

         {feed && feed.length == 0 && !loading && (
            <div className='loading'>
               <TextTitle>
                  Follow People To See Their Tweets ....
               </TextTitle>
            </div>
         )}
      </div>
   );
};

export default Home;
