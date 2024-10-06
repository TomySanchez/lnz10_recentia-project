import axios from 'axios';

export async function getClientes() {
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_API_URL}/clientes`
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export async function addCliente(data) {
  const config = {
    method: 'post',
    url: `${import.meta.env.VITE_API_URL}/clientes`,
    data: data
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
