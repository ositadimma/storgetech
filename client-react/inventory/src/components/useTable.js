import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import {React, useState} from 'react'
import '../App.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


// import MaterialTable from 'react'


const useStyles= makeStyles(theme=>({
    table: {
        marginTop: theme.spacing(1),
        '& thead th': {
            fontWeight: '600',
            color: 'black',
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    },
    tableHead:{
        fontWeight: '600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    }
}))



// export default Table;
export default  function useTable(records, headCells){
    const classes= useStyles();
    // const headCells=[
    //     {id:'name', label: 'Item Category'},
    //     {id:'status', label: 'status'}
    // ]
    const TblContainer= props=>(
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const pages=[5, 15, 25]
    const [page, setPage]= useState(0)
    const [rowsPerPage, setRowsPerPage]=useState(pages[page]) 

    const hCP= (event, newPage)=>{
        setPage(newPage)
    }
    const handle= (event)=>{
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const TblHead= props=>{
        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell=>(
                            <TableCell key={headCell.id}>
                                {headCell.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }
    
    
    const TblPagination=()=>(
        <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onChangePage={hCP}
            onChangeRowsPerPage={handle}
        />
    )
    const recordsAfterPagingAndSorting=()=>{
        return records.slice(page*rowsPerPage,(page+1)*rowsPerPage )
    }
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}

