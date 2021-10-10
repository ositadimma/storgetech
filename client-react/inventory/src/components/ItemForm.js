// import { Grid, TextField, makeStyles, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, Button } from '@material-ui/core';
// import React, {useState} from 'react';
// import {useForm, Form} from './useForm'
// import Input from './controls/Input'

// // import {FormControl, FormLabel} from 'react-bootstrap'


// const initialValues={
//     name: '',
//     category:''
// }

// const useStyle= makeStyles(theme=>({
//     root:{
//         '& .MuiFormControl-root':{
//             width: '80%',
//             margin: theme.spacing(1)
//         }
//     },
//     root1:{
//         margin: theme.spacing(0.5)
//     },
//     label:{
//         textTransform: 'none'
//     }
// }))


// export default function ItemForm({
//     nameInput, 
//     category, 
//     handleInputChange, 
//     categories, 
//     handleSubmit, 
//     errors, 
//     resetForm,
//     recordForEdit
// }){

//     const classes= useStyle();

//     return(
//         <Form>
//             <Grid container>
//                 <Grid item xs={7}>
//                     <Input
//                         label="name"
//                         name='nameInput'
//                         value={nameInput}
//                         onChange={handleInputChange}
//                     />
//                     <div> 
//                         <FormControl>
//                             <FormLabel>
//                                 category
//                             </FormLabel>
//                             <RadioGroup row
//                                 name='category'
//                                 value={category}
//                                 onChange={handleInputChange}
//                             >
//                             {categories.map(category=>( 
//                                 <FormControlLabel key={category.id} value={category.id} control={<Radio/>} label={category.name}/>
//                                 )
//                             )}
//                             </RadioGroup>   
//                         </FormControl>
//                     </div>  
//                     <Button
//                         variant= 'contained'
//                         size= "large"
//                         color= "primary"
//                         type="submit"
//                         classes={{root: classes.root1, label: classes.label}}
//                         onClick={handleSubmit}
//                     >   
//                      Submit
//                     </Button>
//                     <Button
//                         variant= 'contained'
//                         size= "large"
//                         color= "default"
//                         classes={{root: classes.root1, label: classes.label}}
//                         onClick={resetForm}
//                     >   
//                      Reset
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Form>
//     )
// }


import { Grid, TextField, makeStyles, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Input from './controls/Input'
import {useForm, Form} from './useForm'
import axios from 'axios'





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

export default function ItemForm({
    categoryNameInput, 
    // handleInputChange, 
    items, 
    categories,
    // errors, 
    recordForEdit,
    setRecordForEdit,
    setOpenPopup,
    getItems,
    notify,
    setNotify
}){
    
    const initialValues={
        itemName: '',
        category: ''
    }

    const [
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    ]= useForm(initialValues)
    // const [categories, setCategories]= useState(categories)

    const validate=()=>{
        let temp= {};
        temp.itemName= values.itemName?"":"This field is required";
        temp.category= values.category?"":"please select one";
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
                    'http://localhost:9000/item/api/v1/inventory/item', 
                    {
                        name: values.itemName, 
                        itemCategoryId: values.category
                    }
                )
                .then(res=>{
                    console.log(res)
                    setOpenPopup(false)
                    getItems()
                    setRecordForEdit(null)
                    setNotify({
                        isOpen: true,
                        message: "Submitted Successfully",
                        type: "success"
                    })
                })
                .catch(err=>console.log(err))
                
            }else{
                axios.put(`http://localhost:9000/item/api/v1/inventory/item/`,
                    {
                        id: recordForEdit.id,
                        name: values.itemName,
                        itemCategoryId: values.category
                    }
                )
                .then(res=>{console.log(res)
                    setOpenPopup(false)
                    getItems()
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
                        label="Name"
                        name='itemName'
                        value={values.itemName}
                        onChange={handleInputChange}
                        error={errors.itemName}
                    />
                    <div> 
                       <FormControl
                        variant='outlined'
                       >
                           <InputLabel>category</InputLabel>
                           <Select
                            name= 'category'
                            label='category'
                            value= {values.category}
                            onChange= {handleInputChange}
                            error={errors.category}
                           >
                              <MenuItem value="">none</MenuItem> 
                                {
                                    categories.map(
                                        category=>(
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        )
                                    )
                                }
                           </Select>  
                       </FormControl>
                     </div>  
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

