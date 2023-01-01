import React from "react";
import {Container} from '@material-ui/core';
import Navbar from "./components/navbar/Navbar";
import {   Routes,BrowserRouter,Route,Navigate} from 'react-router-dom';
import Home from "./components/home/Home";
import Auth from './components/auth/Auth';
import {GoogleOAuthProvider} from '@react-oauth/google'
import PostDetails from "./components/postDetails/PostDetails";

const App = () => {
    const user=JSON.parse(localStorage.getItem('profile'));
        
    return (
     <GoogleOAuthProvider clientId='38843875142-sg8qdgce93aqu5s5esm06erolk92bg89.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxidth='xl'>
                <Navbar/>
            
                        <Routes>
                            <Route path="/" element={<Navigate to='/posts' />} />
                            <Route path='/posts' exact  element={<Home/>} />
                            <Route path='/posts/search' exact  element={<Home/>} />
                            <Route path='/posts/:id' exact  element={<PostDetails/>} />
                            <Route path="/auth" element={!user? <Auth/>: <Navigate to='/posts' />} />
                        </Routes>
                    </Container>
            </BrowserRouter>
    </GoogleOAuthProvider>   
        
        
       
    )
}

export default App;