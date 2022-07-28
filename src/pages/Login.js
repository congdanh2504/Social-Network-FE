import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from "../assets/images/Logo.svg";
import IconLogin from "../assets/images/ImageLogin.png";
import LoadingGi from "../assets/Loading.gif";
import { authSlice, getLogin, register } from '../redux/slice/authSlice';
import { getUser } from '../redux/slice/userSlice';
import { Button, Form, Input } from 'antd';
import { socket } from '../App';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Loading = useSelector((state) => state.userAuth.loading)
    const [open, setOpen] = useState(false)
    const getProfileLoading = useSelector((state) => state.user.loading)
    const isLogin = useSelector((state) => state.userAuth.isLogin)
    const isRegister = useSelector((state) => state.userAuth.isRegister)
    const registerError = useSelector((state) => state.userAuth.registerError)
    const loginError = useSelector((state) => state.userAuth.loginError)
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    })
    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
    })

    const handleOnLoginChange = (event) => {
        setLoginUser({...loginUser, [event.target.name] : event.target.value})
    }

    const handleOnRegisterChange = (event) => {
        setRegisterUser({...registerUser, [event.target.name] : event.target.value})
    }

    useEffect(() => {
        if(isLogin){
            dispatch(getUser())
        }
    }, [isLogin])  

    useEffect(() => {
        if (!getProfileLoading && isLogin)
            navigate("/home")
    }, [getProfileLoading])

    const loginHandle = () => {
        dispatch(getLogin(loginUser))
        setOpen(true)
    }

    const registerHandle = () => {   
        dispatch(authSlice.actions.refresh_register())
        dispatch(register(registerUser))
        setOpen(true)
    }

    const handelClose = () =>{
        setOpen(false)
    }

    return (
        <>
            <div className="flex flex-col w-full h-[100vh]">
                <div className='container__header flex flex-row h-[70px] items-center border-b-[3px]'>
                    <div className='container__header_left flex-1 mx-[30px] flex flex-row items-center gap-x-[30px]  fill-blue-500'>
                        <Logo className="w-[40px] h-[40px]" />
                        <h1 className='text-[16px] font-[500] text-[#333333]'>It’s helps you to connect and share with the people in your life</h1>
                    </div>
                    <Form
                        className='container__header_right flex-1 flex flex-row mx-[30px] gap-x-[30px]'
                        onFinish={loginHandle}
                        autoComplete="off">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <div className="text-center text-sm text-grey-dark mt-4">
                                <Input 
                                    onChange={handleOnLoginChange} 
                                    className='shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                    name="username"
                                    placeholder="User Name"/>
                            </div>

                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                }
                            ]}
                        >
                            <div className="text-center text-sm text-grey-dark mt-4">
                                <Input 
                                    type="password"
                                    onChange={handleOnLoginChange} 
                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                    name="password"
                                    placeholder="Password"/>
                            </div>

                        </Form.Item>

                        <Form.Item>
                            <div className="text-center text-sm text-grey-dark mt-4">
                                <Button type="primary" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' htmlType="submit">
                                    Login
                                </Button>
                            </div>
                        </Form.Item>

                    </Form>
                  
                </div>
                {
                     (loginError && open) && <div id="toast-danger " class="flex fixed bottom-[40px] left-[20px] items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Error icon</span>
                        </div>
                        <div class="ml-3 text-sm font-normal">Invalid username or password.</div>
                        <button onClick={handelClose} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                }
                {
                     (registerError && open) && <div id="toast-danger" class="flex fixed bottom-[40px] left-[20px] items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Error icon</span>
                        </div>
                        <div class="ml-3 text-sm font-normal">Email or username already used</div>
                        <button onClick={handelClose} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                }
                {
                    (isRegister && open) && <div id="toast-success" class="flex fixed bottom-[40px] left-[20px] items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Check icon</span>
                        </div>
                        <div class="ml-3 text-sm font-normal">Register successfully.</div>
                        <button onClick={handelClose} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                }
                {
                    Loading && <div className='absolute w-full h-full flex justify-center items-center'>
                        <img className='w-[60px] h-[60px]' src={LoadingGi} />
                    </div>
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
                                        <Form
                                            onFinish={registerHandle}
                                            autoComplete="off">
                                            <Form.Item
                                                name="username"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                    },
                                                ]}
                                            >
                                                <Input 
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="username"
                                                    placeholder="User Name"/>

                                            </Form.Item>

                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: 'email',
                                                        message: 'Must be email address!',
                                                    }
                                                ]}
                                            >
                                                <Input 
                                                    type="email"
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="email"
                                                    placeholder="Email"/>

                                            </Form.Item>

                                            <Form.Item
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your first name!',
                                                    }
                                                ]}
                                            >
                                                <Input 
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="firstName"
                                                    placeholder="First name"/>

                                            </Form.Item>

                                            <Form.Item
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your last name!',
                                                    }
                                                ]}
                                            >
                                                <Input 
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="lastName"
                                                    placeholder="Last name"/>

                                            </Form.Item>

                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        min: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    }
                                                ]}
                                            >
                                                <Input 
                                                    type="password"
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="password"
                                                    placeholder="Password"/>

                                            </Form.Item>


                                            <Form.Item
                                                name="confirmPassword"
                                                dependencies={['password']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your confirm password!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                          if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                          }
                                            
                                                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input 
                                                    type="password"
                                                    onChange={handleOnRegisterChange} 
                                                    className='block border border-grey-light w-full p-3 rounded mb-4 ' 
                                                    name="confirmPassword"
                                                    placeholder="Confirm password"/>

                                            </Form.Item>

                                            <Form.Item>
                                                <div className="text-center text-sm text-grey-dark mt-4">
                                                    <Button type="primary" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' htmlType="submit">
                                                        Sign Up Now !
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>

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
