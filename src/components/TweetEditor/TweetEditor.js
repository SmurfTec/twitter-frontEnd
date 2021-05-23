import React, { useContext, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { Picker } from 'emoji-mart';

import { FeedContext } from '../../context/FeedContext';
import { uploadImage, client } from '../../utils';

import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import ThemeButton from '../ThemeButton/ThemeButton';
import { Media, Gif, Question, Emoji } from '../icons';

import './TweetEditor.css';
import { UserContext } from '../../context/UserContext';

function TweetEditor() {
   const { feed, setFeed, tags, setTags } = useContext(FeedContext);
   const { user } = useContext(UserContext);

   const [preview, setPreview] = useState('');
   const [postImage, setPostImage] = useState('');
   const [textTweet, setTextTweet] = useState('');
   const [toggleEmoji, setToggleEmoji] = useState(false);

   const handleUploadImage = (e) => {
      if (e.target.files[0]) {
         const reader = new FileReader();

         reader.onload = (e) => {
            setPreview(e.target.result);
         };
         reader.readAsDataURL(e.target.files[0]);

         uploadImage(e.target.files[0]).then((res) => {
            setPostImage(res.secure_url);
         });
      }
   };

   const handleSubmitPost = () => {
      if (!textTweet) {
         return toast.error('Please write something');
      }

      const tag = textTweet
         .split(' ')
         .filter((caption) => caption.startsWith('#'))
         .map((val) => val.slice(1, val.length));

      const cleanedCaption = textTweet
         .split(' ')
         .filter((caption) => !caption.startsWith('#'))
         .join(' ');

      setTextTweet('');

      const newPost = {
         caption: cleanedCaption,
         files: [postImage],
         tags: tag,
         user: user,
      };

      client(`/posts`, { body: newPost }, 'POST').then((res) => {
         const post = res.data;
         console.log(`post`, post);
         post.isLiked = false;
         post.isSaved = false;
         post.isMine = true;
         setFeed([post, ...feed]);
         window.scrollTo(0, 0);
         setPreview('');

         tag.forEach((tg) => {
            if (!tags.includes(tg)) {
               setTags([tg, ...tags]);
            }
         });

         toast.success('Tweet posted successfully.');
      });
   };

   const addEmoji = (e) => {
      let sym = e.unified.split('-');
      let codesArray = [];
      sym.forEach((el) => codesArray.push('0x' + el));
      let emoji = String.fromCodePoint(...codesArray);
      setTextTweet(textTweet + emoji);
   };
   return (
      <div className='tweet-editor'>
         <Avatar className='tweet-editor--avatar' size='medium' />
         <div className='tweet-editor__body'>
            {preview && (
               <img
                  style={{ width: '100%' }}
                  src={preview}
                  alt='preview'
               />
            )}
            <TextareaAutosize
               rows='59'
               placeholder="What's happening?"
               type='text'
               onChange={(e) => setTextTweet(e.target.value)}
               value={textTweet}
            />
            <div className='tweet-editor__body--secondary'>
               <div className='tweet-editor__body--icons'>
                  <label
                     htmlFor='file-input'
                     style={{ cursor: 'pointer' }}
                  >
                     <Button icon style={{ pointerEvents: 'none' }}>
                        <Media />
                     </Button>
                  </label>
                  <input
                     id='file-input'
                     accept='image/*'
                     type='file'
                     onChange={handleUploadImage}
                  />

                  <label
                     htmlFor='file-input'
                     style={{ cursor: 'pointer' }}
                  >
                     <Button icon style={{ pointerEvents: 'none' }}>
                        <Gif />
                     </Button>
                  </label>

                  <Button icon>
                     <Question />
                  </Button>
                  <div style={{ position: 'relative' }}>
                     <Button
                        icon
                        onClick={() => setToggleEmoji(!toggleEmoji)}
                     >
                        <Emoji />
                     </Button>
                     {toggleEmoji && (
                        <Picker
                           onSelect={addEmoji}
                           style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                           }}
                        />
                     )}
                  </div>
               </div>
               <ThemeButton primary onClick={handleSubmitPost}>
                  Tweet
               </ThemeButton>
            </div>
         </div>
      </div>
   );
}

export default TweetEditor;
