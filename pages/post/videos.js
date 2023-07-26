import React, { useState, useEffect, useRef  } from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';


import videosCover from '../../public/images/video.jpg'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: 1,
    boxShadow: 12,
    p: 4,
    outline: 'none',
    display: 'flex',
    gap: 4, 
  };

  const responsiveStyle = {
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
      p: 1,
      borderRadius: 0,
      gap: 2,
    },
  };

  const mergedStyle = { ...style, ...responsiveStyle };


//create array with videos here
// add thumbnail for videos and replace line 144. Instead of a video tag, add a simple div with the thumb
const playlist = [
    {
        src: "/videos/animationReel.mp4",
        thumb: "/images/thumb1.png",
        title: "Animation Reel",
    },
    {
        src: "/videos/naPraia.mp4",
        thumb: "/images/thumb2.png",
        title: "Animation for a beach party",
    },
    {
        src: "/videos/mpu2.mp4",
        thumb: "/images/thumb3.png",
        title: "Motion graphics the Public Ministry",
    },
    {
        src: "/videos/Doctum.mp4",
        thumb: "/images/thumb4.png",
        title: "Doctum - Animation for a university",
    },
    {
        src: "/videos/ceubReel.mp4",
        thumb: "/images/thumb5.png",
        title: "Footage Reel",
    },
    {
        src: "/videos/mpu1.mp4",
        thumb: "/images/thumb6.png",
        title: "Motion graphics the Public Ministry",
    },
    {
        src: "/videos/mpu3.mp4",
        thumb: "/images/thumb7.png",
        title: "Motion graphics the Public Ministry",
    },
    {
        src: "/videos/Squintz.mp4",
        thumb: "/images/thumb8.png",
        title: "Video Clip for a rock band",
    },
    {
        src: "/videos/Coralli1.mp4",
        thumb: "/images/thumb9.png",
        title: "Motion graphics example 1",
    },
    {
        src: "/videos/Coralli2.mp4",
        thumb: "/images/thumb10.png",
        title: "Motion graphics example 2",
    },
    {
        src: "/videos/Coralli3.mp4",
        thumb: "/images/thumb11.png",
        title: "Motion graphics example 2",
    },
    {
        src: "/videos/youtubeMotion.mp4",
        thumb: "/images/thumb12.png",
        title: "Motion graphics",
    }
];




function Videos() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedVideo, setSelectedVideo] = useState("/videos/video1.mp4"); //autoplays the first video

    function loadVideo(chosenVideo){
        setSelectedVideo(chosenVideo);
    }

    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
          videoRef.current.volume = 0.1;
        }
      }, []);

  return (

    <div className='bg-white border-8 border-white p-0 m-0 shadow-lg overflow-hidden flex flex-col'>
        <Image
          className='cursor-pointer'
          onClick={handleOpen}
          width={650}
          height={340}
          alt="videos"
          src={videosCover}
        />
        <h1 className='font-bold pt-4 pb-2 leading-5 cursor-pointer' onClick={handleOpen}>Motion Graphics Showcase: <br/> <span className='font-normal'>The Art of Animated Storytelling</span></h1>
        <div>
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                    timeout: 500,
                    },
                }}
                >
                <Fade in={open}>
                    <Box sx={mergedStyle}>
                        <div className='flex w-full lg:w-3/4 items-center bg-black'>
                            <video ref={videoRef} src={selectedVideo} controls muted autoplay='true' className='w-full h-full'></video>
                            <label id='main-info'></label>
                        </div>
                        <div className='flex flex-row lg:flex-col w-full lg:w-1/4 gap-4 overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto pb-4 lg:pr-4'>
                            {playlist.map((video, index) => (
                                <div key={index} className={`flex min-w-[80px] rounded-sm p-2 border ${selectedVideo == video.src ? 'border-gray-300 shadow-2xl' : 'border-gray-200 shadow-sm'}`}>
                                    <div onClick={() => loadVideo(video.src)}>
                                        <img src={video.thumb}></img>
                                        <div className='hidden lg:block text-xs md:text-sm font-regular text-black mt-2'>{video.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    </div>
  )
}

export default Videos
