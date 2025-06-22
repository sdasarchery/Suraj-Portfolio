import { useEffect, useState } from 'react';
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

  return (
    <Layout>      <h1>Biography</h1>
      <p>Learn about Suraj Nalam's early life, career, and legacy.</p>
      {images.length > 0 && (
        <div style={{ 
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          overflow: 'hidden',
          position: 'relative',
          height: '400px',
          marginTop: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Continuous rotating gallery */}
          <div style={{
            display: 'flex',
            animation: `scrollLeft ${images.length * 8}s linear infinite`,
            width: `${images.length * 300}px`
          }}>
            {/* First set of images */}
            {images.map((imageUrl, index) => (
              <img
                key={`first-${index}`}
                src={imageUrl}
                alt={`Biography image ${index + 1}`}
                style={{ 
                  width: '300px',
                  height: '400px',
                  objectFit: 'cover',
                  marginRight: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  flexShrink: 0
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {images.map((imageUrl, index) => (
              <img
                key={`second-${index}`}
                src={imageUrl}
                alt={`Biography image ${index + 1}`}
                style={{ 
                  width: '300px',
                  height: '400px',
                  objectFit: 'cover',
                  marginRight: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  flexShrink: 0
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
          
          {/* CSS Animation */}
          <style jsx>{`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${images.length * 320}px);
              }
            }
            
            /* Pause animation on hover */
            div:hover > div {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      )}
      {images.length === 0 && (
        <div style={{color: 'red', textAlign: 'center', marginTop: '2rem'}}>
          loading images.
        </div>
      )}
    </Layout>
  );
}
