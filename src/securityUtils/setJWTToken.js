import axios from 'axios';

const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const set2FAToken = (token) => {
  if (token) {
    axios.defaults.headers.common['X-2FA-TOKEN'] = token;
  } else {
    delete axios.defaults.headers.common['X-2FA-TOKEN'];
  }
};

export default setJWTToken;
