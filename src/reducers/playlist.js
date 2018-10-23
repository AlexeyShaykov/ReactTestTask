import { SET_AUDIO_LIST } from '../constants/mutations-types';

export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUDIO_LIST:
      return payload;
    default:
      return state;
  }
};
