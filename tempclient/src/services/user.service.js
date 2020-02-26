import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllParts() {
    return axios.get(API_URL + 'getAllParts', { headers: authHeader() });
  }
  
  getAllFrontParts() {
    return axios.get(API_URL + 'getFrontAllParts', { headers: authHeader() });
  }

  getDeletParts(id) {
    return axios.get(API_URL + 'getDeleteParts/'+id, { headers: authHeader() });
  } 
  getParticularParts(id) {
    return axios.get(API_URL + 'getParticularParts/'+id, { headers: authHeader() });
  }  
}

export default new UserService();
