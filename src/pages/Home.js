import React, { useEffect } from 'react'
import ListPost from '../components/ListPost';
import PostCard from '../components/PostCard';
import UploadCard from '../components/Upload/UploadCard';
import { useDispatch, useSelector } from 'react-redux'
import { getLatestPostsAction, getPostsAction } from '../redux/slice/postSlice';
import SliderAndNav from '../components/common/SliderAndNav';
import LatestPosts from '../components/LatestPosts';

export default function Home() {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.post.loading)
    const error = useSelector((state) => state.post.error)
    const posts = useSelector((state) => state.post.posts)
    const latestPosts = useSelector((state) => state.post.latestPosts)

    useEffect(() => {
        dispatch(getLatestPostsAction())
        dispatch(getPostsAction())
    }, [])

    return (
        <div className='relative Container w-full bg-[#f0f2f5] px-[10px]'>
            <div className='Container__content flex-1 flex h-[100vh] flex-row mt-[12px]'>
                <div className='Container__content__left flex flex-col gap-[15px] w-[300px] overflow-hidden hover:overflow-auto box-border'>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg h-[300px]">
                        <img class="w-full" src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                    <LatestPosts latestPosts={latestPosts}/>
                </div>
                <div className='Container__content__center overflow-y-auto flex-1 mx-[10px]'>
                    <UploadCard />
                    {posts && posts.map((post) => <PostCard post={post} />)}
                    <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View more
                    </a>
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
/* 
    return (
        <SliderAndNav content={content}/>
    ) */
}
