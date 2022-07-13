import React from 'react'

export default function UpoadCard() {
    return (
        <div className="flex flex-col rounded-[15px] border-2 border-gray-200 w-full p-[15px] bg-white">
            <div className='flex flex-row items-center gap-[20px]'>
                <img class="w-12 h-12 rounded-full" src="https://vieclamthemonline.com/wp-content/uploads/2021/10/tong-hop-nhung-hinh-anh-hot-girl-toc-ngan-de-thuong-dang-yeu-nhat-17.jpg" alt="Rounded avatar"></img>

                <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" placeholder="Say something ..." required />
            </div>
            <div className='flex flex-row gap-[10px] mt-[20px] justify-end'>
                <label class="flex flex-row items-center rounded-full shadow-lg cursor-pointer hover:bg-green-500 hover:text-white text-center">
                    <span class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Images
                    </span>
                    <input type='file' class="hidden" />
                </label>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  shadow-lg py-2 px-4 rounded-full">
                    Share
                </button>
            </div>
        </div>
    )
}
