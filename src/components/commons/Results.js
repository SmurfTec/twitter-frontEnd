import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
   Avatar,
   Box,
   Card,
   Checkbox,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
   makeStyles,
   Button,
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import { UserContext } from '../../context/UserContext';
const useStyles = makeStyles((theme) => ({
   root: {},
   avatar: {
      marginRight: theme.spacing(2),
      backgroundColor: '#0D8ABC',
      color: '#fff',
   },
}));

const Results = ({
   className,
   //   customers,
   selectedUserIds,
   setSelectedUserIds,
   users,
   ...rest
}) => {
   const classes = useStyles();
   // const [selectedUserIds, setSelectedUserIds] = useState([]);

   const handleSelectOne = (event, id) => {
      if (selectedUserIds.length === 0) setSelectedUserIds([id]);
      else if (selectedUserIds[0] === id) setSelectedUserIds([]);
      else setSelectedUserIds([id]);
   };

   return (
      <Card className={clsx(classes.root, className)} {...rest}>
         <PerfectScrollbar>
            <Box minWidth={1050}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell padding='checkbox'></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                     </TableRow>
                  </TableHead>
                  {users && users.length > 0 && (
                     <TableBody>
                        {users.map((user) => (
                           <TableRow
                              hover
                              key={user._id}
                              selected={
                                 selectedUserIds &&
                                 selectedUserIds.indexOf(user._id) !==
                                    -1
                              }
                           >
                              <TableCell padding='checkbox'>
                                 <Checkbox
                                    checked={
                                       selectedUserIds &&
                                       selectedUserIds.indexOf(
                                          user._id
                                       ) !== -1
                                    }
                                    onChange={(event) =>
                                       handleSelectOne(
                                          event,
                                          user._id
                                       )
                                    }
                                    value='true'
                                 />
                              </TableCell>
                              <TableCell>
                                 <Box
                                    alignItems='center'
                                    display='flex'
                                 >
                                    <Avatar
                                       className={classes.avatar}
                                       src={
                                          user.avatar ||
                                          `https://ui-avatars.com/api/?background=rgb(21,%20172,%2089)&color=fff&name=${user.username}`
                                       }
                                    >
                                       {getInitials(user.name)}
                                    </Avatar>
                                    <Typography
                                       color='textPrimary'
                                       variant='body1'
                                    >
                                       {user.username}
                                    </Typography>
                                 </Box>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  )}
               </Table>
            </Box>
         </PerfectScrollbar>
      </Card>
   );
};

export default Results;
