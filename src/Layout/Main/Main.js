import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorList from '../../Pages/DoctorList/DoctorList';
import Header from '../../Pages/Header/Header';
import Slider from '../../Pages/Slider/Slider';

const Main = () => {
    return (
        <div>
            <Header></Header>

            <Outlet></Outlet>
        </div>
    );
};

export default Main;