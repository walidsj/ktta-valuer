import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Tabletop from "tabletop";
import "../App.css";
import logo from "../assets/logo.png";
import { mahasiswaState, realtimeCount } from "../stores/index.js";

function App() {
	const [data, setData] = useRecoilState(mahasiswaState);
	const [count, setCount] = useRecoilState(realtimeCount);
	const [indicatorShow, setIndicatorShow] = useState(false);
	const [intervalNumber, setIntervalNumber] = useState(500);

	useEffect(() => {
		const interval = setInterval(() => {
			Tabletop.init({
				key: "https://docs.google.com/spreadsheets/d/1m4xZDDiXprQTQLNsrlyyTBHZ5pdpsmsnUhpheGI8KPA/pubhtml",
				simpleSheet: true,
			})
				.then((res) => {
					const mahasiswa = res.filter((res) => res.prodi === "d3pbb");
					setData(mahasiswa);
					const sudah = mahasiswa.filter(
						(mahasiswa) => mahasiswa.status_konfirmasi === "Sudah Konfirmasi"
					).length;
					setCount({
						sudah: sudah,
						belum: mahasiswa.length - sudah,
						total: mahasiswa.length,
					});
					setIndicatorShow((indicatorShow) => !indicatorShow);
				})
				.catch((err) => console.warn(err));
			setIntervalNumber(10000);
		}, intervalNumber);
		return () => clearInterval(interval);
	}, [setData, setCount, intervalNumber, data]);

	const percentage = ((count.sudah / count.total) * 100).toFixed(2);

	return (
		<div className="background-sircuit d-flex flex-column min-vh-100 justify-content-center align-items-center">
			{!data ? (
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
			) : (
				<div className="text-center px-3">
					<div className="mb-4">
						<img
							src={logo}
							className="pb-3"
							style={{ width: "100px", maxWidth: "25vw" }}
							alt=""
						/>
						<h2 className="mb-0 fw-bold">Live Count</h2>
						<h4>Pengumpulan KTTA</h4>
					</div>
					<div className="mb-3">
						<h1 className="d-inline-flex fw-bold">
							<div className="text-primary">
								{count.sudah}
								<i className="fa mx-2 fa-check-circle"></i>
							</div>
							<div className="text-warning">
								{count.belum}
								<i className="fa mx-2 fa-times-circle"></i>
							</div>
						</h1>
					</div>
					<div className="progress">
						<div
							className="progress-bar progress-bar-striped progress-bar-animated"
							role="progressbar"
							style={{ width: `${percentage}%` }}
						></div>
					</div>
					<div className="pt-2">
						<h4>{percentage}%</h4>
					</div>
					<div className="pt-2">
						<Link to="/informasi" className="btn btn-warning">
							<i className="fa fa-paste me-2"></i>Info Pengumpulan
						</Link>
					</div>
					<div className="pt-3">
						<small className="text-muted">
							<i
								className={`${
									indicatorShow ? "fadeIn" : "fadeOut"
								} fa fa-circle text-primary me-1`}
								style={{ fontSize: "9px" }}
							></i>
							realtime (update/10s)
						</small>
						<br />
						<small className="text-muted">
							© 2021
							<a
								href="https://www.instagram.com/ranger.valuer/"
								target="_blank"
								rel="noreferrer"
							>
								<i className="fa fa-instagram ms-2 me-1"></i>Ranger Valuer
							</a>
						</small>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
