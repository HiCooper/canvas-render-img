const demo = {
  state: {
    count: ''
  },
  mutations: {
    INCREMENT: (state, val) => {
      state.count = val;
    }
  },
  actions: {
    incrementCount({commit}, val) {
      commit('INCREMENT', val)
    }
  }
};

export default demo
