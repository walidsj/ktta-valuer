import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import Tabletop from "tabletop";
import logo from "../assets/logo.png";
import { mahasiswaState, realtimeCount } from "../stores/index.js";

function Information() {
	const [data, setData] = useRecoilState(mahasiswaState);
	const [count, setCount] = useRecoilState(realtimeCount);
	const [mahasiswaData, setMahasiswaData] = useState();

	useEffect(() => {
		Tabletop.init({
			key: "https://docs.google.com/spreadsheets/d/1m4xZDDiXprQTQLNsrlyyTBHZ5pdpsmsnUhpheGI8KPA/pubhtml",
			simpleSheet: true,
		})
			.then((res) => {
				const mahasiswa = res.filter((res) => res.prodi === "d3pbb");
				setData(res);
				const sudah = mahasiswa.filter(
					(mahasiswa) => mahasiswa.status_konfirmasi === "Sudah Konfirmasi"
				).length;
				setCount({
					sudah: sudah,
					belum: mahasiswa.length - sudah,
					total: mahasiswa.length,
				});
			})
			.catch((err) => console.warn(err));
	}, [setData, setCount, count]);

	const [inputs, setInputs] = useState({});

	function handleSearch(e) {
		e.preventDefault();
		let npmInput = inputs.npm;
		if (npmInput) {
			const mahasiswa = data.filter(
				(mahasiswaData) => mahasiswaData.npm === npmInput
			);

			if (mahasiswa[0]) {
				setMahasiswaData(mahasiswa[0]);
			} else {
				setMahasiswaData(null);
			}
		}
	}

	function handlePersetujuan() {
		let input = document.createElement("input");
		document.body.appendChild(input);
		input.value = `Persetujuan_${mahasiswaData.kode_dosnil1}_${mahasiswaData.kode_dosnil2}_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
		swal("Sudah disalin.", input.value, "success");
	}

	function handleTurnitin() {
		let input = document.createElement("input");
		document.body.appendChild(input);
		input.value = `Turnitin_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
		swal("Sudah disalin.", input.value, "success");
	}

	function handleDosnil() {
		let input = document.createElement("input");
		document.body.appendChild(input);
		input.value = `KTTA_${mahasiswaData.kode_dosnil1}_${mahasiswaData.kode_dosnil2}_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
		swal("Sudah disalin.", input.value, "success");
	}

	return (
		<div className="background-sircuit min-vh-100">
			{!data ? (
				<div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
					<span className="text-center">
						<img
							src={logo}
							className="p-2 fa-spin"
							style={{ width: "64px" }}
							alt=""
						/>
						<br />
						Loading Data...
					</span>
				</div>
			) : (
				<div className="container py-5">
					<div className="col-12 col-md-6 mx-auto px-3">
						<div className="text-center">
							<div className="mb-4">
								<Link to="/">
									<img
										src={logo}
										className="pb-3"
										style={{ width: "64px", maxWidth: "25vw" }}
										alt=""
									/>
								</Link>
								<h2 className="mb-0 fw-bold">Info Pengumpulan</h2>
							</div>
							<div className="mb-4">
								<form onSubmit={handleSearch}>
									<div className="input-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Masukkan NPM"
											name="npm"
											onChange={(e) => {
												setInputs({
													...inputs,
													[e.target.name]: e.target.value,
												});
												setMahasiswaData();
											}}
										/>
										<button className="btn btn-warning" type="submit">
											<i className="fa fa-search me-2"></i>Cari
										</button>
									</div>
								</form>
							</div>
						</div>
						{mahasiswaData && (
							<div className="mb-4">
								<strong>Data Mahasiswa</strong>
								<table className="table table-striped mb-4">
									<tbody>
										<tr>
											<th scope="row">Nama</th>
											<td>{mahasiswaData.nama}</td>
										</tr>
										<tr>
											<th scope="row">Kelas</th>
											<td>{mahasiswaData.kelas}</td>
										</tr>
										<tr>
											<th scope="row">Prodi</th>
											<td>{mahasiswaData.prodi}</td>
										</tr>
										<tr>
											<th scope="row">Bidang KTTA</th>
											<td>{mahasiswaData.bidang_ktta}</td>
										</tr>
										<tr>
											<th scope="row">Status</th>
											<td>{mahasiswaData.status_konfirmasi}</td>
										</tr>
									</tbody>
								</table>
								<strong>Data Dosen Penilai</strong>
								<table className="table table-striped mb-4">
									<thead>
										<tr>
											<th>No.</th>
											<th>Nama Dosen</th>
											<th>Kode</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">Penilai I</th>
											<td>{mahasiswaData.dosnil1}</td>
											<td>{mahasiswaData.kode_dosnil1}</td>
										</tr>
										<tr>
											<th scope="row">Penilai II</th>
											<td>{mahasiswaData.dosnil2}</td>
											<td>{mahasiswaData.kode_dosnil2}</td>
										</tr>
									</tbody>
								</table>
								<strong>Format Pengumpulan</strong>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Jenis</th>
											<th>Qty (PDF)</th>
											<th>Link</th>
											<th>Nama</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">Lembar Persetujuan</th>
											<td>1 lembar</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href="http://gg.gg/persetujuanKTTA21"
													rel="noreferrer"
													target="_blank"
												>
													<i className="fa fa-link"></i>
												</a>
											</td>
											<td>
												<button
													className="btn btn-warning btn-sm"
													onClick={() => handlePersetujuan()}
												>
													<i className="fa fa-copy"></i>
												</button>
											</td>
										</tr>
										<tr>
											<th scope="row">Turnitin</th>
											<td>
												1 berkas
												<br />
												<span className="text-muted">Isi BAB I-IV</span>
											</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href="https://perpustakaan.stan.ac.id/layanan-pindai-turnitin-ktta/"
													rel="noreferrer"
													target="_blank"
												>
													<i className="fa fa-link"></i>
												</a>
											</td>
											<td>
												<button
													className="btn btn-warning btn-sm"
													onClick={() => handleTurnitin()}
												>
													<i className="fa fa-copy"></i>
												</button>
											</td>
										</tr>
										<tr>
											<th scope="row">Dosen Penilai I</th>
											<td>
												1 berkas
												<br />
												<span className="text-muted">Keseluruhan</span>
											</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href={`http://${mahasiswaData.link_dosnil1}`}
													rel="noreferrer"
													target="_blank"
												>
													<i className="fa fa-link"></i>
												</a>
											</td>
											<td>
												<button
													className="btn btn-warning btn-sm"
													onClick={() => handleDosnil()}
												>
													<i className="fa fa-copy"></i>
												</button>
											</td>
										</tr>
										<tr>
											<th scope="row">Dosen Penilai II</th>
											<td>
												1 berkas
												<br />
												<span className="text-muted">Keseluruhan</span>
											</td>
											<td>
												<a
													className="btn btn-primary btn-sm"
													href={`http://${mahasiswaData.link_dosnil2}`}
													rel="noreferrer"
													target="_blank"
												>
													<i className="fa fa-link"></i>
												</a>
											</td>
											<td>
												<button
													className="btn btn-warning btn-sm"
													onClick={() => handleDosnil()}
												>
													<i className="fa fa-copy"></i>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
						<div className="text-center mb-4">
							<a
								href="https://docs.google.com/forms/d/e/1FAIpQLSdc4UxbJJEVQHSIHKCk5iNvZflPPYnjKt1yjtFRrPODNGLF5A/viewform"
								target="_blank"
								rel="noreferrer"
								className="btn btn-warning"
							>
								<i className="fa fa-check-circle me-2"></i>Konfirmasi
								Pengumpulan
							</a>
						</div>
						<div className="pt-3 text-center">
							<small className="text-muted">
								© 2021{" "}
								<a
									href="https://www.instagram.com/ranger.valuer/"
									target="_blank"
									rel="noreferrer"
								>
									<i className="fa fa-instagram me-2"></i>Ranger Valuer
								</a>
							</small>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Information;
