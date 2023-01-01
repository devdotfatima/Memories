import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from "react";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'; 
import { useDispatch } from "react-redux";
import {authActions} from '../../reducers/auth';
import {useNavigate}  from 'react-router-dom';
import { signin, signup } from "../../actions/auth";


const Auth=()=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const [isSignup,setIsSignup]=useState(true);
    const navigate = useNavigate();
    const [formData,setFormData]=useState({firstName:'',lastName:'',email:'',password:'',confirmPassword:''})
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup){
            console.log("signup");
            dispatch(signup(formData,navigate));
        } else{
            console.log("signin");
              dispatch(signin(formData,navigate));
        }

        
    }
    const handleChange=(e)=>{
        // console.log(e)
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup);
    }
    const googleSuccess=async(res)=>{
        const decoded=jwt_decode( res?.credential);
        
        // delete Object.assign(decoded, {['token']: decoded['sub'] })['sub'];

        
        dispatch(authActions.AUTH({result:decoded,token:res?.credential}));
        navigate('/');        
    }
    const googleFailure=()=>{
        console.log('failure')
    }
    return (
        <Container component='main' maxWidth='xs'>

           <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant='h5'>{isSignup? 'Sign Up' :'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup &&(
                                <>
                                <Grid item xs={6}  sm={6} >

                                
                                <TextField name="firstName" variant="outlined" required label='First Name' onChange={handleChange}  autoFocus xs={6}/>

                                </Grid>

                                <Grid stretch item xs={6} sm={6}>
                                <TextField name="lastName" variant="outlined" required label='Last Name'  onChange={handleChange}  sm={12} xs={6}/>

                                </Grid>
                                </>)}


                                <Grid  item xs={12} sm={12}>
                                <TextField name="email" variant="outlined" required label='Email Address' fullWidth onChange={handleChange} type='email'  />

                                </Grid>

                                <Grid item xs={6} sm={12}>
                                <TextField name="password" variant="outlined" required label='Password' fullWidth onChange={handleChange} type='password'  />

                                </Grid>

                                {isSignup &&(
                                    <Grid item xs={6} sm={12}>
                                    <TextField name="confirmPassword" variant="outlined" required fullWidth label='Repeat Password' onChange={handleChange} type='password'  />
    
                                    </Grid>

                                )}                
                        
                    </Grid>

                    <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>
                        {isSignup ?'Sign Up':'Sign In'}
                    </Button>

                    <GoogleLogin 
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item >

                            <Button onClick={switchMode}>
                                    {isSignup? 'Already have an account?Sign In':"Dont't have an account? Sign Up" }
                            </Button>
                        </Grid>

                    </Grid>

                </form>

            </Paper> 

        </Container>

    );
}

export default Auth;