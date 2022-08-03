import React from 'react'
import { Link } from 'react-router-dom'
import defaultAvt from '../assets/images/defaultAvt.png'

function UnFollowUsers({unFollowUsers}) {
    
    return (
        <div class="w-[300px] p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
            <div class="flex justify-center items-center">
                <h5 class="text-[20px] font-[500] leading-none text-gray-900 pb-[5px] border-blue-500">Maybe you know</h5>
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    {unFollowUsers && unFollowUsers.map((user) => <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <Link to={`/user/${user.username}`}><img class="w-8 h-8 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Bonnie image" /> </Link>
                            </div>
                            <div class="flex-1 min-w-0">
                                <Link to={`/user/${user.username}`}>
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black hover:underline">
                                    {user.firstName + " " + user.lastName}
                                </p>
                                </Link>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.username}
                                </p>
                            </div>

                        </div>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

export default UnFollowUsers