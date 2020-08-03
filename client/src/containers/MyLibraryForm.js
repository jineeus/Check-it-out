import React from 'react';
import styled from 'styled-components';
import MyBookList from "../components/MyBookList";
import { uuid } from "uuidv4";

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

  const dummy = [
    {
      title: "미움받을 용기fdsfdfsfdfsdfsds",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 5,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 2,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 4,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 3,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 5,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 2,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 4,
    },
    {
      title: "미움받을 용기",
      authors: "기시미 이치로",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20200729142135",
      rate: 3,
    },
  ];

  const bookListClickHandler = (item) => {
    console.log(item)
  }

  return (
    <MyLibraryFormWrapper>
      <div className="totalLength">My Library ({dummy.length})</div>
      <section className="bookList">
        {dummy.map((el) => (
          <MyBookList
            dummy={el}
            key={uuid()}
            bookListClickHandler={bookListClickHandler}
          />
        ))}
      </section>
    </MyLibraryFormWrapper>
  );
};

export default MyLibraryForm;