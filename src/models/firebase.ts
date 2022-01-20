import { AddNote, Abonement, AddSubscribe } from '@/models';

export interface User {
  name: string;
  role: string;
}

export interface FirebaseData {
  id: string;
  info: Array<AddNote | Abonement | AddSubscribe>;
}

export interface removedItem {
  id: string;
  name: string;
}

export enum RemovedItems {
  First = 'notes',
  Second = 'orders',
  Third = 'subscribes'
}

export enum FBError {
  UserNotFound =  'auth/user-not-found',
  InvalidEmail = 'auth/invalid-email',
  WrongPassword = 'auth/wrong-password',
}
