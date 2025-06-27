import { useState, useEffect } from 'react';
import styles from '../pages/achievements.module.scss';

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
          timeoutId = setTimeout(type, speed);
        } else {
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

  return (
    <div 
      className={`${styles.achievementCard} ${isVisible ? styles[animationType] : ''}`}
    >
      <h2 className={styles.cardTitle}>
        {isVisible && <TypewriterText text={title} speed={30} />}
      </h2>
      
      <ul className={styles.itemsList}>
        {items.map((item, index) => (
          <li 
            key={index}
            className={`${styles.achievementItem} ${showItems ? styles.visible : ''}`}
            style={{ 
              transitionDelay: `${index * 100}ms`
            }}
          >
            <span className={styles.itemIcon}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const LoadingSkeleton = ({ lines = 5, height = '20px' }) => {
  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: lines }, (_, index) => (
        <div 
          key={index}
          className={styles.skeletonLine}
          style={{ 
            height,
            width: `${Math.random() * 30 + 70}%`,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  );
};

export const Timeline = ({ items = [], events = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const timelineData = items.length > 0 ? items : events;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '3rem auto',
    padding: '2rem 1rem',
    '@media (max-width: 768px)': {
      padding: '1rem 0.5rem'
    }
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
    alignItems: 'flex-start',
    marginBottom: '2rem',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    flexDirection: windowWidth > 768 ? (index % 2 === 0 ? 'row' : 'row-reverse') : 'row'
  });

  const markerStyle = (index) => ({
    width: '20px',
    height: '20px',
    background: index === activeIndex ? '#ff6b35' : '#f57e42',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: `0 0 0 ${index === activeIndex ? '8px' : '4px'} ${
      index === activeIndex ? 'rgba(255, 107, 53, 0.2)' : 'rgba(245, 126, 66, 0.1)'
    }`,
    zIndex: 2,
    position: 'relative',
    transition: 'all 0.4s ease',
    transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
    alignSelf: 'flex-start',
    marginTop: '1rem',
    flexShrink: 0
  });

  // Compact card style for collapsed state - Profile card format
  const compactCardStyle = (index) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
    padding: '1.25rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    width: windowWidth > 768 ? '380px' : 'calc(100vw - 120px)',
    maxWidth: '420px',
    transition: 'all 0.3s ease',
    margin: windowWidth > 768 
      ? (index % 2 === 0 ? '0 0 0 2rem' : '0 2rem 0 0')
      : '0 0 0 1.5rem',
    textAlign: 'left',
    border: '2px solid #f0f2f5',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  });

  // Expanded card style for active state
  const expandedCardStyle = (index) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
    padding: '0',
    borderRadius: '20px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    width: windowWidth > 768 ? '450px' : 'calc(100vw - 120px)',
    maxWidth: '500px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    transform: windowWidth > 768 ? 'scale(1.05) translateY(-5px)' : 'translateY(-5px)',
    margin: windowWidth > 768 
      ? (index % 2 === 0 ? '0 0 0 2rem' : '0 2rem 0 0')
      : '0 0 0 1.5rem',
    textAlign: 'left',
    border: '2px solid #f57e42',
    overflow: 'hidden'
  });

  const imageStyle = {
    width: '100%',
    height: windowWidth > 768 ? '200px' : '150px',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '18px 18px 0 0'
  };

  const expandedContentStyle = {
    padding: windowWidth > 768 ? '1.75rem' : '1.25rem'
  };

  const compactDateStyle = {
    fontSize: '0.7rem',
    color: '#f57e42',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const compactTitleStyle = {
    margin: '0 0 0.5rem 0',
    color: '#1a1a1a',
    fontSize: windowWidth > 768 ? '1.2rem' : '1.1rem',
    lineHeight: '1.2',
    fontWeight: '700',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const compactDetailsStyle = {
    fontSize: windowWidth > 768 ? '0.85rem' : '0.8rem',
    color: '#555',
    fontWeight: '500',
    lineHeight: '1.4',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center'
  };

  const compactBadgeStyle = {
    background: 'linear-gradient(135deg, #f57e42, #ff9933)',
    color: 'white',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const compactIconStyle = {
    fontSize: '0.9rem',
    marginRight: '0.3rem'
  };

  const expandedDateStyle = {
    fontSize: '0.85rem',
    color: '#f57e42',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const expandedTitleStyle = {
    margin: '0 0 1rem 0',
    color: '#333',
    fontSize: windowWidth > 768 ? '1.4rem' : '1.25rem',
    lineHeight: '1.3',
    fontWeight: 'bold'
  };

  const expandedDescriptionStyle = {
    margin: '0 0 1.25rem 0',
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: windowWidth > 768 ? '1fr 1fr' : '1fr',
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

  const formatDate = (dateValue) => {
    if (!dateValue) return '';
    try {
      let date;
      
      // Handle Firestore Timestamp objects
      if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
        date = new Date(dateValue.seconds * 1000);
      } 
      // Handle regular Date objects or date strings
      else {
        date = new Date(dateValue);
      }
      
      if (isNaN(date.getTime())) {
        return typeof dateValue === 'string' ? dateValue : '';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return typeof dateValue === 'string' ? dateValue : '';
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={containerStyle}>
      <div style={lineStyle} />
      {timelineData.map((item, index) => {
        const isExpanded = activeIndex === index;
        
        return (
          <div 
            key={index}
            style={itemStyle(index)}
            onClick={() => handleCardClick(index)}
          >
            <div style={markerStyle(index)} />
            <div style={isExpanded ? expandedCardStyle(index) : compactCardStyle(index)}>
              {isExpanded ? (
                // Expanded view - Enhanced profile card format
                <>
                  {(item.image || item.imageurl || item.imageUrl) && (
                    <img 
                      src={item.image || item.imageurl || item.imageUrl} 
                      alt={item.title || item.blogDisplay || item.championship || 'Achievement'} 
                      style={imageStyle}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        // Image loaded successfully
                      }}
                    />
                  )}
                  <div style={expandedContentStyle}>
                    {/* Simple Date */}
                    <div style={{
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#f57e42',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {formatDate(item.date)}
                      </span>
                    </div>

                    {/* Championship Title */}
                    <h3 style={{
                      margin: '0 0 1rem 0',
                      color: '#333',
                      fontSize: windowWidth > 768 ? '1.4rem' : '1.25rem',
                      lineHeight: '1.3',
                      fontWeight: 'bold'
                    }}>
                      {item.championship || item.title || item.blogDisplay}
                    </h3>

                    {/* Achievement/Position */}
                    <p style={{
                      margin: '0 0 1.5rem 0',
                      color: '#2c3e50',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      lineHeight: '1.4'
                    }}>
                      {item.place_Achieved || item.description}
                    </p>

                    {/* Simple Details */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      {item.venue && (
                        <div>
                          <strong>Venue:</strong> {item.venue}
                        </div>
                      )}
                      {item.coach && (
                        <div>
                          <strong>Coach:</strong> {item.coach}
                        </div>
                      )}
                      {item.best_Score && (
                        <div>
                          <strong>Best Score:</strong> {item.best_Score}
                        </div>
                      )}
                      {item.year && item.year !== new Date(item.date).getFullYear() && (
                        <div>
                          <strong>Year:</strong> {item.year}
                        </div>
                      )}
                    </div>
                    
                    {item.worthNoticing && (
                      <div style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#555',
                        fontStyle: 'italic'
                      }}>
                        <strong>Worth Noting:</strong> {item.worthNoticing}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Compact view - Simple 2-line format
                <div>
                  {/* Line 1: Date and Championship */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#f57e42',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      {formatDate(item.date)}
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #f57e42, #ff9933)',
                      color: 'white',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '15px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}>
                      {item.championship || item.title || item.blogDisplay}
                    </span>
                  </div>
                  
                  {/* Line 2: Achievement/Position */}
                  <h4 style={{
                    margin: '0',
                    color: '#1a1a1a',
                    fontSize: windowWidth > 768 ? '1.3rem' : '1.2rem',
                    lineHeight: '1.3',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {item.place_Achieved || item.description}
                  </h4>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
