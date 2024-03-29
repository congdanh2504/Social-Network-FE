import React from 'react'
import { getUser, logOut } from '../../service/common';
import defaultAvt from "../../assets/images/defaultAvt.png"
import { ReactComponent as Comment } from "../../assets/icons/Comment.svg";
import { ReactComponent as Down } from "../../assets/icons/Down.svg";
import { useDispatch } from 'react-redux';
import { authSlice } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';
export default function UserAccount() {
    const user = getUser();
    const dispatch = useDispatch();
    const handelLogout = () => {
        dispatch(authSlice.actions.refresh_user());
        logOut();
    }
    
    return (
        user && <div className='header-top-right w-[300px] flex flex-row justify-end gap-[10px] items-center mr-[15px]'>
            <Link to="/me"><div className='flex flex-row h-[40px] items-center px-[3px] hover:bg-[#1890FF] hover:text-white rounded-[30px] cursor-pointer'>
                    <img className="w-9 h-9 rounded-full object-cover" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar" />
                    <span className='mx-[15px] font-bold' >{user.firstName + " " + user.lastName}</span>
                </div>
            </Link> 
            <Link to="/chat" className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-[#1890FF] hover:fill-white'>
                <Comment className="w-[20px] h-[20px]" />
            </Link>
            <div onClick={handelLogout} className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center hover:bg-[#1890FF] hover:fill-white'>
                <Down className="w-[20px] h-[20px] fill-black-300" />
            </div>
        </div>
    )
}
