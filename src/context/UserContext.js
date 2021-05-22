import React, { useState, createContext, useEffect } from 'react';
import { Users } from 'react-feather';
import { client } from '../utils';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const localSt = JSON.parse(localStorage.getItem('user'));
   const [user, setUser] = useState(localSt ? localSt : null);
   const [usersObj, setUsersObj] = useState({
      users: [],
      supportUsers: [],
   });

   useEffect(() => {
      fetchUsers();
      // fetchSupports();
   }, []);

   useEffect(() => {
      let supportUsers;
      if (!usersObj.users || usersObj.users.length === 0) {
         supportUsers = [];
         return;
      }
      supportUsers = usersObj.users.filter(
         (el) => el.role === 'support'
      );
      setUsersObj({ ...usersObj, supportUsers: supportUsers });
   }, [usersObj.users]);

   const fetchUsers = () => {
      (async () => {
         const res = await client('/users');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         console.log('res', res);
         setUsersObj({
            ...usersObj,
            users: res.data,
         });
      })();
   };

   const fetchSupports = () => {
      (async () => {
         const res = await client('/support');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         console.log('res', res);
         setUsersObj({
            ...usersObj,
            supports: res.data,
         });
      })();
   };

   const deleteMany = async (deleteId) => {
      const res = await client(`/users/${deleteId}`, {}, 'DELETE');

      console.log('res', res);
      // * Remove User from Users
      console.clear();
      const newUsers = usersObj.users.filter((user) => {
         console.log(`user._id`, user._id);
         console.log(`deleteId`, deleteId);
         return (
            JSON.stringify(user._id) !== JSON.stringify(deleteId[0])
         );
      });
      setUsersObj({
         ...usersObj,
         users: newUsers,
      });
   };

   const deleteSupport = async (deleteId) => {
      const res = await client(`/support/${deleteId}`, {}, 'DELETE');

      console.log('res', res);
      // * Remove User from Users
      const newUsers = usersObj.supports.filter(
         (user) => user._id !== deleteId
      );
      setUsersObj({
         ...usersObj,
         supports: newUsers,
      });
   };

   const addNewSupport = async (user) => {
      const res = await client(`/support`, { ...user }, 'POST');
      console.log(`res`, res);
   };

   const addNewUser = async (user) => {
      const body = { ...user };
      const res = await client(`/users`, { body }, 'POST');
      console.log(`res`, res);

      // * Add newly Created User in Context
      usersObj.users.unshift(res.user);
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
   };

   return (
      <UserContext.Provider
         value={{
            user,
            setUser,
            logout,
            deleteMany,
            usersObj,
            deleteSupport,
            addNewSupport,
            addNewUser,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};
