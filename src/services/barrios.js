import axios from 'axios';

export async function getBarrios() {
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_API_URL}/barrios`
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
