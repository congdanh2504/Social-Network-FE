import { Image, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard'
import UploadCard from '../Upload/UploadCard'


export default function ComponentPost({ detailUser }) {
    return (
        <div className='flex flex-row gap-3'>
            <div className='content flex flex-col gap-[10px] rounded-xl w-[345px]'>
                <div className='bg-white flex flex-col justify-center items-center rounded-lg'>
                    <div className='w-full h-[40px] flex items-center'>
                        <h1 style={{ fontSize: '20px' }} className="m-0"><span style={{ marginLeft: '15px' }}>Images</span></h1>
                    </div>
                    <Divider style={{ margin: 2 }}></Divider>
                    <div className='flex p-[2px] justify-center items-center'>
                        <div className='flex gap-[5px] flex-wrap '>
                            <Image.PreviewGroup>
                                {detailUser.images.length > 0 && detailUser.images.slice(0, 9).map((url) => <div
                                    style={{ display: 'flex', alignItems: 'centerS' }}>
                                    <Image className='object-cover' width={110} height={110} src={url} />
                                </div>)}
                            </Image.PreviewGroup>
                        </div>
                    </div>
                </div>
                <div className='bg-white flex flex-col justify-center items-center rounded-lg'>
                    <div className='w-full h-[40px] flex items-center'>
                        <h1 style={{ fontSize: '20px' }} className="m-0"><span style={{ marginLeft: '15px' }}>Friends</span></h1>
                    </div>
                    <Divider style={{ margin: 2 }}></Divider>
                    <div className='flex p-[2px] justify-center items-center'>
                        <div className='flex gap-[5px] flex-wrap'>
                            <Image.PreviewGroup>
                                {detailUser.images.length > 0 && detailUser.images.slice(0, 9).map((url) => <div
                                    style={{ display: 'flex', alignItems: 'centerS' }}>
                                    <Image className='object-cover' width={110} height={110} src={url} />
                                </div>)}
                            </Image.PreviewGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1 justify-start'>
                <UploadCard />
                {detailUser.posts && detailUser.posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    )
}
