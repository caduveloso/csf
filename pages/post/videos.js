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
    width: '60%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: 1,
    boxShadow: 12,
    p: 4,
    outline: 'none',
    display: 'flex',
    gap: 4, 
  };


//create array with videos here

const playlist = [
    {
        src: "/videos/video1.mp4",
        title: "teste video 1",
    },
    {
        src: "/videos/video2.mp4",
        title: "teste video 2",
    }
];




function videos() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedVideo, setSelectedVideo] = useState("/videos/video1.mp4");

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
        <h1 className='font-bold pt-4 pb-2 leading-5 cursor-pointer' onClick={handleOpen}>Video and animation work</h1>
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
                    <Box sx={style}> 
                        <div className='flex w-3/4 items-center bg-black'>
                            <video ref={videoRef} src={selectedVideo} controls muted autoplay='true'></video>
                            <label id='main-info'></label>
                        </div>
                        <div className='flex flex-col w-1/4 gap-4'>
                            {playlist.map((video, index) => (
                                <div className={`flex rounded-sm p-2 border ${selectedVideo == video.src ? 'border-gray-300 shadow-2xl' : 'border-gray-200 shadow-sm'}`}>
                                    <div key={index} onClick={() => loadVideo(video.src)} className=''>
                                        <video src={video.src} muted></video>
                                        <div className='text-sm font-regular text-black mt-2'>{video.title}</div>
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

export default videos
