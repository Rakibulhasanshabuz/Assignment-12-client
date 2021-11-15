import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const {user, loginUser, signInUsingGoogle, isLoading} = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnChange =  e => {
        const field = e.target.name
        const value = e.target.value
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
       loginUser(loginData.email, loginData.password, location, history );
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInUsingGoogle(location, history)
    }
    return (
        <div className="mx-5 mt-3">
             <Typography variant="h3" gutterBottom component="div">
                Please Login
            </Typography>

             <form onSubmit={handleLoginSubmit}>
                 <TextField 
                        sx={{width: '50%',  m: 1}}
                        id="standard-basic" 
                        label="Your Email"
                        type= "email"
                        name="email"
                        onChange={handleOnChange}
                        variant="standard" />
                 <TextField 
                        sx={{width: '50%',  m: 1}}
                        id="standard-basic" 
                        label="Your Password"
                        type= "password"
                        name="password"
                        onChange={handleOnChange}
                        variant="standard" /><br/>
                        <Button sx={{width: '30%',  m: 1}} type="submit" variant="contained">Login</Button>
                        <br /><br />
            <p>New to This Site? <Link to="/register"><button className="btn btn-danger">Create Account</button></Link></p>
            {isLoading && <CircularProgress />}
        {user?.email && <Alert severity="success">Login Successfully</Alert>}
             </form>
             <div>----------OR----------</div>
        <br />

            <button onClick={handleGoogleSignIn} className="btn btn-warning mb-5"><i className="fab fa-google"></i> Google sign In</button>
           
        </div>
    );
};

export default Login;