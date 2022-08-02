import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLatestPostsAction, postSlide } from '../redux/slice/postSlice'
import TimeAgo from 'javascript-time-ago'
import { Link } from 'react-router-dom';
import en from 'javascript-time-ago/locale/en'
import defaultAvt from '../assets/images/defaultAvt.png'

TimeAgo.addDefaultLocale(en)

export default function LatestPosts({ latestPosts }) {

    const getTimeAgo = (date) => {
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(new Date(date))
    }

    return (
        <div className="w-[300px] max-w-md bg-white rounded-lg border shadow-md sm:p-2">
            <div className="flex justify-between items-center p-[12px]">
                <span className="text-[20px] font-[600] leading-none text-gray-900 border-blue-500 m-0">Latest posts</span>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                    {
                        latestPosts && latestPosts.map((post) =>
                            <li className="py-1">
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    {post.images.length > 0 && <img className="w-full" src={post.images[0].url} alt="Sunset in the mountains" />}

                                    <div className="flex flex-col gap-1 p-[12px]">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className='flex'>
                                                    <Link to={`/user/${post.user.username}`}>
                                                        <img className="w-10 h-10 rounded-full mr-4 object-cover" src={post.user.avt ? post.user.avt : defaultAvt} alt="Avatar of Jonathan Reinink" />
                                                    </Link>
                                                    <div className="text-sm">
                                                        <Link to={`/user/${post.user.username}`}>
                                                            <h2 className="text-gray-900 leading-none hover:underline">{`${post.user.firstName} ${post.user.lastName}`}</h2>
                                                        </Link>
                                                        <p className="text-gray-600 m-0">{getTimeAgo(post.create_date)}</p>
                                                    </div>
                                                </div>
                                                <div className='cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-base m-0">
                                            {post.title}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
