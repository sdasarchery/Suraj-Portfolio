import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from './media.module.scss';

export default function Media({ images }) {
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <Layout>
      <section className={styles.pageShell}>
        <div className={styles.vignette} />
        <div className={styles.container}>
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.description}>Latest moments from Suraj's journey</p>
          <div className={styles.embedWrapper}>
            <div className={styles.imagesContainer}>
              {visibleImages.map((imageName, index) => (
                <div className={styles.imageLink} key={imageName}>
                  <div className={styles.imageFrame}>
                    <Image
                      src={`/suraj_images/${encodeURIComponent(imageName)}`}
                      className={styles.image}
                      alt={imageName}
                      fill
                      sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
                      quality={72}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      priority={index < 2}
                    />
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMoreWrap}>
                <button
                  type="button"
                  className={styles.loadMoreButton}
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const fs = await import('fs');
  const path = await import('path');

  const galleryDir = path.join(process.cwd(), 'public', 'suraj_images');
  const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

  let images = [];

  if (fs.existsSync(galleryDir)) {
    images = fs
      .readdirSync(galleryDir)
      .filter((fileName) => {
        const ext = path.extname(fileName).toLowerCase();
        return allowedExtensions.has(ext);
      })
      .sort((a, b) => a.localeCompare(b));
  }

  return {
    props: {
      images
    },
    revalidate: 60
  };
}
