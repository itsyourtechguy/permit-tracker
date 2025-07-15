import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      permits: [],
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      setPermits: (permits) => set({ permits }),

      // Modal states
      isAuthModalOpen: false,
      isAddPermitModalOpen: false,
      isEditPermitModalOpen: false,
      currentPermit: null,

      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),

      openAddPermitModal: () => set({ isAddPermitModalOpen: true }),
      closeAddPermitModal: () => set({ isAddPermitModalOpen: false }),

      openEditPermitModal: (permit) => set({ isEditPermitModalOpen: true, currentPermit: permit }),
      closeEditPermitModal: () => set({ isEditPermitModalOpen: false, currentPermit: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;