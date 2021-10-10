import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';


const useStyles= makeStyles(theme=>({
    dialog:{
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction:{
        justifyContent: 'center'
    },
    titleIcon:{
        backgroundColor: '#ffe7ea',
        color: theme.palette.secondary.main,
        '&:hover':{
            backgroundColor: theme.palette.secondary.light,
            cursor:'default'
        },
        '& .MuiSvgIcon-root':{
            fontSize:'8rem'
        }
    }
}))

export default function ConfirmDialog(props){

    const classes= useStyles()

    const { confirmDialog, setConfirmDialog}= props
    return(
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    variant="contained"
                    color="default"
                    onClick={()=>setConfirmDialog({...ConfirmDialog, isOpen: false})}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
)
}