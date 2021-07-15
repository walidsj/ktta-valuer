import { atom, selector } from "recoil";
import Tabletop from "tabletop";

export const mahasiswaFinalAtom = atom({
  key: "mahasiswaFinalAtom",
  default: {
    data: "",
    sudah: "",
    total: "",
  },
});

export const mahasiswaFinalSelector = selector({
  key: "mahasiswaFinalSelector",
  get: async ({ get }) => {
    let mahasiswaFinalData = get(mahasiswaFinalAtom);
    try {
      let mahasiswaFinal = await Tabletop.init({
        key: "https://docs.google.com/spreadsheets/d/1W9e2lxhj11u81KRIGBDuUJo7fReMHTAlXbnDyXEg9eA/pubhtml",
        simpleSheet: true,
      });

      const sudah = mahasiswaFinal.filter(
        (mahasiswaFinal) =>
          mahasiswaFinal.status_konfirmasi === "Sudah Konfirmasi"
      ).length;

      mahasiswaFinalData = {
        ...mahasiswaFinalData,
        data: mahasiswaFinal,
        sudah: sudah,
        total: mahasiswaFinal.length,
      };
    } catch (e) {
      console.warn(e);
    }

    return mahasiswaFinalData;
  },
});

export const mahasiswaFinalState = selector({
  key: "mahasiswaFinalState",
  get: ({ get }) => {
    let mahasiswaFinalData = get(mahasiswaFinalAtom);
    if (!mahasiswaFinalData.data) {
      mahasiswaFinalData = get(mahasiswaFinalSelector);
    }
    return mahasiswaFinalData;
  },
  set: ({ set, get }, newStateData) => {
    const sudah = newStateData.filter(
      (mahasiswaFinal) =>
        mahasiswaFinal.status_konfirmasi === "Sudah Konfirmasi"
    ).length;
    set(mahasiswaFinalAtom, {
      ...get(mahasiswaFinalAtom),
      data: newStateData,
      sudah: sudah,
      total: newStateData.length,
    });
  },
});
