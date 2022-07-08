import React from 'react'
import Header from '../components/Header';
import ListPost from '../components/ListPost';
import PostCard from '../components/PostCard';
import UpoadCard from '../components/Upload/UpoadCard';
import UserCard from '../components/UserCard';

export default function Home() {
    return (
        <div className='relative Container w-full h-full'>
            <Header />
            <div className='Container__content flex-1 flex flex-row pt-[60px]'>
                <div className='Container__content__left  ml-[80px] w-[300px] h-[100%]'>
                    <UserCard />
                    <ListPost title="Latest Post"/>
                </div>
                <div className='Container__content__center flex-1 ml-[80px] mt-[15px]'>
                    <UpoadCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>
                <div className='Container__content__right flex flex-col mr-[80px]'>
                    <div className='Container__content__left ml-[80px] w-[300px] h-[100%]'>
                        <ListPost title="Maybe you know"/>
                        <ListPost title="Notifications"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
