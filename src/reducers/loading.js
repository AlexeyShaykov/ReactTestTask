import { SET_LOADING } from '../constants/mutations-types';

export default (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};
