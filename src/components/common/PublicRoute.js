import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { getUser } from '../../service/common'

const PublicPrivate = ({ auth = !getUser() , children }) => {
    return !getUser() ? children : <Navigate to="/home" />;
};

export default PublicPrivate;