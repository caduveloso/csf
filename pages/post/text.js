import React, { useState, useEffect, useRef  } from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';


import videosCover from '../../public/images/video.jpg'


function IntroText() {

  return (

    <div className='bg-white border border-gray p-0 m-0 shadow-lg overflow-hidden flex flex-col'>
        <div className='prose prose-4xl p-5 pt-10'>
            <h2 className='title text-6xl'>Hi, my name is Carlos</h2>
            <p>I`&apos;`ve been passionate about <strong>design</strong> and <strong>programming</strong> since 2002. I graduated with a degree in Graphic Design in 2009 and have worked for various companies and public service organizations. Recently, I`&apos;`ve been focusing on helping companies in the <strong>cryptocurrency</strong> space, using my skills to contribute to their success.</p>
        </div>
        {/* <h1 className='title pt-4 pb-2 ml-1 leading-10 text-3xl pl-5'>
            Introdution
        </h1> */}
    </div>
  )
}

export default IntroText
