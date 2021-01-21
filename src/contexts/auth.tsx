import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

import { User } from '../models/User';

import { AuthContextData, init } from './authContextData';

const AuthContext = createContext<AuthContextData>(init());

interface PropsAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: PropsAuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const [currentRodada, setCurrentRodada] = useState(1);
  const [championship, setChampionship] = useState(0);
  const [loading, setLoading] = useState(true);
  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const values = await AsyncStorage.multiGet([
        '@Pitaco:email',
        '@Pitaco:token',
        '@Pitaco:theme',
      ]);

      const storageEmail = values[0][1];
      const storageToken = values[1][1];
      const storageTheme = values[2][1];

      if (storageEmail && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;

        const { data, error } = await auth.initUserApp(storageEmail);
        if (error === '') {
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          setChampionship(data.championship);
          setCurrentRodada(data.rodada);
          setUser(data.user);
          if (storageTheme === 'true') {
            setThemeDark(true);
          } else {
            setThemeDark(false);
          }
        }
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    const { data, error } = await auth.signIn(email, password);
    if (error === '') {
      setChampionship(data.championship);
      setCurrentRodada(data.rodada);
      setUser(data.user);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      const emailKey = ['@Pitaco:email', data.user.email];
      const tokenKey = ['@Pitaco:token', data.token];
      const themeKey = ['@Pitaco:theme', 'false'];

      await AsyncStorage.multiSet([emailKey, tokenKey, themeKey]);
      return '';
    }
    return error;
  }

  async function signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    accertTerms: boolean
  ) {
    if (!accertTerms) return 'Termos não aceitos';

    const { data, error } = await auth.register(
      name,
      email,
      password,
      confirmPassword
    );
    if (error === '') {
      setChampionship(data.championship);
      setCurrentRodada(data.rodada);
      setUser(data.user);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      const emailKey = ['@Pitaco:email', data.user.email];
      const tokenKey = ['@Pitaco:token', data.token];
      const themeKey = ['@Pitaco:theme', 'false'];

      await AsyncStorage.multiSet([emailKey, tokenKey, themeKey]);

      return '';
    }
    return error;
  }

  function signOut() {
    setLoading(true);
    setUser(null);
    setChampionship(0);
    setCurrentRodada(0);
    setThemeDark(false);
    AsyncStorage.clear();
    setLoading(false);
  }

  async function onChangeThemeDark() {
    const booleanTheme = !themeDark;
    setThemeDark(booleanTheme);
    if (booleanTheme) {
      await AsyncStorage.setItem('@Pitaco:theme', 'true');
    } else {
      await AsyncStorage.setItem('@Pitaco:theme', 'false');
    }
  }

  async function forgotPassword(email: string) {
    return auth.forgotPassword(email);
  }

  async function resetPassword(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return auth.resetPassword(email, password, confirmPassword);
  }

  function updateUser(userNew: User) {
    setUser(userNew);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        themeDark,
        championship,
        currentRodada,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resetPassword,
        onChangeThemeDark,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
