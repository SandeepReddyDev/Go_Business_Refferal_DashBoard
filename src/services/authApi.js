import axios from 'axios';

const AUTH_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin';

export function signIn(payload) {
  return axios.post(AUTH_URL, payload);
}
