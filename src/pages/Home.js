import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Tabletop from "tabletop";
import "../App.css";
import logo from "../assets/logo.png";
import { mahasiswaState } from "../stores/mahasiswa.js";
import TimerCountdown from "../components/TimerCountdown.js";

function App() {
	const [data, setData] = useRecoilState(mahasiswaState);
	const [indicatorShow, setIndicatorShow] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			Tabletop.init({
				key: "https://docs.google.com/spreadsheets/d/1m4xZDDiXprQTQLNsrlyyTBHZ5pdpsmsnUhpheGI8KPA/pubhtml",
				simpleSheet: true,
			})
				.then((res) => {
					setData(res);
					setIndicatorShow((indicatorShow) => !indicatorShow);
				})
				.catch((err) => console.warn(err));
		}, 10000);
		return () => clearInterval(interval);
	}, [setData, data]);

	const percentage = ((data.sudah / data.total) * 100).toFixed(2);

	return (
		<div className="background-sircuit d-flex flex-column min-vh-100 justify-content-center align-items-center">
			<div className="text-center px-3">
				<div className="mb-3">
					<img
						src={logo}
						className="pb-3"
						style={{ width: "100px", maxWidth: "25vw" }}
						alt=""
					/>
					<h2 className="mb-0 fw-bold">Live Count</h2>
					<h4>Pengumpulan KTTA</h4>
          <TimerCountdown />
				</div>
				<div className="mb-3">
					<h1 className="d-inline-flex fw-bold">
						<div className="text-primary">
							{data.sudah}
							<i className="fa mx-2 fa-check-circle" />
						</div>
						<div className="text-warning">
							{data.total - data.sudah}
							<i className="fa mx-2 fa-times-circle" />
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
						<i className="fa fa-paste me-2" />Info Pengumpulan
					</Link>
				</div>
				<div className="pt-3">
					<small className="text-muted">
						<i
							className={`${
								indicatorShow ? "fadeIn" : "fadeOut"
							} fa fa-circle text-primary me-1`}
							style={{ fontSize: "9px" }}
						 />
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
							<i className="fa fa-instagram ms-2 me-1" />Ranger Valuer
						</a>
					</small>
				</div>
			</div>
		</div>
	);
}

export default App;
