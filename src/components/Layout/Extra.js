import React, { useContext, useState } from 'react';
import {
   useHistory,
   useLocation as locations,
} from 'react-router-dom';

import './Extra.css';

import List from '../List';
import FollowSuggestion from '../FollowSuggestion';
import Loading from '../loading';

import { Options } from '../icons';
import SearchBox from '../SearchBox/SearchBox';

import { FeedContext } from '../../context/FeedContext';

function Extra() {
   const history = useHistory();
   let router = locations();

   const { whoFollow, tags } = useContext(FeedContext);

   const [searchText, setSearchText] = useState('');

   const handleAddSearch = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();

         history.push(`/${searchText}`);

         setSearchText('');
      }
   };

   return (
      <section className='layout-explore'>
         <SearchBox
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            onKeyPress={handleAddSearch}
            className='layout-explore--search'
         />

         <div className='layout-explore--stick'>
            {router.pathname !== '/lists' && (
               <List
                  title={`Who to follow`}
                  icon={<Options />}
                  src='lists'
               >
                  {whoFollow?.slice(0, 4).map((el) => (
                     <FollowSuggestion
                        key={el._id}
                        suggestionUser={el}
                     />
                  ))}

                  <div style={{ textAlign: 'center' }}>
                     {!whoFollow && <Loading />}
                     {whoFollow?.length === 0 &&
                        `There's no one else left to follow .`}
                  </div>
               </List>
            )}
         </div>
      </section>
   );
}

export default Extra;
