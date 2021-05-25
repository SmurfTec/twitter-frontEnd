import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import TextTitle from '../../components/Text/title';
import FollowSuggestion from '../../components/FollowSuggestion';

import './Lists.css';
import Loading from '../../components/loading';
import { client } from '../../utils';

function Lists() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      window.scrollTo(0, 0);

      (async () => {
         const res = await client('/users', {}, 'GET');
         console.clear();
         console.log(`res`, res);
         setUsers(res.data);
      })();
   }, []);

   return (
      <>
         <Header border>
            <TextTitle xbold>Connect</TextTitle>
         </Header>

         {users.map((user) => (
            <div key={user._id} className='list__follow'>
               <FollowSuggestion
                  key={user._id}
                  suggestionUser={user}
               />
            </div>
         ))}

         <div className='loading'>
            {!users && <Loading />}
            {users && users?.length === 0 && (
               <div className='loader'> </div>
            )}
         </div>
      </>
   );
}

export default Lists;
