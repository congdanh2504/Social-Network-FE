import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Home } from "../../assets/icons/Home.svg";
import { ReactComponent as Friend } from "../../assets/icons/Friend.svg";
import { ReactComponent as Video } from "../../assets/icons/Video.svg";
import { ReactComponent as Game } from "../../assets/icons/Game.svg";
import { ReactComponent as Comment } from "../../assets/icons/Comment.svg";
import { ReactComponent as Bell } from "../../assets/icons/Bell.svg";
import { ReactComponent as Down } from "../../assets/icons/Down.svg";
import { authSlice } from '../../redux/slice/authSlice';
import { getUser, logOut } from '../../service/common';
import defaultAvt from "../../assets/images/defaultAvt.png"
import { DebounceInput } from 'react-debounce-input'
import { searchUserAction } from '../../redux/slice/userSlice';

export default function Header({styles}) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const user = getUser();

    const logOutHandle = ()=>{
        dispatch(authSlice.actions.refresh_user());
        logOut();
    }

    const searchHandle = async (e) => {
        dispatch(searchUserAction(e.target.value))
    }

    return (
        <div className={`z-50 top-0 header-top-navigation px-[12px] flex flex-row justify-evenly w-full h-[58px] items-center border-b-[1px] bg-white`}>
            <div className='header-top-left w-[300px] flex flex-row gap-[20px]'>
                <Link to="/home"><Logo className="w-[40px] h-[40px]" /></Link>
                <div class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <DebounceInput minLength={1} debounceTimeout={500} onChange={searchHandle} type="text" id="simple-search" class="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 focus:outline-none" placeholder="Search" required />
                    </div>
                </div>
            </div>
            <div className={`header-top-center flex flex-row flex-1 items-center justify-between mx-[90px]`}>
                <Link to="/home" className='px-[40px] py-[10px] border-b-[5px] border-blue-500 cursor-pointer'>
                    <Home className="w-[25px] h-[25px] fill-blue-500" />
                </Link>
                <div className='px-[40px] py-[10px]'>
                    <Friend className="w-[25px] h-[25px] fill-gray-300" />
                </div>
                <div className='px-[40px] py-[10px]'>
                    <Video className="w-[25px] h-[25px] fill-gray-300" />
                </div>
                <div className='px-[40px] py-[10px]'>
                    <Game className="w-[25px] h-[25px] fill-gray-300" />
                </div>
            </div>
            <div className='header-top-right w-[300px] flex flex-row justify-end gap-[15px] items-center'>
                <div className='flex flex-row items-center px-[10px] py-[5px] hover:bg-blue-400 hover:text-white rounded-[30px] cursor-pointer'>
                    <img className="w-9 h-9 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt } alt="Rounded avatar" />
                    <span className='ml-[10px] font-bold'>{user.firstName}</span>
                </div>
                <Link to="/chat"  className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:fill-white'>
                    <Comment className="w-[20px] h-[20px]"/>
                </Link>
               {/*  <div className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center'>
                    <Bell className="w-[20px] h-[20px] fill-black-300"/>
                </div> */}
                
                <div onClick={logOutHandle} className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-400 hover:fill-white'>
                    <Down className="w-[20px] h-[20px] fill-black-300"/>
                </div>
            </div>
        </div>
    )
}
