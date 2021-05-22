import React, { useState, createContext, useEffect } from 'react';
import { Users } from 'react-feather';
import { client } from '../utils';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const localSt = JSON.parse(localStorage.getItem('user'));
   const [user, setUser] = useState(localSt ? localSt : null);
   const [usersObj, setUsersObj] = useState({
      users: [],
   });

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = () => {
      (async () => {
         const res = await client('/users');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         //  console.clear();
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
      const newUsers = usersObj.users.filter(
         (user) => user._id !== deleteId
      );
      setUsersObj({
         ...usersObj,
         users: newUsers,
      });
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
         }}
      >
         {children}
      </UserContext.Provider>
   );
};
