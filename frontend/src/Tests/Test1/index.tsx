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
              {item.map((subItem: any, index: any) => (
                // eslint-disable-next-line
                <span key={index}>{`${JSON.stringify(subItem)}`}</span>
              ))}
            </Column>
          );
        } catch (err) {
          // console.log('Err on parse');
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
  time: string;
  timeSpent: number;
  content: any;
  status: number;
}

interface Form {
  udoc?: string;
  name?: string;
  token?: string;
}

const Test1: React.FC = () => {
  const history = useHistory();
  const [tokenActive, setTokenActive] = useState(false);
  const [form, setForm] = useState<Form>({});
  const [data, setData] = useState<ReqData[] | undefined>();

  const handleGet = async (): Promise<void> => {
    const oldData = data ? [...data] : [];
    const Auth = form.token;
    let url = '';
    if (form.name) url = `?nome=${encodeURI(form.name)}`;
    if (form.udoc) {
      url =
        url.length > 0
          ? `${url}&cpfCnpj=${encodeURI(form.udoc)}`
          : `?cpfCnpj=${encodeURI(form.udoc)}`;
    }

    console.log(`http://localhost:59300/GET/client${url}`);
    const start = new Date();
    try {
      const response = await axios.request({
        url: `http://localhost:59300/GET/client${url}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: Auth,
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
      <h2>Teste 1 - Teste básico de API com busca/filtragem de lista</h2>
      <strong>Introdução</strong>
      <p>
        O objetivo desse teste é criar uma requisição <b>HTTP GET</b> que
        retorna uma lista de clientes aplicando um filtro por nome ou por
        documento (CPF/CNPJ).
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
          <div>
            <Column>
              <InputTitle>Nome</InputTitle>
              <DefaultInput
                type="text"
                onChange={({ target }) => {
                  setForm({ ...form, name: target.value });
                }}
                value={form.name || ''}
              />
            </Column>
            <Column>
              <InputTitle>CPF/CNPJ</InputTitle>
              <DefaultInput
                type="text"
                onChange={({ target }) => {
                  setForm({ ...form, udoc: target.value });
                }}
                value={form.udoc || ''}
              />
            </Column>
            <Column hidden={!tokenActive}>
              <InputTitle>Token</InputTitle>
              <DefaultInput
                type="text"
                onChange={({ target }) => {
                  setForm({ ...form, token: target.value });
                }}
                value={form.token || ''}
              />
            </Column>
          </div>

          <div>
            <DefButton
              size="35px"
              customColor={1}
              onClick={() => {
                setForm({});
              }}
            >
              Limpar
            </DefButton>
            <DefButton size="35px" hexColor="#69BA88" onClick={handleGet}>
              GET
            </DefButton>
            <DefButton
              size="35px"
              customColor={2}
              onClick={() => {
                setTokenActive(!tokenActive);
              }}
            >
              Usar Token
            </DefButton>
          </div>
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
