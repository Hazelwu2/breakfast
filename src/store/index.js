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
    }
  },
  actions: {
    addToCart({ commit }, value) {
      commit('CART', value);
    },
    switchShoppingCart({commit}, value) {
      console.log('switchShoppingCart', value)
      commit('SHOW_CART', value)
    }
  },
  modules: {
  }
})
