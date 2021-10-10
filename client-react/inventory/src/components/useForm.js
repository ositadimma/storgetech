import {React, useState} from 'react';
import { Grid, TextField, makeStyles, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, Button } from '@material-ui/core';


const useStyle= makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1)
        }
    },
    root1:{
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform: 'none'
    }
}))

export function useForm(initialValues){

    const [values, setValues]= useState(initialValues)
    const [errors, setErrors]= useState({})
    const handleInputChange=(e)=>{
        const{name, value}= e.target
        setValues({
            ...values,
            [name]: value
        })
    }
   
    const resetForm=()=>{
        setValues(initialValues)
        setErrors({})
    }
    

    return [
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    ]
    
}

export function Form(props){
    
    const classes= useStyle();
    const{children, ...other}= props

    return(
        <form className={classes.root} autoComplete='off' {...other}>
            {props.children}
        </form>
    )
    
}
