import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import { Redirect, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Support from '../../Support/Support';
import Questions from '../../Questions/Questions';
import Users from '../../Users/Users';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#F4F6F8',
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
   },
   wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
         paddingLeft: 256,
      },
   },
   contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
   },
   content: {
      flex: '1 1 auto',
      height: '100vh',
      overflow: 'auto',
   },
}));

const DashboardLayout = ({
   component: Component,
   path: pathName,
   ...rest
}) => {
   const classes = useStyles();
   const [isMobileNavOpen, setMobileNavOpen] = useState(false);

   return (
      <div className={classes.root}>
         <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
         <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
         />
         <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
               <div className={classes.content}>
                  {/* <Outlet /> */}
                  {/* <Route {...rest} component={Component} /> */}
                  <Route component={Users} path='/dashboard/users' />
                  <Route
                     component={Support}
                     path='/dashboard/support'
                  />
                  <Route
                     component={Questions}
                     path='/dashboard/questions'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
