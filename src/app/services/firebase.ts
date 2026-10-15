import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { PublicMailboxLetter } from '../models/character.model';
import firebaseConfig from '../../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// CRITICAL: Connect to the specific provisioned Firestore database
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on initial startup
export async function testConnection(): Promise<boolean> {
  if (typeof window === 'undefined') return true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
    return false;
  }
}

// Firestore operations for Letters collection
export async function fetchLettersFromFirestore(): Promise<PublicMailboxLetter[]> {
  const path = 'letters';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        nickname: data['nickname'] || 'Người lữ khách vô danh',
        title: data['title'] || 'Thư gửi khu vườn',
        content: data['content'] || '',
        createdAt: data['createdAt'] || new Date().toISOString(),
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveLetterToFirestore(letter: PublicMailboxLetter): Promise<void> {
  const path = `letters/${letter.id}`;
  try {
    await setDoc(doc(db, 'letters', letter.id), {
      id: letter.id,
      nickname: letter.nickname,
      title: letter.title,
      content: letter.content,
      createdAt: letter.createdAt,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToLetters(
  onUpdate: (letters: PublicMailboxLetter[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const path = 'letters';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const letters: PublicMailboxLetter[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          nickname: data['nickname'] || 'Người lữ khách vô danh',
          title: data['title'] || 'Thư gửi khu vườn',
          content: data['content'] || '',
          createdAt: data['createdAt'] || new Date().toISOString(),
        };
      });
      onUpdate(letters);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}
