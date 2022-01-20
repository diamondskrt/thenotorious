import firebase from 'firebase/compat/app';
import { removedItem } from '@/models';

class FirebaseService {
  signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return firebase.auth().signOut();
  }

  get(name: string, uid?: string): firebase.firestore.DocumentData {
    return uid
      ? firebase.firestore().collection(name).doc(uid).get()
      : firebase.firestore().collection(name).get();
  }

  set(name: string, uid: string, params: { processed: boolean }, merge: { merge: boolean }): Promise<void> {
    return firebase.firestore().collection(name).doc(uid).set(params, merge)
  }

  add<T>(name: string, params: T): firebase.firestore.DocumentData {
    return firebase.firestore().collection(name).add(params);
  }

  remove(data: removedItem): Promise<void> {
    return firebase.firestore().collection(data.name).doc(data.id).delete();
  }
}

export default new FirebaseService();
