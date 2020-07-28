import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoSearch, GoListUnordered } from 'react-icons/go';
import { BsPencilSquare } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';

const HeaderNavWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10%;
  background: #F9DEEE;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color:#ffa2a2;
    border-radius: 25px;
    background: #fff;
    width: 60px;
    height: 50%;
    padding: 1.5%;
    box-sizing: border-box;
  }
  a + a {
    margin-left: 30px;
  }
  a > svg {width: 100%; height: 100%}
`;

const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <Link to="/Search">
        <GoSearch />
      </Link>
      <Link to="/BookList">
        <GoListUnordered />
      </Link>
      <Link to="BookReport">
        <BsPencilSquare />
      </Link>
      <Link to="Setting">
        <FaRegUser />
      </Link>
    </HeaderNavWrapper>
  );
};

export default HeaderNav;