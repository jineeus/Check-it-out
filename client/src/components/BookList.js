import React, {useState} from 'react';
import styled from 'styled-components';

const BookListWrapper = styled.div`
  .bookImg {
    width: 20%;
    height: 100%;
  }
  .bookInfo {
    display: inline-block;
    vertical-align: middle;
    width: 80%;
    height: 100%;
    padding: 5%;
    box-sizing: border-box;
    text-align: left;
  }
  .bookTitle {font-size: 15px; display: block}
  .bookAuthor {margin: 3% 0; display: block}
  .bookContents {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  height: 160px;
  padding: 10px;
  box-shadow: 0px 6px 6px rgba(0,0,0,.28);
  border-radius: 20px;
  background: #f5f5f5;
  cursor: pointer;
  & + & {margin-top: 5%}
`;

const BookList = ({ bookList, clickedBook}) => {
  const [bookInfoConveyModal, setBookInfoConveyModal] = useState({
    title: bookList.title,
    thumbnail: bookList.thumbnail,
  })
  return (
    <BookListWrapper onDoubleClick={() => clickedBook(bookInfoConveyModal)}>
      <img className="bookImg" src={bookList.thumbnail}/>
      <div className="bookInfo">
        <strong className="bookTitle">{bookList.title}</strong>
        <span className="bookAuthor">{bookList.authors[0]}</span>
        <p className="bookContents">{bookList.contents}</p>
      </div>
    </BookListWrapper>
  );
};

export default BookList;