import { Abonement } from '@/models/abonement';

export interface AddOrder {
  userName: string;
  userPhone: string;
  order: Array<Abonement>;
  processed: boolean;
}
