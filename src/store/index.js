import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    showCart: false,
    item: {},
    username: '',
    isOpen: true
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  mutations: {
    CART(state, payload) {
      state.cart.push(payload);
    },
    SHOW_CART(state, payload) {
      state.showCart = payload;
    },
    REMOVE_CART(state, index) {
      state.cart.splice(index, 1)
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    ADD_ITEM(state, payload) {
      state.item = payload;
    },
    ADD_USERNAME(state, payload) {
      state.username = payload;
    },
    SWITCH_ISOPEN(state, payload) {
      state.isOpen = payload;
    }
  },
  actions: {
    addToCart({ commit }, value) {
      commit('CART', value);
    },
    switchShoppingCart({ commit }, value) {
      commit('SHOW_CART', value)
    },
    removeCart({ commit }, value) {
      commit('REMOVE_CART', value)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    addItem({ commit }, value) {
      commit('ADD_ITEM', value);
    },
    addUserName({commit}, username) {
      commit('ADD_USERNAME', username)
    },
    changeIsOpenStatus({commit}, boolean) {
      commit('SWITCH_ISOPEN', boolean)
    }
  },
  modules: {
  }
})
