import { useEffect, useState , useRef } from 'react';
import Layout from '../components/Layout';
import { storage } from '../lib/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export default function Biography() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Fetch images from Firebase Storage
    const fetchImagesFromFirebase = async () => {
      try {
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
    };    fetchImagesFromFirebase();
  }, []);

function VideoPlayer() {
  const videoRef = useRef(null); // reference to the <video> element

  const handlePlay = () => {
    videoRef.current.play(); // this starts the video
  };


  return (
    <Layout>      
      <h1 style={{ textAlign:'center'}}>Biography</h1>
      <p style={{ textAlign:'center'}}>Learn about Suraj Nalam's early life, career, and legacy.</p>
      <div className='header-image-container'>
        <img src='/header_image.png'
        className='header-image'
          style={{ 
            textAlign: 'center', 
            marginTop: '2rem' ,
            marginLeft: 'calc(-45vw + 55%)',
            overflow: 'hidden',
            position: 'relative',
          }}
         />
         <div>
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Suraj Nalam</h2>
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Suraj Nalam About
          </p>
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

}
