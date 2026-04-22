import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, get, push, set, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject, listAll, getDownloadURL } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const validateFirebaseConfig = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_DATABASE_URL'
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.error('Missing Firebase environment variables:', missing);
    throw new Error(`Missing required Firebase configuration: ${missing.join(', ')}`);
  }
};

validateFirebaseConfig();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);

let analytics: Analytics | null = null;
try {
  if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn('Firebase Analytics could not be initialized:', error);
}

export { analytics };

// Helper function to fetch news with language support
export const fetchNews = async (language = 'es') => {
  try {
    const newsRef = dbRef(db, 'news');
    const snapshot = await get(newsRef);
    
    if (snapshot.exists()) {
      const newsData = [];
      snapshot.forEach((child) => {
        const data = child.val();
        
        // Check if the news has translations
        let title = data.title;
        let content = data.content;
        
        if (data.translations && data.translations[language]) {
          title = data.translations[language].title || data.title;
          content = data.translations[language].content || data.content;
        }
        
        newsData.push({
          id: child.key,
          title,
          content,
          imageUrl: data.imageUrl,
          createdAt: new Date(data.createdAt || Date.now()),
          originalTitle: data.title,
          originalContent: data.content,
          translations: data.translations || {}
        });
      });
      // Sort by createdAt in descending order (newest first)
      return newsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Helper function to add news with translations
export const addNews = async (newsData) => {
  try {
    const newsRef = dbRef(db, 'news');
    const newNewsRef = push(newsRef);
    await set(newNewsRef, {
      ...newsData,
      createdAt: newsData.createdAt || Date.now()
    });
    return newNewsRef.key;
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
};

// Helper function to update news
export const updateNews = async (newsId: string, newsData: any) => {
  try {
    const newsRef = dbRef(db, `news/${newsId}`);
    await update(newsRef, {
      ...newsData,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

// Helper function to delete news
export const deleteNews = async (newsId: string, imageUrl: string) => {
  try {
    // Delete the news entry from the database
    const newsRef = dbRef(db, `news/${newsId}`);
    await remove(newsRef);

    // Delete the associated image from storage
    if (imageUrl) {
      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};

// Fetch all image download URLs from a Firebase Storage folder
export const fetchSlidePhotos = async (folderPath: string): Promise<string[]> => {
  try {
    const folderRef = storageRef(storage, folderPath);
    const result = await listAll(folderRef);
    const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
    return urls;
  } catch (error) {
    console.error('Error fetching slide photos:', error);
    return [];
  }
};

export default app;