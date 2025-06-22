import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from './achievements.module.scss';

export default function Achievements() {
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');  useEffect(() => {
    fetchTextFile();
  }, []);

  const testConnection = () => {
    setDebugInfo('Testing connection...');
    fetchTextFile();
  };const fetchTextFile = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Fetching achievements content from API...');
      
      // Use our API endpoint to avoid CORS issues
      const response = await fetch('/api/achievements');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTextContent(data.content);
      setDebugInfo('Content loaded successfully from API!');
      
    } catch (err) {
      console.error('Error fetching text file:', err);
      setDebugInfo(`Error occurred: ${err.message}`);
      
      // Handle different types of errors
      if (err.message.includes('404') || err.message.includes('File not found')) {
        setError('File not found: Make sure "achievements.txt" exists in the "achievements/" folder in Firebase Storage.');
      } else if (err.message.includes('403') || err.message.includes('Permission denied')) {
        setError('Permission denied: Check Firebase Storage security rules to ensure read access is allowed.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error: Please check your internet connection and try again.');
      } else {
        setError(`Error loading achievements: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const formatTextContent = (content) => {
    // Split content into paragraphs and format
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={index} />;
      
      // Check if line looks like a heading (starts with # or is all caps)
      if (trimmedLine.startsWith('#') || (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3)) {
        return <h3 key={index} className={styles.contentHeading}>{trimmedLine.replace(/^#+\s*/, '')}</h3>;
      }
      
      // Check if line looks like a bullet point
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        return <li key={index} className={styles.bulletPoint}>{trimmedLine.replace(/^[•\-*]\s*/, '')}</li>;
      }
      
      // Regular paragraph
      return <p key={index} className={styles.contentParagraph}>{trimmedLine}</p>;
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Achievements</h1>
          <div className={styles.loading}>Loading achievements documents...</div>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>Achievements</h1>
          <div className={styles.error}>{error}</div>
          {debugInfo && (
            <div className={styles.debug}>
              <p><strong>Debug Info:</strong> {debugInfo}</p>
            </div>
          )}          <button 
            onClick={testConnection} 
            className={styles.retryButton}
          >
            Retry Loading
          </button>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Achievements</h1>
        <p>Discover Suraj Nalam's world records and medals.</p>
        
        {textContent && (
          <div className={styles.textContent}>
            {formatTextContent(textContent)}
          </div>
        )}
      </div>
    </Layout>
  );
}
// This page showcases the achievements of Suraj Nalam, including world records and medals.