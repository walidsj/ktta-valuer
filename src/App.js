import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Information from "./pages/Information";
import "./App.css";
import { RecoilRoot } from "recoil";
import logo from "./assets/logo.png";
import { Suspense } from "react";

function App() {
	return (
		<RecoilRoot>
			<Suspense
				fallback={
					<div className="background-sircuit min-vh-100">
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
					</div>
				}
			>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={() => <Home />} />
						<Route path="/informasi" render={() => <Information />} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		</RecoilRoot>
	);
}

export default App;
