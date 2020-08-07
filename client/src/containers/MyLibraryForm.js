import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyBookList from "../components/MyBookList";
import { uuid } from "uuidv4";
import { bookListLoad } from '../lib/api/commonAPI';
import { useDispatch } from "react-redux";
import { currentBookList } from '../modules/currentBookList';

const MyLibraryFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .totalLength {
    font-size: 30px;
    font-weight: 600;
    color: #e91e63;
  }
  .bookList {
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 80%;
    padding-top: 10%;
  }
  .noBookMessage {
    display: block;
    font-size: 24px;
    font-weight: 600;
    color: #cfcfcf;
    line-height: 100px;
  }
`;

const MyLibraryForm = () => {

  const dispatch = useDispatch();

  const [myLibraryBookLists, setMyLibraryBookLists] = useState(null);

  useEffect(() => {
    bookListLoad()
    .then(data => setMyLibraryBookLists(data.data))
  }, []);

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
    <MyLibraryFormWrapper>
      <div className="totalLength">My Library ({myLibraryBookLists ? myLibraryBookLists.length : 0})</div>
      {myLibraryBookLists &&
        <React.Fragment>
          <section className="bookList">
            {myLibraryBookLists.map((el) => (
              <MyBookList
                myLibrary={el}
                key={uuid()}
                bookListClickHandler={bookListClickHandler}
              />
            ))}
          </section> 
        </React.Fragment>
      }
      {!myLibraryBookLists && <span className="noBookMessage">책을 등록해주세요 !</span>}
    </MyLibraryFormWrapper>
  );
};

export default MyLibraryForm;