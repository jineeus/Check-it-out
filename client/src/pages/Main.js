import React from "react";
import styled from "styled-components";
import AuthTemplate from "../components/auth/AuthTemplate";
import Search from './Search';
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
