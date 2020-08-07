import client from './client';
import jwt from "jsonwebtoken";
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

// 책 추가
export const bookSave = ({ bookUuid, bookTitle, bookAuthor, bookImage, bookRate }) => 
  client.post('http://localhost:3002/myLibrary/addBooks', { bookUuid, bookTitle, bookAuthor, bookImage, bookRate });

// 책 정보 불러오기
export const bookListLoad = () => 
  client.get('http://localhost:3002/myLibrary/getAllBooks')

// 클릭한 책에 대한 독후감 불러오기
export const clickBookReportLoad = ({ bookUuid }) => 
  client.post("http://localhost:3002/report/getAllReport", { bookUuid });

// 새 독후감 저장
export const newReportSave = ({ bookUuid, reportUuid, reportMemo }) => 
  client.post('http://localhost:3002/report/addReport', { bookUuid, reportUuid, reportMemo });

// 독후감 수정 
export const reportUpdateSave = ({ reportUuid, reportMemo }) => 
  client.post('http://localhost:3002/report/updateReport', { reportUuid, reportMemo })

// 독후감 삭제
export const reportDelete = ({ reportUuid }) =>
  client.post('http://localhost:3002/report/deleteReport', { reportUuid })
  
// 책 삭제
export const bookDelete = ({ bookUuid }) =>
  client.post('http://localhost:3002/myLibrary/deleteBooks', { bookUuid })