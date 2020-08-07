import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReportList from '../components/ReportList';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { uuid } from "uuidv4";
import { Rate } from "antd";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clickBookReportLoad, newReportSave, reportUpdateSave, reportDelete, bookDelete } from "../lib/api/commonAPI";
import { modalBG } from '../modules/modalBG';

const WriteReportFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .currentBook {
    width: 100%;
    height: 60%;
  }
  .bookTitle {
    font-size: 25px;
    font-weight: 600;
    color: #ffa2a2;
  }
  .bookThumbnail,
  .bookAuthors,
  .bookRate {
    display: block;
  }
  .bookThumbnail {
    width: 25%;
    margin: 5% auto;
  }

  .deleteBook {transition: all 0.3s;}

  .writeReport,
  .deleteBook {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    font-weight: 600;
    width: 40%;
    margin: 5%;
    color: #e91e63;
    padding: 2% 4%;
    background: #fff0f0;
    border: 2px solid #b18597;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      background 150ms cubic-bezier(0, 0, 0.58, 1);
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f9c4d2;
      border-radius: inherit;
      box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
      transform: translate3d(0, 0.75em, -1em);
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
        box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }
    &:hover {
      background: #ffe9e9;
      transform: translate(0, 0.25em);
      &::before {
        box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
        transform: translate3d(0, 0.5em, -1em);
      }
    }
    &:active {
      background: #ffe9e9;
      transform: translate(0em, 0.75em);
      &::before {
        box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
        transform: translate3d(0, 0, -1em);
      }
    }
  }

  .reportLists {
    width: 100%;
    height: 25%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 2%;
    padding: 0 3%;
  }
  .reportListTitle {
    text-align: left;
    display: block;
    color: #e91e63;
    font-size: 20px;
  }
  .writeReportInput {
    width: 100%;
    height: 75%;
    resize: none;
    border: 2px solid #e91e63;
    border-radius: 10px;
    padding: 3%;
    font-size: 20px;
    outline: none;
    &::placeholder {
      font-size: 20px;
    }
  }
  .reportBtn {
    background: none;
    border: none;
    outline: none;
    font-size: 20px;
    color: #e91e63;
    font-weight: 600;
    width: 20%;
    cursor: pointer;
    margin-top: 1%;
  }
  .reportBtn + .reportBtn {
    margin-left: 10%;
  }
  .show, .hiding {display: block;}
  .show {font-size: 24px; font-weight: 600; color: #cfcfcf; line-height: 100px;}
  .hiding {display: none}
`;

const WriteReportForm = ({ history }) => {

  const dispatch = useDispatch();

  const [writeReportClicked, setWriteReportClicked] = useState(false);
  const [bookReport, setBookReport] = useState([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    bool: false,
    deleteTarget: ""
  });
  const [reportUuid, setReportUuid] = useState("");

  let { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = useSelector((state) => ({
    bookUuid: state.currentBookList.bookUuid,
    bookTitle: state.currentBookList.bookTitle,
    bookAuthor: state.currentBookList.bookAuthor,
    bookImage: state.currentBookList.bookImage,
    bookRate: state.currentBookList.bookRate,
  }));

  useEffect(() => {
    clickBookReportLoad({bookUuid})
      .then(data => setBookReport(data.data))
  }, [writeReportClicked, deleteConfirmModal])

  const writeReportHandler = () => {
    setWriteReportClicked(true);
  }

  const exitHandler = () => {
    setWriteReportClicked(false);
  }

  const NewReportSaveHandler = () => {
    let reportMemo = document.querySelector('.writeReportInput').value;
    let reportUuid = uuid();
    newReportSave({ bookUuid, reportUuid, reportMemo })
    .then(data => setWriteReportClicked(false));
  }

  const reportSaveHandler = (reportMemo, reportUuid ) => {
    reportUpdateSave({ reportUuid, reportMemo });
  }

  const deleteReportHandler = (deleteBook, reportUuid) => {
    setDeleteConfirmModal({
      bool: true, 
      deleteTarget: deleteBook,
    });
    setReportUuid(reportUuid);
    dispatch(modalBG(true));
  }

  const deleteConfirmModalHandler = (bool) => {
    if (deleteConfirmModal.deleteTarget === 'deleteReport'){
      if(bool){
        reportDelete({ reportUuid })
          .then(data => setDeleteConfirmModal(false), dispatch(modalBG(false)))
      }else {
        setDeleteConfirmModal(bool)
        dispatch(modalBG(false))
      }
    } else if (deleteConfirmModal.deleteTarget === 'deleteBook'){
      if (bool) {
        bookDelete({ bookUuid })
          .then(data => setDeleteConfirmModal(false), dispatch(modalBG(false)), history.push('/MyLibrary'))
      } else {
        setDeleteConfirmModal(bool)
        dispatch(modalBG(false))
      }
    }
  }

  return (
    <WriteReportFormWrapper>
      <section className="currentBook">
        <div className="bookTitle">{bookTitle}</div>
        <img className="bookThumbnail" src={bookImage} />
        <span className="bookAuthors">{bookAuthor}</span>
        <span className="bookRate">
          <Rate disabled defaultValue={bookRate} />
        </span>
        <button className="writeReport" onClick={() => writeReportHandler()}>
          독후감 작성
        </button>
        <button className="deleteBook" onClick={() => deleteReportHandler('deleteBook')}>내 서재에서 제거</button>
      </section>
      <strong className="reportListTitle">
        {writeReportClicked ? "Write Here!" : "Report Lists"}
      </strong>
      <section className="reportLists">
        {bookReport.length !== 0 && !writeReportClicked ? (
          bookReport.map((el) => <ReportList 
              reportList={el} key={uuid()} 
              reportSaveHandler={reportSaveHandler}
              deleteReportHandler={deleteReportHandler}
            />)
        ): (
          <span className={writeReportClicked ? 'hiding' : 'show'}>작성한 독후감이 없습니다</span>
        )}
        {writeReportClicked && (
          <React.Fragment>
            <textarea
              placeholder="여기에 독후감을 작성해주세요!"
              className="writeReportInput"
            />
            <button className="exit reportBtn" onClick={() => exitHandler()}>취소</button>
            <button className="saveReport reportBtn" onClick={() => NewReportSaveHandler()}>저장</button>
          </React.Fragment>
        )}
        <DeleteConfirmModal deleteConfirmModal={deleteConfirmModal.bool} deleteConfirmModalHandler={deleteConfirmModalHandler}/>
      </section>
    </WriteReportFormWrapper>
  );
};

export default withRouter(WriteReportForm);