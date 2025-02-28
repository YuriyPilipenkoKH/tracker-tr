import {create} from 'zustand'

interface useThemeStoreProps{
  theme: "light" | "dark"
  token:string
  toggleTheme: () => void
}

export const useThemeStore = create<useThemeStoreProps>((set,get) => ({
  theme : 'dark',
  token: '',

  toggleTheme: () => {
    const {theme}  = get();
    set({ 
      theme: theme === 'light' ? 'dark' : 'light'
     });
     localStorage.setItem('theme', theme);
     document.documentElement.setAttribute('data-theme', theme);
  }
}))


