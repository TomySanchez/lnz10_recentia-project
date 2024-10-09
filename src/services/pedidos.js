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
