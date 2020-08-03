import React from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';

const ReportListsWrapper = styled.div`
  position: relative;
  cursor: pointer;
  background: #f5f5f5;
  border-radius: 10px;
  margin-top: 3%;
  height: 40%;
  padding: 2%;
  box-sizing: border-box;
  .reportMessage {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    width: 70%;
    display: block;
  }
  .registrationDate {
    position: absolute;
    bottom: 3%;
    right: 3%;
  }
  .modified,
  .deleteReport {
    position: absolute;
    top: 10%;
    cursor: pointer;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    & > svg {
      width: 100%;
      height: 100%;
    }
  }
  .modified {right: 10%;}
  .deleteReport {right: 3%;}
`;

const ReportList = ({reportList}) => {
  return (
    <ReportListsWrapper>
      <div className="reportListTemp">
        <p className="reportMessage">{reportList.memo}</p>
        <span className="registrationDate">{reportList.date}</span>
      </div>
      <button className="modified">
        <FaPencilAlt />
      </button>
      <button className="deleteReport">
        <RiDeleteBin6Line />
      </button>
    </ReportListsWrapper>
  );
};

export default ReportList;