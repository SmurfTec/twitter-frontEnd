import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { UserProvider } from './context/UserContext';
import { FeedProvider } from './context/FeedContext';
import { ThemeProvider } from './context/ThemeContext';
import { QueryProvider } from './context/QueriesContext';

ReactDOM.render(
   <React.StrictMode>
      <ThemeProvider>
         <UserProvider>
            <QueryProvider>
               <FeedProvider>
                  <App />
               </FeedProvider>
            </QueryProvider>
         </UserProvider>
      </ThemeProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
