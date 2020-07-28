import client from './client';

// 회원 인증에 필요한 API를 사용하기 쉽도록 함수화하여 작성

// 회원가입
export const signup = ({ username, useremail, password }) => 
  client.post('http://localhost:3002/users/signup', { username, useremail, password });

// 로그인
export const signin = ({ useremail, password }) => 
  client.post('http://localhost:3002/users/signin', { useremail, password });

// 로그인 상태 확인
export const check = () => client.get("http://localhost:3002/users/signin");

export const bookInfo = ({ bookTitle, bookAuthor, bookDescription, bookRate, report }) => 
  client.post('http://localhost:3002/', { bookTitle, bookAuthor, bookDescription, bookRate, report });
