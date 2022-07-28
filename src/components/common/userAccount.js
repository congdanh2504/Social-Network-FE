import React from 'react'
import { getUser, logOut } from '../../service/common';
import defaultAvt from "../../assets/images/defaultAvt.png"
import { ReactComponent as Comment } from "../../assets/icons/Comment.svg";
import { ReactComponent as Down } from "../../assets/icons/Down.svg";
export default function UserAccount() {
    const user = getUser();
    const handelLogout = () => {

    }
    return (
        <div className='header-top-right w-[300px] flex flex-row justify-end gap-[10px] items-center mr-[15px]'>
            <div className='flex flex-row h-[40px] items-center px-[3px] hover:bg-blue-400 hover:text-white rounded-[30px] cursor-pointer'>
                <img className="w-9 h-9 rounded-full" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar" />
                <span className='mx-[15px] font-bold'>{user.firstName + " " + user.lastname}</span>
            </div>
            <div className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:fill-white'>
                <Comment className="w-[20px] h-[20px]" />
            </div>
            <div onClick={handelLogout} className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-400 hover:fill-white'>
                <Down className="w-[20px] h-[20px] fill-black-300" />
            </div>
        </div>
    )
}
