import React from 'react';
import {Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button} from '@material-ui/core';

export default function Popup({openPopup, children, title, setOpenPopup, recordForEdit, setRecordForEdit}){
        
        const useStyle= makeStyles(theme=>({
            dialogWrapper:{
                padding: theme.spacing(2),
                position: 'absolute',
                top: theme.spacing(5)
            },
            dialogTitle:{
                paddingRight:"0px"
            },
            root:{
                minWidth: 0,
                margin: theme.spacing(0.5)
            },
            secondary:{
                backgroundColor: theme.palette.secondary.light,
                '& .MuiButton-label': {
                    color: theme.palette.secondary.main
                }
            },
            primary:{
                backgroundColor: theme.palette.primary.light,
                '& .MuiButton-label': {
                    color: theme.palette.primary.main
                }
            }
        }))

        const classes= useStyle()
        
        return(
                <Dialog open={openPopup} fullWidth classes={{paper: classes.dialogWrapper}}>
                    <DialogTitle className={classes.dialogTitle}>
                        <div style={{display: 'flex'}}>
                            <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                                {title}
                            </Typography>
                            <Button
                                className={`${classes.root} ${classes.backgroundColor}`}
                                onClick={()=>{setOpenPopup(false); setRecordForEdit(null)}}
                                color= "secondary"
                                variant="outlined"
                            >
                                X
                            </Button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {children}
                    </DialogContent>
                </Dialog>
        )
}