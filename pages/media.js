import { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import styles from './media.module.scss';


export default function Media() {
  const embedRef = useRef(null);
  useEffect(() => {
    // Load Instagram embed script and force re-processing
    const loadInstagramScript = () => {
      // Remove existing script if present
      const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      script.onload = () => {
        // Force processing multiple times to ensure it works
        setTimeout(() => {
          if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
          }
        }, 500);
        
        setTimeout(() => {
          if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
          }
        }, 1000);
      };
      document.head.appendChild(script);
    };

    // Load script after component mounts
    const timer = setTimeout(loadInstagramScript, 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      <h1 className={styles.title}>Media</h1>
      <p className={styles.description}>Follow Me on Instagram</p>
      <div className={styles.container}>
        <div className={styles.embedWrapper} ref={embedRef}>
          <div className={styles.imagesContainer}>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DLL4wj0oIbQ/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_img_1.jpg" className={styles.image} alt="Instagram Reel 1" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DI1Z774tJVr/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_img_2.jpg" className={styles.image} alt="Instagram Reel 2" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DImpskUtLJE/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_img_3.jpg" className={styles.image} alt="Instagram Reel 3" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DI8pHnjtzBk/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_img_4.jpg" className={styles.image} alt="Instagram Reel 4" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DIFxpu6Ibb5/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_5.jpg" className={styles.image} alt="Instagram Reel 5" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/DDcEcR3CDL1/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_7.jpg" className={styles.image} alt="Instagram Reel 7" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C9y2H_uCBn7/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_8.jpg" className={styles.image} alt="Instagram Reel 8" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C7Lc7-9CEbp/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_9.jpg" className={styles.image} alt="Instagram Reel 9" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C63CbTUidbh/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_10.jpg" className={styles.image} alt="Instagram Reel 10" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C6dCOZQC3sx/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_11.jpg" className={styles.image} alt="Instagram Reel 11" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C29yfN0iZay/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_12.jpg" className={styles.image} alt="Instagram Reel 12" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C24CYz9ih3-/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_13.jpg" className={styles.image} alt="Instagram Reel 13" />
            </a>
            <a href="https://www.instagram.com/ramkumarnalam/reel/C23gC2sCjtb/" target="_blank" className={styles.imageLink}>
              <img src="/karthik_14.jpg" className={styles.image} alt="Instagram Reel 14" />
            </a>
          </div>
        </div>
        {/* You can add more Instagram embeds here */}
      </div>
    </Layout>
  );
}
