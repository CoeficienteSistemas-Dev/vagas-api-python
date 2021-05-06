import React from 'react';

import { useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/logo.svg';
import { DefButton } from 'styles/reset';
import { Container } from './styles';

const Index: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = (page: number): void => {
    history.push(`/${page}`);
  };
  return (
    <Container>
      <Logo />

      <div>
        <DefButton customColor={1} onClick={() => handleButtonClick(1)}>
          Teste 1
        </DefButton>
        <DefButton customColor={2} onClick={() => handleButtonClick(2)}>
          Teste 2
        </DefButton>
        <DefButton customColor={3} onClick={() => handleButtonClick(3)}>
          Teste 3
        </DefButton>
      </div>
    </Container>
  );
};

export default Index;
