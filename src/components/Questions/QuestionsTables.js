import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AnswerQueryModal from './AnswerQueryModal';
import { QueriesContext } from '../../context/QueriesContext';
import { UserContext } from '../../context/UserContext';

const useRowStyles = makeStyles({
   root: {
      '& > *': {
         borderBottom: 'unset',
      },
   },
});

const Row = (props) => {
   const { row } = props;
   const [open, setOpen] = React.useState(false);
   const classes = useRowStyles();
   const [answerIsOPen, setAnswerIsOPen] = useState(false);
   const [currentRow, setCurrentRow] = useState(null);
   const { answerQuery } = useContext(QueriesContext);
   const { user } = useContext(UserContext);

   const getAnswerDialog = (e, el) => {
      setCurrentRow(el);
      toggleAnwerOpen();
   };

   const toggleAnwerOpen = () => {
      setAnswerIsOPen(!answerIsOPen);
   };

   return (
      <React.Fragment>
         <TableRow className={classes.root}>
            <TableCell>
               <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => setOpen(!open)}
               >
                  {open ? (
                     <KeyboardArrowUpIcon />
                  ) : (
                     <KeyboardArrowDownIcon />
                  )}
               </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
               {row.question}
            </TableCell>
            <TableCell align='right'>{row.status}</TableCell>
            <TableCell align='right'>
               {user.role === 'admin' ||
                  (user.role === 'support' && (
                     <>
                        {row.status.toLowerCase() ===
                           'not answered' && (
                           <Button
                              variant='contained'
                              onClick={(e) => getAnswerDialog(e, row)}
                              style={{ curor: 'pointer' }}
                           >
                              Answer
                           </Button>
                        )}
                     </>
                  ))}
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell
               style={{ paddingBottom: 0, paddingTop: 0 }}
               colSpan={6}
            >
               <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box margin={1}>
                     <Typography
                        variant='h6'
                        gutterBottom
                        component='p'
                     >
                        {row.answer}
                     </Typography>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
         <AnswerQueryModal
            isOpen={answerIsOPen}
            closeDialog={toggleAnwerOpen}
            createNew={(answer) => {
               toggleAnwerOpen();
               answerQuery(currentRow._id, answer);
            }}
            condition={'Answer'}
         />
      </React.Fragment>
   );
};

export default function QuestionsTable({ queries }) {
   return (
      <TableContainer component={Paper}>
         <Table aria-label='collapsible table'>
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell>Question</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {queries.map((row) => (
                  <Row key={row.name} row={row} />
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
