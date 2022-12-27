import Image from 'next/image'
import Link from 'next/link';

export default function Navbar() {
    return (

        <div className='container-lg py-4 mb-0 px-5 lg:px-0 bg-black bg-opacity-70 z-10'>

            <div className='flex-none md:flex max-w-screen-lg mx-auto justify-between'>

                <div className='justify-start items-end'> {/*Left area*/}

                    <div className='flex items-baseline'>
                        <button>
                            <Link href='/'>
                            <Image className='w-16 md:w-16' width="0" height="0" src="/images/logo.svg" alt="Comusic" />
                            </Link>
                        </button>
                        
                    </div>

                </div>



                <div className='justify-start md:justify-end items-end pt-8 md:pt-0 hidden md:flex'> {/*Right area*/}

                    <ul className='flex gap-6 text-gray-400 font-thin'>
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Calculadora</Link></li>
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Estudos de caso</Link></li> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Publicações</Link></li>
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Equipe</Link></li> 
                        <li className='hover:underline underline-offset-8 hover:text-white'><Link href="/">Contato</Link></li>
                    </ul>

                </div>

            </div>

        </div>

    );
}

