import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
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
import { Option } from 'antd/lib/mentions';

export default function Header({ styles }) {
    const dispatch = useDispatch();
    const user = getUser();
    let navigate = useNavigate();
    const [value, setValue] = useState([]);

    const handelLogout = () => {
        dispatch(authSlice.actions.refresh_user());
        logOut();
        navigate('/');
    }

    function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);
        const fetchRef = useRef(0);
        const debounceFetcher = useMemo(() => {
            const loadOptions = (value) => {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        // for fetch callback order
                        return;
                    }

                    setOptions(newOptions);
                    setFetching(false);
                });
            };

            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);
        return (
            <Select
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <div className='w-[100%] flex items-center'>
                    <Spin size="default" />
                </div> : null}
                {...props}
            >
                {options.map((_, item) => {
                    return (
                        <Option>
                            <div className='flex flex-row h-[70px] items-center '>
                                <img class="w-[50px] h-[50px] rounded-full" src="https://i.pinimg.com/1200x/a2/3b/d5/a23bd5e01bd54a1c185395d9cb2de790.jpg" alt="" />
                                <div class="flex flex-col justify-center pl-[5px]">
                                    <span class="text-[15px] font-bold text-gray-900">Lê Khánh Dương</span>
                                    <p class="font-normal text-gray-700 ">lkduong.20@gmail.com</p>
                                </div>
                            </div>
                        </Option>
                    )
                })}
            </Select>
        );
    }

    async function fetchUserList(username) {
        console.log('fetching user', username);
        return fetch('https://randomuser.me/api/?results=5')
            .then((response) => response.json())
            .then((body) =>
                body.results.map((user) => ({
                    label: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                })),
            );
    }

    return (
        <div className={`z-50 top-0 header-top-navigation px-[12px] flex flex-row justify-evenly w-full h-[58px] items-center border-b-[1px] bg-white`}>
            <div className='header-top-left w-[300px] flex flex-row gap-[20px]'>
                <Logo className="w-[40px] h-[40px]" />
                <div class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <DebounceSelect
                            mode="multiple"
                            value={value}
                            placeholder="Select users"
                            fetchOptions={fetchUserList}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            style={{
                                width: '300px',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={`header-top-center flex flex-row flex-1 items-center justify-between mx-[90px]`}>
                <div className='px-[40px] py-[10px] border-b-[5px] border-blue-500 cursor-pointer'>
                    <Home className="w-[25px] h-[25px] fill-blue-500" />
                </div>
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
                    <img className="w-9 h-9 rounded-full" src={user.avt ? user.avt : defaultAvt} alt="Rounded avatar" />
                    <span className='ml-[10px] font-bold'>{user.firstName}</span>
                </div>
                <div className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-400 hover:fill-white'>
                    <Comment className="w-[20px] h-[20px]" />
                </div>
                {/*  <div className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center'>
                    <Bell className="w-[20px] h-[20px] fill-black-300"/>
                </div> */}

                <div onClick={handelLogout} className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-400 hover:fill-white'>
                    <Down className="w-[20px] h-[20px] fill-black-300" />
                </div>
            </div>
        </div>
    )
}