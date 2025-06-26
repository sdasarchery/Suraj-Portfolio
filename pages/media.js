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
    <Layout >
      <h1>Media</h1>
      <p>videos from Instagram.</p>
      <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          paddingRight: '20px',
          paddingLeft: '20px',
       }} >
        <div style={{ width: '100%' }} >          {/* Instagram Reel Embed */}
          <div style={{ width: '100%' }} ref={embedRef} >
            <div style={{ width: '100%' }} className='images-container'>
                <a href="https://www.instagram.com/ramkumarnalam/reel/DLL4wj0oIbQ/" target="_blank">
                  <img src="/karthik_img_1.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/DI1Z774tJVr/" target="_blank">
                  <img src="/karthik_img_2.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/DImpskUtLJE/" target="_blank">
                  <img src="/karthik_img_3.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/DI8pHnjtzBk/" target="_blank">
                  <img src="/karthik_img_4.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/DIFxpu6Ibb5/" target="_blank">
                  <img src="/karthik_5.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                
                <a href="https://www.instagram.com/ramkumarnalam/reel/DDcEcR3CDL1/" target="_blank">
                  <img src="/karthik_7.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C9y2H_uCBn7/" target="_blank">
                  <img src="/karthik_8.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C7Lc7-9CEbp/" target="_blank">
                  <img src="/karthik_9.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C63CbTUidbh/" target="_blank">
                  <img src="/karthik_10.jpg" style={{ height: '400px' , width:'310px'}} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C6dCOZQC3sx/" target="_blank">
                  <img src="/karthik_11.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C29yfN0iZay/" target="_blank">
                  <img src="/karthik_12.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C24CYz9ih3-/" target="_blank">
                  <img src="/karthik_13.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
                <a href="https://www.instagram.com/ramkumarnalam/reel/C23gC2sCjtb/" target="_blank">
                  <img src="/karthik_14.jpg" style={{ height: '400px' }} className='karthik-img' />
                </a>
            </div>
          </div>
          {/* You can add more Instagram embeds here */}
        </div>
      </div>
    </Layout>
  );
}
