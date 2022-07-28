import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAccessToken, logOut } from '../../service/common'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slice/userSlice';

const PrivateRoute = ({ auth = getAccessToken() , children }) => {

  // const navigate = useNavigate();
  // if (getAccessToken()) {
    const dispatch = useDispatch();
    dispatch(getUser())
  // }
  
  // const error = useSelector((state) => state.user.error)
  

  // useEffect(() => {
  //   dispatch(getUser())
  // }, [])

  // useEffect(() => {
  //   if (error) {
  //     logOut()
  //     navigate("/")
  //   }
  // }, [error])

  // if (error) return  <Navigate to="/" />

  return getAccessToken() ? children : <Navigate to="/" />;
};

export default PrivateRoute;