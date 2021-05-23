import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { toast } from 'react-toastify';
import validator from 'validator';

const AdminNewUserModal = (props) => {
   const {
      isOpen,
      closeDialog,
      createNew,
      role,
      isEdit,
      editUser,
      updateUser,
   } = props;

   const [usernameTxt, setUserNametxt] = useState('');
   const [emailTxt, setEmailTxt] = useState('');
   const [passwordTxt, setPasswordTxt] = useState('');

   const handleNameChange = (e) => {
      setUserNametxt(e.target.value);
   };
   const handleEmailChange = (e) => {
      setEmailTxt(e.target.value);
   };
   const handlePasswordChange = (e) => {
      setPasswordTxt(e.target.value);
   };

   // const handleNameChange = (e) => {
   //    setUserNametxt(e.target.value)
   // }

   const handleSubmit = (e) => {
      e.preventDefault();

      // Shit Validations

      let valMessages = [];
      let valFailed = false;
      if (!usernameTxt || usernameTxt.length < 1) {
         valFailed = true;
         valMessages.push('Username must NOT be Empty');
      }

      if (!validator.isEmail(emailTxt)) {
         valFailed = true;
         valMessages.push('Invalid Or Empty Email');
      }

      // var passvalid = passwordTxt.match(/^[a-zA-Z0-9 ]*$/);

      if (!passwordTxt || passwordTxt.length < 6) {
         valFailed = true;
         valMessages.push(
            'Password must NOT be less than 6 characters '
         );
      }

      valFailed
         ? valMessages.forEach((msg) =>
              toast.error(msg, {
                 position: 'top-right',
                 // autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
              })
           )
         : createNew({
              username: usernameTxt,
              email: emailTxt,
              password: passwordTxt,
              passwordConfirm: passwordTxt,
              role: 'support',
           });
      closeDialog();
   };

   return (
      <div>
         <Dialog
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby='form-dialog-title'
         >
            <DialogTitle id='form-dialog-title'>
               {isEdit
                  ? `Edit ${editUser && editUser.role}`
                  : `Add New ${role}`}
               {/* Add New User */}
            </DialogTitle>
            <DialogContent>
               {/* <DialogContentText>
                  To subscribe to this website, please enter your
                  email address here. We will send updates
                  occasionally.
               </DialogContentText> */}
               <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Name'
                  // type='email'
                  fullWidth
                  value={usernameTxt}
                  onChange={handleNameChange}
               />

               {isEdit === false && (
                  <>
                     {' '}
                     <TextField
                        autoFocus
                        margin='dense'
                        id='email'
                        label='Email Address'
                        type='email'
                        fullWidth
                        value={emailTxt}
                        onChange={handleEmailChange}
                     />
                     <TextField
                        autoFocus
                        margin='dense'
                        id='password'
                        label='Password'
                        type='password'
                        fullWidth
                        value={passwordTxt}
                        onChange={handlePasswordChange}
                     />
                  </>
               )}
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleSubmit}
                  variant='contained'
                  color='primary'
                  style={{
                     textTransform: 'capitalize',
                  }}
               >
                  Create
               </Button>
               <Button
                  onClick={closeDialog}
                  variant='contained'
                  color='primary'
                  style={{
                     backgroundColor: 'red',
                     color: '#fff',
                     textTransform: 'capitalize',
                  }}
               >
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default AdminNewUserModal;
