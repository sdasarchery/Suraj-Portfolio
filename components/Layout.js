import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNavLinks, setHideNavLinks] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
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
      setIsScrolled(currentScrollPos > 50);
      
      // Determine if we should hide the nav links
      // Hide when scrolling down and beyond threshold, show when scrolling up
      setHideNavLinks(currentScrollPos > 100 && currentScrollPos > prevScrollPos);
      
      // Update previous scroll position
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>      <nav style={{ 
        padding: '0.5rem', // Reduced padding to make the header shorter
        background: 'transparent', // Always transparent
        color: '#fff', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        height: '60px', // Explicitly set a shorter height
        backdropFilter: isScrolled ? 'blur(10px)' : 'none', // Add slight blur when scrolled for better readability
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none' // Subtle shadow when scrolled
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
            src="/archery_target.png" 
            alt="SurajBlog Logo" 
            width={70}
            height={50}
            style={{ borderRadius: '4px' }}
          />
        </Link>        {/* Desktop Navigation - Right Aligned */}
        <div style={{ 
          display: hideNavLinks ? 'none' : 'flex', 
          alignItems: 'center',
          marginLeft: 'auto', // Push to the right
          opacity: hideNavLinks ? 0 : 1,
          transition: 'opacity 0.3s ease, display 0s ease 0.3s'
        }} className="desktop-nav">
          <Link href="/biography" style={{ marginRight: 20, color: '#ff6b35', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Biography</Link>
          <Link href="/achievements" style={{ marginRight: 20, color: '#ff6b35', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Achievements</Link>
          <Link href="/media" style={{ marginRight: 20, color: '#ff6b35', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Media</Link>
          <Link href="/contact" style={{ color: '#ff6b35', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Contact</Link>
        </div>

        {/* No spacer needed with our new layout */}        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: hideNavLinks ? 'none' : 'none', // Still "none" by default for desktop, but will show on mobile via CSS
            background: 'none',
            border: 'none',
            color: isScrolled ? '#fff' : '#ff6b35',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.3s ease'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>{/* Mobile Navigation Menu */}
        {isMenuOpen && !hideNavLinks && (          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: isScrolled ? '#ffb366' : 'rgba(255, 179, 102, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            borderTop: '1px solid #ff9933',
            zIndex: 1000,
            backdropFilter: 'blur(10px)'
          }} className="mobile-nav">
            <Link 
              href="/biography" 
              style={{ color: '#fff', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid #333' }}
              onClick={closeMenu}
            >
              Biography
            </Link>
            <Link 
              href="/achievements" 
              style={{ color: '#fff', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid #333' }}
              onClick={closeMenu}
            >
              Achievements
            </Link>
            <Link 
              href="/media" 
              style={{ color: '#fff', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid #333' }}
              onClick={closeMenu}
            >
              Media
            </Link>
            <Link 
              href="/contact" 
              style={{ color: '#fff', textDecoration: 'none', padding: '0.75rem 0' }}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>      {/* CSS for responsive behavior */}      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            background: #f57e42 !important;
          }
          main {
            padding-top: 2rem !important;
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
          }
          .right-spacer {
            display: none;
          }
          .logo-link {
            position: static !important;
            left: auto !important;
            transform: none !important;
            width: 50px !important;
            height: 40px !important;
          }
          .logo-link img {
            width: 50px !important;
            height: 40px !important;
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

      <main style={{ paddingTop: '80px', padding: '80px 2rem 2rem 2rem' }}>{children}</main>
    </>
  );
}