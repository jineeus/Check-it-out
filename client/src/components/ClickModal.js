import React from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';

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
  .btnSection > button + button {margin-left: 20px;}
`;

const ClickModal = ({ modalClose, bookRateSave, clickBookInfoModal }) => {

  const handleChange = (value) => {
    bookRateSave(value);
  };

  return (
    <ClickModalWrapper>
      <img className="modalBookImg" src={clickBookInfoModal.bookImage} />
      <strong className="modalBookTitle">{clickBookInfoModal.bookTitle}</strong>
      <span className="bookRateMsg">평점 남기기</span>
      <Rate onChange={handleChange} />
      <div className="btnSection">
        <button onClick={() => modalClose()}>취소</button>
        <button onClick={() => modalClose()}>저장</button>
      </div>
    </ClickModalWrapper>
  );
};

export default ClickModal;