import { atom } from "recoil";

export const counterAtom = atom({
	key: "counterAtom",
	default: "",
});

export const todayAtom = atom({
	key: "todayAtom",
	default: new Date('2021-06-18 09:00:00').getTime(),
});