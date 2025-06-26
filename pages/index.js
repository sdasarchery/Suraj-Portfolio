import Layout from '../components/Layout';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate zoom effect based on scroll position
  const getImageScale = () => {
    const maxScroll = 800; // Maximum scroll distance for effect
    const minScale = 0.8; // Minimum scale (80%)
    const maxScale = 1.2; // Maximum scale (120%)
    
    // Calculate scale: starts at maxScale, reduces to minScale as user scrolls
    const progress = Math.min(scrollY / maxScroll, 1);
    return maxScale - (progress * (maxScale - minScale));
  };

  // Calculate image position to keep it below header
  const getImageTransform = () => {
    const scale = getImageScale();
    const headerHeight = 140; // Account for fixed header height
    const translateY = Math.min(scrollY * 0.5, headerHeight);
    
    return `scale(${scale}) translateY(${translateY}px)`;
  };

  return (
    <Layout>
      {/* Fixed Background Image with Zoom Effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          transform: getImageTransform(),
          transformOrigin: 'center top',
          transition: 'transform 0.1s ease-out'
        }}>
          <Image
            src="/HomeMainImage.png"
            alt="Suraj Nalam Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
            priority
            quality={85}
          />
        </div>
        {/* Dynamic Overlay that gets darker on scroll */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `rgba(0, 0, 0, ${0.3 + (scrollY / 1000) * 0.4})`,
          zIndex: 1,
          transition: 'background 0.1s ease-out'
        }} />
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        color: 'white'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          maxWidth: '600px',
          width: '100%',
          transform: `translateY(${Math.min(scrollY * 0.3, 100)}px)`,
          opacity: Math.max(1 - (scrollY / 800), 0),
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #f57e42, #ff9933)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
            Suraj Nalam
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            Welcome to the official site of the latest man alive.
          </p>
          
          {/* Call to Action Buttons */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/biography" style={{
              background: 'linear-gradient(135deg, #f57e42, #ff9933)',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 126, 66, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(245, 126, 66, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(245, 126, 66, 0.3)';
            }}>
              Learn More
            </a>
            <a href="/achievements" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}>
              View Achievements
            </a>
          </div>
        </div>
      </div>

      {/* Additional Content Section for Scroll Demo */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(15px)',
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '2rem',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            Discover More
          </h2>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            color: '#fff',
            opacity: 1,
            fontWeight: '500',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Welcome to my personal space on the web. Here you'll find insights into my journey, achievements, and the experiences that have shaped who I am today. Explore the different sections to learn more about my story, view my accomplishments, and get a glimpse into my world through photos and media.
          </p>
        </div>
      </div>
    </Layout>
  );
}
