import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import MyReport from "./pages/MyReport";
import MyPage from './pages/MyPage';
import WriteReport from "./pages/WriteReport";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact component={SignIn} path={"/"} />
        <Route component={SignIn} path={"/SignIn"} />
        <Route component={SignUp} path={"/SignUp"} />
        <Route component={Search} path={"/Search"} />
        <Route component={MyLibrary} path={"/MyLibrary"} />
        <Route component={MyReport} path={"/MyReport"} />
        <Route component={MyPage} path={"/MyPage"} />
        <Route component={WriteReport} pate={"/WriteReport"} />
      </Switch>
    </div>
  );
}

export default App;
