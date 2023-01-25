import React from 'react';
import DoctorList from '../DoctorList/DoctorList';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <DoctorList></DoctorList>
        </div>
    );
};

export default Home;