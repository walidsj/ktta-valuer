import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Informasi from "./pages/Informasi";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={() => <Home />} />
				<Route path="/informasi" render={() => <Informasi />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
