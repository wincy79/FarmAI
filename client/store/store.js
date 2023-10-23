import { create } from "zustand";

export const useAuthStore = create((set) => ({
    userName:"",
    userPhone: "",
    setUserPhone: (newPhone) => set((state) => ({ userPhone: newPhone })),
    setUserName: (newPhone) => set((state) => ({ userName: newPhone })),
}));
