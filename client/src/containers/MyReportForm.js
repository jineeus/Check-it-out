import React from 'react';
import styled from 'styled-components';
import MyReportStack from '../components/MyReportStack';

const MyReportFormWrapper = styled.div`
  .reportTitle {
    font-size: 30px;
    font-weight: 600;
    color: #ffa2a2;
  }
  .reportListStack {
    width: 100%;
  }
`;

const MyReportForm = () => {

  const dummy = [1,2,3]
  
  return (
    <MyReportFormWrapper>
      <div className="reportTitle">My Report (3)</div>
      <section className="reportListStack">
        {dummy.map((el) => <MyReportStack />)}
      </section>
    </MyReportFormWrapper>
  );
};

export default MyReportForm;