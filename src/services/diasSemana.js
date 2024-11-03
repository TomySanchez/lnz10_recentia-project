import axios from 'axios';

export async function getDiasSemana() {
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_API_URL}/diasSemana`
  };

  return await axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
