import React from 'react'
import Posts from '../Posts/posts'
import Form from '../Form/form'
import {useState,useEffect} from 'react'

import { getPosts } from '../../actions/posts';
import { useDispatch } from 'react-redux';
const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch])
  return (
            <div className='app'>
                <div className='Posts'>
                    <Posts setCurrentId={setCurrentId}/> 
                </div>
                <div className='Form'>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
            </div>
  )
}

export default Home
