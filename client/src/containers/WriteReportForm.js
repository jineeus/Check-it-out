import React, { useState } from 'react';
import styled from 'styled-components';
import ReportList from '../components/ReportList';
import { uuid } from "uuidv4";
import { Rate } from "antd";

const WriteReportFormWrapper = styled.div`
  width: 100%;
  height: 100%;
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

  .writeReport,
  .deleteBook {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    font-weight: 600;
    width: 30%;
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
`;

const WriteReportForm = () => {

  const [writeReportClicked, setWriteReportClicked] = useState(false);
  const [currentBookInfo, setCurrentBookInfo] = useState({
    title: "미움받을 용기",
    authors: "기시미 이치로",
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
    rate: 5,
    report: [
      {
        memo:
          "책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다책을 읽었다",
        date: "2020-08-01 15:40",
      },
      {
        memo: "재미없다",
        date: "2020-08-05 18:30",
      },
      {
        memo: "재미없다",
        date: "2020-08-05 18:30",
      },
      {
        memo: "재미없다",
        date: "2020-08-05 18:30",
      },
      {
        memo: "재미없다",
        date: "2020-08-05 18:30",
      },
      {
        memo: "재미없다",
        date: "2020-08-05 18:30",
      },
    ],
  });

  const writeReportHandler = () => {
    setWriteReportClicked(true);
  }

  const exitHandler = () => {
    setWriteReportClicked(false);
  }

  const saveReportHandler = () => {
    // 서버에 독후감 목록 저장
  }

  return (
    <WriteReportFormWrapper>
      <section className="currentBook">
        <div className="bookTitle">{currentBookInfo.title}</div>
        <img className="bookThumbnail" src={currentBookInfo.thumbnail} />
        <span className="bookAuthors">{currentBookInfo.authors}</span>
        <span className="bookRate">
          <Rate disabled defaultValue={currentBookInfo.rate} />
        </span>
        <button className="writeReport" onClick={() => writeReportHandler()}>
          독후감 작성
        </button>
        <button className="deleteBook">내 서재에서 제거</button>
      </section>
      <strong className="reportListTitle">
        {writeReportClicked ? "Write Here!" : "Report Lists"}
      </strong>
      <section className="reportLists">
        {currentBookInfo.report.length && !writeReportClicked ? (
          currentBookInfo.report.map((el) => <ReportList reportList={el} key={uuid()} />)
        ) : (
          <React.Fragment>
            <textarea
              placeholder="여기에 독후감을 작성해주세요!"
              className="writeReportInput"
            />
            <button className="exit reportBtn" onClick={() => exitHandler()}>
              취소
            </button>
            <button
              className="saveReport reportBtn"
              onClick={() => saveReportHandler()}
            >
              저장
            </button>
          </React.Fragment>
        )}
      </section>
    </WriteReportFormWrapper>
  );
};

export default WriteReportForm;