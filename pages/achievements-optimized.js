import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from './achievements.module.scss';
import achievementsData from '../data/achievements.json';

export default function Achievements() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState({});

  useEffect(() => {
    // Animate sections appearing one by one
    achievementsData.achievements.forEach((section, sectionIndex) => {
      setTimeout(() => {
        setVisibleSections(prev => [...prev, sectionIndex]);
        
        // Animate items within each section
        section.items.forEach((item, itemIndex) => {
          setTimeout(() => {
            setCurrentItemIndex(prev => ({
              ...prev,
              [`${sectionIndex}-${itemIndex}`]: true
            }));
          }, itemIndex * 200);
        });
      }, sectionIndex * 800);
    });
  }, []);

  // Alternative: Typewriter effect for text
  const TypewriterText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }
      }, delay + currentIndex * 50);

      return () => clearTimeout(timer);
    }, [currentIndex, text, delay]);

    return <span>{displayText}</span>;
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <TypewriterText text="Achievements" delay={100} />
        </h1>
        <p className={styles.subtitle}>
          <TypewriterText 
            text="Discover Suraj Nalam's world records and medals." 
            delay={1000} 
          />
        </p>
        
        <div className={styles.achievementsGrid}>
          {achievementsData.achievements.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className={`${styles.achievementSection} ${
                visibleSections.includes(sectionIndex) ? styles.visible : ''
              }`}
            >
              <h2 className={styles.sectionTitle}>{section.category}</h2>
              <ul className={styles.achievementsList}>
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className={`${styles.achievementItem} ${
                      currentItemIndex[`${sectionIndex}-${itemIndex}`] ? styles.visible : ''
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interactive Timeline View */}
        <div className={styles.timelineSection}>
          <h2>Achievement Timeline</h2>
          <div className={styles.timeline}>
            {achievementsData.achievements.map((section, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3>{section.category}</h3>
                  <p>{section.items.length} achievements</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Static props for even faster loading
export async function getStaticProps() {
  return {
    props: {
      achievements: achievementsData.achievements
    },
    revalidate: 60 // Revalidate every minute if needed
  };
}
