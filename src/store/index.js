import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    auth_get_user(state) {
      state.status = "success";
    },
    auth_update(state, name, email) {
      state.status = "success";
      state.name = name;
      state.email = email;
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://reqres.in/api/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://reqres.in/api/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const user = resp.data.id;
            const token = resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    update({ commit }, user) {
      //fake profile
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://reqres.in/api/users/2",
          data: user,
          method: "PUT",
        })
          .then((resp) => {
            const name = resp.data.first_name;
            const email = resp.data.email;
            commit("auth_update", name, email);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    getProfile({ commit }, user) {
      // fake profile
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://reqres.in/api/users/2",
          data: user,
          method: "GET",
        })
          .then((resp) => {
            commit("auth_get_user");
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => state.user,
  },
});

export default store;
