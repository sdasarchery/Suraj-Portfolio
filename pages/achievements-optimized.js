import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import styles from './achievements.module.scss';
import achievementsData from '../data/achievements.json';

const SUBTITLE = 'Milestones earned through discipline, focus, and consistency.';

export default function Achievements({ achievements = [] }) {
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  const normalizedAchievements = useMemo(() => {
    const source = Array.isArray(achievements) && achievements.length > 0
      ? achievements
      : achievementsData.achievements;

    if (!Array.isArray(source)) {
      return [];
    }

    return source
      .filter((entry) => entry && typeof entry.category === 'string' && Array.isArray(entry.items))
      .map((entry) => ({
        category: entry.category,
        items: entry.items.filter((item) => typeof item === 'string' && item.trim().length > 0)
      }))
      .filter((entry) => entry.items.length > 0);
  }, [achievements]);

  const totalItems = useMemo(
    () => normalizedAchievements.reduce((sum, section) => sum + section.items.length, 0),
    [normalizedAchievements]
  );

  const yearWiseAchievements = useMemo(() => {
    const yearMap = new Map();
    const others = [];
    const yearPattern = /(19|20)\d{2}/;

    normalizedAchievements.forEach((section) => {
      const categoryYearMatch = section.category.match(yearPattern);
      const categoryYear = categoryYearMatch ? categoryYearMatch[0] : null;

      section.items.forEach((item) => {
        const itemYearMatch = item.match(yearPattern);
        const year = itemYearMatch ? itemYearMatch[0] : categoryYear;

        if (year) {
          if (!yearMap.has(year)) {
            yearMap.set(year, []);
          }
          yearMap.get(year).push(item);
        } else {
          others.push(item);
        }
      });
    });

    const yearCards = Array.from(yearMap.entries())
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([year, items]) => ({
        title: `${year} Achievements`,
        items
      }));

    if (others.length > 0) {
      yearCards.push({
        title: 'Other Achievements',
        items: others
      });
    }

    return yearCards;
  }, [normalizedAchievements]);

  useEffect(() => {
    setPageReady(true);
  }, []);

  useEffect(() => {
    if (!pageReady) {
      return;
    }

    let index = 0;
    setIsTyping(true);
    setTypedSubtitle('');

    const timer = window.setInterval(() => {
      index += 1;
      setTypedSubtitle(SUBTITLE.slice(0, index));

      if (index >= SUBTITLE.length) {
        setIsTyping(false);
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [pageReady]);

  return (
    <Layout>
      <section className={styles.pageShell}>
        <div className={styles.backgroundImage} />
        <div className={styles.vignette} />

        <div className={`${styles.contentWrap} ${pageReady ? styles.ready : ''}`}>
          <header className={styles.headerBlock}>
            <p className={styles.kicker}>Performance Archive</p>
            <h1 className={styles.title}>Achievements</h1>
            <p className={`${styles.subtitle} ${isTyping ? styles.typing : ''}`}>
              {typedSubtitle}
            </p>

            <div className={styles.metricRow}>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>{yearWiseAchievements.length}</span>
                <span className={styles.metricLabel}>Year Cards</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>{totalItems}</span>
                <span className={styles.metricLabel}>Milestones</span>
              </div>
            </div>
          </header>

          {yearWiseAchievements.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No achievements available right now.</h2>
              <p>Please check back shortly for updated milestones.</p>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {yearWiseAchievements.map((section, index) => (
                <article className={styles.achievementCard} key={section.title} style={{ animationDelay: `${index * 90}ms` }}>
                  <div className={styles.cardAccent} />
                  <h2>{section.title}</h2>
                  <ul className={styles.timelineList}>
                    {section.items.map((item) => (
                      <li key={item} className={styles.timelineItem}>
                        <span className={styles.checkIcon} aria-hidden="true">✓</span>
                        <span className={styles.itemText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      achievements: Array.isArray(achievementsData?.achievements) ? achievementsData.achievements : []
    },
    revalidate: 60
  };
}
