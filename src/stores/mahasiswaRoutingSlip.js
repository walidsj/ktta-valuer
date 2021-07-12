import { atom, selector } from "recoil";
import Tabletop from "tabletop";

export const mahasiswaRoutingSlipAtom = atom({
  key: "mahasiswaRoutingSlipAtom",
  default: {
    data: "",
    sudah: "",
    total: "",
  },
});

export const mahasiswaRoutingSlipSelector = selector({
  key: "mahasiswaRoutingSlipSelector",
  get: async ({ get }) => {
    let mahasiswaRoutingSlipData = get(mahasiswaRoutingSlipAtom);
    try {
      let mahasiswaRoutingSlip = await Tabletop.init({
        key: "https://docs.google.com/spreadsheets/d/14aZM5jl_IOYPvVyn_FNQTMJkQv4DbepqlYIrfhGnKfE/pubhtml",
        simpleSheet: true,
      });

      const sudah = mahasiswaRoutingSlip.filter(
        (mahasiswaRoutingSlip) =>
          mahasiswaRoutingSlip.status_konfirmasi === "Sudah Konfirmasi"
      ).length;

      mahasiswaRoutingSlipData = {
        ...mahasiswaRoutingSlipData,
        data: mahasiswaRoutingSlip,
        sudah: sudah,
        total: mahasiswaRoutingSlip.length,
      };
    } catch (e) {
      console.warn(e);
    }

    return mahasiswaRoutingSlipData;
  },
});

export const mahasiswaRoutingSlipState = selector({
  key: "mahasiswaRoutingSlipState",
  get: ({ get }) => {
    let mahasiswaRoutingSlipData = get(mahasiswaRoutingSlipAtom);
    if (!mahasiswaRoutingSlipData.data) {
      mahasiswaRoutingSlipData = get(mahasiswaRoutingSlipSelector);
    }
    return mahasiswaRoutingSlipData;
  },
  set: ({ set, get }, newStateData) => {
    const sudah = newStateData.filter(
      (mahasiswaRoutingSlip) =>
        mahasiswaRoutingSlip.status_konfirmasi === "Sudah Konfirmasi"
    ).length;
    set(mahasiswaRoutingSlipAtom, {
      ...get(mahasiswaRoutingSlipAtom),
      data: newStateData,
      sudah: sudah,
      total: newStateData.length,
    });
  },
});
