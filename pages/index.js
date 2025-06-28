import Layout from '../components/Layout';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth > 0 && windowWidth < 768;
  
  // Refs for sections that will be animated
  const heroContentRef = useRef(null);
  const discoverMoreRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  
  // Animation states
  const [animatedSections, setAnimatedSections] = useState({
    heroContent: false,
    discoverMore: false,
    section1: false,
    section2: false,
    section3: false,
    section4: false
  });
  
  // Check if element is in viewport and should be animated
  const isElementInViewport = (element, offset = 150) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0 + offset
    );
  };
  
  // Update animation states based on scroll position
  const checkAnimations = () => {
    const updates = {};
    
    // Check each section and update if needed
    if (heroContentRef.current && !animatedSections.heroContent) {
      updates.heroContent = isElementInViewport(heroContentRef.current);
    }
    
    if (discoverMoreRef.current && !animatedSections.discoverMore) {
      updates.discoverMore = isElementInViewport(discoverMoreRef.current);
    }
    
    if (section1Ref.current && !animatedSections.section1) {
      updates.section1 = isElementInViewport(section1Ref.current, 100);
    }
    
    if (section2Ref.current && !animatedSections.section2) {
      updates.section2 = isElementInViewport(section2Ref.current, 100);
    }
    
    if (section3Ref.current && !animatedSections.section3) {
      updates.section3 = isElementInViewport(section3Ref.current, 100);
    }
    
    if (section4Ref.current && !animatedSections.section4) {
      updates.section4 = isElementInViewport(section4Ref.current, 100);
    }
    
    // If any updates needed, update state
    if (Object.keys(updates).length > 0) {
      setAnimatedSections(prev => ({
        ...prev,
        ...updates
      }));
    }
  };
  
  // Detect window width for responsive design
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      checkAnimations();
    };

    // Initial check for animations (for elements already in view on load)
    checkAnimations();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedSections]);

  // Image functions removed - no transition on first image

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
          height: '100%'
        }}>
          <Image
            src="/karthik_header_image_2.jpeg"
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
        flexDirection: 'row',
        justifyContent: isMobile ? 'center' : 'end',
        alignItems: isMobile ? 'center' : 'start',
        textAlign: 'center',
        padding: isMobile ? '1rem' : '2rem',
        color: 'white',
        width: isMobile ? '100%' : '85vw'
       }}>
        <div style={{
          background: 'transparent',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          border: 'none',
          maxWidth: isMobile ? '100%' : '600px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          transform: `translateY(${Math.min(scrollY * (isMobile ? 0.2 : 0.3), isMobile ? 50 : 100)}px)`,
          opacity: Math.max(1 - (scrollY / 800), 0),
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
         }} ref={heroContentRef}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #f57e42, #ff9933)',
            WebkitBackgroundClip: 'text',
            color: 'orange',
            backgroundClip: 'text',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
            Suraj Nalam
          </h1>
          {/* <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            Welcome to the official site of the Latest man alive.
          </p> */}
          
          {/* Call to Action Buttons */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.75rem' : '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <a href="/biography" style={{
              background: 'linear-gradient(135deg, #f57e42, #ff9933)',
              color: 'white',
              padding: isMobile ? '0.75rem 1.5rem' : '0.75rem 2rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 126, 66, 0.3)',
              width: isMobile ? '80%' : 'auto',
              display: 'inline-block'
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
              padding: isMobile ? '0.75rem 1.5rem' : '0.75rem 2rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              width: isMobile ? '80%' : 'auto',
              display: 'inline-block'
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

      {/* Discover Slide View */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))',
        marginTop: isMobile ? '3rem' : '4rem',
        boxSizing: 'border-box'
      }} ref={discoverMoreRef}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '700px',
          width: '100%',
          padding: isMobile ? '0.5rem' : '1rem',
          opacity: animatedSections.discoverMore ? 1 : 0,
          transform: animatedSections.discoverMore ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '800',
            marginBottom: '2rem',
            color: '#fff',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f57e42, #ff9933)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Discover More
          </h2>
          {/* Section 1 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            padding: isMobile ? '0.5rem' : '1rem',
            opacity: animatedSections.section1 ? 1 : 0,
            transform: animatedSections.section1 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }} ref={section1Ref}>
            <p style={{
              color: '#fff',
              lineHeight: '1.6',
              fontSize: isMobile ? '1rem' : '1.1rem',
              marginBottom: isMobile ? '1rem' : '1.5rem',
              textAlign: 'left'
            }}>
              My name is Suraj Nalam (Karthik), archery has been more than just a sport for me  it's been a journey of discipline, self-discovery, 
and unshakable love for the game. 
              </p>
            <p style={{
              color: '#fff',
              lineHeight: '1.6',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>
              
Over the past 10 years, I’ve grown from a curious beginner to an internationally competing archer, guided by incredible coaches 
and supported every step of the way by my amazing parents.
              </p>
            <p style={{
              color: '#fff',
              lineHeight: '1.6',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>
              How It All Began
	I picked up my first bow at the age of 4, and from the moment I let that first arrow fly, something clicked. 
	There was a quiet intensity, a sense of focus and calm, that I had never felt before.
</p>
            <p style={{
              color: '#fff',
              lineHeight: '1.6',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>
What started as a weekend activity quickly grew into a passion one that I knew I wanted to pursue seriously.
              </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
