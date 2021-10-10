import { Grid, TextField, makeStyles, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, Button } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Input from './controls/Input'
import {useForm, Form} from './useForm'
import axios from 'axios'



const initialValues={
    id: 0,
    name: ''
}

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

export default function CategoryForm({
    categoryNameInput, 
    category, 
    categories, 
    recordForEdit,
    setRecordForEdit,
    setOpenPopup,
    getCategories,
    notify,
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
        temp.name= values.name?"":"This field is required";
        setErrors(
          {
            ...temp
          }
        )
        return Object.values(temp).every(x=>x=="")
    }
    useEffect(()=>{
        if(recordForEdit!=null){
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    const classes= useStyle();
    const handleSubmit=(e)=>{
        e.preventDefault()
      if(validate()){
            if(!recordForEdit){
                axios.post(
                    'http://localhost:9000/item/api/v1/inventory/item_category', 
                    {
                    name: values.name, 
                    }
                )
                .then(res=>{
                    console.log(res)
                    setOpenPopup(false)
                    getCategories()
                    setRecordForEdit(null)
                    setNotify({
                        isOpen: true,
                        message: "Submitted Successfully",
                        type: "success"
                    })
                })
                .catch(err=>console.log(err))
                
            }else{
                axios.put(`http://localhost:9000/item/api/v1/inventory/item_category/`,
                    {
                        id: recordForEdit.id,
                        name: values.name,
                    }
                )
                .then(res=>{console.log(res)
                    setOpenPopup(false)
                    getCategories()
                    setRecordForEdit(null)
                    setNotify({
                        isOpen: true,
                        message: "Submitted Successfully",
                        type: "success"
                    })
                })
                .catch(err=>console.log(err))
                
            }
        
        }
    } 
    
    

    return(
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>
                    <Input
                        label="name"
                        name='name'
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
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
                        classes={{root: classes.root1, label: classes.label}}
                        onClick={resetForm}
                    >   
                     Reset
                    </Button>
                </Grid>
            </Grid>
        </Form>
    )
}

