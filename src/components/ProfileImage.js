import React from 'react'

export default function ProfileImage() {
    return(
        <div className="">
            <section className='w-screen h-96'>
                <img src="https://images.alphacoders.com/120/thumb-1920-1200619.jpg" class="object-cover w-full h-full"/>
            </section>
            {/*   */}
            <div className='w-screen h-14 bg-[#e4c8c8]'>
                <div className='flex flex-row Container__content__center overflow-y-auto flex-1 mx-[50px]'>
                    <div className='basis-1/4'>
                        <div className='absolute -bottom-20 w-[200px] h-[200px] drop-shadow-xl rounded-full bg-[#ffffff]'>
                            <img className='object-cover w-full h-full rounded-full p-[10px]' src="https://static.zerochan.net/Kusanali.full.3703731.jpg"></img>
                        </div>
                    </div>
                    <div className='basis-1/2'>
                        <ul>
                            <li className='inline-block leading-[56px] mx-[40px]'><a href='.' className='text-black text-base font-bold'>Timeline</a></li>
                            <li className='inline-block leading-[56px] mx-[40px]'><a href='.' className='text-black text-base font-bold'>Photos</a></li>
                            <li className='inline-block leading-[56px] mx-[40px]'><a href='.' className='text-black text-base font-bold'>Friends</a></li>
                        </ul>
                    </div>
                    <div className='basis-1/4'>
                        <button className='bg-[#1890ff] rounded-[20px] px-[26px] py-[8px] text-white text-sm justify-center'>Edit profile</button>
                    </div>
                </div>
            </div>


        </div>
    )
}