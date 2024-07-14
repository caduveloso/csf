import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='sticky items-center top-0 flex py-6 lg:py-4 pl-4 pr-6 lg:h-24 bg-black bg-opacity-90 z-10'>

            <div className='w-full flex-none md:flex justify-between'>

                <div className='flex flex-col lg:flex-row w-full justify-center lg:justify-start gap-0 lg:gap-12 items-start lg:items-center ml-0 lg:ml-3 mt-2 lg:mt-0'> {/*Left area*/}

                    <div className='flex items-center gap-4 mb-0 lg:mb-1'>
                        {/* <div>
                            <Image src={"/logo.png"} width={80} height={80}/>
                        </div> */}
                        <button>
                            <Link href='/'>
                                <span className='text-2xl lg:text-2xl text-white font-bold leading-3'>Cadu</span><span className='ml-[2px] text-2xl lg:text-2xl text-white font-thin leading-3'>Veloso</span>
                            </Link>
                        </button> 
                    </div>
                    <span className='text-white w-full tracking-wider leading-none pb-1 pl-0 lg:pl-12 lg:border-l border-white items-start flex flex-col'>
                        <span className='font-normal lg:font-bold text-base lg:text-2xl text-left lg:text-left'>Graphic Design & web Development</span>
                        <span className='font-thin text-xs lg:text-sm leading-none mt-2 lg:mt-0 hidden lg:block'>Curated Showcase of my Latest Work</span>
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

