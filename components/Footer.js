import Image from 'next/image'
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa/';
import { FaTwitter } from 'react-icons/fa/';

export default function Footer() {
    return (
        
        <div className='container-lg p-0 mb-0 bg-black bg-opacity-0 px-0 lg:px-0'>

            
            <div className='flex flex-col mx-auto gap-0 text-white'>
                <div className='flex justify-between gap-8 md:gap-0 p-10 text-xs tracking-widest font-semibold uppercase text-gray-900 text-center'>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Calculadora</Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Sobre</Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Guia de uso</Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Metodologia </Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Publicações</Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Equipe </Link></div>
                    </div>

                    <div className='flex'>
                        <div className='hover:underline underline-offset-8 hover:text-black'><Link href="/">Contato</Link></div>
                    </div>

                </div>
                
                <div className='container-lg flex justify-between items-end px-10 py-6 bg-black'>
                    <div className='text-sm text-white'>
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



