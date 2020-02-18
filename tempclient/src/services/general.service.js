import axios from 'axios';

const API_URL = 'general/';

class GeneralService {

	getSpinnerPart() {
		return axios.get(API_URL + 'signin', {
			phone: user.username,
			password: user.password
		})
		.then(response => {
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}

			return response.data;
		});
	}
  
}

export default new GeneralService();
