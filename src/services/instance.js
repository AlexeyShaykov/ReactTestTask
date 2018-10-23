import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import data from 'src/constants/fixtures';

const instance = axios.create();

const mock = new MockAdapter(instance, { delayResponse: 2000 });

mock.onGet('/playlist').reply(200, {
  success: true,
  data: data,
});

export default instance;
