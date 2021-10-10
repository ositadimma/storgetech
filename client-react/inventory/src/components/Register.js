import { Grid, TextField, makeStyles, FormControlLabel, FormControl, FormLabel, Button, FormGroup } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {useForm, Form} from './useForm'
import axios from 'axios'



const initialValues={
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
}

const useStyle= makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1)
        },
        margin: '0 auto',
        padding: '40px 0',
    },
    root1:{
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(5)
    },
    root2:{
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(1)
    },
    label:{
        textTransform: 'none'
    }
}))

export default function Register({
    // categoryNameInput, 
    // category, 
    // categories, 
    // recordForEdit,
    // setRecordForEdit,
    // setOpenPopup,
    // getCategories,
    // notify,
    setNotify
}){
    
   
    const [
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    ]= useForm(initialValues)

    const validate=()=>{
        let temp= {};
        temp.firstName= values.firstName?"":"This field is required";
        temp.lastName= values.lastName?"":"This field is required";
        temp.email= values.email?"":"This field is required";
        temp.password1= values.password1?"":"This field is required";
        temp.password2= values.password2==values.password1?"":!values.password2?"This field is required":"Passwords do not match";
        setErrors(
          {
            ...temp
          }
        )
        return Object.values(temp).every(x=>x=="")
    }
    // useEffect(()=>{
    //     if(recordForEdit!=null){
    //         setValues({
    //             ...recordForEdit
    //         })
    //     }
    // }, [recordForEdit])
    const redirect= ()=>{
        window.location.pathname= '/'
    }

    const classes= useStyle();
    const handleSubmit=(e)=>{
        e.preventDefault()
      if(validate()){
                axios.post(
                    'http://localhost:9000/user/api/v1/inventory/user', 
                    {
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: values.email,
                        password: values.password1,
                    }
                )
                .then(res=>{
                    console.log(res)
                    setValues(initialValues)
                    setNotify({
                        isOpen: true,
                        message: "Submitted Successfully",
                        type: "success"
                    });
                    
                })
                .catch(err=>console.log(err))
                redirect()
        }
    } 
    
    

    return(
      <div className='Login'>
        <Form onSubmit={handleSubmit} className={classes.root} autoComplete='off'>
            <Grid container >
                <Grid item xs={12}>
                    <FormGroup>
                    <TextField
                        variant= 'outlined' 
                        label="First name"
                        name='firstName'
                        value={values.firstName}
                        onChange={handleInputChange}
                        {...(errors.firstName && {error:true, helperText: errors.firstName})}
                    />
                    </FormGroup>
                    <FormGroup>
                    <TextField
                        variant= 'outlined'
                        label="Last name"
                        name='lastName'
                        value={values.lastName}
                        onChange={handleInputChange}
                        {...(errors.lastName && {error:true, helperText: errors.lastName})}
                    />
                    </FormGroup>
                    <FormGroup>
                    <TextField
                        type='email'
                        variant= 'outlined'
                        label="Email"
                        name='email'
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error:true, helperText: errors.email})}
                    />
                    </FormGroup>
                    <FormGroup>
                    <TextField
                        variant= 'outlined'
                        type='password'
                        label="Password"
                        name='password1'
                        value={values.password1}
                        onChange={handleInputChange}
                        {...(errors.password1 && {error:true, helperText: errors.password1})}
                    />
                    </FormGroup>
                    <FormGroup>
                    <TextField
                        variant= 'outlined'
                        type='password'
                        label="Re-enter password"
                        name='password2'
                        value={values.password2}
                        onChange={handleInputChange}
                        {...(errors.password2 && {error:true, helperText: errors.password2})}
                    />
                    </FormGroup>
                    <Button
                        variant= 'contained'
                        size= "large"
                        color= "primary"
                        type="submit"
                        classes={{root: classes.root1, label: classes.label}}
                        onClick={handleSubmit}
                    >   
                     Submit
                    </Button>
                    <Button
                        variant= 'contained'
                        size= "large"
                        color= "default"
                        classes={{root: classes.root2, label: classes.label}}
                        onClick={resetForm}
                    >   
                     Reset
                    </Button>
                </Grid>
            </Grid>
        </Form>
      </div>
    )
}

