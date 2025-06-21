import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Biography() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTTRzNmuHqWr_M-QWqe0bmQjANCu2kifJjOOFAmJfvKgLx7Bq6-LTB53kCLWYDByyDNe_3Obm_TOCsF/pub?gid=0&single=true&output=csv')
      .then(res => res.text())
      .then(text => {
        // Split CSV by line, filter out empty lines, and trim
        const urls = text.split('\n').map(line => line.trim()).filter(Boolean).map(link => {
          // If it's already a direct link, return as is
          if (link.startsWith('https://drive.google.com/uc?export=view&id=')) return link;
          // If it's a Google Drive share link, convert to direct link
          const match = link.match(/https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view/);
          if (match && match[1]) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
          }
          // Otherwise, return as is
          return link;
        });
        setImages(urls);
      });
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Layout>
      <h1>Biography</h1>
      <p>Learn about Suraj Nalam's early life, career, and legacy.</p>
      {images.length > 0 && (
        <div style={{ maxWidth: 500, margin: '2rem auto', textAlign: 'center' }}>
          <img src={images[current]} alt={`Slideshow ${current + 1}`} style={{ width: '100%', borderRadius: 8 }} />
          <div style={{ marginTop: 8 }}>
            <button onClick={prevSlide} disabled={images.length < 2}>Prev</button>
            <span style={{ margin: '0 1rem' }}>{current + 1} / {images.length}</span>
            <button onClick={nextSlide} disabled={images.length < 2}>Next</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
