import { atom, selector } from "recoil";
import Tabletop from "tabletop";

export const mahasiswaAtom = atom({
	key: "mahasiswaAtom",
	default: {
		data: "",
		sudah: "",
		total: "",
	},
});

export const mahasiswaSelector = selector({
	key: "mahasiswaSelector",
	get: async ({ get }) => {
		let mahasiswaData = get(mahasiswaAtom);
		try {
			let mahasiswa = await Tabletop.init({
				key: "https://docs.google.com/spreadsheets/d/1m4xZDDiXprQTQLNsrlyyTBHZ5pdpsmsnUhpheGI8KPA/pubhtml",
				simpleSheet: true,
			});

			const sudah = mahasiswa.filter(
				(mahasiswa) => mahasiswa.status_konfirmasi === "Sudah Konfirmasi"
			).length;

			mahasiswaData = {
				...mahasiswaData,
				data: mahasiswa,
				sudah: sudah,
				total: mahasiswa.length,
			};
		} catch (e) {
			console.warn(e);
		}

		return mahasiswaData;
	},
});

export const mahasiswaState = selector({
	key: "mahasiswaState",
	get: ({ get }) => {
		let mahasiswaData = get(mahasiswaAtom);
		if (!mahasiswaData.data) {
			mahasiswaData = get(mahasiswaSelector);
		}
		return mahasiswaData;
	},
	set: ({ set, get }, newStateData) => {
		const sudah = newStateData.filter(
			(mahasiswa) => mahasiswa.status_konfirmasi === "Sudah Konfirmasi"
		).length;
		set(mahasiswaAtom, {
			...get(mahasiswaAtom),
			data: newStateData,
			sudah: sudah,
			total: newStateData.length,
		});
	},
});
