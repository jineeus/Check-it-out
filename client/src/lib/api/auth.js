import client from './client';
import jwt from "jsonwebtoken";
import { uuid } from '../../containers/WriteReportForm';
const TOKEN_SECRET = "e07367d30974e8aeae60c7476ae3383b34830cb02a32ee14aab097c85c3c8a75d07ccc5dddab1c4ccb6e8c57c852bfdb0a04ca8fa6471270c4104ffaae5c635d";
// 회원 인증에 필요한 API를 사용하기 쉽도록 함수화하여 작성

// 회원가입
export const signup = ({ userName, userEmail, passWord }) => 
  client.post('http://localhost:3002/users/signUp', { userName, userEmail, passWord });

// 로그인
export const signin = ({ userEmail, passWord }) => 
  client.post('http://localhost:3002/users/signIn', { userEmail, passWord })
  .then(data => localStorage.setItem('userInfo', JSON.stringify({
    userToken: data.data,
    userInfo: jwt.verify(data.data, TOKEN_SECRET)
  })));

// 로그인 상태 확인
export const check = () => client.get("http://localhost:3002/users/signin");

// 책 정보 저장
export const bookSave = ({ uuid, bookTitle, bookAuthor, bookImage, bookRate, report }) => 
  client.post('http://localhost:3002/myLibrary/addBooks', { uuid, bookTitle, bookAuthor, bookImage, bookRate, report }, {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': JSON.stringify(JSON.parse(localStorage.getItem('userInfo')).userToken)
    }
  });

// 책 정보 불러오기
export const bookListLoad = () => 
  client.get('http://localhost:3002/myLibrary/getAllBooks', {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': JSON.stringify(JSON.parse(localStorage.getItem('userInfo')).userToken)
    }
  })

// export const getReportList = () =>
//   client.post('http://localhost:3002/report/getAllReport', {uuid} {
//     headers: {
//       'Content-Type': 'application/json',
//       'auth-token': JSON.stringify(JSON.parse(localStorage.getItem('userInfo')).userToken)
//     }
//   })