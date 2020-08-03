import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import HeaderNav from '../components/common/HeaderNav';

const Main = ({ children }) => {

  return (
    <AuthTemplate>
      {children}
      <HeaderNav />
    </AuthTemplate>
  );
};

export default Main;
