import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom",
  default: "",
});

export const todayAtom = atom({
  key: "todayAtom",
  default: new Date("2021-06-18 09:00:00 GMT+0700").getTime(),
});

export const counterRoutingSlipAtom = atom({
  key: "counterRoutingSlipAtom",
  default: "",
});

export const todayRoutingSlipAtom = atom({
  key: "todayRoutingSlipAtom",
  default: new Date("2021-07-16 17:00:00 GMT+0700").getTime(),
});

export const counterFinalAtom = atom({
  key: "counterFinalAtom",
  default: "",
});

export const todayFinalAtom = atom({
  key: "todayFinalAtom",
  default: new Date("2021-07-23 17:00:00 GMT+0700").getTime(),
});
