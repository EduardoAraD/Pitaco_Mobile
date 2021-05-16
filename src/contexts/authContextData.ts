import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import { User } from '../models/User';

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  championship: number;
  currentRodada: number;

  signIn(email: string, password: string): Promise<string>;
  signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    accertTerms: boolean
  ): Promise<string>;
  signOut(): void;
  forgotPassword(email: string): Promise<{ success: string; error: string }>;
  resetPassword(
    codig: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: string; error: string }>;
  updateUser(user: User): void;
  updateUserPerfil(
    email: string,
    nickname: string,
    avatar: string
  ): Promise<string>;
}

export function init(): AuthContextData {
  return {
    signed: false,
    user: null,
    loading: false,
    championship: 0,
    currentRodada: 0,
    signIn: async (email: string, password: string) => {
      await auth.signIn(email, password);
      return '';
    },
    signUp: async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
      accertTerms: boolean
    ) => {
      if (accertTerms) return '';
      await auth.register(name, email, password, confirmPassword);
      return '';
    },
    signOut: () => {},
    forgotPassword: async (email: string) => {
      return auth.forgotPassword(email);
    },
    resetPassword: async (
      codig: string,
      password: string,
      confirmPassword: string
    ) => {
      return auth.resetPassword(codig, password, confirmPassword);
    },
    updateUser: (userNew: User) => {
      AsyncStorage.setItem('@Pitaco:default', JSON.stringify(userNew));
    },
    updateUserPerfil: async (
      email: string,
      nickname: string,
      avatar: string
    ) => {
      return (await auth.updateUser(email, nickname, avatar)).error;
    },
  };
}
