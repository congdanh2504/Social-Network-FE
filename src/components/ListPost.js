import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import defaultAvt from '../assets/images/defaultAvt.png'

TimeAgo.addDefaultLocale(en)

export default function ListPost({title, data}) {


    return (
        <div class="w-[300px] p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
            <div class="flex justify-center items-center mb-4">
                <h5 class="text-[20px] font-[500] leading-none text-gray-900 pb-[5px] border-blue-500">{title}</h5>
                {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a> */}
            </div>
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Bonnie image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    Bonnie Green
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>

                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Bonnie image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    Bonnie Green
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>

                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Michael image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    Michael Gough
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>

                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Lana image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    Lana Byrd
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>

                        </div>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Thomas image" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    Thomes Lean
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
