import { SET_AUDIO_LIST } from '../constants/mutations-types';

export default (list = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUDIO_LIST:
      return (list = payload.list);
  }

  return list;
};
