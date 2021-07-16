import styled from 'styled-components';
import { fadeIn } from 'styles/reset';

export const Container = styled.main`
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;

  animation: ${fadeIn} forwards 0.5s ease;

  > svg {
    width: 350px;
    height: 300px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    > button + button {
      margin-left: 16px;
    }
  }
`;
