import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/styles';

const Styles = {
   Dialog: {
      '& .MuiDialog-paper': {
         width: 400,
      },
   },
};

const AnswerQueryModal = (props) => {
   const {
      isOpen,
      closeDialog,
      createNew,
      classes,
      condition,
   } = props;

   const [answerTxt, setAnswertxt] = useState('');

   const handleAnswerChange = (e) => {
      setAnswertxt(e.target.value);
   };

   // const handleAnswerChange = (e) => {
   //    setAnswertxt(e.target.value)
   // }

   const handleSubmit = (e) => {
      e.preventDefault();

      // Shit Validations

      let valMessages = [];
      let valFailed = false;
      if (!answerTxt || answerTxt.length < 1) {
         valFailed = true;
         valMessages.push('Answer must NOT be Empty');
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
         : createNew(answerTxt);
   };

   return (
      <div>
         <Dialog
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby='form-dialog-title'
            className={classes.Dialog}
         >
            <DialogTitle id='form-dialog-title'>
               {condition} Question
            </DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Question'
                  // type='email'
                  fullWidth
                  value={answerTxt}
                  onChange={handleAnswerChange}
               />
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
                  {condition}
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

export default withStyles(Styles)(AnswerQueryModal);
