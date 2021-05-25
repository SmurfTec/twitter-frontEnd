import React, { useState, createContext, useEffect } from 'react';
import { Users } from 'react-feather';
import { toast } from 'react-toastify';
import { client } from '../utils';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const localSt = JSON.parse(localStorage.getItem('user'));
   let tokenLocal;
   try {
      tokenLocal = localStorage.getItem('jwt');
   } catch (err) {
      tokenLocal = null;
   }
   const [user, setUser] = useState(localSt ? localSt : null);
   const [token, setToken] = useState(tokenLocal);
   const [usersObj, setUsersObj] = useState({
      users: [],
      supportUsers: [],
   });

   useEffect(() => {
      fetchUsers();
      getMe();
      // fetchSupports();
   }, []);

   const getMe = async () => {
      try {
         const res = await client(`/users/me`, {}, 'GET');
         console.log(`res`, res);

         localStorage.setItem('user', JSON.stringify(res.user));

         setUser(res.user);
      } catch (err) {
         setToken(null);
         localStorage.removeItem('jwt');
         localStorage.removeItem('user');
      }
   };

   useEffect(() => {
      let supportUsers;
      if (!usersObj.users || usersObj.users.length === 0) {
         supportUsers = [];
         return;
      }
      console.log(
         `usersObj.user`,
         usersObj.users.map((el) => el.role)
      );
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
      let newUsers = usersObj.users;
      newUsers.unshift(res.user);

      setUsersObj({ ...usersObj, users: newUsers });
   };

   const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');

      window.location.href = '/';
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
            token,
            setToken,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};
