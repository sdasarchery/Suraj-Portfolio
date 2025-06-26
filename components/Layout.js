import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>      <nav style={{ 
        padding: '1rem', 
        background: isScrolled ? '#f57e42' : 'transparent', 
        color: '#fff', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease'
      }}>{/* Logo - Left on desktop, centered on mobile */}
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center'
        }} className="logo-link" onClick={closeMenu}>
          <Image 
            src="/archery_target.png" 
            alt="SurajBlog Logo" 
            width={100}
            height={100}
            style={{ borderRadius: '4px' }}
          />
        </Link>        {/* Desktop Navigation - Centered */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }} className="desktop-nav">
          <Link href="/biography" style={{ marginRight: 20, color: isScrolled ? '#fff' : '#ff6b35', textDecoration: 'none', transition: 'color 0.3s ease' }}>Biography</Link>
          <Link href="/achievements" style={{ marginRight: 20, color: isScrolled ? '#fff' : '#ff6b35', textDecoration: 'none', transition: 'color 0.3s ease' }}>Achievements</Link>
          <Link href="/media" style={{ marginRight: 20, color: isScrolled ? '#fff' : '#ff6b35', textDecoration: 'none', transition: 'color 0.3s ease' }}>Media</Link>
          <Link href="/contact" style={{ color: isScrolled ? '#fff' : '#ff6b35', textDecoration: 'none', transition: 'color 0.3s ease' }}>Contact</Link>
        </div>

        {/* Right spacer for desktop to balance layout */}
        <div style={{ width: '60px' }} className="right-spacer"></div>        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: 'none',
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
        {isMenuOpen && (          <div style={{
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
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 60px !important;
            height: 60px !important;
          }
          .logo-link img {
            width: 60px !important;
            height: 60px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
          .right-spacer {
            width: 25vw !important;
          }
          .logo-link {
            position: static !important;
            left: auto !important;
            transform: none !important;
            width: 25vw !important;
            height: auto !important;
          }
          .logo-link img {
            width: 100% !important;
            height: auto !important;
            max-height: 80px !important;
            object-fit: contain !important;
          }
        }
      `}</style>

      <main style={{ paddingTop: '140px', padding: '140px 2rem 2rem 2rem' }}>{children}</main>
    </>
  );
}