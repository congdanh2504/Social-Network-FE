import React, { useEffect } from 'react'
import Header from '../components/common/Header';
import ListPost from '../components/ListPost';
import PostCard from '../components/PostCard';
import UploadCard from '../components/Upload/UploadCard';
import UserCard from '../components/UserCard';
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '../redux/slice/postSlice';

export default function Home() {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.post.loading)
    const error = useSelector((state) => state.post.error)
    const posts = useSelector((state) => state.post.posts)

    useEffect(() => {
        dispatch(getPostsAction())
    }, [])

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
                    {posts && posts.map((post) => <PostCard post={post} />)}
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
