import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import data from 'src/constants/fixtures';

const api = axios.create();

const mock = new MockAdapter(api, { delayResponse: 2000 });

mock.onGet('/playlist').reply(200, data);

export default api;
