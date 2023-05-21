import React, { useState,useEffect } from 'react'
import './form.css'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost,updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'
const Form = ({currentId,setCurrentId}) => {
    const dispatch = useDispatch();
    const post=useSelector((state)=>currentId ? state.posts.find((p)=>p._id===currentId):null);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        name: ''
    });
    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post])
    const user=JSON.parse(localStorage.getItem('profile'));
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData));
        }else{
            let x=user?.result?.name;
            if(x===undefined){
                x=user.givenName+" "+user.lastName;
            }
            dispatch(createPost({ ...postData, name: x}));
        }
        setCurrentId(null);
        setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        name: ''
    })
    }
    const clear = (e) => {
        e.preventDefault();
        setCurrentId(null);
        setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''})
    }
    return (
        <>
            {user==null && 
                <div className='popup'>
                    Please login to create memories
                </div>
            }
            {
                user!=null && 
                <div className='form'>
                <h1>
                    {currentId? 'Editing':'Creating'} a Memory!!
                </h1>
                <div className='hi'>
                    <form action="" autoComplete='off' onSubmit={handleSubmit}>
                        <h6>Title</h6>
                        <input type="text" name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        <h6>Message</h6>
                        <input type="text" name='message' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                        <h6>Tags</h6>
                        <input type="text" name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                        <div className='file'>
                            <h6>File</h6>
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                        </div>
                        <div className='submit'>
                            <input type="submit" value="submit" />
                            <button onClick={clear} >Clear</button>
                        </div>

                    </form>
                </div>
            </div>

            }
            
        </>

    )
}

export default Form
