import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyBookList from "../components/MyBookList";
import { uuid } from "uuidv4";
import { bookListLoad } from '../lib/api/auth';
import { useDispatch } from "react-redux";
import { currentBookList } from '../modules/currentBookList';

const MyLibraryFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .totalLength {
    font-size: 30px;
    font-weight: 600;
    color: #ffa2a2;
  }
  .bookList {
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 80%;
    padding-top: 10%;
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
      uuid: item.uuid,
      bookTitle: item.bookTitle,
      bookAuthor: item.bookAuthor,
      bookImage: item.bookImage,
      bookRate: item.bookRate,
    }));
  }

  return (
    <MyLibraryFormWrapper>
      {myLibraryBookLists &&
        <React.Fragment>
          <div className="totalLength">My Library ({myLibraryBookLists.length})</div>
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
    </MyLibraryFormWrapper>
  );
};

export default MyLibraryForm;