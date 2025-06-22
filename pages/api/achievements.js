import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Reference to the achievements text file
    const textFileRef = ref(storage, 'achievements/achievements.txt');
    
    // Get the download URL
    const url = await getDownloadURL(textFileRef);
    
    // Fetch the content server-side (no CORS issues)
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const content = await response.text();
    
    // Return the content as JSON
    res.status(200).json({ content });
    
  } catch (error) {
    console.error('Error fetching achievements file:', error);
    
    if (error.code === 'storage/object-not-found') {
      res.status(404).json({ error: 'File not found' });
    } else if (error.code === 'storage/unauthorized') {
      res.status(403).json({ error: 'Permission denied' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
