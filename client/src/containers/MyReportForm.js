import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyBookList from '../components/MyBookList';
import { uuid } from "uuidv4";
import { useDispatch } from "react-redux";
import { currentBookList } from '../modules/currentBookList';
import client from '../lib/api/client';
import { render } from '@testing-library/react';

const MyReportFormWrapper = styled.div`
  width:100%;
  height: 100%;
  .reportTitle {
    font-size: 30px;
    font-weight: 600;
    color: #ffa2a2;
  }
  .reportListStack {
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 80%;
    padding-top: 10%;
  }
  .noReportMessage {
    display: block;
    font-size: 24px; 
    font-weight: 600; 
    color: #cfcfcf; 
    line-height: 100px;
  }
`;

const MyReportForm = () => {

  const dispatch = useDispatch();

  const [theBooksWithReport, setTheBooksWithReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    client.get('http://localhost:3002/report/theBooksWithReport')
      .then(data => setTheBooksWithReport(data.data))
  }, [])

  const bookListClickHandler = (item) => {
    dispatch(currentBookList({
      bookUuid: item.bookUuid,
      bookTitle: item.bookTitle,
      bookAuthor: item.bookAuthor,
      bookImage: item.bookImage,
      bookRate: item.bookRate,
    }));
  }
  
  return (
    <MyReportFormWrapper>
      <div className="reportTitle">My Report ({theBooksWithReport ? theBooksWithReport.length : 0})</div>
      {theBooksWithReport ? (
          <React.Fragment>
            <section className="reportListStack">
              {theBooksWithReport.map((el) => <MyBookList myLibrary={el} bookListClickHandler={bookListClickHandler} key={uuid()} />)}
            </section>
          </React.Fragment>
        ):(
          <span className="noReportMessage">작성한 독후감이 없습니다</span>
        )
      }
    </MyReportFormWrapper>
  );
};

export default MyReportForm;