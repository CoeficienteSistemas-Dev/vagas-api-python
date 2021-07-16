/* eslint-disable react/display-name */
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';

import GenericTable from 'components/Table/table';
import {
  InputTitle,
  DefaultInput,
  DefInputCheckbox,
  DefButton,
  Column,
  Row,
  ColumnStylesTable,
  StatusRow,
} from 'styles/reset';
import { Container, Content } from './styles';

const headU = ['Id', 'Nome', 'CPF/CNPJ', 'Criado em', 'Ativo'];

const columnStyleU: ColumnStylesTable[] = [
  { width: '150px' },
  { mainColumn: true },
  { width: '200px' },
  { width: '225px' },
  { width: '150px' },
];

const rowKeysTableU = [
  { keyName: 'id' },
  { keyName: 'name' },
  { keyName: 'cpfCnpj' },
  { keyName: 'createdAt' },
  { keyName: 'isActive', formatFn: (item: any): any => JSON.stringify(item) },
];

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
  content: any;
  time: string;
  timeSpent: number;
  status: number;
}

interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  createdAt: string;
  isActive: boolean;
}

interface Put {
  id?: string;
  name?: string;
  cpfCnpj?: string;
  isActive?: boolean;
}

interface Post {
  name?: string;
  cpfCnpj?: string;
  isActive?: boolean;
}

const Test1: React.FC = () => {
  const history = useHistory();

  const [put, setPut] = useState<Put>({});
  const [post, setPost] = useState<Post>({});
  const [reqDelete, setReqDelete] = useState<string | undefined>();

  const [data, setData] = useState<Client[] | undefined>();
  const [reqList, setReqList] = useState<ReqData[] | undefined>();

  const handleGet = async (): Promise<void> => {
    const oldReq = reqList ? [...reqList] : [];
    const Toast = Swal.mixin({
      toast: true,
      timer: 5000,
      text: 'Objeto inválido',
      icon: 'error',
      position: 'top-right',
    });
    const start = new Date();
    try {
      const response = await axios.request({
        url: 'http://localhost:59300/GET/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const timeTaken = new Date().getTime() - start.getTime();

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: response.data,
          status: response.status,
        },
        ...oldReq,
      ]);

      try {
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        Toast.fire();
      }
    } catch (err) {
      const timeTaken = new Date().getTime() - start.getTime();
      Toast.fire();
      console.log('RequestErr', err, err.response);

      let thisErr = '';
      let thisStatus = 0;
      if (err.response && err.response?.data?.message && err?.response?.status) {
        thisErr = err.response.data.message;
        thisStatus = err.response.data.status;
      }

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: thisErr,
          status: thisStatus,
        },
        ...oldReq,
      ]);
    }
  };

  const handlePut = async (): Promise<void> => {
    const oldReq = reqList ? [...reqList] : [];
    const oldData = data && data.length > 0 ? [...data] : [];
    const Toast = Swal.mixin({
      toast: true,
      timer: 5000,
      title: 'Retorno inválido',
      icon: 'error',
      position: 'top-right',
      showCloseButton: false,
      showConfirmButton: false,
    });

    const start = new Date();
    try {
      const response = await axios.request({
        url: `http://localhost:59300/PUT/user/${put.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: { ...put },
      });
      const timeTaken = new Date().getTime() - start.getTime();
      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: response.data,
          status: response.status,
        },
        ...oldReq,
      ]);

      try {
        console.log(response.data);
        setData([
          ...oldData.map((item) => {
            if (`${item.id}` === `${response.data.id}`) {
              return { ...response.data };
            }
            return { ...item };
          }),
        ]);
      } catch (err) {
        Toast.fire();
      }
    } catch (err) {
      const timeTaken = new Date().getTime() - start.getTime();
      Toast.fire();
      console.log('RequestErr', err, err.response);
      let thisErr = '';
      let thisStatus = 0;
      if (err.response && err.response?.data?.message && err?.response?.status) {
        thisErr = err.response.data.message;
        thisStatus = err.response.data.status;
      }

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: thisErr,
          status: thisStatus,
        },
        ...oldReq,
      ]);
    }
  };

  const handlePost = async (): Promise<void> => {
    const oldReq = reqList ? [...reqList] : [];
    const oldData = data && data.length > 0 ? [...data] : [];
    const Toast = Swal.mixin({
      toast: true,
      timer: 5000,
      title: 'Retorno inválido',
      icon: 'error',
      position: 'top-right',
      showCloseButton: false,
      showConfirmButton: false,
    });

    const start = new Date();
    try {
      const response = await axios.request({
        url: 'http://localhost:59300/POST/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: { ...post },
      });
      const timeTaken = new Date().getTime() - start.getTime();

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          content: response.data,
          timeSpent: timeTaken / 1000,
          status: response.status,
        },
        ...oldReq,
      ]);

      try {
        console.log(response.data);
        setData([...oldData, response.data]);
      } catch (err) {
        Toast.fire();
      }
    } catch (err) {
      const timeTaken = new Date().getTime() - start.getTime();

      Toast.fire();
      console.log('RequestErr', err, err.response);
      let thisErr = '';
      let thisStatus = 0;
      if (err.response && err.response?.data?.message && err?.response?.status) {
        thisErr = err.response.data.message;
        thisStatus = err.response.data.status;
      }

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: thisErr,
          status: thisStatus,
        },
        ...oldReq,
      ]);
    }
  };

  const handleDelete = async (): Promise<void> => {
    const oldReq = reqList ? [...reqList] : [];
    const oldData = data && data.length > 0 ? [...data] : [];
    const Toast = Swal.mixin({
      toast: true,
      timer: 5000,
      title: 'Retorno inválido',
      icon: 'error',
      position: 'top-right',
      showCloseButton: false,
      showConfirmButton: false,
    });

    const start = new Date();
    try {
      const response = await axios.request({
        url: `http://localhost:59300/DELETE/user/${reqDelete}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const timeTaken = new Date().getTime() - start.getTime();

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          content: response.data,
          timeSpent: timeTaken / 1000,
          status: response.status,
        },
        ...oldReq,
      ]);

      try {
        console.log(response.data);
        setData([
          ...oldData.filter((item) => `${item.id}` !== `${response.data}`),
        ]);
      } catch (err) {
        Toast.fire();
      }
    } catch (err) {
      const timeTaken = new Date().getTime() - start.getTime();

      Toast.fire();
      console.log('RequestErr', err, err.response);
      let thisErr = '';
      let thisStatus = 0;
      if (err.response && err.response?.data?.message && err?.response?.status) {
        thisErr = err.response.data.message;
        thisStatus = err.response.data.status;
      }

      setReqList([
        {
          id: v4(),
          time: new Date().toJSON(),
          timeSpent: timeTaken / 1000,
          content: thisErr,
          status: thisStatus,
        },
        ...oldReq,
      ]);
    }
  };

  return (
    <Container>
      <h2>2 - Teste de CRUD</h2>
      <strong>Introdução</strong>
      <p>
        O objetivo deste teste é criar um CRUD(Create, Read, Update, Delete)
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
        <Row>
          <DefButton size="35px" hexColor="#69BA88" onClick={handlePost}>
            POST
          </DefButton>

          <Column>
            <InputTitle>Nome</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setPost({ ...post, name: target.value });
              }}
              value={post.name || ''}
            />
          </Column>
          <Column>
            <InputTitle>CPF/CNPJ</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setPost({ ...post, cpfCnpj: target.value });
              }}
              value={post.cpfCnpj || ''}
            />
          </Column>
          <Column>
            <InputTitle>Ativo</InputTitle>
            <DefInputCheckbox>
              <input
                type="checkbox"
                onChange={({ target }) => {
                  setPost({ ...post, isActive: target.checked });
                }}
                checked={post.isActive || false}
              />
            </DefInputCheckbox>
          </Column>
        </Row>

        <Row>
          <DefButton size="35px" hexColor="#69BA88" onClick={handlePut}>
            PUT
          </DefButton>

          <Column>
            <InputTitle>Id</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setPut({ ...put, id: target.value });
              }}
              value={put.id || ''}
            />
          </Column>
          <Column>
            <InputTitle>Nome</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setPut({ ...put, name: target.value });
              }}
              value={put.name || ''}
            />
          </Column>
          <Column>
            <InputTitle>CPF/CNPJ</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setPut({ ...put, cpfCnpj: target.value });
              }}
              value={put.cpfCnpj || ''}
            />
          </Column>
          <Column>
            <InputTitle>Ativo</InputTitle>
            <DefInputCheckbox>
              <input
                type="checkbox"
                onChange={({ target }) => {
                  setPut({ ...put, isActive: target.checked });
                }}
                checked={put.isActive || false}
              />
            </DefInputCheckbox>
          </Column>
        </Row>

        <Row>
          <DefButton size="35px" hexColor="#69BA88" onClick={handleDelete}>
            DELETE
          </DefButton>

          <Column>
            <InputTitle>Id</InputTitle>
            <DefaultInput
              onChange={({ target }) => {
                setReqDelete(target.value);
              }}
              value={reqDelete || ''}
            />
          </Column>
        </Row>

        <Row>
          <DefButton size="35px" hexColor="#69BA88" onClick={handleGet}>
            GET
          </DefButton>
        </Row>

        <strong>Lista de usuários no frontend</strong>
        <GenericTable
          data={data}
          rowKeys={rowKeysTableU}
          head={headU}
          columnStyle={columnStyleU}
        />

        <strong>Lista de requisições feitas</strong>
        <GenericTable
          data={reqList}
          rowKeys={rowKeysTable}
          head={head}
          columnStyle={columnStyle}
        />
      </Content>
    </Container>
  );
};

export default Test1;
