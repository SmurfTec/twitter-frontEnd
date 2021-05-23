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
import More from './pages/More/More';
import EditProfile from './pages/Profile/EditProfile';
import Explore from './pages/Explore/Explore';
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
      client('/users').then((response) => {
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
            <Route exact path='/' component={Home} />
            <Route exact path='/more' component={More} />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/lists' component={Lists} />
            <Route
               exact
               path='/notifications'
               component={Notifications}
            />
            <Route exact path='/bookmarks' component={Bookmarks} />
            <Route path='/accounts/edit' component={EditProfile} />

            <Route exact path={`/profile`} component={User} />

            <Route exact path={`/:handle`} component={Profile} />
            <Route
               exact
               path={`/:handle/status/:tweetId`}
               component={TweetDetail}
            />
         </Layout>
         <Redirect from='*' to='/' />
      </Switch>
   );

   return <BrowserRouter>{routes}</BrowserRouter>;
}

export default Router;
