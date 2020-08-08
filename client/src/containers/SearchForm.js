import React, { useState } from 'react';
import styled from 'styled-components';
import { KAKAO_API_KEY } from '../config/kakaoAPI';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import SearchBookList from '../components/SearchBookList';
import SearchLoading from '../components/SearchLoading';
import ClickModal from '../components/ClickModal';
import { bookSave } from "../modules/bookSave";
import { useDispatch, useSelector } from "react-redux";
import { modalBG } from '../modules/modalBG';

const SearchWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  .searchSection {
    position: relative;
    width: 100%;
    height: 150px;
    margin-top: 15px;
  }
  .contentForm {
    position: absolute;
    top: 25%;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .question {
    display: block;
    font-size: 20px;
    font-weight: 600;
    color: #e91e63;
  }

  .searchBookInput,
  .searchBookBtn {
    position: absolute;
    top: 5%;
    right: 10%;
  }

  .searchBookInput {
    width: 50px;
    height: 50px;
    border: 4px solid #ffa2a2;
    border-radius: 50%;
    transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
      padding 0.2s;
    transition-delay: 0.4s;
  }

  .searchBookInput.openInputBox {
    box-sizing: border-box;
    padding: 0 40px 0 10px;
    width: 450px;
    height: 50px;
    border-radius: 0;
    outline: 0;
    transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
      padding 0.2s;
    transition-delay: 0.4s, 0s, 0.4s;
  }

  .searchBookBtn {
    background: none;
    height: 50px;
    width: 50px;
    padding: 0;
    border-radius: 100%;
    outline: 0;
    border: 0;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .searchBookBtn:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 4px;
    background: #ffa2a2;
    transform: rotate(45deg);
    margin-top: 26px;
    margin-left: 17px;
    transition: 0.2s ease-in-out;
  }

  .close {
    transition: 0.4s ease-in-out;
    transition-delay: 0.4s;
  }

  .close:before,
  .close:after {
    content: "";
    position: absolute;
    width: 27px;
    height: 4px;
    margin-top: -1px;
    margin-left: -13px;
    background: #ffa2a2;
    cursor: pointer;
  }

  .close:before {
    transform: rotate(45deg);
    transition: 0.2s ease-in-out;
  }
  .close:after {
    transform: rotate(-45deg);
  }

  .bookListSection {
    overflow-y: auto;
    overflow-x: hidden;
    height: 70%;
    padding: 10px;
  }
`;


const SearchForm = () => {

  const dispatch = useDispatch();

  const [clickModal, setClickModal] = useState(false);
  const [bookLists, setBookLists] = useState([]);
  const [checkInSearch, setCheckInSearch] = useState(false);
  const [clickBookInfoModal, setClickBookInfoModal] = useState({
    clickBook: null,
    bookRate: 0
  });

  const callApi = (input) => {
    axios
      .get(`https://dapi.kakao.com/v3/search/book?`, {
        params: {
          query: input,
          size: 20,
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`, // 공통으로 요청 할 헤더
        },
      })
      .then((res) => kakaoBookFilterFunc(res.data.documents))
      .then((data) => setBookLists(data))
      .catch((err) => console.log(err));
  };

  const kakaoBookFilterFunc = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i] = {
        bookAuthor: data[i].authors[0],
        bookContent: data[i].contents,
        bookImage: data[i].thumbnail,
        bookTitle: data[i].title,
      };
    }
    return data;
  };

  const showInput = () => {
    const inputEl = document.querySelector(".searchBookInput");
    const searchBtnEl = document.querySelector(".searchBookBtn");
    searchBtnEl.classList.toggle("close");
    inputEl.classList.toggle("openInputBox");
    setCheckInSearch(checkInSearch ? false : true);
    setBookLists([]);
    inputEl.value = '';
  }

  const setQuery = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputValue = document.querySelector('.searchBookInput').value;
      callApi(inputValue);
    };
  }

  const clickedBook = (item) => {
    setClickModal(true);
    dispatch(modalBG(true));
    setClickBookInfoModal({clickBook: item});
  }

  const modalClose = () => {
    dispatch(
      bookSave({
        bookUuid: uuidv4(),
        bookTitle: clickBookInfoModal.clickBook.bookTitle,
        bookAuthor: clickBookInfoModal.clickBook.bookAuthor,
        bookImage: clickBookInfoModal.clickBook.bookImage,
        bookRate: clickBookInfoModal.bookRate
      })
    );
    setClickModal(false);
    dispatch(modalBG(false));
  }

  const bookRateSave = (bookRate) => {
    setClickBookInfoModal((prevState) => {
      return { ...prevState, click: true, bookRate };
    });
  }

  return (
    <SearchWrapper>
      <section className="searchSection">
        <span className="question">어떤 책을 읽으셨나요?</span>
        <form className="contentForm" onKeyPress={(e) => setQuery(e)}>
          <input type="text" id="label" className="searchBookInput" />
          <button
            type="button"
            className="searchBookBtn"
            onClick={() => showInput()}
          ></button>
        </form>
      </section>
      <section className="bookListSection">
        {!checkInSearch ? (
          <SearchLoading />
        ) : (
          bookLists.map((el) => (
            <SearchBookList
              bookList={el}
              key={uuidv4()}
              clickedBook={clickedBook}
            />
          ))
        )}
      </section>
      {clickModal && (
        <div>
          <ClickModal
            clickBookInfoModal={clickBookInfoModal.clickBook}
            modalClose={modalClose}
            bookRateSave={bookRateSave}
          />
        </div>
      )}
    </SearchWrapper>
  );
};

export default SearchForm;