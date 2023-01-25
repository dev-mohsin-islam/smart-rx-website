import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main/Main';
import AppointmentList from '../Pages/Dashboard/AppointmentList/AppointmentList';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signUp',
                element: <Registration></Registration>
            },
            {
                path: '/dashboard',
                element: <AppointmentList></AppointmentList>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    }
])