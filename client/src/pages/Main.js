import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import HeaderNav from '../components/common/HeaderNav';
import ModalBg from 'components/ModalBg';
import { useSelector } from 'react-redux';

const Main = ({ children }) => {
  const modalLoading = useSelector((state) => (state.modalLoading.bool));
  return (
    <AuthTemplate>
      {children}
      <HeaderNav />
      {modalLoading && <ModalBg/>}
    </AuthTemplate>
  );
};

export default Main;
