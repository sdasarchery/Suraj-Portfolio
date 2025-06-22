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

export const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={styles.timelineContainer}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={`${styles.timelineItem} ${index === activeIndex ? styles.active : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <div className={styles.timelineMarker} />
          <div className={styles.timelineContent}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.timelineCount}>
              {item.count} achievements
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
