import React from 'react';
import styled from 'styled-components';


const SearchLoadingWrapper = styled.div`
  /* 사람 */
  .person {
    width: 200px;
    margin: 20% auto 0;
    height: 360px;
  }

  .personHead {
    width: 70px;
    height: 70px;
    background: #f9deee;
    border-radius: 50%;
    animation: body 3s infinite ease-in-out;
  }

  .personBody {
    height: 144px;
    width: 62px;
    background: #f9deee;
    border-radius: 100% 20% 0 0;
    transform: skewX(-2deg);
    position: relative;
    left: -50px;
    animation: body 3s infinite ease-in-out;
  }

  .personFeet {
    text-align: left;
    position: relative;
    top: 100px;
    left: -66px;
  }

  .foot {
    width: 40px;
    height: 14px;
    border-radius: 10px 80% 4px 4px;
    transform: skewX(5deg);
    background-color: #f9deee;
    display: inline-block;
    animation: foot 1.8s infinite ease-in-out;
    &:last-child {
      margin-left: -40px;
      animation-delay: 0.9s;
    }
  }

  @keyframes body {
    25% {
      transform: translateY(3px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(3px);
    }
  }

  @keyframes foot {
    20% {
      transform: translate3d(34px, -16px, 0) rotate(4deg);
    }
    26% {
      transform: translate3d(34px, -10px, 4) rotate(0deg);
    }
    40% {
      transform: translate3d(56px, -6px, 0) rotate(-6deg);
    }
    44% {
      transform: translate3d(56px, 0, 0) rotate(0deg);
    }
  }

  /* 말풍선 */
  .speech-bubble {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 23%;
    right: 10%;
    width: 230px;
    height: 100px;
    background: #f9deee;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #ff78a5;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;
    bottom: 8%;
    left: 40%;
    border: 50px solid transparent;
    border-top-color: #f9deee;
    border-bottom: 0;
    border-left: 0;
    margin-left: -22px;
    margin-bottom: -44px;
    transform: rotate(15deg);
  }
`;

const SearchLoading = () => {
  return (
    <SearchLoadingWrapper>
      <div className="person">
        <div className="personHead"></div>
        <div className="personBody"></div>
        <div className="personFeet">
          <div className="foot"></div>
          <div className="foot"></div>
        </div>
      </div>
      <div className="speech-bubble">검색 언제 해줄거에요..?</div>
    </SearchLoadingWrapper>
  );
};

export default SearchLoading;