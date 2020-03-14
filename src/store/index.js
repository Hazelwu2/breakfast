import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    showCart: false
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
    }
  },
  actions: {
    addToCart({ commit }, value) {
      commit('CART', value);
    },
    switchShoppingCart({commit}, value) {
      commit('SHOW_CART', value)
    },
    removeCart( {commit}, value) {
      commit('REMOVE_CART', value)
    },
    clearCart({commit}) {
      commit('CLEAR_CART')
    }
  },
  modules: {
  }
})
