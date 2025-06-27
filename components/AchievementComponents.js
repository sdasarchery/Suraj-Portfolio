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

export const Timeline = ({ items = [], events = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineData = items.length > 0 ? items : events;

  const containerStyle = {
    position: 'relative',
    maxWidth: '900px',
    margin: '3rem auto',
    padding: '2rem 1rem'
  };

  const lineStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    bottom: 0,
    width: '4px',
    background: 'linear-gradient(180deg, #f57e42, #ff9933)',
    borderRadius: '2px',
    boxShadow: '0 0 10px rgba(245, 126, 66, 0.3)'
  };

  const itemStyle = (index) => ({
    display: 'flex',
    alignItems: 'stretch',
    marginBottom: '3rem',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
  });

  const markerStyle = (index) => ({
    width: '26px',
    height: '26px',
    background: index === activeIndex ? '#ff6b35' : '#f57e42',
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: `0 0 0 ${index === activeIndex ? '12px' : '6px'} ${
      index === activeIndex ? 'rgba(255, 107, 53, 0.2)' : 'rgba(245, 126, 66, 0.1)'
    }`,
    zIndex: 2,
    position: 'relative',
    transition: 'all 0.4s ease',
    transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
    alignSelf: 'flex-start',
    marginTop: '1.5rem'
  });

  const contentStyle = (index) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
    padding: '0',
    borderRadius: '20px',
    boxShadow: index === activeIndex 
      ? '0 25px 50px rgba(0, 0, 0, 0.15)' 
      : '0 10px 25px rgba(0, 0, 0, 0.08)',
    width: '380px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    transform: index === activeIndex ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
    margin: index % 2 === 0 ? '0 0 0 3rem' : '0 3rem 0 0',
    textAlign: 'left',
    border: `2px solid ${index === activeIndex ? '#f57e42' : 'transparent'}`,
    overflow: 'hidden'
  });

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '18px 18px 0 0'
  };

  const contentBodyStyle = {
    padding: '1.75rem'
  };

  const dateStyle = {
    fontSize: '0.85rem',
    color: '#f57e42',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const titleStyle = {
    margin: '0 0 1rem 0',
    color: '#333',
    fontSize: '1.4rem',
    lineHeight: '1.3',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    margin: '0 0 1.25rem 0',
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    borderTop: '2px solid #f0f0f0',
    paddingTop: '1.25rem',
    marginTop: '1.25rem'
  };

  const detailItemStyle = {
    fontSize: '0.85rem',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    background: 'rgba(245, 126, 66, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(245, 126, 66, 0.1)'
  };

  const badgeStyle = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f57e42, #ff9933)',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '25px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    boxShadow: '0 4px 15px rgba(245, 126, 66, 0.3)'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={lineStyle} />
      {timelineData.map((item, index) => (
        <div 
          key={index}
          style={itemStyle(index)}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div style={markerStyle(index)} />
          <div style={contentStyle(index)}>
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title || item.blogDisplay || 'Achievement'} 
                style={imageStyle}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div style={contentBodyStyle}>
              <p style={dateStyle}>{formatDate(item.date)}</p>
              <h3 style={titleStyle}>
                {item.title || item.blogDisplay}
              </h3>
              <p style={descriptionStyle}>
                {item.description}
              </p>
              
              <div style={detailsGridStyle}>
                {item.venue && (
                  <div style={detailItemStyle}>
                    <span>📍</span>
                    <span><strong>Venue:</strong> {item.venue}</span>
                  </div>
                )}
                {item.coach && (
                  <div style={detailItemStyle}>
                    <span>👤</span>
                    <span><strong>Coach:</strong> {item.coach}</span>
                  </div>
                )}
                {item.bestScore && (
                  <div style={detailItemStyle}>
                    <span>🏆</span>
                    <span><strong>Best Score:</strong> {item.bestScore}</span>
                  </div>
                )}
                {item.year && (
                  <div style={detailItemStyle}>
                    <span>📅</span>
                    <span><strong>Year:</strong> {item.year}</span>
                  </div>
                )}
              </div>
              
              {item.count && (
                <div style={badgeStyle}>
                  {item.count} {item.count === 1 ? 'Achievement' : 'Achievements'}
                </div>
              )}
              {item.worthNoticing && (
                <div style={badgeStyle}>
                  Worth Noting: {item.worthNoticing}
                </div>
              )}
            </div>
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
