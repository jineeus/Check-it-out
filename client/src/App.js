import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Search from './pages/Search';
import BookList from './pages/BookList';
import BookReport from './pages/BookReport';
import Setting from './pages/Setting';
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact component={SignIn} path={"/"} />
        <Route component={SignIn} path={"/SignIn"} />
        <Route component={SignUp} path={"/SignUp"} />
        <Route component={Search} path={"/Search"}/>
        <Route component={BookList} path={"/BookList"} />
        <Route component={BookReport} path={"/BookReport"} />
        <Route component={Setting} path={"/Setting"} />
      </Switch>
    </div>
  );
}

export default App;
