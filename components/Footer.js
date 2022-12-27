import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa/';
import { FaTwitter } from 'react-icons/fa/';

export default function Footer() {
    return (
        
        <div className='container-lg pb-8 mb-0 bg-black bg-opacity-100 px-8 lg:px-0'>

            <img className='w-auto md:w-1/6 mx-auto pb-16 -mt-6' src="/images/csf.png" />
            
            <div className='flex flex-col max-w-screen-lg mx-auto justify-between items-end gap-10 text-white'>
                <div className='container grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 text-white'>

                    <div className='flex flex-col gap-4 grid-cols-1'>
                        <div className='text-xl font-bold'>Premiações</div>
                        <ul className='text-sm font-light'>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4 grid-cols-1'>
                        <div className='text-xl font-bold'>Publicações</div>
                        <ul className='text-sm font-light'>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4 grid-cols-1'>
                        <div className='text-xl font-bold'>Equipe</div>
                        <ul className='text-sm font-light'>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4 grid-cols-1'>
                        <div className='text-xl font-bold'>Saiba mais</div>
                        <ul className='text-sm font-light'>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='text-xl font-bold'>Notícias</div>
                        <ul className='text-sm font-light'>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                            <li>lsjkhfd</li>
                        </ul>
                    </div>

                </div>
                <div className='container border border-gray-400 text-gray-400 text-center p-4 mt-10'>
                    <div className='text-xl font-bold'>Disclaimer</div>
                    <div className='mt-4'>
                        A CSF não se responsabiliza pelas consequências do uso da calculadora
                    </div>
                </div>
                <div className='container flex justify-between mt-10'>
                    <div className='text-sm text-gray-500'>
                        &#169; CSF All rights reserved
                    </div>
                    <div className='flex gap-3 text-gray-500'>
                        <a className='hover:text-white' href='https://discord.gg/t2DjGc8y' target='_blank' rel='noreferrer'><FaDiscord size={24} /></a>
                        <a className='hover:text-white' href='https://twitter.com/ComusicIo' target='_blank' rel='noreferrer'><FaTwitter size={24} /> </a>
                    </div>
                </div>
            </div>

        </div>

    );
}



