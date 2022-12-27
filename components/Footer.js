import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa/';
import { FaTwitter } from 'react-icons/fa/';

export default function Footer() {
    return (

        <div className='container-lg pt-8 pb-4 mb-0 bg-black bg-opacity-100 px-8 lg:px-0'>
            <div className='flex max-w-screen-lg mx-auto justify-between items-end text-gray-400'>
                <div className='text-sm text-gray-500'>
                    &#169; Comusic 2022
                </div>
                <div className='flex gap-3'>   
                    <a className='hover:text-white' href='https://discord.gg/t2DjGc8y' target='_blank' rel='noreferrer'><FaDiscord size={34}/></a>
                    <a className='hover:text-white' href='https://twitter.com/ComusicIo' target='_blank' rel='noreferrer'><FaTwitter size={34}/> </a> 
                </div>
            </div>
        </div>

    );
}



