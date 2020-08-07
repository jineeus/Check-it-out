import React from 'react';
import styled from 'styled-components';

const ModalBgWrapper = styled.div`
  background: black;
  opacity: .5;
  position: absolute;
  top:0; left: 0; right: 0; bottom: 0;
  border-radius: 8px;
`;

const ModalBg = () => {
  return (
      <ModalBgWrapper>
      </ModalBgWrapper>
  );
};

export default ModalBg;