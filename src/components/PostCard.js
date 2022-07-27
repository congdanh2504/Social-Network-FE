import React, { useState } from 'react'

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';


export default function PostCard() {

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg my-4 ">
            <div className="flex w-full items-start px-4 py-6">
                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">Brad Adams </h2>
                        <small className="text-sm text-gray-700">22h ago</small>
                    </div>
                    <p className="text-gray-700">Joined 12 SEP 2012. </p>
                    <div>
                        <p className="my-2 text-gray-700 text-sm">
                            Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
                        </p>
                        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} mode="lg-lollipop">
                            <a href="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/295958494_589272609238694_7200601012329706119_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=q-NoZjKZEgcAX_2F8Qi&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8ciHk1eZ1yOS8VYd2wcnToYHC_c14ohW9dT3npSq42TQ&oe=62E3AA8A">
                                <img alt="img1" src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/295958494_589272609238694_7200601012329706119_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=q-NoZjKZEgcAX_2F8Qi&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8ciHk1eZ1yOS8VYd2wcnToYHC_c14ohW9dT3npSq42TQ&oe=62E3AA8A" />
                            </a>
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
                    <span>12</span>
                </div>
                <div className="flex mr-2 text-gray-700 text-sm" />
                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>8</span>
            </div>
        </div>
    )
}
