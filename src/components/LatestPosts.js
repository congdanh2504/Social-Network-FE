import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLatestPostsAction, postSlide } from '../redux/slice/postSlice'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import defaultAvt from '../assets/images/defaultAvt.png'

TimeAgo.addDefaultLocale(en)

export default function LatestPosts({latestPosts}) {

    const getTimeAgo = (date) => {
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(new Date(date))
    }

    return (
        <div class="w-[300px] p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
            <div class="flex justify-between items-center mb-4">
                <h5 class="text-[20px] font-[500] leading-none text-gray-900 pb-[5px] border-blue-500">Latest posts</h5>
                <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                    {
                        latestPosts && latestPosts.map((post)=> 
                            <li class="py-3 sm:py-4">
                                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                {post.images.length > 0 && <img class="w-full" src={post.images[0].url} alt="Sunset in the mountains"/>}
                                
                                <div class="px-6 py-4">
                                    <div class="flex items-center">
                                        <img class="w-10 h-10 rounded-full mr-4 object-cover" src={post.user.avt ? post.user.avt : defaultAvt} alt="Avatar of Jonathan Reinink"/>
                                        <div class="text-sm">
                                            <h2 class="text-gray-900 leading-none">{`${post.user.firstName} ${post.user.lastName}`}</h2>
                                            <p class="text-gray-600">{getTimeAgo(post.create_date)}</p>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 text-base">
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
