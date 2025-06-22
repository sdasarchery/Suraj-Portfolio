/**
 * Data Migration Script for Firestore
 * Run this script to migrate your existing achievements data to Firestore
 * 
 * Usage: node scripts/migrateToFirestore.js
 */

import { addAchievement, CATEGORIES } from '../lib/firestore.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read achievements data
const achievementsData = JSON.parse(
  readFileSync(join(__dirname, '../data/achievements.json'), 'utf8')
);

const migrateAchievements = async () => {
  console.log('🚀 Starting migration to Firestore...');
  
  try {
    let totalMigrated = 0;
    
    for (const categoryData of achievementsData.achievements) {
      const categoryKey = getCategoryKey(categoryData.category);
      
      console.log(`📁 Migrating category: ${categoryData.category}`);
      
      for (let i = 0; i < categoryData.items.length; i++) {
        const item = categoryData.items[i];
        
        const achievementDoc = {
          title: item,
          category: categoryKey,
          description: item,
          priority: i + 1,
          date: new Date().toISOString().split('T')[0], // Current date as placeholder
          isVisible: true,
          metadata: {
            migratedFrom: 'static_data',
            originalIndex: i
          }
        };
        
        const docId = await addAchievement(achievementDoc);
        console.log(`  ✅ Added: ${item} (ID: ${docId})`);
        totalMigrated++;
        
        // Small delay to avoid overwhelming Firestore
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📊 Total achievements migrated: ${totalMigrated}`);
    console.log(`📋 Categories: ${achievementsData.achievements.length}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};

/**
 * Map display names to category keys
 */
const getCategoryKey = (displayName) => {
  const mapping = {
    'World Records': CATEGORIES.WORLD_RECORDS,
    'Medals and Awards': CATEGORIES.MEDALS_AWARDS,
    'Academic Achievements': CATEGORIES.ACADEMIC,
    'Special Recognition': CATEGORIES.RECOGNITION,
    'Future Goals': CATEGORIES.FUTURE_GOALS
  };
  
  return mapping[displayName] || displayName.toLowerCase().replace(/\s+/g, '_');
};

// Sample additional achievements you can add
const sampleAdditionalAchievements = [
  {
    title: "Breaking 4-minute mile barrier in university track meet",
    category: CATEGORIES.WORLD_RECORDS,
    description: "First student to break the 4-minute mile at university level",
    date: "2024-05-15",
    priority: 1,
    metadata: {
      time: "3:58.2",
      venue: "University Stadium",
      weather: "Perfect conditions"
    }
  },
  {
    title: "Outstanding Graduate Student Award 2024",
    category: CATEGORIES.ACADEMIC,
    description: "Highest honor for graduate students in the department",
    date: "2024-06-01",
    priority: 1,
    metadata: {
      department: "Computer Science",
      gpa: "3.98/4.0"
    }
  }
];

console.log('🔧 Firestore Migration Script');
console.log('This script will migrate your achievements data to Firestore.');
console.log('Make sure your Firebase configuration is correct in lib/firestore.js\n');

// Run the migration
migrateAchievements();

export { migrateAchievements, sampleAdditionalAchievements };
