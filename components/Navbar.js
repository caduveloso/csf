import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='sticky items-center top-0 flex py-4 px-6 h-24 bg-black bg-opacity-90 z-10'>

            <div className='w-full flex-none md:flex justify-between'>

                <div className='flex w-full justify-start gap-6 items-end'> {/*Left area*/}

                    <div className='flex items-baseline'>
                        <button>
                            <Link href='/'>
                            <span className='text-2xl lg:text-4xl text-white font-bold uppercase'>Cadu</span><span className='ml-1 text-2xl lg:text-4xl text-white font-thin uppercase'>Veloso</span>
                            </Link>
                        </button> 
                    </div>
                    <span className='text-white text-xs w-full tracking-wider leading-4 pb-1 pl-5 border-l border-white hidden lg:block'>
                        <span>Curated Showcase of my Latest Work as a Graphic Designer, Motion Artist and Front-End Developer:</span> <br/> <span className='font-bold'>A Valuable Fusion of Design and Development Expertise</span>
                    </span>

                </div>



                <div className='justify-start md:justify-end items-start md:pt-0 hidden md:flex'> {/*Right area*/}

                    <ul className='flex gap-4 text-gray-100 text-xs tracking-widest font-semibold uppercase'> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">About</Link></li> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Contact</Link></li>
                    </ul>

                </div>

            </div>

        </div>

    );
}

