import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
    return (
        <div className= 'bg-auto bg-center pb-10' style={{ backgroundImage: `url("/images/bg1_blur.jpg")`  }}>
            <div className='flex flex-col min-h-screen max-w-screen-2xl mx-auto border-l-8 border-r-8 border-black bg-white bg-opacity-100'>
                <Navbar />
                <main className='w-full mx-auto flex-1'>{children}</main>
                <Footer />
            </div>
        </div>
    );
}