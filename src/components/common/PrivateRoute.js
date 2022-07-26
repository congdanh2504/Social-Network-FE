import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getAccessToken } from '../../service/common'

const PrivateRoute = ({ auth = getAccessToken() , children }) => {
    return getAccessToken() ? children : <Navigate to="/" />;
  };

export default PrivateRoute;