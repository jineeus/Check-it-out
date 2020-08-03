import React, { useState } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ClickModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 70%;
  height: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
  padding: 5%;
  & > * {display: block; font-size: 17px;}
  .modalBookTitle, .bookRateMsg {margin-top: 20px;}
  .modalBookImg {margin: 0 auto; height: 140px;}
  .bookRateMsg {
    font-weight: 600;
    margin-bottom: 20px;
  }
  ul > li > div > div > span {
    width: 30px;
    height: 30px;
  }
  ul > li > div > div > span > svg {
    width: 100%;
    height: 100%;
  }
  .btnSection {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%
  }
  .btnSection > button {
    border: none;
    background: #F9DEEE;
    border-radius: 10px;
    font-size: 17px;
    width: 15%;
    color: #9c9c9c;
    cursor: pointer;
  }
  .btnSection > button > a {color: #9c9c9c;}
  .btnSection > button + button {margin-left: 20px;}
`;

const ClickModal = ({ clickBook, modalClose }) => {

  const [rateValue, setRateValue] = useState(0);

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const handleChange = value => {
    setRateValue(value);
  };


  return (
    <ClickModalWrapper>
      <img className="modalBookImg" src={clickBook.thumbnail} />
      <strong className="modalBookTitle">{clickBook.title}</strong>
      <span className="bookRateMsg">스마일 리뷰</span>
      <Rate onChange={handleChange} />
      <div className="btnSection">
        <button onClick={() => modalClose()}>취소</button>
        <button onClick={() => modalClose(rateValue)}><Link to="/MyLibrary">저장</Link></button>
      </div>
      
    </ClickModalWrapper>
  );
};

export default ClickModal;