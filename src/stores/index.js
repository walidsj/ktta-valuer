import { atom } from "recoil";

export const realtimeCount = atom({
	key: "realtimeCount",
	default: { sudah: "", belum: "", total: "" },
});

export const mahasiswaState = atom({
	key: "mahasiswaState",
	default: "",
});
