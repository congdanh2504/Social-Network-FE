import React from 'react'
import Header from '../components/common/Header';
import ListPost from '../components/ListPost';
import PostCard from '../components/PostCard';
import UploadCard from '../components/Upload/UploadCard';
import UserCard from '../components/UserCard';

export default function Home() {
    return (
        <div className='relative Container w-full bg-[#f0f2f5]'>
            <Header/>
            <div className='Container__content flex-1 flex h-[100vh] flex-row mx-[12px] mt-[12px]'>
                <div className='Container__content__left flex flex-col gap-[15px] w-[300px] overflow-hidden hover:overflow-auto box-border'>
                    <UserCard/>
                    <ListPost title="Latest Post" />
                </div>
                <div className='Container__content__center overflow-y-auto flex-1 mx-[50px]'>
                    <UploadCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
                <div className='Container__content__right overflow-y-auto flex flex-col'>
                    <div className='Container__content__left flex flex-col gap-[15px] w-[300px] h-[100%] overflow-hidden hover:overflow-y-auto'>
                        <ListPost title="Maybe you know" />
                        <ListPost title="Notifications" />
                    </div>
                </div>
            </div>
        </div>
    )
}
