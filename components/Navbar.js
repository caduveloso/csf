import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='sticky items-center top-0 flex py-6 lg:py-4 pl-4 pr-6 lg:h-24 bg-black bg-opacity-90 z-10'>

            <div className='w-full flex-none md:flex justify-between'>

                <div className='flex w-full justify-start gap-12 items-center ml-3'> {/*Left area*/}

                    <div className='flex items-baseline mb-1'>
                        <button>
                            <Link href='/'>
                                <span className='text-2xl lg:text-2xl text-white font-bold'>Cadu</span><span className='ml-[2px] text-2xl lg:text-2xl text-white font-thin'>Veloso</span>
                            </Link>
                        </button> 
                    </div>
                    <span className='text-white w-full tracking-wider leading-6 pb-1 pl-12 border-l border-white block'>
                        <span className='font-bold text-xl lg:text-2xl'>Graphic Design & web Development</span>
                        <br/>
                        <span className='font-thin text-xs lg:text-sm'>Curated Showcase of my Latest Work</span>
                    </span>
                    {/* <span className='block lg:hidden items-center gap-[2px] text-white text-xs w-full tracking-wider leading-4 pb-1 pl-5 border-l border-white'>
                        <span className='font-bold'>design</span> <br/> <span className='font-bold'>code</span>
                    </span> */}

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

