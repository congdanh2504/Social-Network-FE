import React from 'react'
import Header from '../components/common/Header'
import PostCard from '../components/PostCard';
import ProfileImage from '../components/ProfileImage';
import { useDispatch, useSelector } from 'react-redux'

export default function Profile(){

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.post.loading)
    const error = useSelector((state) => state.post.error)
    const posts = useSelector((state) => state.post.posts)

    return (
        <div className='relative Container w-full bg-[#f0f2f5]'>
            <Header/>
            <ProfileImage/>
            <div className='Container__content__center overflow-y-auto flex-1 mx-[50px]'>
                
            </div>
        </div>
    )
}