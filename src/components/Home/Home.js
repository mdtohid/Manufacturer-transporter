import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => {
    return (
        <div className='bgImg flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-semibold text-center text-[#fcfafa]'>Welcome to our <br /><span className='text-[#c1e9fa]'>Manufacturer transporter relation</span></h1>
        </div>
    );
};

export default Home;