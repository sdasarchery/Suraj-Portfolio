import { useEffect } from 'react';
import Layout from '../components/Layout';
import styles from './media.module.scss';

export default function Media() {
  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (!window.FB) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
    } else {
      // If already loaded, just re-parse
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <Layout>
      <h1>Media</h1>
      <p>Photos and videos of Usain Bolt in action.</p>
      <div className={styles.container}>
        {/* Facebook Page Plugin Embed Example */}
        <div className="fb-page"
          data-href="https://www.facebook.com/facebook"
          data-tabs="timeline"
          data-width="500"
          data-height="600"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true">
          <blockquote cite="https://www.facebook.com/facebook" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/facebook">Facebook</a>
          </blockquote>
        </div>
      </div>
    </Layout>
  );
}
