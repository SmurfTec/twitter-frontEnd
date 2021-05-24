import React, { useContext } from 'react';
import * as Icon from '../components/icons';

import { UserContext } from '../context/UserContext';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';

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
         icon: <HomeIcon />,
         iconSelected: <HomeIcon />,
         title: 'Home',
         notify: 0,
      },

      {
         key: 'lists',
         path: '/lists',
         icon: <ListAltIcon />,
         iconSelected: <ListAltIcon />,
         title: 'Lists',
         notify: 0,
      },
      {
         key: 'profile',
         path: `/profile`,
         icon: <AccountBoxIcon />,
         iconSelected: <AccountBoxIcon />,
         title: 'Profile',
         notify: 0,
      },
      {
         key: 'more',
         path: '/dashboard',
         icon: <DashboardIcon />,
         iconSelected: <DashboardIcon />,
         title: 'Dashboard',
         notify: 0,
      },
   ];
};

export default {
   MOBILE_SIZE: 500,
   TABLET_SIZE: 980,
   DESKTOP_SIZE: 1270,
};
