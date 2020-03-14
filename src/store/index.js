import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    showCart: false
  },
  mutations: {
    CART(state, payload) {
      state.cart.push(payload);
    },
    SHOW_CART(state, payload) {
      state.showCart = payload;
    },
    REMOVE_CART(state, payload) {
      state.cart.splice(payload, 1)
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
