import { FBError } from '@/models';

export const fbErrorMessageMap = new Map([
  [FBError.UserNotFound, 'Пользователь не найден'],
  [FBError.InvalidEmail, 'Пользователя с указанным email не существует'],
  [FBError.WrongPassword, 'Введен не верный пароль'],
]);
