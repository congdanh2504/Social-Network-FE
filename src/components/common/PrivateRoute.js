import React from 'react'
import { Navigate } from 'react-router-dom'
import { getAccessToken } from '../../service/common'
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/slice/userSlice';

const PrivateRoute = ({ auth = getAccessToken() , children }) => {

  const dispatch = useDispatch();
  dispatch(getUser())

  return getAccessToken() ? children : <Navigate to="/" />;
};

export default PrivateRoute;