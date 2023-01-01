import { createSlice } from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{authData:null,},
    reducers:{
        AUTH(state,action){
            state.authData=action?.payload;
            localStorage.setItem('profile',JSON.stringify({...action?.payload}))
            // console.log(action.payload);

        },
        LOGOUT(state,action){
            localStorage.clear();
            state.authData=null;
        },  
    }

});

export const authActions=authSlice.actions;
export default authSlice;