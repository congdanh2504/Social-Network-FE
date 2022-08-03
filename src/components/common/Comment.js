import React, { useState } from 'react'
import TimeAgo from 'javascript-time-ago'
import defaultAvt from '../../assets/images/defaultAvt.png'
import { replyComment } from '../../service/userService/userApi'
import { Link } from 'react-router-dom'

function Comment({comment, getPost, odd}) {
    
    const getTimeAgo = (create_date) => {
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(new Date(create_date))
    }
    const [showInputComment, setShowInputComment] = useState(false)
    const [showChildComment, setShowChildComment] = useState(false)
    const [colorSendButton, setColorSendButton] = useState(false)
    const [commentText, setCommentText] = useState("")

    const inputOnchange = (e) => {
        setCommentText(e.target.value)
        e.target.value.length > 0 ? setColorSendButton(true) : setColorSendButton(false)
    }

    const submitComment = async (e) => {
        e.preventDefault();
        await replyComment(comment.id, commentText);
        await getPost();
        setCommentText("");
        setColorSendButton(false);
    }

    const commentCount = (comments) => {
        let count = 0;
        comments.forEach((comment) => {
            count += commentCount(comment.children);
            ++count;
        })
        return count;
    }

    
    return (
        <div class="space-y-4">
            <div class="flex mt-[5px]">
                <div class="flex-shrink-0 mr-3">
                    <Link to={`/user/${comment.user.username}`}><img class="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover" src={comment.user.avt ? comment.user.avt : defaultAvt} alt="" /></Link>
                </div>
                <div class="flex-1 rounded-lg  leading-relaxed">
                    <div class={`${odd ? "border bg-white" : "bg-gray-100"} flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed`}>
                        <Link to={`/user/${comment.user.username}`}> <strong>{comment.user.firstName + " " + comment.user.lastName}</strong></Link> <span class="text-xs text-gray-400">{getTimeAgo(comment.create_date)}</span>
                        <p class="text-sm">
                            {comment.text}
                        </p>
                        {
                            comment.children.length > 0 && !showChildComment && <div class="mt-4 flex items-center">
                                <div class="flex -space-x-2 mr-2">
                                    {comment.children.map((child) => 
                                        <img class="rounded-full w-6 h-6 border border-white object-cover" src={child.user.avt ? child.user.avt : defaultAvt} alt="" />)}
                                </div>
                                <div onClick={() => setShowChildComment(true)} class="text-sm text-gray-500 font-semibold hover:underline hover:cursor-pointer my-[10px]">
                                    {commentCount(comment.children)} Replies
                                </div>
                            </div>
                        }
                        {
                            comment.children.length > 0 && showChildComment &&  <div onClick={() => setShowChildComment(false)} class="text-sm text-gray-500 font-semibold hover:underline hover:cursor-pointer">
                                Hide replies
                            </div>
                        }
                        <h4 onClick={() => setShowInputComment(!showInputComment)} class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs hover:underline hover:cursor-pointer">Reply</h4>
                        {
                            showChildComment &&  comment.children.length > 0 && comment.children.map((child) => <Comment key={comment.id} comment={child} getPost={getPost} odd={!odd}/>)
                        }
                        {
                            showInputComment && <form className='flex relative items-center justify-center mt-[12px]'>
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
                        }
                        
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Comment