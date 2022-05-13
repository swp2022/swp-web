import React from 'react';
import { Navigate } from 'react-router-dom';

export const HomePrivateRoute = ({children}) => {
    console.log(children);
    return localStorage.getItem('tokenInfo') ? <Navigate to = "/mainpage" replace/> : children;
}

export const PrivateRoute = ({children}) => {
    console.log(children);
    return localStorage.getItem('tokenInfo') ? children : <Navigate to = "/" replace/>;
}
