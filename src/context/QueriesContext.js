import React, { useState, createContext, useEffect } from 'react';
import { client } from '../utils';

export const QueriesContext = createContext(null);

export const QueryProvider = ({ children }) => {
   const localSt = JSON.parse(localStorage.getItem('user'));
   const [user, setUser] = useState(localSt ? localSt : null);
   const [queriesObj, setQueriesObj] = useState({
      users: [],
      supportUsers: [],
   });

   useEffect(() => {
      fetchUsers();
      // fetchSupports();
   }, []);

   useEffect(() => {
      let supportUsers;
      if (!queriesObj.users || queriesObj.users.length === 0) {
         supportUsers = [];
         return;
      }
      supportUsers = queriesObj.users.filter(
         (el) => el.role === 'support'
      );
      setQueriesObj({ ...queriesObj, supportUsers: supportUsers });
   }, [queriesObj.users]);

   const fetchUsers = () => {
      (async () => {
         const res = await client('/users');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         console.log('res', res);
         setQueriesObj({
            ...queriesObj,
            users: res.data,
         });
      })();
   };

   const fetchSupports = () => {
      (async () => {
         const res = await client('/support');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         console.log('res', res);
         setQueriesObj({
            ...queriesObj,
            supports: res.data,
         });
      })();
   };

   const deleteMany = async (deleteId) => {
      const res = await client(`/users/${deleteId}`, {}, 'DELETE');

      console.log('res', res);
      // * Remove User from Users
      console.clear();
      const newUsers = queriesObj.users.filter((user) => {
         console.log(`user._id`, user._id);
         console.log(`deleteId`, deleteId);
         return (
            JSON.stringify(user._id) !== JSON.stringify(deleteId[0])
         );
      });
      setQueriesObj({
         ...queriesObj,
         users: newUsers,
      });
   };

   const deleteSupport = async (deleteId) => {
      const res = await client(`/support/${deleteId}`, {}, 'DELETE');

      console.log('res', res);
      // * Remove User from Users
      const newUsers = queriesObj.supports.filter(
         (user) => user._id !== deleteId
      );
      setQueriesObj({
         ...queriesObj,
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
      queriesObj.users.unshift(res.user);
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
   };

   return (
      <QueriesContext.Provider
         value={{
            user,
            setUser,
            logout,
            deleteMany,
            queriesObj,
            deleteSupport,
            addNewSupport,
            addNewUser,
         }}
      >
         {children}
      </QueriesContext.Provider>
   );
};
