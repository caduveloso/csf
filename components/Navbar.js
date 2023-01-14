import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='sticky top-0 flex py-4 px-6 bg-black bg-opacity-90 z-10'>

            <div className='w-full flex-none md:flex justify-between'>

                <div className='justify-start items-end'> {/*Left area*/}

                    <div className='flex items-baseline'>
                        <button>
                            <Link href='/'>
                            <Image className='w-16 md:w-16' width="0" height="0" src="/images/logo.svg" alt="Comusic" />
                            </Link>
                        </button>
                        
                    </div>

                </div>



                <div className='justify-start md:justify-end items-end md:pt-0 hidden md:flex'> {/*Right area*/}

                    <ul className='flex gap-6 text-gray-100 text-xs tracking-widest font-semibold uppercase'> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Experience</Link></li> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Contact</Link></li>
                    </ul>

                </div>

            </div>

        </div>

    );
}

