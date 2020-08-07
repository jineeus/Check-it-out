import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { FaBook } from 'react-icons/fa';

const MyPageFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  .profileTitle {
    width: 100%;
    height: 10%;
    font-size: 40px;
    font-weight: 600;
    color: #e91e63;
    letter-spacing: 1px;
    margin-top: 1%;
    & > svg {
      margin-right: 3%;
      transform: rotate(-15deg);
    }
  }
  .avatar {
    margin: 5%;
    & > span{
      font-size: 40px;
      letter-spacing: 1px;
    }
  }
`;

const MyPageForm = () => {

  let userInfo = JSON.parse(localStorage.getItem('userInfo')).userInfo;

  return (
    <MyPageFormWrapper>
      <div className="profileTitle"><FaBook/>Profile</div>
      <Avatar size={150} className="avatar">{userInfo.userName}</Avatar>
      <span className="ratingRank">평점 순</span>
    </MyPageFormWrapper>
  );
};

export default MyPageForm;