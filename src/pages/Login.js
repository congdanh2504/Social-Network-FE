import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from "../assets/images/Logo.svg";
import IconLogin from "../assets/images/ImageLogin.png";
import LoadingGi from "../assets/Loading.gif";
import { getLogin } from '../redux/slice/authSlice';
export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const Loading = useSelector((state) => state.userAuth.loading)
    const isLogin = useSelector((state) => state.userAuth.isLogin)
    const [userAccount, setuserAccount] = useState({
        username: "duong",
        password: "123456"
    })

    const handleOnchange = (event) => {
        console.log(event)
    }

    useEffect(() => {
        if(isLogin){
            navigate("/home")
        }
    }, [isLogin])
    

    const loginHandle = () => {
        dispatch(getLogin(userAccount))

    }
    return (
        <>
            <div className="flex flex-col w-full h-[100vh]">
                <div className='container__header flex flex-row h-[70px] items-center border-b-[3px]'>
                    <div className='container__header_left flex-1 mx-[30px] flex flex-row items-center gap-x-[30px]  fill-blue-500'>
                        <Logo className="w-[40px] h-[40px]" />
                        <h1 className='text-[16px] font-[500] text-[#333333]'>It’s helps you to connect and share with the people in your life</h1>
                    </div>
                    <div className='container__header_right flex-1 flex flex-row mx-[30px] gap-x-[30px]'>
                        <input onChange={handleOnchange} className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        <input onChange={handleOnchange} className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passWord" type="text" placeholder="Passworld" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loginHandle}>Login</button>
                    </div>
                </div>
                {
                    Loading ? <div className='absolute w-full h-full flex justify-center items-center'>
                        <img className='w-[60px] h-[60px]' src={LoadingGi} />
                    </div> : ""
                }
                <div className='container__content flex flex-row flex-1 bg-gray-200'>
                    <div className='container__content__left flex flex-1 items-center justify-center'>
                        <img className='w-[300px] h-[300px]' src={IconLogin}></img>
                    </div>
                    <div className='container__content__right flex-1'>
                        <div className="bg-grey-lighter flex flex-1 h-full flex-col items-center justify-center">
                            <div className="container max-w-[600px] h-full flex-1 flex flex-col items-center justify-center px-2">
                                <div className="bg-white px-6 py-8  text-black w-full rounded-[15px] drop-shadow-lg">
                                    <h1 className="mb-8 text-3xl text-center font-[700]">Create An Account</h1>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="userName"
                                        placeholder="User Name" />

                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="email"
                                        placeholder="Email" />

                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="password"
                                        placeholder="Password" />
                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="confirm_password"
                                        placeholder="Confirm Password" />

                                    <div className="text-center text-sm text-grey-dark mt-4">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Sign Up Now !
                                        </button>
                                    </div>

                                    <div className="text-center text-sm text-grey-dark mt-4">
                                        By signing up, you agree to the
                                        <a className="no-underline border-b border-grey-dark text-blue-500 ml-[5px]" href="#">
                                            Terms of Service
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container__footer w-full h-[40px] flex items-center justify-center'>
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://www.facebook.com/mollun" className="hover:underline">Lê Khánh Dương™ </a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </>
    )
}
