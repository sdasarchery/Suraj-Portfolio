import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from './biography.module.scss';

export default function Biography() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Fetch images from Firebase Storage - Firebase is only loaded when this page is visited
    const fetchImagesFromFirebase = async () => {
      try {
        // Dynamically import Firebase only when needed (on client-side, when user visits this page)
        const { storage } = await import('../lib/firebase');
        const { ref, listAll, getDownloadURL } = await import('firebase/storage');
        
        const imagesRef = ref(storage, 'biography'); // 'biography' is the folder name in Firebase Storage
        const imageList = await listAll(imagesRef);
        
        const imageUrls = await Promise.all(
          imageList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        
        console.log('Fetched images from Firebase:', imageUrls);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images from Firebase:', error);
        setImages([]);
      }
    };
    
    fetchImagesFromFirebase();
  }, []);

  return (
    <Layout>      
      <h1 className={styles.title}>Biography</h1>
      <p className={styles.description}>Learn about Suraj Nalam's early life, career, and legacy.</p>
      <div className={styles.headerImageContainer}>
        <img src='/header_image.png' className={styles.headerImage} alt="Header" />
        <div className={styles.headerText}>
          <h2>Suraj Nalam</h2>
          <p>Suraj Nalam About</p>
        </div>
      </div>
      {images.length > 0 && (
        <div className={styles.galleryContainer}>
          <div className={styles.gallery}>
            {images.map((imageUrl, index) => (
              <img
                key={`first-${index}`}
                src={imageUrl}
                alt={`Biography image ${index + 1}`}
                className={styles.galleryImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
            {images.map((imageUrl, index) => (
              <img
                key={`second-${index}`}
                src={imageUrl}
                alt={`Biography image ${index + 1}`}
                className={styles.galleryImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      )}
      {images.length === 0 && (
        <div className={styles.loadingMessage}>Loading images...</div>
      )}
    </Layout>
  );
}



//marginRight: 'calc(-50vw + 50%)',
//