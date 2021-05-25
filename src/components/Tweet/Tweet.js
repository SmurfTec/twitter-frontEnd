import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';

import { client, timeSince } from '../../utils';

import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import TextBody from '../Text/body';
import { Reply, Retweet, Like, Share, LikeFill } from '../icons';

import './Tweet.css';
import { UserContext } from '../../context/UserContext';

function Tweet({ post, pusername }) {
   const {
      _id,
      isLiked,
      isRetweeted,
      comments,
      retweetCount,
      likesCount,
      createdAt,
      caption,
      tags,
      files,
   } = post;
   const history = useHistory();
   const [likedState, setLiked] = useState(false);
   const [likesState, setLikes] = useState(likesCount);

   const { user } = useContext(UserContext);

   const [retweeted, setRetweeted] = useState(isRetweeted);
   const [retweets, setRetweets] = useState(retweetCount);

   const handle = user?.username;

   useEffect(() => {
      console.log(`user`, user);
      console.log(`post.likes`, post.likes);
      if (!post.likes || post.likes.length === 0) {
         setLikes(0);
         setLiked(false);
         return;
      } else if (post.likes.includes(user && user._id)) {
         setLiked(true);
      } else setLiked(false);
      setLikes(post.likes.length);
   }, [post]);

   const handleToggleLike = () => {
      if (likedState) {
         setLiked(false);
         setLikes(likesState - 1);
         client(`/posts/${_id}/toggleLike`);
      } else {
         setLiked(true);
         setLikes(likesState + 1);
         client(`/posts/${_id}/toggleLike`);
      }
   };

   const handleToggleRetweet = () => {
      if (retweeted) {
         setRetweeted(false);
         setRetweets(retweets - 1);
         client(`/posts/${_id}/toggleRetweet`);
      } else {
         setRetweeted(true);
         setRetweets(retweets + 1);
         client(`/posts/${_id}/toggleRetweet`);
      }
   };

   return (
      <div className='page-tweet'>
         {isRetweeted && (
            <span className='page-tweet__retweet'>
               {' '}
               <Retweet /> {user.username} Retweeted
            </span>
         )}

         <div className='page-tweet__container'>
            <div className='page-tweet__avatar'>
               <Avatar
                  className=''
                  size='medium'
                  onClick={() =>
                     history.push(
                        `${pusername || post.user.username}/${
                           post.user._id
                        }`
                     )
                  }
               />
            </div>
            <div className='page-tweet__body'>
               <div className='tweet-info-user'>
                  <TextBody
                     bold
                     onClick={() =>
                        history.push(
                           `/${pusername || post.user.username}/${
                              post.user?._id
                           }`
                        )
                     }
                  >
                     {pusername || post.user.username}
                  </TextBody>
                  <span className='secondary'>
                     {timeSince(createdAt)} ago
                  </span>
               </div>

               <span>
                  <Link to={`/${handle}/status/${_id}`}>
                     <p>{caption}</p>
                  </Link>
               </span>

               <div className='tags'>
                  {tags
                     ? tags.map((tag) => (
                          <Link
                             key={tag}
                             to={`/explore?tag=${tag}`}
                             className='tweet--tag'
                          >
                             {`#${tag}`}
                          </Link>
                       ))
                     : null}
               </div>

               <Link
                  to={`/${handle}/status/${_id}`}
                  className='tweet__image'
               >
                  <img src={files?.length && files[0]} alt='' />
               </Link>

               <div className='page-tweet__body--stats'>
                  <div>
                     <Button icon href={`/${handle}/status/${_id}`}>
                        <Reply />
                     </Button>
                     <span>
                        {comments &&
                           comments.length > 0 &&
                           comments.length}
                     </span>
                  </div>

                  <div className={retweeted ? 'isRetweet' : ''}>
                     <Button icon onClick={handleToggleRetweet}>
                        <Retweet />
                     </Button>
                     <span>{retweets}</span>
                  </div>

                  <div className={likedState ? 'isLiked' : ''}>
                     <Button icon onClick={handleToggleLike}>
                        {likedState ? <LikeFill /> : <Like />}
                     </Button>
                     <span>{likesState}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Tweet;
