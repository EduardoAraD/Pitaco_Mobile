import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import LightTheme from '../assets/theme/light';
import DarkTheme from '../assets/theme/dark';

interface ColorsContextData {
  toggleTheme(): void;
}

function init(): ColorsContextData {
  return {
    toggleTheme: () => {},
  };
}

const ColorsContext = createContext<ColorsContextData>(init());

interface PropsAuthProvider {
  children: React.ReactNode;
}

export function ColorsProvider({ children }: PropsAuthProvider) {
  const [theme, setTheme] = useState<DefaultTheme>(LightTheme);

  const loadDataColor = async (): Promise<void> => {
    const color = await AsyncStorage.getItem('@Pitaco:color');
    if (color === 'dark') {
      setTheme(DarkTheme);
    } else {
      setTheme(LightTheme);
    }
  };

  function toggleTheme(): void {
    const titleColor = theme.title === 'light' ? 'dark' : 'light';
    const nextTheme = theme.title === 'light' ? DarkTheme : LightTheme;
    setTheme(nextTheme);
    AsyncStorage.setItem('@AppColaborador:color', titleColor);
  }

  useEffect(() => {
    loadDataColor();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ColorsContext.Provider
        value={{
          toggleTheme,
        }}
      >
        {children}
      </ColorsContext.Provider>
    </ThemeProvider>
  );
}

export function useTheme() {
  const context = useContext(ColorsContext);

  return context;
}
