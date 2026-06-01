import Navbar from './Navbar';
import Footer from './Footer';
import Reveal from './Reveal';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Reveal />
      <Navbar />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
}
