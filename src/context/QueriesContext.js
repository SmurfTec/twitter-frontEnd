import React, { useState, createContext, useEffect } from 'react';
import { client } from '../utils';
import { toast } from 'react-toastify';

export const QueriesContext = createContext(null);

export const QueryProvider = ({ children }) => {
   const localSt = JSON.parse(localStorage.getItem('user'));
   const [user, setUser] = useState(localSt ? localSt : null);
   const [queries, setQueriesObj] = useState([]);

   useEffect(() => {
      fetchQueries();
      // fetchSupports();
   }, []);

   const fetchQueries = () => {
      (async () => {
         const res = await client('/query');
         //  const res = await axios.get(`${API_BASE_URL}/users`);
         console.log('res', res);
         setQueriesObj(res.queries);
      })();
   };

   const addNewQuery = async (question) => {
      const body = { question: question };
      const res = await client(`/query`, { body }, 'POST');
      console.log(`res`, res);

      // * Add Newly created Query in Context
      queries.unshift(res.user);

      toast.success('Question Successfully Asked!');
   };

   const answerQuery = async (queryId, answer) => {
      console.log(`answer`, answer);
      const body = { answer: answer };

      const res = await client(
         `/query/${queryId}`,
         { body },
         'PATCH'
      );
      console.log(`res`, res);

      // * Update in Context
      const newQueries = queries.map((el) =>
         JSON.stringify(el._id) === JSON.stringify(queryId)
            ? res.query
            : el
      );

      setQueriesObj(newQueries);
   };

   return (
      <QueriesContext.Provider
         value={{
            user,
            setUser,
            queries,
            addNewQuery,
            answerQuery,
         }}
      >
         {children}
      </QueriesContext.Provider>
   );
};
