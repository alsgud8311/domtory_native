import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useColorStore = create(
  persist(
    (set) => ({
      darkmode: false,
      changeColorTheme: () =>
        set((state) => ({
          darkmode: !state.darkmode,
        })),
    }),
    {
      name: "color-store", // 저장될 상태의 이름
      storage: createJSONStorage(() => AsyncStorage), // AsyncStorage를 사용하여 상태를 저장
    }
  )
);
