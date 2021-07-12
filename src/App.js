import { BrowserRouter, Switch, Route } from "react-router-dom";
import ValuationInformation from "./pages/ValuationInformation";
import "./App.css";
import { RecoilRoot } from "recoil";
import logo from "./assets/logo.png";
import { Suspense } from "react";
import Valuation from "./pages/Valuation";
import RoutingSlip from "./pages/RoutingSlip";
import RoutingSlipInformation from "./pages/RoutingSlipInformation";

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
            <Route exact path="/" render={() => <RoutingSlip />} />
            <Route
              exact
              path="/informasi"
              render={() => <RoutingSlipInformation />}
            />
            <Route
              exact
              path="/pengumpulan-penilaian"
              render={() => <Valuation />}
            />
            <Route
              path="/pengumpulan-penilaian/informasi"
              render={() => <ValuationInformation />}
            />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
