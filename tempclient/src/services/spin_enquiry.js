import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '';

class SpinEnquiry {
  getAllEnquiry(search) {
    //return axios.get(API_URL + 'getAllEnquiry', { headers: authHeader() });
    return axios.post(API_URL + 'getAllEnquiry', {
      search
    });
  }  

  getSelectEnquiry(status) {
    return axios.get(API_URL + 'getSelectEnquiry/'+status, { headers: authHeader() });
  }

  getDeletEnquiry(id) {
    return axios.get(API_URL + 'getDeletEnquiry/'+id, { headers: authHeader() });
  } 

  getAllUser() {
    return axios.get(API_URL + 'getAllUser', { headers: authHeader() });
  }
  
  getdeleteUser(id) {
    return axios.get(API_URL + 'getdeleteUser/'+id, { headers: authHeader() });
  } 
}

export default new SpinEnquiry();