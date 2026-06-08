import Image from 'next/image';
import Layout from '../components/Layout';
import styles from './about.module.scss';

const leftPhotos = [
  { src: '/karthik_img_1.jpg', alt: 'Suraj Nalam training session' },
  { src: '/karthik_9.jpg', alt: 'Suraj Nalam at the shooting range' }
];

const rightPhotos = [
  { src: '/karthik_img_3.jpg', alt: 'Suraj Nalam competition moment' },
  { src: '/karthik_14.jpg', alt: 'Suraj Nalam preparing for a shot' }
];

export default function AboutPage() {
  return (
    <Layout>
      <section className={styles.aboutPage}>
        <div className={styles.backgroundLayer} />

        <div className={styles.aboutGrid}>
          <aside className={styles.photoColumn}>
            {leftPhotos.map((photo) => (
              <div className={styles.photoCard} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1100px) 100vw, 240px" />
              </div>
            ))}
          </aside>

          <article className={styles.centerContent}>
            <p className={styles.kicker}>About Suraj Nalam</p>
            <h1 className={styles.title}>A Journey of Discipline, Passion, and Precision</h1>

            <p>
              Suraj Nalam&apos;s story in archery began with simple curiosity and quickly became a serious pursuit.
              What started as interest turned into a focused lifestyle built on repetition, patience, and sharp
              attention to detail.
            </p>
            <p>
              Through years of consistent training, he developed not only technical accuracy but also the mental
              strength needed to perform under pressure. Every session added discipline. Every competition added
              perspective.
            </p>
            <p>
              His progress has been shaped by dedicated coaching, strong family support, and an unshakable belief in
              daily improvement. From local contests to larger competitive stages, Suraj continued to evolve with
              humility and intent.
            </p>
            <p>
              Beyond medals, archery shaped his character. It taught him resilience, composure, and commitment -
              values that define how he approaches life both on and off the range.
            </p>

            <div className={styles.ctaRow}>
              <a href="/achievements" className={styles.primaryButton}>
                View achievements
              </a>
              <a href="/media" className={styles.secondaryButton}>
                Explore gallery
              </a>
            </div>
          </article>

          <aside className={styles.photoColumn}>
            {rightPhotos.map((photo) => (
              <div className={styles.photoCard} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1100px) 100vw, 240px" />
              </div>
            ))}
          </aside>
        </div>
      </section>
    </Layout>
  );
}