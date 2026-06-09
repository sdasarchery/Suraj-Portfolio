import Layout from '../components/Layout';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import achievementsData from '../data/achievements.json';

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

  @keyframes heroReloadReveal {
    0% {
      transform: translateY(24px) scale(0.97);
      opacity: 0;
      filter: blur(3px);
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }

  @keyframes typeCursor {
    0%, 100% {
      border-color: transparent;
    }
    50% {
      border-color: rgba(255, 122, 60, 0.9);
    }
  }

  @keyframes typingSuraj {
    from {
      width: 0;
    }
    to {
      width: 5.4ch;
    }
  }

  @keyframes typingNalam {
    from {
      width: 0;
    }
    to {
      width: 6.2ch;
    }
  }

  @keyframes blinkCaret {
    0%,
    45% {
      border-right-color: rgba(255, 255, 255, 0.95);
    }
    55%,
    100% {
      border-right-color: transparent;
    }
  }

  .hero-name {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .hero-line {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    border-right: 2px solid rgba(255, 255, 255, 0.95);
    padding-bottom: 0.18em; /* prevent descenders (j, g, y, p, q) from being clipped */
    animation: typingSuraj 1.35s steps(6, end) forwards, blinkCaret 1s step-end infinite;
  }

  .hero-line-second {
    animation: typingNalam 1.35s steps(6, end) 1.45s forwards, blinkCaret 1s step-end infinite;
  }

  .achievement-typewriter {
    overflow: hidden;
    border-right: 2px solid rgba(255, 122, 60, 0.9);
    white-space: normal;
    animation: typeCursor 0.8s steps(1) infinite;
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
    width: 100%;
    overflow: hidden;
    left: 0;
    right: 0;
    margin-left: 0;
    margin-right: 0;
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

  /* Very small screens (iPhone SE and similar) - force natural document flow */
  @media (max-width: 375px) {
    .slide-section-content {
      padding: 1rem !important;
      width: calc(100% - 2rem) !important;
    }

    .slide-section .slide-section-content > div {
      margin-bottom: 1.6rem !important;
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

  /* Better scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Desktop-only full-page snap container - CRITICAL: enforce exact viewport height */
  @media (min-width: 769px) {
    html {
      height: 100% !important;
      overflow-y: scroll !important;
      scroll-snap-type: y mandatory !important;
      scroll-padding-top: 60px !important;
    }

    body {
      height: 100% !important;
      overflow-y: auto !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #__next {
      height: auto !important;
    }

    .slide-section {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 100vh !important;
      height: 100vh !important;
      max-height: 100vh !important;
      width: 100% !important;
      overflow: hidden !important;
      scroll-snap-align: start !important;
      scroll-snap-stop: always !important;
      flex-shrink: 0 !important;
    }

    .slide-section.auto-height,
    .slide-section[data-auto-height="true"] {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: auto !important;
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }
  }

  @media (max-width: 768px) {
    html, body, #__next {
      scroll-snap-type: none !important;
    }

    .slide-section {
      scroll-snap-align: none !important;
      scroll-snap-stop: auto !important;
    }
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
  
  /* First Slide - Light (About Me) - flex layout for content positioning */
  .light-section {
    overflow: hidden !important;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
  
  .light-section .slide-section-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    flex: 1;
  }

  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 1.35rem;
    row-gap: 1rem;
    width: 100%;
  }

  .instagram-card {
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(14, 14, 14, 0.86) 0%, rgba(10, 10, 10, 0.96) 100%);
    padding: 0.55rem;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.34);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .instagram-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 140, 66, 0.44);
    box-shadow: 0 18px 42px rgba(255, 140, 66, 0.16);
  }

  .instagram-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .instagram-thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 16px;
    overflow: hidden;
    display: block;
    background: #000;
  }

  .instagram-thumb img {
    object-fit: cover;
    object-position: center;
  }

  .instagram-thumb::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 35%, rgba(0, 0, 0, 0.7) 100%);
  }

  .instagram-pill {
    position: absolute;
    left: 0.65rem;
    right: 0.65rem;
    bottom: 0.65rem;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.45rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(0, 0, 0, 0.42);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  @media (max-width: 1100px) {
    .instagram-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .instagram-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.6rem;
    }
    .instagram-thumb {
      aspect-ratio: 4 / 3;
    }
  }
`;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const isSmallMobile = windowWidth > 0 && windowWidth <= 375;
  // Toggle JS-driven snapping. Leave false to prefer native CSS scroll-snap.
  const enableJsSnap = false;
  const aboutSectionBackgroundImage = isMobile ? '/about_me_mobile_bg.png' : '/AI_Generated.png';
  const [typedAchievementsSubtitle, setTypedAchievementsSubtitle] = useState('');
  const [isTypingAchievementsSubtitle, setIsTypingAchievementsSubtitle] = useState(false);
  const [hasTypedAchievementsSubtitle, setHasTypedAchievementsSubtitle] = useState(false);
  const [achievementsSectionProgress, setAchievementsSectionProgress] = useState(0);
  const [featuredSectionProgress, setFeaturedSectionProgress] = useState(0);
  const featuredAchievements = achievementsData.achievements.slice(0, 3).map((section, index) => ({
    ...section,
    icon: ['01', '02', '03'][index] || '04',
    highlight: section.items[0]
  }));
  const featuredHighlights = [
    {
      title: 'Salt Lake City - USAT2 2026 Silver Medal',
      image: '/goldslc2026.jpg'
    },
    {
      title: 'Georgia Cup 2026 - Gold Medal',
      image: '/georgia-cup-2026.jpg'
    },
    {
      title: '2026 Gator Cup - Gold Medal',
      subtitle: '',
      image: '/Gator2026Gold.jpg'
    }
  ];
  const instagramEmbeds = [
    {
      url: 'https://www.instagram.com/p/DZIuwCczH29/',
      image: '/instagram/insta1.jpg',
      alt: 'Instagram reel preview 1'
    },
    {
      url: 'https://www.instagram.com/p/DYfZTEfvTgX/',
      image: '/instagram/insta2.jpg',
      alt: 'Instagram reel preview 3'
    },
    {
      url: 'https://www.instagram.com/p/DXUkquhj7wF/',
      image: '/instagram/insta3.jpg',
      alt: 'Instagram reel preview 4'
    },
    {
      url: 'https://www.instagram.com/p/DNsP7KwWvep/',
      image: '/instagram/insta4.jpg',
      alt: 'Instagram reel preview 5'
    }
  ];
  const mobileOnlyInstagramPosts = [
    {
      url: 'https://www.instagram.com/p/DOLfwCwiAAo/',
      image: '/insta_pic_1.jpg',
      alt: 'Instagram post preview DOLfwCwiAAo'
    },
    {
      url: 'https://www.instagram.com/p/C7_sExIiZ4o/',
      image: '/insta_pic_2.jpg',
      alt: 'Instagram post preview C7_sExIiZ4o'
    }
  ];
  const instagramDisplayItems = isMobile
    ? [...instagramEmbeds, ...mobileOnlyInstagramPosts]
    : instagramEmbeds;
  
  // Refs for sections that will be animated
  const heroContentRef = useRef(null);
  const discoverMoreRef = useRef(null);
  const section2Ref = useRef(null);
  const sectionAboutRef = useRef(null);
  const section4Ref = useRef(null);
  const sectionInstagramRef = useRef(null);
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
    section2: false,
    section4: false,
    sectionInstagram: false,
    section5: false
  });

  // Determine which section is currently visible
  const [activeSection, setActiveSection] = useState(0);
  const sectionElemsRef = useRef([]);

  const sectionHeightRef = typeof window !== 'undefined' ? window.innerHeight : 900;
  const achievementsTop = section2Ref.current ? section2Ref.current.offsetTop : 0;
  const achievementsTransitionStart = Math.max(achievementsTop - sectionHeightRef * 0.9, 0);
  const achievementsTransitionRange = sectionHeightRef * 0.42;
  const achievementsTransitionProgress = Math.min(
    Math.max((scrollY - achievementsTransitionStart) / achievementsTransitionRange, 0),
    1
  );
  const featuredTransitionProgress = Math.min(Math.max(featuredSectionProgress, 0), 1);
  const aboutTransitionProgress = Math.min(Math.max(achievementsSectionProgress, 0), 1);
  const aboutTransitionOpacity = Math.max(0.4, 1 - aboutTransitionProgress * 0.6);
  const aboutTransitionShift = aboutTransitionProgress * (isMobile ? 18 : 28);
  
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
    // Use DOM order of .slide-section for robust section indexing
    const nodeList = Array.from(document.querySelectorAll('.slide-section'));
    if (nodeList.length === 0) return;

    let mostVisible = { index: 0, visibleArea: 0 };
    nodeList.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleArea = Math.max(0, visibleHeight / window.innerHeight);
      if (visibleArea > mostVisible.visibleArea) {
        mostVisible = { index: idx, visibleArea };
      }
    });

    setActiveSection(mostVisible.index);
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
    if (section2Ref.current && !animatedSections.section2) {
      if (isElementInViewport(section2Ref.current, 250)) {
        updates.section2 = true;
      }
    }
    
    if (section4Ref.current && !animatedSections.section4) {
      if (isElementInViewport(section4Ref.current, 250)) {
        updates.section4 = true;
      }
    }

    if (sectionInstagramRef.current && !animatedSections.sectionInstagram) {
      if (isElementInViewport(sectionInstagramRef.current, 250)) {
        updates.sectionInstagram = true;
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
  
  // Dedicated responsive design resize detection (throttled/debounced via animation frames)
  useEffect(() => {
    let resizeFrameId = null;
    const handleResize = () => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };
    
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
    };
  }, []);

  // Detect scroll and mousemove events
  useEffect(() => {
    // Local throttle state for scroll handler
    let lastScrollTime = 0;
    const scrollThreshold = 60;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > scrollThreshold) {
        setScrollY(window.scrollY);
        checkAnimations();
        updateActiveSection();
        updateParallaxElements();

        if (section2Ref.current) {
          const rect = section2Ref.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight || 1;
          const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)));
          setAchievementsSectionProgress(progress);
        }

        if (section4Ref.current) {
          const rect = section4Ref.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight || 1;
          const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)));
          setFeaturedSectionProgress(progress);
        }

        lastScrollTime = now;
      }
    };

    // Enhanced initial check for animations and parallax setup
    const initialTimer = setTimeout(() => {
      checkAnimations();
      updateActiveSection();
      updateParallaxElements();
      
      // Initialize parallax tile backgrounds
      document.querySelectorAll('.parallax-tile-bg').forEach(el => {
        el.style.backgroundPosition = '0px 0px';
      });
      
      // Initialize parallax decoration elements
      document.querySelectorAll('.parallax-decoration').forEach(el => {
        const originalTransform = el.style.transform;
        el.dataset.originalTransform = originalTransform || 'none';
        
        if (!el.dataset.parallaxDepth) {
          el.dataset.parallaxDepth = '10';
        }
      });
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, animatedSections]);

  // Desktop-only: intercept wheel and keyboard to smoothly snap between full-page sections
  useEffect(() => {
    if (isMobile || !enableJsSnap) return;

    // Use DOM order of .slide-section for snapping targets
    const getSectionNodes = () => Array.from(document.querySelectorAll('.slide-section'));
    let sectionNodes = getSectionNodes();

    let isThrottled = false;

    const getClosestIndex = () => {
      sectionNodes = getSectionNodes();
      let min = Infinity;
      let idx = 0;
      sectionNodes.forEach((node, i) => {
        const top = node.getBoundingClientRect().top;
        const absTop = Math.abs(top);
        if (absTop < min) {
          min = absTop;
          idx = i;
        }
      });
      return idx;
    };

    const scrollToIndex = (i) => {
      sectionNodes = getSectionNodes();
      const node = sectionNodes[i];
      if (node) {
        const headerOffset = 60; // match navbar height
        const top = node.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    const hasScrollableAncestor = (el, direction, stopNode) => {
      let cur = el;
      while (cur && cur !== document.body && cur !== stopNode) {
        if (cur instanceof HTMLElement) {
          const style = window.getComputedStyle(cur);
          const overflowY = style.overflowY;
          const canScroll = cur.scrollHeight > cur.clientHeight && (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay');
          if (canScroll) {
            if (direction > 0 && cur.scrollTop + cur.clientHeight < cur.scrollHeight) return true;
            if (direction < 0 && cur.scrollTop > 0) return true;
          }
        }
        cur = cur.parentElement;
      }
      return false;
    };

    const onWheel = (e) => {
      if (isThrottled) { e.preventDefault(); return; }
      const direction = e.deltaY > 0 ? 1 : -1;
      const current = getClosestIndex();
      const currentNode = sectionNodes[current];

      // If scrolling inside a scrollable child of the current section, let native behavior occur
      if (hasScrollableAncestor(e.target, direction, currentNode)) return;

      const next = Math.min(Math.max(current + direction, 0), sectionNodes.length - 1);
      if (next !== current) {
        e.preventDefault();
        isThrottled = true;
        scrollToIndex(next);
        setTimeout(() => { isThrottled = false; }, 900);
      }
    };

    const onKey = (e) => {
      const keyHandled = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(e.key);
      if (!keyHandled) return;
      const curr = getClosestIndex();
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        const next = Math.min(curr + 1, sectionNodes.length - 1);
        scrollToIndex(next);
      }
      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        const prev = Math.max(curr - 1, 0);
        scrollToIndex(prev);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobile]);

  // Heights are natively enforced by CSS 100vh and min-height styles.

  return (
    <Layout>
      {/* Inject the animation styles */}
      <style jsx global>{slideAnimationStyles}</style>
      
      {/* Hero Slide */}
      <div 
        className="slide-section"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'transparent',
          overflow: 'hidden',
          alignItems: isMobile ? 'flex-start' : 'center'
        }}
      >
        {/* Background Image - always absolute so it's clipped within hero */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <Image
            src='/suraj_images/DSC09959.jpg'
            alt="Suraj Nalam Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: isMobile ? 'center center' : 'center top'
            }}
            priority
            quality={100}
          />
          {/* Dynamic Overlay that gets darker on scroll */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `rgba(0, 0, 0, ${0.3 + (scrollY / 1000) * 0.4})`,
            zIndex: 2,
            transition: 'background 0.1s ease-out'
          }} />
        </div>

        <div 
          ref={heroContentRef} 
          className={`slide-section-content ${animatedSections.heroContent ? 'animated slide-left' : ''}`}
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'center',
            alignItems: 'flex-end',
            textAlign: 'right',
            transform: `translateY(${Math.min(scrollY * (isMobile ? 0.2 : 0.3), isMobile ? 50 : 100)}px)`,
            opacity: Math.max(1 - (scrollY / 800), 0),
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            color: 'white',
            paddingTop: isMobile ? '0vh' : '0',
            marginTop: isMobile ? '-2vh' : '0',
            paddingRight: isMobile ? '2rem' : '4rem'
          }}
        >
          <h1 
            className={`${animatedSections.heroContent ? 'animated fade-in delay-200' : ''}`}
            style={{
              fontSize: isMobile ? 'clamp(3.5rem, 15vw, 4.5rem)' : 'clamp(4.2rem, 8vw, 7rem)',
              fontWeight: '800',
              marginBottom: '0.5rem',
              color: 'red',
              textShadow: '0 4px 8px rgba(18, 25, 51, 0.3)',
              lineHeight: 1.05,
              animation: 'heroReloadReveal 1s ease-out both'
            }}
          >
            <span className="hero-name">
              <span className="hero-line">Suraj</span>
              <span className="hero-line hero-line-second">Nalam</span>
            </span>
          </h1>
        </div>
      </div>

      <div
        className="slide-section"
        style={{
          position: 'relative',
          backgroundColor: '#0b0b0b',
          overflow: isMobile ? 'visible' : 'hidden',
          /* Add extra padding on mobile instead of margin/height hacks */
          paddingTop: isMobile ? '40vh' : undefined,
          paddingBottom: isMobile ? '2rem' : undefined,
          opacity: 1,
          backgroundImage: `url(${isMobile ? '/new_achievements_mobile.png' : '/Achievements-bg-2.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 18%' : '34% 14%',
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '100vh' : '100vh',
          alignItems: isMobile ? 'flex-end' : 'center',
        }}
      >

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(11,11,11,0.06) 0%, rgba(11,11,11,0.42) 46%, rgba(11,11,11,0.9) 100%)',
          opacity: 0.62 + achievementsTransitionProgress * 0.38,
          transition: 'opacity 0.12s linear'
        }} />

        <div className="slide-section-content" ref={section2Ref} style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: isMobile ? 'auto' : '100%',
          boxSizing: 'border-box',
          maxWidth: 'none',
          margin: 0,
          /* Mobile: clean padding */
          padding: isMobile ? '2rem 1rem' : '0 2rem',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          alignItems: 'center',
        }}>
          <div style={{
            width: isMobile ? '100%' : 'min(46vw, 720px)',
            boxSizing: 'border-box',
            margin: isMobile ? '0 auto' : '0 0 0 auto',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(17,17,17,0.84) 100%)',
            backdropFilter: 'blur(10px)',
            padding: isMobile ? '1.2rem 1rem' : '1.7rem',
            paddingBottom: isMobile ? '1.5rem' : '3rem',
            transition: 'transform 0.7s ease, opacity 0.7s ease',
            transform: isMobile ? 'translateX(0)' : `translateX(${Math.max(0, 28 - achievementsSectionProgress * 28)}px)`,
          }}>
            <h3 style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              lineHeight: 1.2,
              margin: 0,
              color: '#fff',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              marginTop: isMobile ? '0.2rem' : '1rem'
            }}>
              Achievements
            </h3>

            

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: isMobile ? '1rem' : '0.7rem',
              width: '100%',
              maxWidth: 'none',
              margin: '0 auto',
              transition: 'transform 0.7s ease, opacity 0.7s ease',
              transform: isMobile ? 'none' : `translateY(${Math.max(0, 16 - achievementsSectionProgress * 16)}px)`,
              opacity: Math.max(0.8, achievementsSectionProgress)
            }}>
              
                <div
                  style={{
                    position: 'relative',
                    background: isMobile ? 'rgba(0, 0, 0, 0.82)' : 'rgba(255, 255, 255, 0.035)',
                    border: isMobile ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.05rem 1.05rem 1.1rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    backdropFilter: isMobile ? 'none' : 'blur(12px)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 14px 28px rgba(255, 122, 60, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff7a3c 0%, rgba(255, 77, 46, 0.2) 100%)' }} />
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.45rem' }}>International Medalist</div>
                  <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.55 }}>Winnipeg, Canada - 2025 World Archery Youth Championships Silver Medalist ( Silver Medalist 
                    Team )</div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    background: isMobile ? 'rgba(0, 0, 0, 0.82)' : 'rgba(255, 255, 255, 0.035)',
                    border: isMobile ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.05rem 1.05rem 1.1rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    backdropFilter: isMobile ? 'none' : 'blur(12px)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 14px 28px rgba(255, 122, 60, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff7a3c 0%, rgba(255, 77, 46, 0.2) 100%)' }} />
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.45rem' }}>USAT# 2 -  Salt Lake Summit</div>
                  <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.55 }}>Salt Lake City, Under 21 - Silver Medalist</div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    background: isMobile ? 'rgba(0, 0, 0, 0.82)' : 'rgba(255, 255, 255, 0.035)',
                    border: isMobile ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.05rem 1.05rem 1.1rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    backdropFilter: isMobile ? 'none' : 'blur(12px)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 14px 28px rgba(255, 122, 60, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff7a3c 0%, rgba(255, 77, 46, 0.2) 100%)' }} />
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.45rem' }}>USAT# 1 - Gator Cup  </div>
                  <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.55 }}>Gator Cup, Under 21 - Gold Medalist</div>
                </div>
            </div>

            
          </div>
        </div>
      </div>
      
      {/* About Me Slide - re-added */}
      <div
        className="slide-section light-section"
        ref={sectionAboutRef}
        style={{
          position: 'relative',
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '85vh' : '100vh',
          overflow: isMobile ? 'visible' : 'hidden',
          backgroundColor: '#0b0b0b',
          backgroundImage: `url(${aboutSectionBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 30%' : 'center',
        }}
      >
        <div
          className="slide-section-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            /* On mobile: push content to bottom with spacing. On desktop: bottom of flex container */
            justifyContent: 'flex-end',
            padding: isMobile ? '4rem 1rem 3.5rem' : '0 2rem 5rem',
            height: isMobile ? '100%' : '100%',
            minHeight: isMobile ? '85vh' : '100%',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: isMobile ? '100%' : 'min(720px, 46vw)', boxSizing: 'border-box', margin: '0 auto', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800 }}>About Me</h3>
            <p style={{ marginTop: '0.65rem', color: isMobile ? 'white' : 'rgba(255,255,255,0.88)', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', lineHeight: 1.6 }}>
              I&apos;m Suraj Nalam — competitive archer, national-level athlete. I train hard, travel for tournaments, and share my progress and learnings here.
            </p>
            <div style={{ marginTop: '0.9rem', marginBottom: isMobile ? '0' : '0' }}>
              <a href="/about" className="slide-button" style={{ display: 'inline-block' }}>Learn more →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Third Slide - Featured Highlights */}
      <div
        className="slide-section dark-section"
        style={{
          backgroundColor: '#0B0B0B',
          position: 'relative',
          overflow: isMobile ? 'visible' : 'hidden',
          minHeight: isMobile ? 'auto' : '100svh',
          height: isMobile ? 'auto' : '100svh',
          paddingTop: isMobile ? '5rem' : 0,
          paddingBottom: isMobile ? '2rem' : 0,
          marginTop: 0,
          zIndex: 2,
          transform: 'translateY(0)',
          opacity: 1,
          transition: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(255, 140, 66, 0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255, 140, 66, 0.06), transparent 42%)',
            pointerEvents: 'none'
          }}
        />

        <div className="slide-section-content" ref={section4Ref} style={{
          minHeight: isMobile ? 'auto' : '100%',
          height: isMobile ? 'auto' : '100%',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          /* Give Latest Achievements some top breathing room on small screens */
          padding: isMobile ? '1rem 1rem 2rem' : '1rem 1.2rem 1rem'
        }}>
          <div
            className={`${animatedSections.section4 ? 'animated fade-in' : ''}`}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              margin: '0 auto',
              padding: isMobile ? '0rem' : '0.1rem 0 0.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transform: isMobile ? 'none' : `translateY(${Math.max(0, 36 - featuredTransitionProgress * 36)}px)`,
              opacity: 1,
              transition: 'transform 0.65s ease'
            }}
          >
            <div style={{ marginBottom: isMobile ? '1rem' : '0rem' }}>
              <h3 style={{
                marginTop: isMobile ? '0rem' : '0rem',
                fontSize: 'clamp(1.8rem, 3.8vw, 2.75rem)',
                color: '#fff',
                letterSpacing: '-0.02em',
                fontWeight: 800,
                lineHeight: 1.2
              }}>
                Latest Achievements
              </h3>
              <p style={{
                marginTop: isMobile ? '0.5rem' : '0rem',
                marginBottom: isMobile ? '1rem' : '1rem',
                color: 'rgba(255,255,255,0.74)',
                fontSize: 'clamp(0.92rem, 1.2vw, 1.04rem)'
              }}>
                Explore my latest milestones, records, and highlights 
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
                gap: isMobile ? '1rem' : '1rem',
                marginBottom: isMobile ? '1rem' : '1rem',
              }}
            >
              {featuredHighlights.map((item, idx) => (
                <div
                  key={item.title}
                  className={animatedSections.section4 ? 'animated slide-up delay-200' : ''}
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'visible',
                    minHeight: isSmallMobile ? '120px' : isMobile ? '190px' : 'clamp(200px, 60vh, 300px)',
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.32)',
                    transform: isMobile ? 'none' : `translate3d(${Math.round((1 - featuredTransitionProgress) * (idx === 0 ? -18 : idx === 2 ? 18 : 0))}px, ${Math.round((1 - featuredTransitionProgress) * (22 + idx * 7))}px, 0)`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate3d(0, -4px, 0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.44)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(255, 140, 66, 0.16)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = isMobile ? 'none' : `translate3d(${Math.round((1 - featuredTransitionProgress) * (idx === 0 ? -18 : idx === 2 ? 18 : 0))}px, ${Math.round((1 - featuredTransitionProgress) * (22 + idx * 7))}px, 0)`;
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.32)';
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 36vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6,6,6,0.08) 18%, rgba(6,6,6,0.75) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0.9rem'
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.01rem', lineHeight: 1.2 }}>{item.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', marginTop: '0.24rem' }}>{item.subtitle}</div>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    left: '0.9rem',
                    right: '0.9rem',
                    top: '0.9rem',
                    height: '2px',
                    
                  }} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: isMobile ? '1rem' : '0.5rem' }}>
              <a
                href="/achievements"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  padding: '0.8rem 1.2rem',
                  marginTop: isMobile ? '0rem' : '2rem',
                  marginBottom: '2rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 140, 66, 0.38)',
                  background: 'linear-gradient(180deg, rgba(255, 140, 66, 0.18), rgba(255, 140, 66, 0.06))',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.62)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 140, 66, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.38)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View All Achievements →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Slide - Instagram */}
      <div
        className="slide-section dark-section"
        ref={sectionInstagramRef}
        style={{
          position: 'relative',
          minHeight: isMobile ? 'auto' : '100svh',
          height: isMobile ? 'auto' : '100svh',
          overflow: isMobile ? 'visible' : 'hidden',
          backgroundColor: '#090909',
          
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 14% 18%, rgba(255, 140, 66, 0.1), transparent 36%), radial-gradient(circle at 86% 82%, rgba(255, 140, 66, 0.08), transparent 42%)',
            pointerEvents: 'none'
          }}
        />

        <div className="slide-section-content" style={{
          position: 'relative',
          zIndex: 2,
          minHeight: isMobile ? 'auto' : '100%',
          height: isMobile ? 'auto' : '100%',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          /* Add top and horizontal padding on mobile */
          padding: isMobile ? '2rem 1rem 3rem' : '0.9rem 1.2rem 1.2rem'
        }}>
          <div
            className={animatedSections.sectionInstagram ? 'animated fade-in' : ''}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              margin: '0 auto',
              padding: isMobile ? 0 : '0 0.5rem',
              transform: isMobile ? 'none' : (animatedSections.sectionInstagram ? 'translateY(0)' : 'translateY(26px)'),
              transition: 'transform 0.65s ease'
            }}
          >
            <div style={{ marginBottom: isMobile ? '0rem' : '1.95rem' }}>
              <h3 style={{
                margin: 0,
                fontSize: 'clamp(1.9rem, 3.7vw, 2.7rem)',
                color: '#fff',
                letterSpacing: '-0.02em',
                fontWeight: 800,
                lineHeight: 0,
                marginTop: isMobile ? '0rem' : '0rem'
              }}>
                Instagram Updates
              </h3>
              <p style={{
                margin: '0.5rem 0 0',
                color: 'rgba(255,255,255,0.76)',
                fontSize: 'clamp(0.9rem, 1.15vw, 1rem)',
                marginTop: isMobile ? '0rem' : '2rem'
              }}>
                Real posts from Suraj&apos;s official reels and training journey.
              </p>
            </div>

            <div className="instagram-grid">
              {instagramDisplayItems.map((item) => (
                <div className="instagram-card" key={item.url}>
                  <a className="instagram-link" href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="instagram-thumb">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <span className="instagram-pill">Open</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <a
                href="https://www.instagram.com/suraj_nalam/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  padding: '0.78rem 1.15rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 140, 66, 0.42)',
                  background: 'linear-gradient(180deg, rgba(255, 140, 66, 0.18), rgba(255, 140, 66, 0.06))',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  marginTop: isMobile ? '0rem' : '2rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.62)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 140, 66, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.42)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Follow Suraj on Instagram →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Slide - Q&A Contact */}
      <div
        className="slide-section"
        ref={section5Ref}
        style={{
          position: 'relative',
          minHeight: isMobile ? 'auto' : '100svh',
          height: isMobile ? 'auto' : '100svh',
          overflow: isMobile ? 'visible' : 'hidden',
          backgroundColor: '#0b0b0b',
          backgroundImage: `url(${isMobile ? '/q&a_mobile.jpg' : '/dektop_q&a_bg.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center center' : 'center',
          marginTop: isMobile ? '0rem' : '0rem',
          
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.68) 100%)'
            : 'linear-gradient(100deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.4) 44%, rgba(0,0,0,0.72) 100%)'
        }} />

        <div className="slide-section-content" style={{
          position: 'relative',
          zIndex: 2,
          minHeight: isMobile ? 'auto' : '100%',
          width: '100%',
          boxSizing: 'border-box',
          maxWidth: 'none',
          margin: 0,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          alignItems: isMobile ? 'center' : 'center',
          padding: isMobile ? '5rem 1rem' : '1.6rem 3.4rem 4.5rem',
          transition: 'transform 0.7s ease',
          transform: isMobile ? 'none' : `translateY(${animatedSections.section5 ? 0 : 24}px)`
        }}>
          <div style={{
            width: isMobile ? '100%' : 'min(560px, 100%)',
            boxSizing: 'border-box',
            color: '#fff',
            textAlign: isMobile ? 'center' : 'left',
            fontFamily: 'Poppins, Montserrat, sans-serif'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: 'clamp(2.25rem, 5.4vw, 4.6rem)',
              lineHeight: 0.97,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#fff'
            }}>
              Q&amp;A
            </h3>

            <p style={{
              margin: isMobile ? '0.95rem auto 1.4rem' : '0.95rem 0 1.4rem',
              maxWidth: '36ch',
              fontSize: 'clamp(1rem, 1.45vw, 1.2rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              Do you have any curiosity about his career, training, or life off the court? This is the space to resolve your doubts.
            </p>

            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.82rem 1.55rem',
                borderRadius: '999px',
                textDecoration: 'none',
                color: '#111',
                background: '#fff',
                fontSize: '0.98rem',
                fontWeight: 600,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Ask Suraj
            </a>
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
