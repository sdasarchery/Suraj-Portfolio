import { useState, useEffect } from 'react';
import { 
  getAchievements, 
  getAchievementsRealtime, 
  getAchievementsByCategory 
} from '../lib/firestore';

/**
 * Custom hook for managing achievements data
 * Provides loading states, error handling, and real-time updates
 */
export const useAchievements = (options = {}) => {
  const { 
    realtime = false, 
    category = null, 
    fallbackData = null 
  } = options;
  
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (realtime) {
          // Real-time listener
          unsubscribe = getAchievementsRealtime((achievements, err) => {
            if (err) {
              setError(err.message);
              // Use fallback data if available
              if (fallbackData) {
                setData(fallbackData);
              }
            } else {
              setData(achievements);
            }
            setLoading(false);
          });
        } else {
          // One-time fetch
          let achievements;
          if (category) {
            achievements = await getAchievementsByCategory(category);
          } else {
            achievements = await getAchievements();
          }
          setData(achievements);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err.message);
        setLoading(false);
        
        // Use fallback data if available
        if (fallbackData) {
          setData(fallbackData);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [realtime, category, fallbackData]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let achievements;
      if (category) {
        achievements = await getAchievementsByCategory(category);
      } else {
        achievements = await getAchievements();
      }
      setData(achievements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Custom hook for managing achievement statistics
 */
export const useAchievementStats = () => {
  const { data, loading, error } = useAchievements();
  
  const stats = {
    totalCategories: data?.length || 0,
    totalAchievements: data?.reduce((total, category) => total + category.items.length, 0) || 0,
    categoryBreakdown: data?.map(category => ({
      name: category.category,
      count: category.items.length
    })) || []
  };

  return {
    stats,
    loading,
    error
  };
};
