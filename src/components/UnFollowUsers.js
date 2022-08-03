import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import defaultAvt from '../assets/images/defaultAvt.png'

function UnFollowUsers({ unFollowUsers }) {

    return (
        <div class="w-[300px] max-w-md bg-white rounded-lg border shadow-md p-[12px]">
            <div class="flex justify-between items-center mb-1 p-[10px] ">
                <h5 class="text-[20px] font-[500] leading-none text-gray-900 pb-[5px] border-blue-500 m-0">User other</h5>
                <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    {unFollowUsers && unFollowUsers.map((user) => <li class="py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <Link to={`/user/${user.username}`}>
                                    <img class="w-11 h-11 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Bonnie image" />
                                </Link>
                            </div>
                            <div class="flex-1 min-w-0">
                                <Link to={`/user/${user.username}`}>
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-black hover:underline m-0">
                                        {user.firstName + " " + user.lastName}
                                    </p>
                                </Link>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400 m-0">
                                    {user.username}
                                </p>
                            </div>
                            <Button type='primary'>Follow</Button>
                        </div>
                    </li>)}
                </ul>
                    <Button className='w-full' type='primary'>More</Button>
            </div>
        </div>
    )
}

export default UnFollowUsers