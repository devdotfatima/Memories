import * as api from '../api/index';
import { authActions } from '../reducers/auth';


export const signin=(formData,history)=>async(dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.signIn(formData);
        return data;
    }
        try{
            const data=await sendRequest();
            // console.log(data);

            dispatch(authActions.AUTH(data));
            history('/')
        }
        catch(error)
        {
            console.log(error.message);

        }
}

export const signup=(formData,history)=> async (dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.signUp(formData);
        return data;
    }
        try{
            const data=await sendRequest();
            console.log(data);
            dispatch(authActions.AUTH(data));
            history('/')
        }
        catch(error)
        {
            console.log(error.message);

        }
}