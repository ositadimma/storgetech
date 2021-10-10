// import React, {useState} from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Pagination from '../pagination'
// import useTable from './useTable';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Popup from './Popup'
// import ItemForm from './ItemForm'
// import { Paper, makeStyles, Button } from '@material-ui/core';


// const useStyle= makeStyles(theme=>({
//     pageContent:{
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     }
// }))

// const Items= ({
//                 items, 
//                 clickPopup, 
//                 nameInput, 
//                 category, 
//                 handleInputChange, 
//                 categories, 
//                 handleSubmit,
//                 errors,
//                 resetForm,
//                 openPopup,
//                 closePopup,
//                 recordForEdit
//               })=>{
//     const classes= useStyle()
//     const title= 'Items'
//     const columns= [
//         {
//            title: 'Name',
//            field: 'name'
    
//         },
//         {
//             title: 'Category',
//             field: 'categoryName'
     
//         },
//         {
//             title: 'Action',
//             field: 'internal_action',
//             editable: 'false',
//             render: (rowData)=>
//               rowData && (
//                   <span>
//                       <button >
//                           <EditIcon/>
//                       </button>
//                       <button >
//                           <DeleteIcon/>
//                       </button>
//                   </span>
                  
                      
//               )
//         }
//     ]

    
//     return (
//         <div className='item-div'>
//             <h1>Manage Items</h1>
//             <Button 
//                 variant='contained'
//                 size= "large"
//                 color= "primary" 
//                 onClick={clickPopup}
//             >
//                 Add new
//             </Button>
//             {/* <Table data={items} columns={columns} title={title}/> */}
//             <Popup
//                 title="Item Form"
//                 openPopup={openPopup}
//                 closePopup={closePopup}
//                 recordForEdit={recordForEdit}
//             >
//                 <ItemForm
//                     title="Item Form"
//                     openPopup={openPopup}
//                     nameInput={nameInput}
//                     category={category}
//                     handleInputChange={handleInputChange}
//                     categories={categories}
//                     handleSubmit={handleSubmit}
//                     resetForm={resetForm}
//                     errors={errors}    
//                     closePopup={closePopup}
//                     recordForEdit={recordForEdit}
//                 />
//             </Popup>
//         </div>   
//     );
// };

// export default Items;





















import React, {useState} from 'react';
import axios from 'axios';
import useTable from './useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from './Popup'
import ItemForm from './ItemForm'
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
    {id:'name', label: 'Name'},
    {id:'category', label: 'Category'},
    {id:'status', label: 'Status'},
    {id: 'actions', label: 'Actions'}
]

const Items= ({ 
                handleInputChange, 
                items, 
                errors,
                getItems,
                categories
              })=>{
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }= useTable(items, headCells);
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
        axios.delete('http://localhost:9000/item/api/v1/inventory/item', {data:{id: id}})
        .then(response=>{
            console.log(response)
            getItems()
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    
    // const handleCategorySubmit=
    return (
        <div className='item-div'>
            <h1>Manage Items</h1>
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
                            recordsAfterPagingAndSorting().map(item=>
                                (<TableRow key={item.id}>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.categoryName}
                                    </TableCell>
                                    <TableCell>
                                        {item.status==1?'active':'inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <span>
                                            <button color="primary" onClick={()=>openInPopup(item)}>
                                                <EditIcon/>
                                            </button>
                                            <button 
                                                onClick={()=>{
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to delete?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: ()=>{onDelete(item.id)} 
                                                    })
                                                    // onDelete(category.id)
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
                title="Item Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setRecordForEdit={setRecordForEdit}
                recordForEdit={recordForEdit}
            >
                <ItemForm
                    notify={notify}
                    setNotify={setNotify}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    getItems={getItems}
                    handleInputChange={handleInputChange}
                    items={items}
                    categories={categories}
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

export default Items;
