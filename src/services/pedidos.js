import axios from 'axios';

export async function getPedidos() {
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_API_URL}/pedidos`
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function addPedido(data) {
  const config = {
    method: 'post',
    url: `${import.meta.env.VITE_API_URL}/pedidos`,
    data: data
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function editPedido(data) {
  const config = {
    method: 'put',
    url: `${import.meta.env.VITE_API_URL}/pedidos/${data.pedido.id}`,
    data: data
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function disablePedido(data) {
  const config = {
    method: 'delete',
    url: `${import.meta.env.VITE_API_URL}/pedidos/${data.id}`
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
