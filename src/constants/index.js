import React, { useContext } from 'react';
import * as Icon from '../components/icons';

import { UserContext } from '../context/UserContext';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export const MENU = () => {
   const { user } = useContext(UserContext);

   return [
      {
         key: 'twitter',
         path: '/',
         icon: <LibraryBooksIcon style={{ fontSize: 30 }} />,
         iconSelected: <LibraryBooksIcon style={{ fontSize: 30 }} />,
         title: '',
         notify: 0,
      },
      {
         key: 'home',
         path: '/',
         icon: <Icon.Home />,
         iconSelected: <Icon.HomeFill />,
         title: 'Home',
         notify: 0,
      },

      {
         key: 'lists',
         path: '/lists',
         icon: <Icon.Lists />,
         iconSelected: <Icon.ListsFill />,
         title: 'Lists',
         notify: 0,
      },
      {
         key: 'profile',
         path: `/profile`,
         icon: <Icon.Profile />,
         iconSelected: <Icon.ProfileFill />,
         title: 'Profile',
         notify: 0,
      },
      {
         key: 'more',
         path: '/dashboard',
         icon: <Icon.More />,
         iconSelected: <Icon.More />,
         title: 'More',
         notify: 0,
      },
   ];
};

export default {
   MOBILE_SIZE: 500,
   TABLET_SIZE: 980,
   DESKTOP_SIZE: 1270,
};
