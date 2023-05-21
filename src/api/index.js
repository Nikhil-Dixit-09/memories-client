import axios from 'axios'
const API=axios.create({baseURL:'http://localhost:8000'})

API.interceptors.request.use((req)=>{
    // var tok=JSON.parse(localStorage.getItem('profile')).token;
    // console.log(tok);
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
// const url='http://localhost:8000'
export const fetchPosts=()=>API.get(`/posts`);
export const createPost=(newPost)=>API.post(`/posts/create`,newPost);
export const updatePost=(id,updated)=>API.patch(`/posts/update/${id}`,updated);
export const deletePost=(id)=>API.delete(`/posts/delete/${id}`);
export const addLike=(id)=>API.patch(`/posts/addLike/${id}`);

export const signin=(formData)=>API.post(`/user/signin`,formData);
export const signup=(formData)=>API.post(`/user/signup`,formData);