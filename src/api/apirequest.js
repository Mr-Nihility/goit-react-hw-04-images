import axios from 'axios';
//----------------------------------------------//

const KEY_PIX = '28317222-241a165b1fe9d2b89a64d5785';
const BASE_URL = 'https://pixabay.com/api/';

async function createRequest(name, page = 1) {
  const params = {
    url: BASE_URL,
    params: {
      key: KEY_PIX,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      q: name,
      per_page: 12,
    },
  };

  return await axios(params);
}

export { createRequest };
