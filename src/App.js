import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Information from "./pages/Information";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/informasi" render={() => <Information />} />
				</Switch>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
