import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Use existing Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAiLKOQjF_rEgZO53HuBl9lF932VjoNtk0",
  authDomain: "surajnalamblog.firebaseapp.com",
  projectId: "surajnalamblog",
  storageBucket: "surajnalamblog.firebasestorage.app",
  messagingSenderId: "621053916534",
  appId: "1:621053916534:web:50fe3b0041da9a75c47657"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Collections
export const COLLECTIONS = {
  ACHIEVEMENTS: 'achievements',
  CATEGORIES: 'achievement_categories'
};

// Category mapping for better organization
export const CATEGORIES = {
  WORLD_RECORDS: 'world_records',
  MEDALS_AWARDS: 'medals_awards',
  ACADEMIC: 'academic',
  RECOGNITION: 'recognition',
  FUTURE_GOALS: 'future_goals'
};

/**
 * Get all achievements grouped by category
 */
export const getAchievements = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ACHIEVEMENTS),
      where('isVisible', '==', true),
      orderBy('priority', 'asc'),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const achievements = [];
    
    querySnapshot.forEach((doc) => {
      achievements.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Group by category
    return groupAchievementsByCategory(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

/**
 * Get achievements with real-time listener
 */
export const getAchievementsRealtime = (callback) => {
  const q = query(
    collection(db, COLLECTIONS.ACHIEVEMENTS),
    where('isVisible', '==', true),
    orderBy('priority', 'asc'),
    orderBy('date', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const achievements = [];
    querySnapshot.forEach((doc) => {
      achievements.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    const groupedAchievements = groupAchievementsByCategory(achievements);
    callback(groupedAchievements);
  }, (error) => {
    console.error('Error in real-time listener:', error);
    callback(null, error);
  });
};

/**
 * Get achievements by specific category
 */
export const getAchievementsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ACHIEVEMENTS),
      where('category', '==', category),
      where('isVisible', '==', true),
      orderBy('priority', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const achievements = [];
    
    querySnapshot.forEach((doc) => {
      achievements.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements by category:', error);
    throw error;
  }
};

/**
 * Add new achievement
 */
export const addAchievement = async (achievementData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.ACHIEVEMENTS), {
      ...achievementData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
};

/**
 * Update existing achievement
 */
export const updateAchievement = async (id, updateData) => {
  try {
    const docRef = doc(db, COLLECTIONS.ACHIEVEMENTS, id);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating achievement:', error);
    throw error;
  }
};

/**
 * Delete achievement
 */
export const deleteAchievement = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.ACHIEVEMENTS, id));
  } catch (error) {
    console.error('Error deleting achievement:', error);
    throw error;
  }
};

/**
 * Group achievements by category for UI display
 */
const groupAchievementsByCategory = (achievements) => {
  const grouped = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {});

  // Convert to the format expected by the UI
  return Object.entries(grouped).map(([category, items]) => ({
    category: getCategoryDisplayName(category),
    items: items.map(item => item.title || item.description)
  }));
};

/**
 * Get human-readable category names
 */
const getCategoryDisplayName = (category) => {
  const displayNames = {
    [CATEGORIES.WORLD_RECORDS]: 'World Records',
    [CATEGORIES.MEDALS_AWARDS]: 'Medals and Awards',
    [CATEGORIES.ACADEMIC]: 'Academic Achievements',
    [CATEGORIES.RECOGNITION]: 'Special Recognition',
    [CATEGORIES.FUTURE_GOALS]: 'Future Goals'
  };
  
  return displayNames[category] || category;
};

export default db;
