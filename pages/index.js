import Layout from '../components/Layout';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Define keyframe animations for slide effects
const slideAnimationStyles = `
  @keyframes slideInFromRight {
    0% {
      transform: translateX(80px);
      opacity: 0;
    }
    20% {
      opacity: 0.4;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-80px);
      opacity: 0;
    }
    20% {
      opacity: 0.4;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInFromBottom {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    20% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes scaleUp {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes float {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: 15px 15px;
    }
  }
  
  .animated {
    animation-duration: 1.2s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: transform, opacity;
  }
  
  .slide-right {
    animation-name: slideInFromRight;
  }
  
  .slide-left {
    animation-name: slideInFromLeft;
  }
  
  .slide-up {
    animation-name: slideInFromBottom;
  }
  
  .fade-in {
    animation-name: fadeIn;
  }
  
  .scale-up {
    animation-name: scaleUp;
  }
  
  .delay-200 {
    animation-delay: 200ms;
  }
  
  .delay-400 {
    animation-delay: 400ms;
  }
  
  .delay-600 {
    animation-delay: 600ms;
  }
  
  .delay-800 {
    animation-delay: 800ms;
  }
  
  .image-spotlight:hover {
    transform: translateY(-8px) !important;
  }

  /* Full screen slide styles */
  .slide-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100vw;
    overflow: hidden;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    padding: 0;
    box-sizing: border-box;
    scroll-snap-align: start;
    transition: background-color 0.7s ease;
  }
  
  /* Parallax background decorations */
  .parallax-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
  }
  
  /* Fixed parallax tile background */
  .parallax-tile-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 500px 500px;
    z-index: 0;
    opacity: 0.05;
    pointer-events: none;
    transition: transform 0.05s ease-out;
    will-change: transform, background-position;
    background-position: 0 0;
  }
  
  .dark-section .parallax-tile-bg {
    background-image: linear-gradient(45deg, #f57e42 25%, transparent 25%), 
                      linear-gradient(-45deg, #f57e42 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #f57e42 75%),
                      linear-gradient(-45deg, transparent 75%, #f57e42 75%);
  }
  
  .light-section .parallax-tile-bg {
    background-image: linear-gradient(45deg, #333 25%, transparent 25%), 
                      linear-gradient(-45deg, #333 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #333 75%),
                      linear-gradient(-45deg, transparent 75%, #333 75%);
  }
  
  .slide-section-content {
    max-width: 1200px;
    width: 100%;
    padding: 2rem;
    z-index: 2;
    position: relative;
    margin: 0 auto;
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .slide-section {
      padding: 6rem 0 3rem; /* Add top padding for header space */
      min-height: calc(100vh - 60px); /* Account for fixed header */
      scroll-snap-align: none; /* Disable scroll-snap on mobile for smoother scrolling */
    }
    
    .slide-section-content {
      padding: 1.5rem;
      width: calc(100% - 2rem);
    }
    
    /* Add smooth scroll buffer for mobile */
    html, body {
      scroll-behavior: smooth;
      scroll-padding-top: 60px; /* Account for fixed header height */
    }
    
    /* Improved buttons */
    .slide-button {
      width: 85%;
      padding: 0.9rem 1.5rem;
      font-size: 1.05rem;
      margin: 0.5rem auto;
    }
    
    .slide-button-outline {
      width: 85%;
      padding: 0.9rem 1.5rem;
      font-size: 1.05rem;
      margin: 0.5rem auto;
    }
    
    /* Mobile text optimizations */
    h1 {
      font-size: clamp(2rem, 8vw, 3rem) !important;
      margin-bottom: 1rem !important;
    }
    
    h2 {
      font-size: clamp(1.5rem, 6vw, 2.5rem) !important;
      margin-bottom: 1rem !important;
    }
    
    h3 {
      font-size: clamp(1.3rem, 5vw, 2rem) !important;
      margin-bottom: 1rem !important;
    }
    
    p {
      font-size: 1rem !important;
      line-height: 1.6 !important;
      margin-bottom: 1.5rem !important;
    }
    
    .slide-section {
      gap: 1.5rem !important;
    }
    
    .slide-section-content > div {
      gap: 2rem !important;
    }
    
    /* Mobile image container optimizations - Enhanced */
    .mobile-image-container {
      display: block !important;
      position: relative !important;
      width: 100% !important;
      height: 400px !important;
      min-height: 400px !important;
      max-height: 400px !important;
      flex: 1 0 100% !important;
      order: 2 !important;
      margin: 1rem 0 !important;
      background-color: rgba(255,255,255,0.05) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      overflow: visible !important;
    }
    
    .mobile-image-container > span {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
    }
    
    .mobile-image-container img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center !important;
      position: relative !important;
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    .image-spotlight {
      min-height: 400px !important;
      height: 400px !important;
      width: 100% !important;
      flex: 1 0 100% !important;
    }
    
    div[style*="minHeight: '400px'"] {
      min-height: 300px !important;
    }
    
    div[style*="order: isMobile"] {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }

  .dark-section {
    background-color: #111;
    color: #fff;
  }

  .light-section {
    background-color: #fff;
    color: #111;
  }

  .accent-text {
    background: linear-gradient(135deg, #f57e42, #ff9933);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  /* Better navigation dots */
  .slide-nav {
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 15px 10px;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
  }

  .slide-nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slide-nav-dot.active {
    background-color: #f57e42;
    transform: scale(1.4);
    box-shadow: 0 0 10px rgba(245, 126, 66, 0.7);
  }
  
  /* Better scroll behavior */
  html {
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
  }
  
  /* Improved buttons */
  .slide-button {
    background: linear-gradient(135deg, #f57e42, #ff9933);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(245, 126, 66, 0.3);
    display: inline-block;
    text-align: center;
  }
  
  /* Mobile optimizations for buttons */
  @media (max-width: 768px) {
    .slide-button {
      width: 85%;
      padding: 0.9rem 1.5rem;
      font-size: 1.05rem;
      margin: 0.5rem auto;
    }
    
    .slide-button-outline {
      width: 85%;
      padding: 0.9rem 1.5rem;
      font-size: 1.05rem;
      margin: 0.5rem auto;
    }
  }
  
  .slide-button:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 25px rgba(245, 126, 66, 0.4);
  }
  
  .slide-button-outline {
    background: transparent;
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 2px solid rgba(245, 126, 66, 0.7);
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: inline-block;
    text-align: center;
  }
  
  .slide-button-outline:hover {
    background: rgba(245, 126, 66, 0.1);
    transform: translateY(-3px) scale(1.03);
  }
  
  /* Parallax content elements */
  .parallax-content {
    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
  }
  
  /* First Slide - Light (How It All Began) - Ensure no overflow */
  .light-section {
    overflow: hidden !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .light-section .slide-section-content {
    overflow: hidden !important;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 100vh;
  }
`;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for sections that will be animated
  const heroContentRef = useRef(null);
  const discoverMoreRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  
  // Refs for parallax elements
  const parallaxRefs = {
    hero1: useRef(null),
    hero2: useRef(null),
    discover1: useRef(null),
    discover2: useRef(null),
    section1Left: useRef(null),
    section1Right: useRef(null),
    section2Left: useRef(null),
    section2Right: useRef(null),
    section3Top: useRef(null),
    section3Bottom: useRef(null),
    section4Left: useRef(null),
    section4Right: useRef(null)
  };
  
  // Animation states
  const [animatedSections, setAnimatedSections] = useState({
    heroContent: false,
    discoverMore: false,
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false
  });
  
  // Logic for slide navigation
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Determine which section is currently visible
  const [activeSection, setActiveSection] = useState(0);
  
  // Check if element is in viewport and should be animated
  const isElementInViewport = (element, offset = 150) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= 0 + offset
    );
  };
  
  // Enhanced parallax effect calculation based on scroll position with variable depths
  const updateParallaxElements = () => {
    // Update parallax tile backgrounds
    document.querySelectorAll('.parallax-tile-bg').forEach((el) => {
      const parentRect = el.parentElement.getBoundingClientRect();
      const scrollProgress = -parentRect.top / 10; // Subtle effect
      el.style.backgroundPosition = `${scrollProgress}px ${scrollProgress}px`;
    });
    
    // Update parallax decorative elements with variable depths
    document.querySelectorAll('.parallax-decoration').forEach((el) => {
      const depth = el.dataset.parallaxDepth ? parseFloat(el.dataset.parallaxDepth) / 100 : 0.1;
      const parentRect = el.parentElement.getBoundingClientRect();
      
      if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
        // Calculate parallax offset based on element's position in viewport
        const scrollProgress = -parentRect.top * depth;
        const originalTransform = el.dataset.originalTransform || 'none';
        
        // Apply transform while preserving original rotation/scale
        if (originalTransform !== 'none' && !originalTransform.includes('translate3d')) {
          el.style.transform = `translate3d(0, ${scrollProgress}px, 0) ${originalTransform}`;
        } else {
          el.style.transform = `translate3d(0, ${scrollProgress}px, 0)`;
        }
      }
    });
    
    // Update other parallax elements
    Object.entries(parallaxRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const centerX = rect.left + rect.width / 2;
        const distanceFromCenterY = centerY - window.innerHeight / 2;
        const distanceFromCenterX = centerX - window.innerWidth / 2;
        
        if (isElementInViewport(ref.current, -100)) {
          const intensity = key.includes('hero') ? 0.1 : 0.05;
          const factor = key.includes('Left') || key.includes('Right') ? 0.5 : 0.3;
          
          // Keep content elements static by commenting out this transformation
          // ref.current.style.transform = `translate3d(${-distanceFromCenterX * intensity}px, ${-distanceFromCenterY * intensity}px, 0) scale(1)`;
        }
      }
    });
  };
  
  // Enhanced parallax effect based on mouse movement with variable depths
  const handleMouseMove = (e) => {
    if (isMobile) return; // Skip parallax on mobile
    
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    
    setMousePosition({ x: moveX, y: moveY });
    
    // Apply parallax effect to background tile elements
    document.querySelectorAll('.parallax-tile-bg').forEach((el) => {
      const intensity = 0.5;
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translate3d(${moveX * intensity}px, ${moveY * intensity}px, 0)`;
      }
    });
    
    // Apply parallax effect to decorative elements with variable depth
    document.querySelectorAll('.parallax-decoration').forEach((el) => {
      const depth = el.dataset.parallaxDepth ? parseFloat(el.dataset.parallaxDepth) / 100 : 0.1;
      const rect = el.parentElement.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate movement based on depth parameter
        const xOffset = moveX * depth;
        const yOffset = moveY * depth;
        
        // Apply the transform
        el.style.transform = el.style.transform.includes('rotate') || el.style.transform.includes('scale')
          ? `translate3d(${xOffset}px, ${yOffset}px, 0) ${el.style.transform}` // Preserve existing transforms
          : `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }
    });
    
    // Keep content static - skip applying transform to content elements
    /*
    Object.entries(parallaxRefs).forEach(([key, ref]) => {
      if (ref.current && isElementInViewport(ref.current, -200)) {
        const intensity = key.includes('1') ? 0.7 : 0.4;
        const xFactor = key.includes('Left') ? -1 : key.includes('Right') ? 1 : 0.5;
        const yFactor = key.includes('Top') ? -1 : key.includes('Bottom') ? 1 : 0.5;
        
        ref.current.style.transform = `translate3d(${moveX * intensity * xFactor}px, ${moveY * intensity * yFactor}px, 0)`;
      }
    });
    */
  };
  
  // Check which section is most visible in the viewport
  const updateActiveSection = () => {
    const sections = [
      { ref: heroContentRef, index: 0 },
      { ref: discoverMoreRef, index: 1 },
      { ref: section1Ref, index: 2 },
      { ref: section2Ref, index: 3 },
      { ref: section3Ref, index: 4 },
      { ref: section4Ref, index: 5 },
      { ref: section5Ref, index: 6 }
    ];
    
    let mostVisibleSection = { index: 0, visibleArea: 0 };
    
    sections.forEach(section => {
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleArea = Math.max(0, visibleHeight / window.innerHeight);
        
        if (visibleArea > mostVisibleSection.visibleArea) {
          mostVisibleSection = { index: section.index, visibleArea };
        }
      }
    });
    
    setActiveSection(mostVisibleSection.index);
  };
  
  // Update animation states based on scroll position
  const checkAnimations = () => {
    // Only check animations that haven't been triggered yet
    const updates = {};
    
    // Check each section and update if needed
    if (heroContentRef.current && !animatedSections.heroContent) {
      if (isElementInViewport(heroContentRef.current, 50)) {
        updates.heroContent = true;
      }
    }
    
    if (discoverMoreRef.current && !animatedSections.discoverMore) {
      if (isElementInViewport(discoverMoreRef.current, 200)) {
        updates.discoverMore = true;
      }
    }
    
    // For full-screen slide sections, use larger offsets to trigger animations earlier
    if (section1Ref.current && !animatedSections.section1) {
      if (isElementInViewport(section1Ref.current, 250)) {
        updates.section1 = true;
      }
    }
    
    if (section2Ref.current && !animatedSections.section2) {
      if (isElementInViewport(section2Ref.current, 250)) {
        updates.section2 = true;
      }
    }
    
    if (section3Ref.current && !animatedSections.section3) {
      if (isElementInViewport(section3Ref.current, 250)) {
        updates.section3 = true;
      }
    }
    
    if (section4Ref.current && !animatedSections.section4) {
      if (isElementInViewport(section4Ref.current, 250)) {
        updates.section4 = true;
      }
    }
    
    if (section5Ref.current && !animatedSections.section5) {
      if (isElementInViewport(section5Ref.current, 250)) {
        updates.section5 = true;
      }
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
    // Throttled scroll handler to improve performance
    let lastScrollTime = 0;
    const scrollThreshold = 50; // ms between scroll events
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > scrollThreshold) {
        setScrollY(window.scrollY);
        checkAnimations();
        updateActiveSection();
        updateParallaxElements();
        lastScrollTime = now;
      }
    };

    // Enhanced initial check for animations and parallax setup
    setTimeout(() => {
      checkAnimations();
      updateActiveSection();
      updateParallaxElements();
      
      // Initialize parallax tile backgrounds
      document.querySelectorAll('.parallax-tile-bg').forEach(el => {
        // Set initial position
        el.style.backgroundPosition = '0px 0px';
      });
      
      // Initialize parallax decoration elements
      document.querySelectorAll('.parallax-decoration').forEach(el => {
        // Store original transform for reference
        const originalTransform = el.style.transform;
        el.dataset.originalTransform = originalTransform || 'none';
        
        // Store parallax depth if not specified
        if (!el.dataset.parallaxDepth) {
          el.dataset.parallaxDepth = '10'; // Default depth
        }
      });
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animatedSections]);

  return (
    <Layout>
      {/* Inject the animation styles */}
      <style jsx global>{slideAnimationStyles}</style>
      
      {/* Slide Navigation Dots - Only visible on desktop */}
      {!isMobile && (
        <div className="slide-nav">
          <div 
            className={`slide-nav-dot ${activeSection === 0 ? 'active' : ''}`} 
            onClick={() => scrollToSection(heroContentRef)}
            title="Home"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 1 ? 'active' : ''}`} 
            onClick={() => scrollToSection(discoverMoreRef)}
            title="Discover More"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 2 ? 'active' : ''}`} 
            onClick={() => scrollToSection(section1Ref)}
            title="GIF Showcase"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 3 ? 'active' : ''}`} 
            onClick={() => scrollToSection(section2Ref)}
            title="How It All Began"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 4 ? 'active' : ''}`} 
            onClick={() => scrollToSection(section3Ref)}
            title="Journey to Excellence"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 5 ? 'active' : ''}`} 
            onClick={() => scrollToSection(section4Ref)}
            title="Beyond the Bow"
          />
          <div 
            className={`slide-nav-dot ${activeSection === 6 ? 'active' : ''}`} 
            onClick={() => scrollToSection(section5Ref)}
            title="Explore"
          />
        </div>
      )}
      
      {/* Fixed Background Image with Zoom Effect - Only on hero section */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        opacity: Math.max(1 - (scrollY / 800), 0),
        transition: 'opacity 0.5s ease'
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

      {/* Fixed GIF Background - positioned between "Discover My Journey" and "How It All Began" */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        opacity: activeSection >= 1 && activeSection <= 3 ? 1 : 0, // Visible from "Discover My Journey" through "How It All Began"
        transition: 'opacity 0.8s ease'
      }}>
        <Image
          src="/Karthikgif.gif"
          alt="Archery in Action - Fixed Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          unoptimized={true}
          priority={false}
        />
        {/* Overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }} />
      </div>

      {/* Hero Slide */}
      <div 
        className="slide-section"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          background: 'transparent'
        }}
      >
        <div 
          ref={heroContentRef} 
          className={`slide-section-content ${animatedSections.heroContent ? 'animated slide-left' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            transform: `translateY(${Math.min(scrollY * (isMobile ? 0.2 : 0.3), isMobile ? 50 : 100)}px)`,
            opacity: Math.max(1 - (scrollY / 800), 0),
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            color: 'white'
          }}
        >
          <h1 
            className={`${animatedSections.heroContent ? 'animated fade-in delay-200' : ''}`}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '0.5 rem',
              background: 'linear-gradient(135deg, #f57e42, #ff9933)',
              WebkitBackgroundClip: 'text',
              color: 'orange',
              backgroundClip: 'text',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            Suraj Nalam
          </h1>
        </div>
      </div>

      {/* Title Slide - Dark */}
      <div className="slide-section dark-section" ref={discoverMoreRef}>
        {/* Parallax tile background */}
        <div className="parallax-bg">
          <div className="parallax-tile-bg"></div>
        </div>
        <div 
          className={`slide-section-content ${animatedSections.discoverMore ? 'animated fade-in' : ''}`}
          style={{
            textAlign: 'center'
          }}
        >
          <h2 
            className={`${animatedSections.discoverMore ? 'animated slide-up' : ''}`}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '800',
              marginBottom: '2rem',
              textAlign: 'center'
            }}
          >
            <span className="accent-text">Discover My Journey</span>
          </h2>
          <p 
            className={`${animatedSections.discoverMore ? 'animated fade-in delay-200' : ''}`}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              maxWidth: '800px',
              margin: '0 auto',
              fontWeight: '300',
              lineHeight: '1.6'
            }}
          >
            Scroll through the slides below to explore my archery journey, philosophy, and achievements
          </p>
        </div>
      </div>

      {/* GIF Slide - Transparent slide to show fixed GIF background */}
      <div className="slide-section" ref={section1Ref} style={{ 
        backgroundColor: 'transparent', 
        minHeight: '100vh' 
      }}>
        {/* Empty slide - GIF shows as fixed background */}
      </div>

      {}
      <div className="slide-section light-section" style={{ 
        backgroundColor: "#c9a380",
        backgroundImage: "url('/subtle-pattern.png')",
        backgroundBlendMode: "soft-light",
        overflow: "hidden"
      }}>
        
        <div className="slide-section-content" ref={section2Ref}>
          {/* Enhanced container with better spacing and hierarchy */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '2rem' : '2rem',
            position: 'relative',
            zIndex: 5,
            maxWidth: isMobile ? '100%' : '1100px',
            margin: '0 auto',
            padding: isMobile ? '0' : '0.5rem',
            height: isMobile ? 'auto' : 'calc(100vh - 2rem)',
            maxHeight: isMobile ? 'none' : 'calc(100vh - 2rem)',
            overflow: 'hidden',
            justifyContent: 'center'
          }}>
            {/* Image container - optimized for web view */}
            <div 
              className="mobile-image-container"
              style={{
                flex: isMobile ? '0 0 100%' : '0 0 50%',
                position: 'relative',
                height: isMobile ? '400px' : 'min(60vh, 550px)',
                minHeight: isMobile ? '400px' : '450px',
                maxHeight: isMobile ? '400px' : '550px',
                order: isMobile ? 2 : 1,
                marginBottom: isMobile ? '1.5rem' : '0',
                overflow: 'hidden',
                width: '100%',
                backgroundColor: isMobile ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <Image
                src="/KarthikHomeNBG.png" 
                alt="How it began - Suraj Nalam (Karthik) Archery Journey"
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  filter: 'contrast(1.05) saturate(1.05)',
                }}
              />
            </div>
            
            {/* Text container - optimized for web view */}
            <div 
              style={{ 
                flex: isMobile ? '0 0 100%' : '0 0 45%',
                order: isMobile ? 1 : 2,
                color: "#fff",
                padding: isMobile ? '0.5rem 0.5rem 0' : '0.5rem',
                position: 'relative',
                maxWidth: isMobile ? '100%' : '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: isMobile ? 'auto' : '100%',
                overflow: 'hidden'
              }}
            >
              {/* Decorative accent element */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: isMobile ? '0' : '-15px',
                  width: '40px',
                  height: '3px',
                  background: 'rgba(245, 126, 66, 0.8)',
                  borderRadius: '3px'
                }}
              ></div>
              
              <h3 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: '700',
                marginBottom: '0.8rem',
                position: 'relative',
                lineHeight: '1.1',
                letterSpacing: '-0.01em'
              }}>
                <span style={{ 
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  position: 'relative',
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.9))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  How It All Began
                  <span style={{ 
                    position: 'absolute',
                    height: '4px',
                    width: '80%',
                    background: 'linear-gradient(90deg, rgba(245, 126, 66, 0.9), rgba(255, 153, 51, 0))',
                    bottom: '-10px',
                    left: '0',
                    borderRadius: '2px'
                  }}></span>
                </span>
              </h3>
              
              <p style={{
                lineHeight: '1.5',
                fontSize: isMobile ? '1.1rem' : '1rem',
                marginBottom: '0.8rem',
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                fontWeight: '400',
                maxWidth: '100%'
              }}>
                My name is Suraj Nalam (Karthik), and archery has been more than just a sport for me — it's been a journey of discipline, self-discovery, and unshakable love for the game.
              </p>
              
              <p style={{
                lineHeight: '1.5',
                fontSize: isMobile ? '1.1rem' : '1rem',
                marginBottom: '0.8rem',
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                fontWeight: '400',
                maxWidth: '100%'
              }}>
                I picked up my first bow at the age of 4, and from that moment, something clicked. The feeling of focus, the precision required, and the satisfaction of hitting the target created an instant connection.
              </p>
              
              <p style={{
                lineHeight: '1.5',
                fontSize: isMobile ? '1.1rem' : '1rem',
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                fontWeight: '400',
                maxWidth: '100%'
              }}>
                What started as a weekend activity quickly grew into a passion I knew I wanted to pursue seriously. The journey since then has been extraordinary.
              </p>
              
              {/* Subtle decorative element at the bottom */}
              <div style={{
                width: '60px',
                height: '3px',
                background: 'rgba(255,255,255,0.2)',
                marginTop: '2rem',
                borderRadius: '3px',
                display: isMobile ? 'none' : 'block'
              }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Slide - Dark (Journey to Excellence) - COMMENTED OUT */}
      {/* 
      <div className="slide-section dark-section">
        <div className="parallax-bg">
          <div className="parallax-tile-bg"></div>
        </div>
        <div className="slide-section-content" ref={section3Ref}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: '3rem'
          }}>
            <div 
              className={`${animatedSections.section3 ? 'animated slide-left delay-200' : ''}`}
              style={{
                flex: '1',
                order: isMobile ? 1 : 2
              }}
            >
              <h3 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
              }}>
                <span className="accent-text">Journey to Excellence</span>
              </h3>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                color: '#fff'
              }}>
                My journey in archery has been marked by dedication, perseverance, and countless hours of training. From local competitions to national championships, every experience has shaped me into the archer I am today.
              </p>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                color: '#fff'
              }}>
                With each competition, I've learned valuable lessons about focus, resilience, and the importance of mental strength in this precision sport. These qualities have become central to my approach to both archery and life.
              </p>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                color: '#fff'
              }}>
                The pursuit of excellence is never-ending, and each day presents a new opportunity to refine my skills and push my limits a little further.
              </p>
            </div>
            
            <div 
              className={`${animatedSections.section3 ? 'animated slide-right delay-400' : ''}`}
              style={{
                flex: '1',
                position: 'relative',
                minHeight: '400px',
                order: isMobile ? 2 : 1
              }}
            >
              <Image
                src="/karthik_header_image_2.jpeg" 
                alt="Journey to Excellence"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      */}
      
      {/* Third Slide - Light (Beyond the Bow) */}
      <div className="slide-section light-section">
        {/* Parallax tile background */}
        <div className="parallax-bg">
          <div className="parallax-tile-bg"></div>
        </div>
        <div className="slide-section-content" ref={section4Ref}>
          <div 
            className={`${animatedSections.section4 ? 'animated fade-in' : ''}`}
            style={{
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '2rem',
            }}>
              <span className="accent-text">Beyond the Bow</span>
            </h3>
            
            <div 
              className={`${animatedSections.section4 ? 'animated slide-up delay-200' : ''}`}
              style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                marginBottom: '2rem'
              }}
            >
              <Image
                src="/karthik_header_image_2.jpeg" 
                alt="Beyond the Bow"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>
            
            <div className={`${animatedSections.section4 ? 'animated scale-up delay-400' : ''}`}>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                Archery has taught me much more than just hitting targets. It has instilled discipline, patience, and the ability to remain calm under pressure - skills that extend far beyond the shooting line.
              </p>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                These qualities have helped me excel not just in sports but in all aspects of my life. Over the past 10 years, I've grown from a curious beginner to an internationally competing archer, guided by incredible coaches and supported every step of the way by my amazing parents.
              </p>
              <p style={{
                lineHeight: '1.8',
                fontSize: '1.1rem',
                textAlign: 'left'
              }}>
                The mental focus required in archery has shaped my approach to challenges, teaching me to break down complex problems into manageable steps, just as I approach each shot with methodical precision.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fourth Slide - Dark (Call to Action) */}
      <div className="slide-section dark-section">
        {/* Parallax tile background */}
        <div className="parallax-bg">
          <div className="parallax-tile-bg"></div>
        </div>
        <div className="slide-section-content" ref={section5Ref}>
          <div className={`${animatedSections.section5 ? 'animated fade-in' : ''}`}>
            <h3 
              className={`${animatedSections.section5 ? 'animated slide-up' : ''}`}
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#fff'
              }}
            >
              <span className="accent-text">Explore My Journey</span>
            </h3>
            <p 
              className={`${animatedSections.section5 ? 'animated slide-up delay-200' : ''}`}
              style={{
                color: '#fff',
                lineHeight: '1.8',
                fontSize: '1.2rem',
                marginBottom: '3rem',
                textAlign: 'center',
              }}
            >
              Discover more about my achievements, experiences, and the path that's shaped me as an archer.
            </p>
            <div 
              className={`${animatedSections.section5 ? 'animated slide-up delay-400' : ''}`}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1.5rem',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <a href="/biography" className="slide-button">
                My Biography
              </a>
              <a 
                href="/media" 
                style={{
                  background: '#fff',
                  color: '#111',
                  padding: '1rem 2.5rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.03)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
                }}
              >
                Media Gallery
              </a>
              <a href="/achievements" className="slide-button-outline">
                Achievements
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator - Only visible on mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          textAlign: 'center',
          animation: 'fadeIn 1.5s infinite alternate',
          opacity: activeSection === 0 ? 0.8 : 0, // Only show on first slide
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}>
          <div style={{
            color: '#fff',
            fontSize: '0.9rem',
            marginBottom: '8px',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>Scroll to explore</div>
          <div style={{
            fontSize: '1.5rem',
            color: '#fff',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
          }}>↓</div>
        </div>
      )}
    </Layout>
  );
}
