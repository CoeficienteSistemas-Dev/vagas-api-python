import styled from 'styled-components';
import { fadeIn } from 'styles/reset';

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;

  padding: 40px;

  animation: ${fadeIn} forwards 0.5s ease;

  > button {
    margin-top: 16px;
  }

  > h2 {
    width: 100%;
    text-align: left;
    color: #162f71;
  }

  > strong,
  p {
    width: 100%;
    text-align: left;
    margin-top: 8px;
  }

  > strong {
    font-size: 1.25rem;
    color: #707070;
  }
  > p {
    font-size: 1.1rem;
    color: #707070;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 8px 0;

    > * + * {
      margin-left: 16px;
    }
  }

  > strong {
    font-size: 1.25rem;
    color: #162f71;
    margin-top: 16px;
  }

  > table {
    margin-top: 24px;
  }
`;
