import React from 'react'
import './post.css'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import like from '../../../Assets/icons8-facebook-like-skin-type-2-48.png'
import del from '../../../Assets/icons8-delete-document-32.png'
// import edit from '../../../Assets/icons8-pencil-30.png'
import { useDispatch } from 'react-redux'
import { deletePost, addLike } from '../../../actions/posts'
const Post = ({ post, setCurrentId }) => {
    //setCurrentId prop is example of prop drilling
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        console.log(user,'hiiiii')
    }, [location])

    return (
        <>
            <div className='card'>
                <div className='header'>
                    <div className='creator'>
                        <p className='name'>
                            {post.name}
                        </p>

                        <p className='time'>
                            {moment(post.createdAt).fromNow()}
                        </p>
                    </div>
                    {/* {(user?.sub === post?.creator || user?.result?._id===post?.creator) &&(
                        <div className='edit'>
                            <img src={edit} alt="edit" onClick={() => setCurrentId(post._id)} />
                        </div>
                    )
                    } */}

                </div>

                <div className="image">
                    <img src={post.selectedFile} alt="" />
                </div>

                <div class="container">

                    <p>
                        <p className='tags'>
                            {
                                post.tags.map((tag) => `#${tag} `)
                            }
                        </p>
                        <p className='title'>
                            {post.title}
                        </p>
                        <p className='message'>
                            {post.message}
                        </p>
                        <div className='icons'>
                            <div className='like'>
                                <div>
                                    {post.likes.length}
                                </div>
                                <div>
                                    <img src={like} alt="" onClick={() => dispatch(addLike(post._id))} />
                                </div>

                            </div>
                            {(user?.sub === post?.creator || user?.result?._id===post?.creator) &&(
                                <div className='del'>
                                    <img src={del} alt="" onClick={() => dispatch(deletePost(post._id))} />
                                </div>
                            )
                            }


                        </div>
                    </p>
                </div>
            </div>
        </>

    )
}

export default Post
