import React from 'react';
import MainForm from './Main';
import MyPageForm from '../containers/MyPageForm';

const MyPage = () => {
  return (
    <MainForm>
      <MyPageForm/>
    </MainForm>
  );
};

export default MyPage;