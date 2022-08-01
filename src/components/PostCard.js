import React, { useState } from 'react'

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import defaultAvt from '../assets/images/defaultAvt.png'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Link } from 'react-router-dom';

TimeAgo.addDefaultLocale(en)

export default function PostCard({post}) {

    const getTimeAgo = () => {
        const timeAgo = new TimeAgo('en-US')
        return timeAgo.format(new Date(post.create_date))
    }

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg my-4 ">
            <div className="flex w-full items-start px-4 py-6">
                <Link to={`/user/${post.user.username}`} ><img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post.user.avt ? post.user.avt : defaultAvt} alt="avatar" /></Link>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <Link to={`/user/${post.user.username}`} ><h2 className="text-lg font-semibold text-gray-900 -mt-1">{`${post.user.firstName} ${post.user.lastName}`}</h2></Link>
                        <small className="text-sm text-gray-700">{getTimeAgo()}</small>
                    </div>
                    <div>
                        <p className="my-2 text-gray-700 text-sm">
                            {post.title}
                        </p>
                        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} mode="lg-lollipop">
                            {post.images && post.images.map((image) => 
                                <a href={image.url}>
                                <img alt="img1" src={image.url} />
                            </a>) }
                        </LightGallery>
                    </div>

                </div>
            </div>
            <div className='flex flex-row items-center mb-2'>
                <div className="flex items-center">
                    <div className="flex mr-2 text-gray-700 text-sm" />
                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likeUsers.length}</span>
                </div>
                <div className="flex mr-2 text-gray-700 text-sm" />
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>{post.comments.length}</span>
            </div>
        </div>
    )
}
