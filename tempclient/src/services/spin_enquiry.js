import axios from 'axios';

const API_URL = '';

class SpinEnquiry {
  spin_enquiry(data) {
    return axios.post(API_URL + 'spinenquiry', {
      number: data.mobile_no,
      status: data.status,
      entryDate: data.currentDate  
    });
  } 
}

export default new SpinEnquiry();
