import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import postSlice from'./posts';

const store=configureStore({
    reducer:{
        posts:postSlice.reducer,
        auth:authSlice.reducer,
       
    }
});



export default store;