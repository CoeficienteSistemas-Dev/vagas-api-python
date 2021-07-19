import { response, Router } from 'express';
import FormData from 'form-data';
import AppError from '../errors/AppError';
import fetch, { Response } from 'node-fetch';
import { v4 } from 'uuid';

const router = Router();

const baseURL = 'http://localhost:59301';
/* Altere para "true" caso queira simular algum retorno específico */
const debug = true;
const nodeToken = '12341aosdaoqwe0A98';
console.log(
  '----------STATUS DO DEBUG-----------',
  `\n-----------------${debug}-----------------`,
);

/*
 *** TESTE 1 ***
 */
router.get('/GET/client', async (request, response) => {
  const { nome, cpfCnpj }: { nome?: string; cpfCnpj?: string } = request.query;
  const token = request.headers.authorization || '';

  let query = '';
  if (nome) query = `?nome=${encodeURI(nome)}`;
  if (cpfCnpj) {
    query =
      query.length > 0
        ? `${query}&cpfCnpj=${encodeURI(cpfCnpj)}`
        : `?cpfCnpj=${encodeURI(cpfCnpj)}`;
  }

  console.log('/GET/client QUERY:', request.query, token);

  // *** RETORNO ESPERADO ***
  // Abaixo é o retorno esperado dinamicamente de acordo com o filtro.
  // if (debug) {
  //   // if (token !== nodeToken) {
  //   //   return response.sendStatus(401);
  //   // }
  //   return response.json([
  //     { id: '1', name: 'Nathan César', cpfCnpj: '444.015.829-34' },
  //     { id: '2', name: 'Allana Aline Drumon', cpfCnpj: '036.273.886-66' },
  //     { id: '3', name: 'Luana Larissa', cpfCnpj: '90.854.121/0001-93' },
  //     { id: '4', name: 'Diego Fernando Márc Ramos', cpfCnpj: '689.402.133-35' },
  //     { id: '5', name: 'Ricardo Anthony', cpfCnpj: '85.311.895/0001-38' },
  //   ]);
  // }
  // *** RETORNO ESPERADO ***

  try {
    const responseAPI: Response = await fetch(`${baseURL}/GET/client${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

/*
 *** TESTE 1 ***
 */

/*
 *** TESTE 2 ***
 */
router.get('/GET/user', async (request, response) => {
  console.log('/GET/user');

  // *** RETORNO ESPERADO ***
  // if (debug) {
  //   return response.json([
  //     {
  //       id: '1',
  //       name: 'Nathan César',
  //       cpfCnpj: '444.015.829-34',
  //       createdAt: new Date().toJSON(),
  //       isActive: true,
  //     },
  //     {
  //       id: '2',
  //       name: 'Allana Aline Drumond',
  //       cpfCnpj: '036.273.886-66',
  //       createdAt: new Date().toJSON(),
  //       isActive: true,
  //     },
  //     {
  //       id: '3',
  //       name: 'Luana Larissa',
  //       cpfCnpj: '90.854.121/0001-93',
  //       createdAt: new Date().toJSON(),
  //       isActive: true,
  //     },
  //     {
  //       id: '4',
  //       name: 'Diego Fernando Márcio Ramos',
  //       cpfCnpj: '689.402.133-35',
  //       createdAt: new Date().toJSON(),
  //       isActive: true,
  //     },
  //     {
  //       id: '5',
  //       name: 'Ricardo Anthony Danilo Oliveira',
  //       cpfCnpj: '85.311.895/0001-38',
  //       createdAt: new Date().toJSON(),
  //       isActive: true,
  //     },
  //   ]);
  // }
  // *** RETORNO ESPERADO ***

  try {
    const responseAPI: Response = await fetch(`${baseURL}/GET/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

router.put('/PUT/user/:id', async (request, response) => {
  const { id }: { id?: string } = request.params;
  const {
    name,
    cpfCnpj,
    isActive,
  }: { name?: string; cpfCnpj?: string; isActive?: boolean } = request.body;
  console.log(
    `/PUT/user/${id} BODY: ${JSON.stringify(request.body)} PARAMS: ${
      request.params
    }`,
  );

  // *** RETORNO ESPERADO ***
  // Abaixo é o retorno esperado dinamicamente de acordo com os dados alterados.
  // if (debug) {
  //   return response.json({
  //     id: id || v4(),
  //     name: name || 'Nathan César',
  //     cpfCnpj: cpfCnpj || '444.015.829-34',
  //     createdAt: new Date().toJSON(),
  //     isActive: ativo || true,
  //   });
  // }
  // *** RETORNO ESPERADO ***

  try {
    const form = new FormData({ encoding: 'utf-8' });
    form.append('name', name || '');
    form.append('cpfCnpj', cpfCnpj || '');
    form.append('ativo', `${isActive}` || '');

    const responseAPI: Response = await fetch(`${baseURL}/PUT/user/${id}`, {
      method: 'PUT',
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
      body: form,
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

router.post('/POST/user', async (request, response) => {
  const {
    name,
    cpfCnpj,
    isActive,
  }: { name?: string; cpfCnpj?: string; isActive?: boolean } = request.body;
  console.log(`/POST/user BODY: ${JSON.stringify(request.body)}`);

  // *** RETORNO ESPERADO ***
  // Abaixo é o retorno esperado dinamicamente de acordo com o novo user.
  // if (debug) {
  //   return response.json({
  //     id: parseInt(v4()),
  //     name: name || 'Nathan César',
  //     cpfCnpj: cpfCnpj || '444.015.829-34',
  //     createdAt: new Date().toJSON(),
  //     isActive: ativo || true,
  //   });
  // }
  // *** RETORNO ESPERADO ***

  try {
    const form = new FormData({ encoding: 'utf-8' });
    form.append('name', name || '');
    form.append('cpfCnpj', cpfCnpj || '');
    form.append('ativo', `${isActive}` || '');

    const responseAPI: Response = await fetch(`${baseURL}/POST/user`, {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
      body: form,
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

router.delete('/DELETE/user/:id', async (request, response) => {
  const { id }: { id?: string } = request.params;
  console.log(`/DELETE/user/${id}`);

  // *** RETORNO ESPERADO ***
  // Abaixo é o retorno esperado dinamicamente de acordo com o ID deletado.
  // if (debug) {
  //   return response.json(id || '1');
  // }
  // *** RETORNO ESPERADO ***

  try {
    const responseAPI: Response = await fetch(`${baseURL}/DELETE/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

/*
 *** TESTE 2 ***
 */

/*
 *** TESTE 3 ***
 */

router.get('/GET/list', async (request, response) => {
  console.log('/GET/list');

  // *** RETORNO ESPERADO ***
  // Abaixo é o retorno esperado dinamicamente de acordo com o filtro.
  // if (debug) {
  //   return response.json([
  //     {
  //       id: 1,
  //       nome: '01',
  //       filhos: [
  //         { id: 2, nome: '01.001', filhos: [{ id: 3, nome: '01.001.0001' }] },
  //         { id: 4, nome: '01.002', filhos: [{ id: 5, nome: '01.002.0002' }] },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       nome: '02',
  //       filhos: [
  //         { id: 7, nome: '02.001', filhos: [{ id: 8, nome: '02.001.0001' }] },
  //         { id: 9, nome: '02.002', filhos: [{ id: 10, nome: '02.002.0002' }] },
  //       ],
  //     },
  //   ]);
  // }
  // *** RETORNO ESPERADO ***

  try {
    const responseAPI: Response = await fetch(`${baseURL}/GET/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: request.headers.authorization || '',
      },
    });

    const responseAPIData = await responseAPI.json();

    if (!responseAPI.ok) {
      console.log('Error:', responseAPI);
      throw new AppError(JSON.stringify(responseAPIData), responseAPI.status);
    }

    return response.json(responseAPIData);
  } catch (err) {
    console.warn('Error Message:', err.message || 'no message');
    console.warn('Error Status:', err.statusCode || 'no statusCode');
    if (err instanceof AppError)
      throw new AppError(err.message, err.statusCode);
    throw new AppError('Response Err.');
  }
});

/*
 *** TESTE 3 ***
 */

export default router;
