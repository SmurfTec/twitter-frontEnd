import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Avatar,
   Box,
   Divider,
   Drawer,
   Hidden,
   List,
   Typography,
   makeStyles,
} from '@material-ui/core';
import {
   Users as UsersIcon,
   LogOut,
   Printer,
   HelpCircle,
} from 'react-feather';
import NavItem from './NavItem';
import { UserContext } from '../../../../context/UserContext';

const generalItems = [
   {
      href: '/dashboard/questions',
      icon: HelpCircle,
      title: 'questions',
   },

   {
      href: '/logout',
      icon: LogOut,
      title: 'Logout',
   },
];
const adminItems = [
   {
      href: '/dashboard/users',
      icon: UsersIcon,
      title: 'Users',
   },
   {
      href: '/dashboard/support',
      icon: Printer,
      title: 'Support',
   },
];

const supportItems = [
   {
      href: '/dashboard/support',
      icon: Printer,
      title: 'Support',
   },
];

const useStyles = makeStyles(() => ({
   mobileDrawer: {
      width: 256,
   },
   desktopDrawer: {
      width: 256,
      top: 64,
      height: 'calc(100% - 64px)',
   },
   avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64,
   },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
   const classes = useStyles();
   const location = useLocation();
   const [items, setItems] = useState();

   const { user } = useContext(UserContext);

   useEffect(() => {
      if (!user || user === null) return;

      if (user.role === 'admin')
         setItems([...adminItems, ...generalItems]);
      else if (user.role === 'support')
         setItems([...supportItems, ...generalItems]);
      else setItems([...generalItems]);
   }, [user]);

   useEffect(() => {
      if (openMobile && onMobileClose) {
         onMobileClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.pathname]);

   const content = (
      <Box height='100%' display='flex' flexDirection='column'>
         {user && (
            <>
               {' '}
               <Box
                  alignItems='center'
                  display='flex'
                  flexDirection='column'
                  p={2}
               >
                  <Avatar
                     className={user.image}
                     // component={RouterLink}
                     src={user.avatar}
                     // to="/"
                     style={{
                        minHeight: 60,
                        minWidth: 60,
                        marginBottom: 20,
                     }}
                  />
                  <Typography
                     className={classes.name}
                     color='textPrimary'
                     variant='h5'
                  >
                     {user.name}
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                     {user.email}
                  </Typography>
               </Box>
               <Divider />
               <Box p={2}>
                  <List>
                     {items &&
                        items.length > 0 &&
                        items.map((item) => (
                           <NavItem
                              href={item.href}
                              key={item.title}
                              title={item.title}
                              icon={item.icon}
                           />
                        ))}
                  </List>
               </Box>
               <Box flexGrow={1} />
            </>
         )}
      </Box>
   );

   return (
      <>
         <Hidden lgUp>
            <Drawer
               anchor='left'
               classes={{ paper: classes.mobileDrawer }}
               onClose={onMobileClose}
               open={openMobile}
               variant='temporary'
            >
               {content}
            </Drawer>
         </Hidden>
         <Hidden mdDown>
            <Drawer
               anchor='left'
               classes={{ paper: classes.desktopDrawer }}
               open
               variant='persistent'
            >
               {content}
            </Drawer>
         </Hidden>
      </>
   );
};

NavBar.propTypes = {
   onMobileClose: PropTypes.func,
   openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
   onMobileClose: () => {},
   openMobile: false,
};

export default NavBar;
