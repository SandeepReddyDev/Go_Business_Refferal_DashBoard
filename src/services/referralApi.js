import axios from 'axios';
import Cookies from 'js-cookie';

const referralApi = axios.create({
  baseURL: 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals'
});

referralApi.interceptors.request.use((config) => {
  const token = Cookies.get('jwt_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function fetchReferralDashboard({ search = '', sort = 'desc' } = {}) {
  const params = { sort };

  if (search) {
    params.search = search;
  }

  return referralApi.get('', { params });
}

export function fetchReferralDetails(id) {
  return referralApi.get('', { params: { id } });
}

export default referralApi;
