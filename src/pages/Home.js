import React from 'react'
import Header from '../components/Header';
import { ReactComponent as Close } from "../assets/icons/Close.svg";

export default function Home() {
    return (
        <div className='Container'>
            <Header/>
            <div className='Container__content flex-1 flex-row bg-[#f1f1f1] pt-[60px]'>
                <div className='Container__content__left ml-[80px] w-[300px] h-[100%]'>
                    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-end px-4 pt-4">
                            <button class="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 rounded-lg text-sm p-1.5" type="button">
                                <Close className='w-[20px] h-[20px] fill-gray-400' />
                            </button>
                            <div id="dropdown" class="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <img src='https://img.freepik.com/premium-vector/hand-painted-background-violet-orange-colours_23-2148427578.jpg?w=2000' className="absolute top-0" />
                                <ul class="py-1" aria-labelledby="dropdownButton">
                                    <li>
                                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex flex-col items-center pb-10">
                            <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg" alt="Bonnie image" />
                            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                            <div class="flex mt-4 space-x-3 lg:mt-6">
                                <a href="#" class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                                <a href="#" class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-[15px]">
                        <div class="flex justify-between items-center mb-4">
                            <h5 class="text-xl font-bold leading-none text-gray-900 border-b-[3px] pb-[5px] border-blue-500">Latest post</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                View all
                            </a>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg" alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Neil Sims
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
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                </div>
                <div className='Container__content__left ml-[80px] w-[300px] mt-[15px]'>

                </div>
                <div className='Container__content__Content'></div>
            </div>
        </div>
    )
}
