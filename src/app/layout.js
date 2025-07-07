import Header from '@/components/header';
import Footer from '@/components/footer';
import ParticleBackground from '@/components/ParticleBackground';
import './globals.css';

export const metadata = {
  title: "Mouli's Portfolio",
  description: 'Portfolio of Mouli, a Frontend Engineer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          margin: 0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: "'Inter', sans-serif",
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        <ParticleBackground />
        <Header />
        <main
          style={{ flexGrow: 1, zIndex: 1, paddingTop: '80px', paddingBottom: '60px' }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}