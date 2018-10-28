import instance from 'src/services/instance';
import { SET_LOADING, SET_AUDIO_LIST } from 'src/constants/mutations-types';

export const loadAudioList = () => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    instance.get('playlist').then(data => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_AUDIO_LIST,
        payload: data.data.data,
      });
    });
  };
};
