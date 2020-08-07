import React from 'react';
import styled from 'styled-components';
import { FaRegSadTear } from 'react-icons/fa';

const DeleteConfirmModalWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  z-index: 1;
  background: #ffe8f6;
  padding: 25px 35px;
  width: 50%;
  height: 40%;
  border-radius: 16px;
  box-shadow: 0 0 60px -15px black;
  transform: scale(0) rotate(360deg);
  transition: all 0.75s;
  font-size: 18px;
  & > svg {
    width: 20%;
    height: 20%;
    fill: #e91e63
  }
  &.active { transform: scale(1) rotate(0deg); transition: all 0.75s;}
  .deleteConfirmMessage {
    display: block;
    color: #e91e63;
    font-weight: 600;
    font-size: 20px;
    margin: 7% 0 17%;
  }

  .consent, .reject {
    display: block;
    background: #fff;
    border: none;
    border-radius: 8px;
    width: 70%;
    height: 15%;
    outline: none;
    color: #e91e63;
    font-size: 15px;
    margin: 8% auto 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all .5s ease-in-out;
    &:hover {
      transition: all .5s ease-in-out;
      color: #fff;
      background: #e91e63;
    }
  }
`;

const DeleteConfirmModal = ({ deleteConfirmModal, deleteConfirmModalHandler }) => {
  return (
    <DeleteConfirmModalWrapper className={deleteConfirmModal && 'active'}>
      <FaRegSadTear />
      <span className="deleteConfirmMessage">진짜 정말 지워요...?</span>
      <button className="consent" onClick={() => deleteConfirmModalHandler(true)}>지운다!</button>
      <button className="reject" onClick={() => deleteConfirmModalHandler(false)}>안 지운다!</button>
    </DeleteConfirmModalWrapper>
  );
};

export default DeleteConfirmModal;