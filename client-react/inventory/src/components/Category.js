import React, {useState} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import useTable from './useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from './Popup'
import CategoryForm from './CategoryForm'
import Notification from './Notification'
import { Paper, makeStyles, Button, TableCell, TableBody, TableRow, TableHead } from '@material-ui/core';
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
    {id:'name', label: 'Category'},
    {id:'status', label: 'Status'},
    {id: 'actions', label: 'Actions'}
]

const Category= ({
                clickPopup, 
                categoryNameInput, 
                handleInputChange, 
                categories, 
                handleSubmit,
                errors,
                getCategories,
                closePopup
              })=>{
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }= useTable(categories, headCells);
    const classes= useStyle()

    const title= 'Items'
    const [recordForEdit, setRecordForEdit]= useState(null);
    const [openPopup, setOpenPopup]= useState(false);
    const [notify, setNotify]= useState({isOpen: false, message: '', type: ''});
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})

    const openInPopup= category=>{
        setRecordForEdit(category);
        setOpenPopup(true)
    }

    const onDelete= id=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        axios.delete('http://localhost:9000/item/api/v1/inventory/item_category', {data:{id: id}})
        .then(response=>{
            console.log(response)
            getCategories()
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    
    return (
        <div className='item-div'>
            <h1>Manage Categories</h1>
            <Button 
                variant='contained'
                size= "large"
                color= "primary" 
                onClick={()=>setOpenPopup(true)}
            >
                Add new
            </Button>
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody className={classes.tBody}>
                        {
                            recordsAfterPagingAndSorting().map(category=>
                                (<TableRow key={category.id}>
                                    <TableCell>
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.status==1?'active':'inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <span>
                                            <button color="primary" onClick={()=>openInPopup(category)}>
                                                <EditIcon/>
                                            </button>
                                            <button 
                                                onClick={()=>{
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to delete?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: ()=>{onDelete(category.id)} 
                                                    })
                                                }} 
                                                color="secondary"
                                            >
                                                <DeleteIcon/>
                                            </button>
                                        </span>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup
                title="Category Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setRecordForEdit={setRecordForEdit}
                recordForEdit={recordForEdit}
            >
                <CategoryForm
                    notify={notify}
                    setNotify={setNotify}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    getCategories={getCategories}
                    handleInputChange={handleInputChange}
                    categories={categories}
                    handleSubmit={handleSubmit}
                    errors={errors}    
                    setRecordForEdit={setRecordForEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
              confirmDialog= {confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
        </div>   
    );
};

export default Category;
