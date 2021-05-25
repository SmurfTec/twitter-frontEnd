import React, { useContext, useEffect } from 'react';
import {
   BrowserRouter,
   Switch,
   Route,
   Redirect,
} from 'react-router-dom';

import Profile from './pages/Profile/Profile';

import Layout from './components/Layout';

import Home from './pages/Home/Home';
import EditProfile from './pages/Profile/EditProfile';
import Notifications from './pages/Notifications/Notifications';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import TweetDetail from './pages/TweetDetail/TweetDetail';
import Lists from './pages/Lists/Lists';
import { FeedContext } from './context/FeedContext';
import { client } from './utils';
import { UserContext } from './context/UserContext';
import DashboardLayout from './components/Layout/DashboardLayout/DashboardLayout';
import User from './pages/Profile/User';

function Router() {
   const { setWhoFollow, setTags } = useContext(FeedContext);
   const { user } = useContext(UserContext);

   useEffect(() => {
      client('/users?role=user').then((response) => {
         setWhoFollow(
            response.data.filter((user) => !user.isFollowing)
         );
      });

      client('/posts/tags').then((response) => {
         setTags(response.data);
      });
   }, []);

   let routes = (
      <Switch>
         <Route path='/dashboard' component={DashboardLayout} />

         <Layout>
            <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/lists' component={Lists} />
               <Route
                  exact
                  path='/notifications'
                  component={Notifications}
               />
               <Route exact path='/bookmarks' component={Bookmarks} />
               <Route path='/accounts/edit' component={EditProfile} />

               <Route exact path={`/profile`} component={User} />

               <Route
                  exact
                  path={`/:userName/:userId`}
                  component={Profile}
               />
               <Route
                  exact
                  path={`/:handle/status/:tweetId`}
                  component={TweetDetail}
               />
            </Switch>
         </Layout>
         <Redirect from='*' to='/' />
      </Switch>
   );

   let adminRoutes = (
      <Switch>
         <Route path={'/'} component={DashboardLayout} />
      </Switch>
   );

   return (
      <BrowserRouter>
         {user && <>{user.role === 'user' ? routes : adminRoutes}</>}
      </BrowserRouter>
   );
}

export default Router;
