import { useState, useEffect } from 'react';
import { useTypewriter, useIntersectionObserver } from '../hooks/useAnimations';

// Enhanced components with inline styles for immediate use
export const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(type, speed);        } else {
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay, onComplete]);

  return <span className={className}>{displayText}</span>;
};

export const AchievementCard = ({ 
  title, 
  items, 
  delay = 0, 
  animationType = 'slideUp' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowItems(true), 300);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const cardStyle = {
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s ease-out',
    border: '1px solid #e9ecef',
    cursor: 'pointer'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    color: '#f57e42',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '3px solid #f57e42',
    position: 'relative'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const itemStyle = (index) => ({
    padding: '1rem 0',
    paddingLeft: '2rem',
    borderLeft: '3px solid #f57e42',
    marginBottom: '1rem',
    position: 'relative',
    background: 'linear-gradient(90deg, rgba(245, 126, 66, 0.1) 0%, transparent 100%)',
    borderRadius: '0 8px 8px 0',
    transform: showItems ? 'translateX(0)' : 'translateX(-20px)',
    opacity: showItems ? 1 : 0,
    transition: `all 0.4s ease-out ${index * 100}ms`,
    cursor: 'pointer'
  });

  const iconStyle = {
    position: 'absolute',
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#f57e42',
    color: 'white',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h2 style={titleStyle}>
        {isVisible && <TypewriterText text={title} speed={30} />}
      </h2>
      
      <ul style={listStyle}>
        {items.map((item, index) => (
          <li 
            key={index}
            style={itemStyle(index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(245, 126, 66, 0.2) 0%, transparent 100%)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(245, 126, 66, 0.1) 0%, transparent 100%)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={iconStyle}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const LoadingSkeleton = ({ lines = 5, height = '20px' }) => {
  const containerStyle = {
    padding: '2rem'
  };

  const lineStyle = (index) => ({
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton 1.5s infinite',
    borderRadius: '8px',
    height,
    marginBottom: '1rem',
    width: `${Math.random() * 30 + 70}%`,
    animationDelay: `${index * 100}ms`
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes skeleton {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={containerStyle}>
      {Array.from({ length: lines }, (_, index) => (
        <div 
          key={index}
          style={lineStyle(index)}
        />
      ))}
    </div>
  );
};

export const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  const containerStyle = {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const lineStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: '4px',
    background: 'linear-gradient(180deg, #f57e42, #ff9933)',
    borderRadius: '2px'
  };

  const itemStyle = (index) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
  });

  const markerStyle = (index) => ({
    width: '20px',
    height: '20px',
    background: '#f57e42',
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: `0 0 0 ${index === activeIndex ? '8px' : '4px'} ${
      index === activeIndex ? 'rgba(245, 126, 66, 0.3)' : '#f57e42'
    }`,
    zIndex: 1,
    position: 'relative',
    transition: 'all 0.3s ease',
    transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)'
  });

  const contentStyle = (index) => ({
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: `0 ${index === activeIndex ? '15px 30px' : '5px 15px'} rgba(0, 0, 0, ${index === activeIndex ? '0.2' : '0.1'})`,
    maxWidth: '250px',
    transition: 'all 0.3s ease',
    transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
    margin: index % 2 === 0 ? '0 0 0 2rem' : '0 2rem 0 0',
    textAlign: index % 2 === 0 ? 'left' : 'right'
  });

  return (
    <div style={containerStyle}>
      <div style={lineStyle} />
      {items.map((item, index) => (
        <div 
          key={index}
          style={itemStyle(index)}
          onClick={() => setActiveIndex(index)}
        >
          <div style={markerStyle(index)} />
          <div style={contentStyle(index)}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f57e42', fontSize: '1.1rem' }}>
              {item.title}
            </h3>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
              {item.description}
            </p>
            <span style={{ fontSize: '0.8rem', color: '#f57e42', fontWeight: 'bold' }}>
              {item.count} achievements
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Progress indicator
export const ProgressIndicator = ({ progress = 0 }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
      <span className="progress-text">{Math.round(animatedProgress)}% Complete</span>
    </div>
  );
};
