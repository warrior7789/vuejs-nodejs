import axios from 'axios';

const API_URL = 'auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  addParts(user) {
    return axios.post(API_URL + 'addParts', {
      fillstyle: user.fillstyle,
      text: user.text,
      fontsize: user.fontsize,
      textFillStyle: user.textFillStyle,
      position: user.position    
    });
  } 

  updateparts(user) {
    return axios.post(API_URL + 'updateparts', {
      fillStyle: user.fillStyle,
      text: user.text,
      fontsize: user.fontsize,
      textFillStyle: user.textFillStyle,
      position: user.position,
      id: user.id
    });
  }
}

export default new AuthService();
