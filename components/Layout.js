import Navbar from './Navbar'
//import Footer from './Footer'

export default function Layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='w-full mx-auto flex-1'>{children}</main>
            
        </div>
    );
}