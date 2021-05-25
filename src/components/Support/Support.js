import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Page from '../Page';

import Results from '../commons/Results';
import Toolbar from '../commons/Toolbar';

import ConfirmDeleteDialog from '../../dialogs/ConfirmDialogBox';

import FilterDialog from '../../dialogs/FilterDialog';
import { UserContext } from '../../context/UserContext';
import NewUserDialog from '../../dialogs/NewUserModal';

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
   const {
      usersObj,
      deleteMany,
      addNewSupport,
      addNewUser,
   } = useContext(UserContext);

   console.log('usersObj', usersObj);
   const [selectedUserIds, setSelectedUserIds] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [
      showConfirmDeleteDialog,
      setShowConfirmDeleteDialog,
   ] = useState(false);
   const [showNewUserDialog, setShowNewUserDialog] = useState(false);
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
   const toggleAddNewuserDialog = () => {
      setShowNewUserDialog(!showNewUserDialog);
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
      setFilteredUsers(usersObj.supportUsers);
   }, [usersObj.supportUsers]);

   const createNewUser = (newUser) => {
      console.log('newuser', newUser);
      addNewUser(newUser);
      toggleAddNewuserDialog();
   };

   const filterUsers = (criteria, filterRoleBy) => {
      toggleFilterDialog();
      let newUsers;
      console.log('filterRoleBy', filterRoleBy);
      switch (filterRoleBy) {
         case 0:
            newUsers = usersObj.supportUsers;

            break;

         case 1:
            newUsers = usersObj.supportUsers.filter(
               (user) => user.role.toLowerCase() === 'customer'
            );

            break;
         case 2:
            newUsers = usersObj.supportUsers.filter(
               (user) => user.role.toLowerCase() === 'printer'
            );

            break;
         case 3:
            newUsers = usersObj.supportUsers.filter(
               (user) => user.role.toLowerCase() === 'admin'
            );

            break;

         default:
            newUsers = usersObj.supportUsers;
      }

      console.log('newUsers filter 1', newUsers);

      setFilteredUsers(newUsers);
   };

   console.log('filteredUsers', filteredUsers);
   return (
      <Page className={classes.root} title='Users'>
         <Container maxWidth='lg'>
            <Toolbar
               handleDelete={handleDelete}
               selectedUserIds={selectedUserIds}
               addUser={toggleAddNewuserDialog}
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
            <NewUserDialog
               isOpen={showNewUserDialog}
               closeDialog={toggleAddNewuserDialog}
               createNew={createNewUser}
               role={'support'}
               isEdit={false}
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
