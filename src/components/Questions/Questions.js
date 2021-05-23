import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Page from '../Page';

import Results from '../commons/Results';
import Toolbar from '../commons/Toolbar';

import QuestionsTable from './QuestionsTables';

import ConfirmDeleteDialog from '../../dialogs/ConfirmDialogBox';

import FilterDialog from '../../dialogs/FilterDialog';
import { QueriesContext } from '../../context/QueriesContext';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
   },
}));

const Questions = () => {
   const classes = useStyles();
   const { queries, deleteMany } = useContext(QueriesContext);

   console.log('queries', queries);
   const [selectedUserIds, setSelectedUserIds] = useState([]);
   const [filteredQueries, setFilteredQueries] = useState([]);
   const [
      showConfirmDeleteDialog,
      setShowConfirmDeleteDialog,
   ] = useState(false);
   const [showFilterDialog, setShowFilterDialog] = useState(false);

   const handleDelete = () => {
      toggleShowConfirmDelDialog();
   };

   const toggleFilterDialog = () => {
      setShowFilterDialog(!showFilterDialog);
   };
   const toggleShowConfirmDelDialog = () => {
      setShowConfirmDeleteDialog(!showConfirmDeleteDialog);
   };

   const deleteUsers = async () => {
      toggleShowConfirmDelDialog();
      // * Send request to delete users

      console.log('selectedUserIds', selectedUserIds);
      // const delIds = selectedUserIds.map(id => `ObjectId(${id})`);
      deleteMany(selectedUserIds);

      setSelectedUserIds([]);
   };

   useEffect(() => {
      setFilteredQueries(queries);
   }, [queries]);

   const searchResults = (searchTxt) => {
      console.log('searchTxt', searchTxt);
      const newQuerie = queries.filter((el) =>
         el.question.toLowerCase().includes(searchTxt.toLowerCase())
      );

      console.log('newQuerie', newQuerie);
      setFilteredQueries(newQuerie);
   };

   const filterUsers = (criteria, filterRoleBy) => {
      toggleFilterDialog();
      let newQueries;
      console.log('filterRoleBy', filterRoleBy);
      switch (filterRoleBy) {
         case 0:
            newQueries = queries;

            break;

         case 1:
            newQueries = queries.filter(
               (user) => user.role.toLowerCase() === 'customer'
            );

            break;
         case 2:
            newQueries = queries.filter(
               (user) => user.role.toLowerCase() === 'printer'
            );

            break;
         case 3:
            newQueries = queries.filter(
               (user) => user.role.toLowerCase() === 'admin'
            );

            break;

         default:
            newQueries = queries;
      }

      console.log('newQueries filter 1', newQueries);

      setFilteredQueries(newQueries);
   };

   console.log('filteredQueries', filteredQueries);
   return (
      <Page className={classes.root} title='Users'>
         <Container maxWidth='lg'>
            <Toolbar
               searchResults={searchResults}
               handleDelete={handleDelete}
               selectedUserIds={selectedUserIds}
               toggleFilter={toggleFilterDialog}
            />
            <Box mt={3}>
               <QuestionsTable queries={filteredQueries} />
            </Box>
            <ConfirmDeleteDialog
               open={showConfirmDeleteDialog}
               toggleDialog={toggleShowConfirmDelDialog}
               dialogTitle={'Delete these Users ?'}
               success={deleteUsers}
            />
            <FilterDialog
               open={showFilterDialog}
               toggleDialog={toggleFilterDialog}
               filterCriteria={filterUsers}
               filterRole
            />
         </Container>
      </Page>
   );
};

export default Questions;
