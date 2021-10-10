import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Button, FormGroup, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import axios from "axios";


const useStyle= makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1)
        },
        '& .form-label':{
            marginLeft:"10px",
            fontSize: "16px"
        },
    },
    root1:{
        width: '80%',
        top: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        margin: theme.spacing(1)
    },
    label:{
        textTransform: 'none',
        fontSize: "12px",
        paddingTop: theme.spacing(1.5),
        marginLeft: theme.spacing(9)
    },
    link:{
        color: theme.palette.primary.main,
        cursor: 'pointer'
    }
}))

export default function Login(props) {
  const classes= useStyle()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const validateUser= (response)=>{
    let temp= {};
    temp.user= response.id?"":"Invalid email or password";
    setErrors(
        {
        ...temp
        }
    )
    return Object.values(temp).every(x=>x=="")
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(validateForm()){
        axios.post(
            'http://localhost:9000/user/api/v1/inventory/login', 
            {
                email: email,
                password: password,
            }
        )
        .then(res=>{
            props.setUserData(res.data);
            
            if(validateUser(res.data)){
                window.location.pathname= '/dashboard';

                

                console.log(props.userData)
            }
            
            
        })
        .then(()=>{
            
        })
        .catch(err=>console.log(err))
          
    }
  }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
                <Grid xs={15} >
                        <Form.Group controlId="email">
                            <Form.Label >Email</Form.Label>
                            <TextField
                                autoFocus
                                variant="outlined"
                                size="lg"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <TextField
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                {...(errors.user && {error:true, helperText: errors.user})}
                            />
                        </Form.Group>
                        <FormGroup>
                        <Button variant="contained" className={classes.root1} type="submit" disabled={!validateForm()}>
                            Login
                        </Button>
                        </FormGroup>   
                </Grid>
                <Typography className={classes.label}>
                    Not a user yet? <a className={classes.link} onClick={()=>{window.location.pathname='/Register'}}>Register</a>
                </Typography> 
            </Form>  
            
        </div>
    )
    
}

