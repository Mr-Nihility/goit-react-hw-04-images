import styled from 'styled-components';
//---------------------------------------//

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
const ModalBox = styled.div`
  max-width: calc(100vw - 100px);
  max-height: calc(100vh - 100px);
  /* width: calc(100vw - 500px);
  height: auto; */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
export { Backdrop, ModalBox, ModalImg };
