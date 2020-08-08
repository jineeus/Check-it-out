import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { uuid } from "uuidv4";
import { Avatar } from 'antd';
import { FaBook } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { bookListLoad, howManyWriteReport } from "../lib/api/commonAPI";
import BookList from "../components/SearchBookList";

const MyPageFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  .profileInfo {
    height: 40%;
  }
  .profileTitle {
    display: block;
    width: 100%;
    height: 20%;
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
  }
  .ranking {
    position: relative;
    width: 100%;
    height: 45%;
    margin-top: 5%;
    overflow-y: auto;
    padding: 5%;
  }

  .rankingTitle,
  .btnLayer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .rankingBtn {
    position: absolute;
    top: 35%;
    right: 25%;
    width: 50%;
    height: 6%;
    overflow: hidden;
    border-radius: 20px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .rankingTitle {
    z-index: 2;
  }

  .btnLayer {
    width: 100%;
    background-color: #e0f6ff;
    transition: 0.3s ease all;
    z-index: 1;
  }

  .rankingBtn .rankingTitle:before,
  .rankingBtn .rankingTitle:after,
  .rankingBtn .rankingTitle span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 600;
    text-align: center;
    line-height: 1;
    border-radius: 20px;
    transition: 0.3s ease all;
  }

  .rankingBtn .rankingTitle:before {
    content: "";
    left: 0;
    background-color: #03a9f4;
  }

  .rankingBtn .rankingTitle:after {
    content: "독후감순";
    right: 0;
    color: #4e4e4e;
  }

  .rankingBtn .rankingTitle span {
    left: 0px;
    color: #fff;
    z-index: 1;
  }

  .rankingBtn .checkbox:checked + .rankingTitle span {
    color: #4e4e4e;
  }

  .rankingBtn .checkbox:checked + .rankingTitle:before {
    left: 50%;
    background-color: #e91e63;
  }

  .rankingBtn .checkbox:checked + .rankingTitle:after {
    color: #fff;
  }

  .rankingBtn .checkbox:checked ~ .btnLayer {
    background-color: #fcebeb;
  }
`;

const MyPageForm = () => {

  let userInfo = JSON.parse(localStorage.getItem('userInfo')).userInfo;
  const [howManyRate, setHowManyRate] = useState(null);
  const [howManyReport, setHowManyReport] = useState(null);
  const [rankingClick, setRankingClick] = useState(null);

  const rateRankingSortFunc = (data) => {
    let sortArr = data.sort((a, b) => {
      return a.bookRate > b.bookRate ? -1 : a.bookRate < b.bookRate ? 1 : 0;
    });
    setHowManyRate(sortArr);
  }

  useEffect(() => {
    bookListLoad()
      .then((data) => rateRankingSortFunc(data.data))
      .then((data) => setRankingClick(false));
    howManyWriteReport()
      .then((data) => setHowManyReport(data.data))
  }, []);

  const rankingClickHandler = () => {
    setRankingClick(rankingClick ? false : true);
  }

  const clickedBook = () => {
    return false;
  }

  return (
    <MyPageFormWrapper>
      <section className="profileInfo">
        <span className="profileTitle">
          <FaBook />
          Profile
        </span>
        <Avatar size={130} className="avatar">
          {userInfo.userName}
        </Avatar>
        <div className="rankingBtn" onClick={() => rankingClickHandler()}>
          <input type="checkbox" className="checkbox" />
          <div className="rankingTitle">
            <span>평점순</span>
          </div>
          <div className="btnLayer"></div>
        </div>
      </section>
      <section className="ranking">
        {rankingClick === false && (
          <div className="showRankingLists">
            {howManyRate.map((el) => (
              <BookList bookList={el} key={uuid()} clickedBook={clickedBook} />
            ))}
          </div>
        )}
        {rankingClick && (
          <div className="showRankingLists">
            {howManyReport.map((el) => (
              <BookList bookList={el} key={uuid()} clickedBook={clickedBook} />
            ))}
          </div>
        )}
      </section>
    </MyPageFormWrapper>
  );
};

export default MyPageForm;