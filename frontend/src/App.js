import React from "react";
import Overview from "./Overview/Overview";
import Home from "./Home/Home";
import Workflow from "./Flow/Workflow";
import EditFlow from "./Flow/EditFlow";
import History from "./History/History";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Overview" exact component={Overview} />
                <Route path="/Home" exact component={Home} />
                <Route path="/Workflow" exact component={Workflow} />
                <Route path="/EditFlow/:editFlowId" component={EditFlow} />
                <Route path="/History" exact component={History} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
