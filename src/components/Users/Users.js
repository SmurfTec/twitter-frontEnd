import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Page from '../Page';

import Results from '../commons/Results';
import Toolbar from '../commons/Toolbar';

import ConfirmDeleteDialog from '../../dialogs/ConfirmDialogBox';

import FilterDialog from '../../dialogs/FilterDialog';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
   },
}));

const Users = () => {
   const classes = useStyles();
   const { usersObj, deleteMany, user } = useContext(UserContext);

   console.log('usersObj', usersObj);
   const [selectedUserIds, setSelectedUserIds] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
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
      setFilteredUsers(usersObj.users);
   }, [usersObj.users]);

   const searchResults = (searchTxt) => {
      console.log('searchTxt', searchTxt);
      const newUsers = usersObj.users.filter((el) =>
         el.username.toLowerCase().includes(searchTxt.toLowerCase())
      );

      console.log('newUsers', newUsers);
      setFilteredUsers(newUsers);
   };

   const filterUsers = (criteria, filterRoleBy) => {
      toggleFilterDialog();
      let newUsers;
      console.log('filterRoleBy', filterRoleBy);
      switch (filterRoleBy) {
         case 0:
            newUsers = usersObj.users;

            break;

         case 1:
            newUsers = usersObj.users.filter(
               (user) => user.role.toLowerCase() === 'customer'
            );

            break;
         case 2:
            newUsers = usersObj.users.filter(
               (user) => user.role.toLowerCase() === 'printer'
            );

            break;
         case 3:
            newUsers = usersObj.users.filter(
               (user) => user.role.toLowerCase() === 'admin'
            );

            break;

         default:
            newUsers = usersObj.users;
      }

      console.log('newUsers filter 1', newUsers);

      setFilteredUsers(newUsers);
   };

   console.log('filteredUsers', filteredUsers);
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
               <Results
                  users={filteredUsers}
                  selectedUserIds={selectedUserIds}
                  setSelectedUserIds={setSelectedUserIds}
                  isEdit={true}
               />
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

export default Users;
