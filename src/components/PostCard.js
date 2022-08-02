import React, { useEffect, useState } from 'react'
import defaultAvt from '../assets/images/defaultAvt.png'
import TimeAgo from 'javascript-time-ago'
import { Link } from 'react-router-dom';
import { getUser } from '../service/common';
import { comment, likePost, unlikePost } from '../service/userService/userApi';
import { getPostById } from '../service/postService/postApi';
import { Divider, Dropdown, Image, Menu } from 'antd';
import Comment from './common/Comment';
import CommentBox from './common/CommentBox';

export default function PostCard({ post }) {

    const user = getUser();
    const [like, setLike] = useState(false);
    const [dynamicPost, setDynamicPost] = useState(null)
    const [commentText, setCommentText] = useState("")
    const [colorSendButton, setColorSendButton] = useState(false)
    const [showComment, setShowComment] = useState(false)

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
                            user.username == post.user.username && <Dropdown.Button size='large' className='outline-none' overlay={menu}></Dropdown.Button>
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
            <span className='px-[12px]'>{dynamicPost && dynamicPost.likeUsers.length} peoples like this</span>
            <Divider style={{ margin: 4 }} />
            <div className='flex px-[12px] flex-row items-center'>
                <div className='flex justify-evenly w-full'>
                    <div className="flex items-center cursor-pointer">
                        {
                            like ? <div onClick={likeHandle} className="flex gap-[10px] mr-2 text-gray-700 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1890ff" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                </svg>
                                <span className={`${like ? "text-[#1890ff]" : " "} text-[16px] font-[400]`}>Like</span>
                            </div> : <div onClick={likeHandle} className="flex gap-[10px] mr-2 text-gray-700 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                </svg>
                                <span className={`${like ? "text-[gray]" : " "} text-[16px] font-[400]`}>Like</span>
                            </div>
                        }
                    </div>
                    <div className='flex gap-[10px] cursor-pointer items-center '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                        </svg>
                        <span className='text-[16px] font-[400]'>Comment</span>
                    </div>
                    <div className='flex gap-[10px] cursor-pointer items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                        <span className='text-[16px] font-[400]'>Share</span>
                    </div>
                </div>
            </div >
            <Divider style={{ margin: 4 }} />
            <div class="antialiased mx-auto w-full p-[12px]">
                {
                    dynamicPost && dynamicPost.comments.length > 0 && (showComment ? <div onClick={() => setShowComment(false)} class="text-sm text-gray-900 font-semibold hover:underline hover:cursor-pointer"> Hide comments</div>
                    : <div onClick={() => setShowComment(true)} class="text-sm text-gray-900 font-semibold hover:underline hover:cursor-pointer"> Show comments</div>)
                }
                {/* <CommentBox/> */}
                
                {showComment && dynamicPost && dynamicPost.comments.map((comment) => <Comment key={comment.id} comment={comment} getPost={getPost} odd={true}/>)}
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
        </div >
    )
}
