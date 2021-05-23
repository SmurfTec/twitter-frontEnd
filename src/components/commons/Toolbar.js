import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
   Box,
   Button,
   Card,
   CardContent,
   TextField,
   InputAdornment,
   SvgIcon,
   makeStyles,
   IconButton,
} from '@material-ui/core';
import {
   Search as SearchIcon,
   Filter as FilterIcon,
   Trash2,
   UserPlus as UserAddIcon,
} from 'react-feather';
import { genMediaQuery } from '../../utils/mediaStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AnswerQueryModal from '../Questions/AnswerQueryModal';
import { QueriesContext } from '../../context/QueriesContext';

const useStyles = makeStyles((theme) => ({
   root: {},
   importButton: {
      marginRight: theme.spacing(1),
   },
   exportButton: {
      marginRight: theme.spacing(1),
   },
   ToolbarBtns: {
      '& svg': {
         marginLeft: 10,
      },
   },
   SearchBox: {
      '& .MuiFormControl-root': {
         maxWidth: 500,
         [genMediaQuery('xs')]: {
            marginBottom: 20,
         },
      },
   },
}));

const Toolbar = ({
   className,
   searchResults,
   handleDelete,
   selectedUserIds,
   toggleFilter,
   addUser,
   user,
   ...rest
}) => {
   const classes = useStyles();
   const [questionIsOpen, setQuestionIsOPen] = useState(false);
   const { addNewQuery } = useContext(QueriesContext);

   const getQuestionDilog = (e, el) => {
      toggleQuestionOpen();
   };

   const toggleQuestionOpen = () => {
      setQuestionIsOPen(!questionIsOpen);
   };

   const [state, setState] = useState({
      searchTxt: '',
   });

   const hanldeTxtChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value,
      });
      searchResults(e.target.value);
   };

   return (
      <div className={clsx(classes.root, className)} {...rest}>
         <Box display='flex' justifyContent='flex-end'>
            <Button
               color='primary'
               variant='contained'
               className={`${classes.exportButton} ${classes.ToolbarBtns}`}
               onClick={toggleFilter}
            >
               Filter
               <FilterIcon />
            </Button>
            {addUser && (
               <Button
                  color='primary'
                  variant='contained'
                  className={classes.ToolbarBtns}
                  onClick={addUser}
               >
                  Add Support
                  <UserAddIcon />
               </Button>
            )}
         </Box>
         <Box mt={3}>
            <Card>
               <CardContent>
                  <Box
                     display='flex'
                     justifyContent='space-between'
                     alignItems='center'
                     flexWrap='wrap'
                     className={classes.SearchBox}
                  >
                     <TextField
                        fullWidth
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position='start'>
                                 <SvgIcon
                                    fontSize='small'
                                    color='action'
                                 >
                                    <SearchIcon />
                                 </SvgIcon>
                              </InputAdornment>
                           ),
                        }}
                        placeholder='Search ...'
                        variant='outlined'
                        value={state.searchTxt}
                        onChange={hanldeTxtChange}
                        name='searchTxt'
                     />
                     {user && user.role === 'user' && (
                        <Button
                           variant='contained'
                           className={`${classes.deleteBtn} ${classes.ToolbarBtns}`}
                           onClick={toggleQuestionOpen}
                           color='primary'
                        >
                           Ask New Question
                           <AddCircleIcon />
                        </Button>
                     )}
                     {selectedUserIds && selectedUserIds.length > 0 && (
                        <Button
                           style={{
                              backgroundColor: '#ee6350',
                              color: '#fff',
                           }}
                           variant='contained'
                           className={`${classes.deleteBtn} ${classes.ToolbarBtns}`}
                           onClick={handleDelete}
                        >
                           Delete
                           <Trash2 />
                        </Button>
                     )}
                  </Box>
               </CardContent>
            </Card>
         </Box>

         <AnswerQueryModal
            isOpen={questionIsOpen}
            closeDialog={toggleQuestionOpen}
            createNew={addNewQuery}
            condition={'Ask'}
         />
      </div>
   );
};

Toolbar.propTypes = {
   className: PropTypes.string,
};

export default Toolbar;
