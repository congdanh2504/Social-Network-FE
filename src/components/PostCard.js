import React, { useEffect, useState } from 'react'
import defaultAvt from '../assets/images/defaultAvt.png'
import TimeAgo from 'javascript-time-ago'
import { Link } from 'react-router-dom';
import { getUser } from '../service/common';
import { comment, likePost, unlikePost } from '../service/userService/userApi';
import { getPostById } from '../service/postService/postApi';
import { Dropdown, Image, Menu } from 'antd';
import Comment from './common/Comment';

export default function PostCard({ post }) {

    const user = getUser();
    const [like, setLike] = useState(false);
    const [dynamicPost, setDynamicPost] = useState(null)
    const [commentText, setCommentText] = useState("")
    const [colorSendButton, setColorSendButton] = useState(false)

    useEffect(() => {
        if (post.likeUsers.filter(e => e.username == user.username).length > 0) {
            setLike(true)
        } else {
            setLike(false)
        }
        getPost()
    }, [])

    const getPost = async () => {
        const res = await getPostById(post.id);
        setDynamicPost(res)
    }

    const getTimeAgo = () => {
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(new Date(post.create_date))
    }

    const likeHandle = async () => {
        if (like) {
            await unlikePost(post.id);
        } else {
            await likePost(post.id);
        }
        await getPost()
        setLike(!like)
    }

    const onMenuClick = (e) => {
        console.log('click', e);
    };

    const commentCount = (comments) => {
        let count = 0;
        comments.forEach((comment) => {
            count += commentCount(comment.children);
            ++count;
        })
        return count;
    }

    const inputOnchange = (e) => {
        setCommentText(e.target.value)
        e.target.value.length > 0 ? setColorSendButton(true) : setColorSendButton(false)
    }

    const submitComment = async (e) => {
        e.preventDefault();
        await comment(post.id, commentText);
        await getPost();
        setCommentText("");
        setColorSendButton(false);
    }

    const menu = (
        <Menu
            onClick={onMenuClick}
            items={[
                {
                    key: '1',
                    label: 'Edit post',
                },
                {
                    key: '2',
                    label: 'Delete post',
                }
            ]}
        />
    );

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg my-4 ">
            <div className="flex w-full items-start">
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center p-3">
                        <div className='flex'>
                            <Link to={`/user/${post.user.username}`} ><img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.user.avt ? post.user.avt : defaultAvt} alt="avatar" /></Link>
                            <div>
                                <Link to={`/user/${post.user.username}`} ><h2 className="text-lg font-semibold text-gray-900 m-0 hover:underline">{`${post.user.firstName} ${post.user.lastName}`}</h2></Link>
                                <small className="text-sm text-gray-700">{getTimeAgo()}</small>
                            </div>
                        </div>
                        {
                            user.username == post.user.username && <Dropdown.Button size='middle' style={{border:'none'}} overlay={menu}></Dropdown.Button>
                        }
                        
                    </div>
                    <p className=" text-gray-700 text-sm px-3">
                        {post.title}
                    </p>
                    <div >
                        {post.images && post.images.map((image) =>
                            <Image src={image.url} />
                        )}
                    </div>

                </div>
            </div>
            <div className='flex flex-row items-center mb-2'>
                <div className="flex items-center">
                    <div className="flex mr-2 text-gray-700 text-sm" />
                    {
                        like ? <svg onClick={likeHandle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                        </svg> : <svg onClick={likeHandle} fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>

                    }
                    <span>{dynamicPost && dynamicPost.likeUsers.length}</span>
                </div>
                <div className="flex mr-2 text-gray-700 text-sm" />
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>{dynamicPost && commentCount(dynamicPost.comments)}</span>
            </div>
            
            <div class="antialiased mx-auto w-full p-[12px]">
                <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
                {dynamicPost && dynamicPost.comments.map((comment) => <Comment key={comment.id} comment={comment} getPost={getPost}/>)}
                <form className='flex relative items-center justify-center mt-[12px]'>
                    <input
                        value={commentText}
                        type="text"
                        placeholder="Enter your comment"
                        className="block flex-1 p-[12px] w-full bg-gray-200 rounded-full outline-none focus:text-gray-700"
                        onChange={inputOnchange}
                    />
                    <button onClick={submitComment} disabled={!colorSendButton} className='w-[30px] h-[30px] absolute right-2'>
                        <svg class="w-6 h-6 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill={colorSendButton ? "#1890ff" : "currentColor"}>
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
