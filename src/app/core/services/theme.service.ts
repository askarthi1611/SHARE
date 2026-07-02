import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: { [key: string]: Theme } = {
    light: {
      name: 'light',
      primary: '#1976d2',
      secondary: '#42a5f5',
      accent: '#ff6b6b',
      background: '#f5f7fa',
      surface: '#ffffff',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0'
    },
    dark: {
      name: 'dark',
      primary: '#1565c0',
      secondary: '#42a5f5',
      accent: '#ff7979',
      background: '#0f1419',
      surface: '#1a1f2e',
      textPrimary: '#e0e0e0',
      textSecondary: '#a0a0a0',
      border: '#2a2f3e'
    },
    ocean: {
      name: 'ocean',
      primary: '#0277bd',
      secondary: '#0288d1',
      accent: '#00838f',
      background: '#e0f2f1',
      surface: '#ffffff',
      textPrimary: '#004d40',
      textSecondary: '#00695c',
      border: '#b2dfdb'
    },
    forest: {
      name: 'forest',
      primary: '#2e7d32',
      secondary: '#43a047',
      accent: '#ff6e40',
      background: '#f1f8e9',
      surface: '#ffffff',
      textPrimary: '#1b5e20',
      textSecondary: '#33691e',
      border: '#c5e1a5'
    },
    sunset: {
      name: 'sunset',
      primary: '#d84315',
      secondary: '#ff7043',
      accent: '#ffa726',
      background: '#fff3e0',
      surface: '#ffffff',
      textPrimary: '#bf360c',
      textSecondary: '#e65100',
      border: '#ffe0b2'
    }
  };

  private currentThemeSubject!: BehaviorSubject<Theme>;
  public currentTheme$!: Observable<Theme>;

  constructor() {
    // initialize subject after themes are defined to avoid index-signature initialization issues
    this.currentThemeSubject = new BehaviorSubject<Theme>(this.getTheme('light') as Theme);
    this.currentTheme$ = this.currentThemeSubject.asObservable();
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (typeof localStorage === 'undefined') {
      return; // SSR or non-browser environment
    }
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(themeName: string): void {
    if (this.themes[themeName]) {
      const theme = this.themes[themeName];
      this.currentThemeSubject.next(theme);
      this.applyTheme(theme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('app-theme', themeName);
      }
    }
  }

  getTheme(themeName: string): Theme | undefined {
    return this.themes[themeName];
  }

  getAllThemes(): string[] {
    return Object.keys(this.themes);
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') {
      return; // SSR environment
    }
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text-primary', theme.textPrimary);
    root.style.setProperty('--color-text-secondary', theme.textSecondary);
    root.style.setProperty('--color-border', theme.border);
  }
}
