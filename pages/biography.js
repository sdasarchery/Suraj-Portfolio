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
          display: 'flex', 
          overflowX: 'auto', 
          gap: '1rem', 
          padding: '2rem',
          justifyContent: images.length <= 3 ? 'center' : 'flex-start'
        }}>
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Biography image ${index + 1}`}
              style={{ 
                height: '300px', 
                minWidth: '200px',
                objectFit: 'cover', 
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ))}
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
