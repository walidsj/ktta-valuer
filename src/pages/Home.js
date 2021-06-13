import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tabletop from "tabletop";
import "../App.css";
import logo from "../assets/logo.png";

function App() {
	const [data, setData] = useState("");
	const [indicatorShow, setIndicatorShow] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			Tabletop.init({
				key: "https://docs.google.com/spreadsheets/d/100_QzUdfPibBXfA-YRtSlebevWlaFSpvnxI1JGWABOk/pubhtml",
				simpleSheet: true,
			})
				.then((res) => {
					const data = res[0];
					setData(data);
					setIndicatorShow((indicatorShow) => !indicatorShow);
				})
				.catch((err) => console.warn(err));
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	const percentage = ((data.sudah / data.total) * 100).toFixed(2);

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
								{data.sudah}
								<i className="fa mx-2 fa-check-circle"></i>
							</div>
							<div className="text-warning">
								{data.belum}
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
							Info Pengumpulan
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
							realtime data
						</small>
						<br />
						<small className="text-muted">© 2021 Ranger Valuer</small>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
