import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  const navSurface = isScrolled || isMenuOpen ? 'rgba(11, 11, 11, 0.85)' : 'transparent';
  const navBorder = isScrolled || isMenuOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none';
  const navShadow = isScrolled || isMenuOpen ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none';
  const navBlur = isScrolled || isMenuOpen ? 'blur(10px)' : 'none';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/media', label: 'Gallery' },
    { href: '/contact', label: 'Q&A' }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      // Set isScrolled for background color change
      setIsScrolled(currentScrollPos > 20);
      setHideNavBar(currentScrollPos > 80 && currentScrollPos > prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>      <nav style={{ 
        padding: '0.5rem', // Reduced padding to make the header shorter
        background: navSurface,
        color: '#fff', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        transform: hideNavBar ? 'translateY(-110%)' : 'translateY(0)',
        opacity: hideNavBar ? 0 : 1,
        pointerEvents: hideNavBar ? 'none' : 'auto',
        transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, border-bottom 0.3s ease',
        height: '60px', // Explicitly set a shorter height
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        boxShadow: navShadow,
        backgroundColor: navSurface,
        borderBottom: navBorder
      }}>{/* Logo - Left on desktop, centered on mobile */}
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center',
          position: 'static',
          left: 'auto',
          transform: 'none',
          transition: 'all 0.3s ease'
        }} className="logo-link" onClick={closeMenu}>
          <Image 
            src="/logo2.png"

            alt="SurajBlog Logo" 
            width={140}
            height={70}
          />
        </Link>        {/* Desktop Navigation - Right Aligned */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginLeft: 'auto', // Push to the right
          opacity: 1,
          transition: 'opacity 0.3s ease'
        }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={closeMenu}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* No spacer needed with our new layout */}        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: 'none', // Hidden on desktop, shown on mobile via CSS
            background: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: '5px',
            color: '#ff6b35',
            fontSize: '1.8rem',
            cursor: 'pointer',
            padding: '0.5rem 0.7rem',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>        {/* Mobile Navigation Menu */}
        {isMenuOpen && (          <div style={{
            position: 'fixed', // Changed from absolute to fixed
            top: '60px', // Match the header height
            left: '0',
            right: '0',
            background: 'rgba(11, 11, 11, 0.95)', // Slightly darker for better contrast
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem', // Increased padding for better tap targets
            borderBottom: '1px solid rgba(255, 153, 51, 0.3)',
            zIndex: 1000,
            backdropFilter: 'blur(15px)', // Increased blur
            WebkitBackdropFilter: 'blur(15px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' // Added shadow for depth
          }} className="mobile-nav">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="mobile-nav-link"
                onClick={closeMenu}
                style={{ textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>      {/* CSS for responsive behavior */}      <style jsx>{`
        .desktop-nav {
          gap: 1.5rem;
        }
        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0;
          color: #fff !important;
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          font-size: clamp(0.9rem, 1vw, 1.02rem);
          font-weight: 800;
          letter-spacing: 0.035em;
          text-transform: uppercase;
          text-decoration: none !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.55);
          background: transparent !important;
          transition: color 0.2s ease;
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          color: #fff !important;
          background: transparent !important;
          text-decoration: none !important;
        }
        .mobile-nav-link {
          color: #fff !important;
          text-decoration: none;
          padding: 1rem 0;
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          font-size: 1.05rem;
          font-weight: 900;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          background: transparent !important;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link:focus-visible {
          color: #fff !important;
          background: transparent !important;
          text-decoration: none !important;
        }
        @media (max-width: 768px) {
          nav {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 60px !important;
          }
          .inner-main {
            padding-top: 0 !important;
          }
          .home-main {
            padding-top: 0 !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
            position: absolute !important;
            right: 1rem !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 1005 !important;
          }
          .right-spacer {
            display: none;
          }
          .logo-link {
            position: static !important;
            left: auto !important;
            transform: none !important;
            width: 80px !important;
            height: 40px !important;
          }
          .logo-link img {
            width: 80px !important;
            height: 40px !important;
            object-fit: contain !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
          /* Removed right spacer */
          .logo-link {
            position: static !important;
            left: auto !important;
            transform: none !important;
            width: auto !important;
            height: auto !important;
            transition: all 0.3s ease !important;
       }
          .logo-link img {
            width: 70px !important;
            height: 50px !important;
            max-height: 50px !important;
            object-fit: contain !important;
          }
        }
      `}</style>

      <main
        className={isHomePage ? 'home-main' : 'inner-main'}
        style={{
          padding: '0 0 2rem 0',
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          overflowX: 'hidden'
        }}
      >
        {children}
      </main>
    </>
  );
}