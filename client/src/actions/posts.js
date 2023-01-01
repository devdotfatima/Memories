import * as api from '../api/index';
import { postActions } from '../reducers/posts';


export const getPosts=(page)=> async (dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.fetchPosts(page);
        return data;
    }
        try{
            dispatch(postActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);  

            dispatch(postActions.FETCH_ALL(data));
            dispatch(postActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.message);

        }
}

export const getPost=(id)=> async (dispatch)=>{
    console.log(id);
    const sendRequest=async ()=>{
        const {data}=await api.fetchPost(id);
        return data;
    }
        try{
            dispatch(postActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);  

            dispatch(postActions.FETCH_POST(data));
            dispatch(postActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.message);

        }
}


export const getPostsBySearch=(searchQuery)=> async (dispatch)=>{
   
    const sendRequest=async ()=>{
        console.log(searchQuery);
        const {data}=await api.getPostsBySearch(searchQuery);
        
        return data;
    }
        try{
            dispatch(postActions.START_LOADING());
            const data=await sendRequest();
      

            dispatch(postActions.FETCH_BY_SEARCH(data));
            dispatch(postActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.message);

        }
}




export const createPost=(post,navigate)=>async(dispatch)=>{
    console.log("INside create post")
    const sendRequest=async ()=>{
        const {data}=await api.createPost(post);
            // console.log(post)
        return data;
    }

    try {
        const data=await sendRequest();
        navigate(`/posts/${data._id}`);

        dispatch(postActions.CREATE(data));
        
    } catch (error) {
         console.log(error.message);
    }
}


export const updatePost=(id,post)=>async(dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.updatedPost(id,post);
            
        return data;
    }

    try {
        const data=await sendRequest();
        

        dispatch(postActions.UPDATE(data));
        
    } catch (error) {
         console.log(error.message);
    }
}


export const deletePost=(id)=>async(dispatch)=>{
    const sendRequest=async ()=>{
        await api.deletePost(id);            
        
    }
    try {
        await sendRequest();
        
        dispatch(postActions.DELETE(id));
        
    } catch (error) {
         console.log(error.message);
    }
}


export const likePost=(id)=>async(dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.likePost(id);
        return data;          
    }
    try {
        const data=await sendRequest();
        
        dispatch(postActions.UPDATE(data));
        
    } catch (error) {
         console.log(error.message);
    }
}

export const commentPost=(value,id)=>async(dispatch)=>{
    const sendRequest=async ()=>{
        const {data}=await api.comment(value,id);
        return data;          
    }
    try {
        const data=await sendRequest();
        console.log(data);
        
        dispatch(postActions.COMMENT(data));
        return data.comments;
        
    } catch (error) {
         console.log(error.message);
    }
}