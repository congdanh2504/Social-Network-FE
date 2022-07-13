import React from 'react'
import { ReactComponent as Close } from "../assets/icons/Close.svg";

export default function UserCard({ title, user }) {
    return (
        <div class="relative w-[290px] h-[450px] bg-white rounded-lg border border-gray-200 shadow-md">
            <div class="absolute top-0 left-0 right-0 flex justify-end">
            {/*     <img src='https://img.freepik.com/premium-vector/hand-painted-background-violet-orange-colours_23-2148427578.jpg?w=2000'/> */}
                <button class="absolute sm:inline-block text-gray-500 rounded-lg text-sm p-1.5" type="button">
                    <Close className='w-[20px] h-[20px] fill-white' />
                </button>
            </div>
            <div class=" mt-[70px] z-10 flex flex-col items-center w-full pb-10">
                <img class="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg" alt="Bonnie image" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 ">Visual Designer</span>
                <div class="flex mt-4 space-x-3 lg:mt-6">
                    <a href="#" class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add friend</a>
                    <a href="#" class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Message</a>
                </div>
            </div>
        </div>
    )
}
