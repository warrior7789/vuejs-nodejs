import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '';

class SpinEnquiry {
  getAllEnquiry() {
    return axios.get(API_URL + 'getAllEnquiry', { headers: authHeader() });
  }
}

export default new SpinEnquiry();