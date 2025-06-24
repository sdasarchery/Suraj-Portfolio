import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from './achievements.module.scss';
import { 
  AchievementCard, 
  TypewriterText, 
  Timeline, 
  LoadingSkeleton 
} from '../components/AchievementComponentsFixed';
import { useAchievements, useAchievementStats } from '../hooks/useAchievements';

// Fallback data for offline/error scenarios
const fallbackAchievementsData = {
  achievements: [
    {
      category: "World Records",
      items: [
        "Fastest 100m sprint in regional championship - 10.2 seconds",
        "Long jump record at state level - 00000000 meters",
        "Marathon completion time - 2 hours 45 minutes"
      ]
    },
    {
      category: "Medals and Awards",
      items: [
        "SoCal Showdown 2025 --> Cadet Compound Men Top scorer in qualification Silver in Eliminations",
        "2025 Apr - Youth World Trials Florida - Bronze",
        "2025 Apr - Gator Cup - Florida - Bronze",
        "2025 Apr - Arizona Cup - Silver",
      ]
    },
    {
      category: "Academic Achievements",
      items: [
        "Dean's List for 4 consecutive semesters",
        "Outstanding Student Award 2023",
        "Research Paper published in International Journal"
      ]
    },
    {
      category: "Special Recognition",
      items: [
        "Recognized by the Sports Authority for exceptional performance",
        "Awarded scholarship for academic excellence and sportsmanship",
        "Featured in local newspaper for community service activities"
      ]
    }
  ]
};

export default function Achievements() {
  const [visibleSections, setVisibleSections] = useState([]);
  
  // Use Firestore data with real-time updates and fallback
  const { 
    data: achievementsData, 
    loading, 
    error, 
    refetch 
  } = useAchievements({ 
    realtime: true, 
    fallbackData: fallbackAchievementsData.achievements 
  });
  
  // Get achievement statistics
  const { stats } = useAchievementStats();
  
  useEffect(() => {
    // Animate sections appearing when data is loaded
    if (achievementsData && achievementsData.length > 0) {
      achievementsData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, index]);
        }, index * 300);
      });
    }
  }, [achievementsData]);  // Timeline data for interactive display
  const timelineData = achievementsData ? achievementsData.map(section => ({
    title: section.category,
    description: `Outstanding accomplishments in ${section.category.toLowerCase()}`,
    count: section.items.length
  })) : [];

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Achievements</h1>
          <LoadingSkeleton lines={8} />
        </div>
      </Layout>
    );
  }

  // Show error state with fallback option
  if (error && !achievementsData) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Achievements</h1>
          <div className={styles.error}>
            <p>Unable to load achievements: {error}</p>
            <button 
              onClick={refetch} 
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <TypewriterText text="Achievements" speed={80} />
        </h1>
        <p className={styles.subtitle}>
          <TypewriterText 
            text="Discover Suraj Nalam's world records and medals." 
            speed={40}
            delay={1200}
          />
        </p>        
        {/* Dynamic Achievement Cards */}
        <div className={styles.achievementsGrid}>
          {achievementsData && achievementsData.map((section, index) => (
            <AchievementCard
              key={index}
              title={section.category}
              items={section.items}
              delay={index * 200}
              animationType={index % 2 === 0 ? 'slideUp' : 'slideLeft'}
            />
          ))}
        </div>

        {/* Interactive Timeline */}
        <div className={styles.timelineSection}>
          <h2>
            <TypewriterText text="Achievement Timeline" delay={2000} />
          </h2>
          <Timeline items={timelineData} />
        </div>
        
        {/* Quick Stats */}
        <div className={styles.statsSection}>
          {/* <div className={styles.statCard}>
            <span className={styles.statNumber}>
              <TypewriterText 
                text={stats.totalCategories.toString()} 
                delay={3000}
              />
            </span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              <TypewriterText 
                text={stats.totalAchievements.toString()} 
                delay={3200}
              />
            </span>
            <span className={styles.statLabel}>Total Achievements</span>
          </div> */}
          
          {/* Show real-time indicator if using live data */}
          {/* {!loading && (
            <div className={styles.realtimeIndicator}>
              <span className={styles.liveDot}></span>
              Live Data
            </div>
          )} */}
        </div>
      </div>
    </Layout>
  );
}
// This page showcases the achievements of Suraj Nalam, including world records and medals.