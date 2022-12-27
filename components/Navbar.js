import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='container-lg py-8 mb-10 px-5 lg:px-0 bg-black bg-opacity-100'>

            <div className='flex-none md:flex max-w-screen-lg mx-auto justify-between'>

                <div className='justify-start items-end'> {/*Left area*/}

                    <div className='flex items-baseline'>
                        <button>
                            <Link href='/'>
                            <Image className='w-24 md:w-24' width="0" height="0" src="/images/logo.svg" alt="Comusic" />
                            </Link>
                        </button>
                    </div>

                </div>



                <div className='flex gap-6 md:gap-8 justify-start md:justify-end items-end pt-8 md:pt-0 text-gray-400 hover:text-white hover:underline underline-offset-8'> {/*Right area*/}

                    <ul className='block gap-4'>
                        <li><Link href="/">Visit our blog</Link></li>  
                    </ul>

                </div>

            </div>

        </div>

    );
}

