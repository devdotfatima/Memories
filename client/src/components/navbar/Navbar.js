import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core';
import useStyles from './styles';

import memoriesLogo from '../../Images/memories-Logo.png';
import memoriesText from '../../Images/memories-Text.png';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../reducers/auth';
import decode from 'jwt-decode';


const Navbar=()=>{

    const classes=useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const token=user?.token;
        //JWT
        if(token){
            // console.log(token);
           const decodedToken=decode(token);
            // console.log(decodedToken);
            
            // console.log(decodedToken.exp*1000);
            // console.log(new Date().getTime());
           if(decodedToken.exp*1000<new Date().getTime()){
            logout();
           }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    const logout=()=>{
        dispatch(authActions.LOGOUT());
        console.log('dispatching logout')
        navigate('/auth');
        setUser(null);
        
    }
    // console.log(user?.result.name)
    return (

        <AppBar className={classes.appBar} position="static" color="inherit">

            <Link to='/' className={classes.brandContainer}>

                <img src={memoriesText} alt='icon' height='45px' />
                <img className={classes.image} src={memoriesLogo} alt='memories' height='40px'/>

            </Link>

            <Toolbar className={classes.toolbar}>
                {user?(
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}> {user.result.name.charAt(0)}</Avatar>

                            <Typography className={classes.userName} variant='h6'>
                                {user.result.name}
                            </Typography>
                            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
                                Logout
                            </Button>



                         </div>
                ):(
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                    Sign In
                </Button>
                )}

            </Toolbar>
            
        
    </AppBar>
    );
}

export default Navbar;