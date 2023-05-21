import * as api from '../api';
export const getPosts=()=>async(dispatch)=>{
    try{    
        const {data}=await api.fetchPosts();
        dispatch({type:'FETCH_ALL',payload: data})
    }catch(err){
        console.log(err.message);
    }
}
export const createPost=(post)=>async(dispatch)=>{
    try{
        const {data}=await api.createPost(post);
        dispatch({type:'CREATE',payload:data});
    }catch(err){
        console.log(err.message);
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
    try{
        const {data}=await api.updatePost(id,post);
        dispatch({type:'UPDATE',payload:data});
    }catch(err){
        console.log(err.message);
    }
}
export const deletePost=(id)=>async(dispatch)=>{
    try{
        const {data}=await api.deletePost(id);
        dispatch({type:'DELETE',payload:data});
    }catch(err){
        console.log(err.message);
    }
}
export const addLike=(id)=>async(dispatch)=>{
    try{
        const {data}=await api.addLike(id);
        dispatch({type:'ADDLIKE',payload:data});
    }catch(err){
        console.log(err.message);
    }
}