import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory()

    const {user, registerUser, isLoading} = useAuth();

    const handleOnBlur =  e => {
        const field = e.target.name
        const value = e.target.value
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        if(loginData.password !== loginData.password2){
            alert('your password did not match')
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history)
        e.preventDefault();
    }
    return (
        <div className="mx-5 mt-3">
        <Typography variant="h3" gutterBottom component="div">
           Please Registration
       </Typography>

        {!isLoading && <form onSubmit={handleLoginSubmit}>
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Your Name"
                   name="name"
                   onBlur={handleOnBlur}
                   variant="standard" />
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Your Email"
                   type= "email"
                   name="email"
                   onBlur={handleOnBlur}
                   variant="standard" />
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Your Password"
                   type= "password"
                   name="password"
                   onBlur={handleOnBlur}
                   variant="standard" />
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="ReType Your Password"
                   type= "password"
                   name="password2"
                   onBlur={handleOnBlur}
                   variant="standard" /><br/>
                   <Button sx={{width: '30%',  m: 1}} type="submit" variant="contained">Register</Button>
                   <br /><br/>
       <p>Already Registered? <Link to="/login"><button className="btn btn-danger">Please Login</button></Link></p>
        </form>}
        {isLoading && <CircularProgress />}
        {user?.email && <Alert severity="success">Account Created Successfully — check it out!</Alert>}
       
   </div>
    );
};

export default Register;