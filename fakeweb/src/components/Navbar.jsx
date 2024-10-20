import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    return (
    <>
        <div className='bg-black w-full flex flex-row items-center justify-between gap-3'>
            <div className='flex flex-row items-center gap-3'>
                <img src='/img/menu.png' className='h-6 w-6 ml-6 mr-3 m-2' alt="logo" />
                <img src='/img/images.png' className='m-0 h-10' alt="logo" />
                <p className='mx- my-0 text-white font-extrabold' onClick={() => navigate(`/`)}>Politics</p>
                <p className='mx-2 my-0 text-white font-normal'>SCOTUS</p>
                <p className='mx-2 my-0 text-white font-normal'>Congress</p>
                <p className='mx-2 my-0 text-white font-normal'>More</p>
            </div>
            <div className='flex flex-row items-center gap-3'>
                <p className='mx-2 my-0 text-white text-sm font-light'>Watch</p>
                <p className='mx-2 my-0 text-white text-sm font-light'>Listen</p>
                <p className='mx-2 my-0 text-white text-sm font-light'>Live TV</p>
                <img src='/img/search.png' className='h-4 w-4' alt="logo" />
                <p className='mr-2 my-0 text-white '>Sign in</p>
            </div>
        </div>
    </>
  );
}

export default Navbar;
