import AuthService from '../services/auth.service';
import SpinEnquiry from '../services/spin_enquiry';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    addParts({ commit }, user) {
      return AuthService.addParts(user).then(
        response => {
          commit('insertSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('insertFailure');
          return Promise.reject(error);
        }
      );
    },
    updateparts({ commit }, user) {
      return AuthService.updateparts(user).then(
        response => {
          commit('UpdateSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('updateFailure');
          return Promise.reject(error);
        }
      );
    },
    spin_enquiry(data) {
      return SpinEnquiry.spin_enquiry(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    insertSuccess(state){
      state.status.loggedIn = false;
    },
    insertFailure(state){
      state.status.loggedIn = false;
    },
    UpdateSuccess(state){
      state.status.loggedIn = false;
    },
    updateFailure(state){
      state.status.loggedIn = false;
    }
  }
};
