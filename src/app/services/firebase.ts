import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { MailboxLetter } from '../models/character.model';

const firebaseConfig = {
  projectId: 'ai-studio-lovehave-12749d37-89ff-46df-9293-474ac563aa7f',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export function testConnection(): Promise<boolean> {
  return Promise.resolve(true);
}

export async function saveLetterToFirestore(letter: Omit<MailboxLetter, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'letters'), {
      ...letter,
      timestamp: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore fallback to local:', error);
    return 'local-' + Date.now();
  }
}

export function subscribeToLetters(callback: (letters: MailboxLetter[]) => void): () => void {
  try {
    const q = query(collection(db, 'letters'), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(
      q,
      (snapshot) => {
        const letters: MailboxLetter[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          letters.push({
            id: doc.id,
            senderName: data['senderName'] || 'Ẩn danh',
            recipientCharacterId: data['recipientCharacterId'] || '',
            recipientCharacterName: data['recipientCharacterName'] || 'Tất cả nhân vật',
            message: data['message'] || '',
            flowerChoice: data['flowerChoice'] || 'Hoa Hồng',
            createdAt: data['createdAt'] || new Date().toISOString(),
            isPublic: data['isPublic'] ?? true,
          });
        });
        callback(letters);
      },
      (error) => {
        console.warn('Firestore snapshot error:', error);
      }
    );
  } catch {
    return () => {};
  }
}
