import styled from 'styled-components';
import 'styled-components';

export const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  color: #3c3c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e0e0e0;
    border-radius: 5px;
    opacity: 0.5;
  }
  cursor: pointer;
`;

export const AddListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 控制 Add List 和 X 按鈕的間距 */
`;

export const ConfirmBtn = styled.div`
  background-color: #0072e3;
  color: white;
  width: 100px;
  mid-width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #005ab5;
  }
`;
