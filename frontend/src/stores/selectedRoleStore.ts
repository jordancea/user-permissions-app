import { create } from "zustand";

interface SelectedRoleState {
    selectedRoleId: number | null;
    setSelectedRoleId: (id: number | null) => void;
}

export const useSelectedRoleStore = create<SelectedRoleState>((set) => ({
    selectedRoleId: null,
    setSelectedRoleId: (id) => set({ selectedRoleId: id }),
}));