import axios from 'axios';

import serverURI from '../../config/URI';

export const LOADING_SERVERS = 'LOADING_SERVERS';
export const LOADING_SERVERS_SUCCESS = 'LOADING_SERVERS_SUCCESS';
export const LOADING_SERVERS_ERROR = 'LOADING_SERVERS_ERROR';

export const getServers = () => (
  (dispatch) => {
    dispatch({ type: LOADING_SERVERS });
    axios
      .get(`${serverURI}/api/employees/all`)
      .then((res) => {
        dispatch({ type: LOADING_SERVERS_SUCCESS, payload: res.data.employees });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: LOADING_SERVERS_ERROR, payload: err });
      });
  }
);
