import {FBError, User, Abonement } from '@/models';

export interface StateFirebase {
  fbError: FBError | null;
  user: User | null;
}

export interface StateMain {
  abonements: Array<Abonement> | null;
}
