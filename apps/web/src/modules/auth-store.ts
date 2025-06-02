import {create} from 'zustand';

// Todo: Replace any with actual type received from openapi
interface AuthState {
  isAuthenticated: boolean;
  user: {id: string; name: string} | null;
  login: (user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  login: (user: any) => set({isAuthenticated: true, user}),
  logout: () => set({isAuthenticated: false, user: null}),
}));

export default useAuthStore;
