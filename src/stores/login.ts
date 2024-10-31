import { create } from 'zustand';

interface UserState {
  username: string;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  isGuest: boolean;
  loginAsGuest: () => void
}

export const useUserStore = create<UserState>((set) => ({
  username: '',
  isGuest: false,
  isLoggedIn: false,
  login: (username) => set({ username, isLoggedIn: true }),
  loginAsGuest: () => set({username :'Guest', isLoggedIn: true, isGuest: true}),
  logout: () => set({ username: '', isLoggedIn: false, isGuest:false }),
}));