// useUserStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      isAuthModalOpen: false,
      isRegisterModalOpen: false,
      isAddPermitModalOpen: false,

      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),

      openRegisterModal: () => set({ isRegisterModalOpen: true }),
      closeRegisterModal: () => set({ isRegisterModalOpen: false }),

      openAddPermitModal: () => set({ isAddPermitModalOpen: true }),
      closeAddPermitModal: () => set({ isAddPermitModalOpen: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;