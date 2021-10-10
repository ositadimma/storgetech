import React, {useState} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import useTable from './useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from './Popup'
import CategoryForm from './CategoryForm'
import Notification from './Notification'
import { Paper, makeStyles, Button, TableCell, TableBody, TableRow, TableHead, useRadioGroup } from '@material-ui/core';
import ConfirmDialog from './ConfirmDialog'


const useStyle= makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    tableHead:{
        fontWeight: '600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(10)
    },
    tBody: {
        fontWeight: '300'
    },
}))

const headCells=[
    {id:'firstname', label: 'Firstname'},
    {id: 'lastname', label: 'Lastname'}, 
]

const Users= ({
                users
              })=>{
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }= useTable(users, headCells);
    const classes= useStyle()

    
    return (
        <div className='item-div'>
            <h1>Users</h1>
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody className={classes.tBody}>
                        {
                            recordsAfterPagingAndSorting().map(user=>
                                (<TableRow key={user.id}>
                                    <TableCell>
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {user.lastName}
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
        </div>   
    );
};

export default Users;
