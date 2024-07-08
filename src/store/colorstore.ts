import { create } from "zustand";
type State = {
  darkmode: boolean;
};

type Action = {
  changeColorTheme: () => void;
};

export const useColorStore = create<State & Action>((set) => ({
  darkmode: true,
  changeColorTheme: () =>
    set((state) => ({
      darkmode: !state.darkmode,
    })),
}));
