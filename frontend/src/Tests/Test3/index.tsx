/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';

import GenericTable from 'components/Table/table';
import {
  InputTitle,
  DefaultInput,
  DefButton,
  Column,
  ColumnStylesTable,
  StatusRow,
} from 'styles/reset';
import { Container, Content } from './styles';
import axios from 'axios';

const head = ['Horário', 'Tempo gasto', 'Retorno', 'Status Code'];

const columnStyle: ColumnStylesTable[] = [
  { width: '225px' },
  { width: '125px' },
  { mainColumn: true },
  { width: '150px' },
];

const rowKeysTable = [
  { keyName: 'time' },
  {
    keyName: 'timeSpent',
    formatFn: (item: any): any => {
      return `${item}s`;
    },
  },
  {
    keyName: 'content',
    formatFn: (item: any): JSX.Element => {
      if (typeof item === 'object') {
        try {
          return (
            <Column>
              <div>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </div>
            </Column>
          );
        } catch (err) {
          return <span>{`${JSON.stringify(item)}`}</span>;
        }
      }
      return <span>{`${JSON.stringify(item)}`}</span>;
    },
  },
  {
    keyName: 'status',
    formatFn: (item: any): JSX.Element => {
      return <StatusRow code={item}>{item}</StatusRow>;
    },
  },
];

interface ReqData {
  id: string;
  content: any;
  timeSpent: number;
  time: string;
  status: number;
}

const Test1: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState<ReqData[] | undefined>();

  const handleGet = async (): Promise<void> => {
    const oldData = data ? [...data] : [];

    console.log(`http://localhost:59300/GET/list`);
    const start = new Date();
    try {
      const response = await axios.request({
        url: `http://localhost:59300/GET/list`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const timeTaken = new Date().getTime() - start.getTime();
      setData([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: response.data,
          status: response.status,
        },
        ...oldData,
      ]);
    } catch (err) {
      const timeTaken = new Date().getTime() - start.getTime();
      console.log('RequestErr', err, err.response);
      let thisErr = '';
      let thisStatus = 0;
      if (err.response && err.response?.data?.message && err?.response?.status) {
        thisErr = err.response.data.message;
        thisStatus = err.response.data.status;
      }

      setData([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: thisErr,
          status: thisStatus,
        },
        ...oldData,
      ]);
    }
  };
  return (
    <Container>
      <h2>Teste 3 - Teste básico de API com busca/filtragem de lista</h2>
      <strong>Introdução</strong>
      <p>
        Criar uma API que retorna uma lista hierárquica de forma dinâmica e com
        possibilidade para infinitos filhos.
      </p>
      <DefButton
        size="35px"
        hexColor="#C1272D"
        onClick={() => {
          history.push('/');
        }}
      >
        Voltar
      </DefButton>

      <Content>
        <div>
          <DefButton
            size="35px"
            customColor={1}
            onClick={() => {
              setData(undefined);
            }}
          >
            Limpar
          </DefButton>
          <DefButton size="35px" hexColor="#69BA88" onClick={handleGet}>
            GET
          </DefButton>
        </div>

        <strong>Lista de requisições feitas</strong>
        <GenericTable
          data={data}
          rowKeys={rowKeysTable}
          head={head}
          columnStyle={columnStyle}
        />
      </Content>
    </Container>
  );
};

export default Test1;
