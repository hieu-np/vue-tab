export default {
  signIn(state, payload) {
    state.user = payload;
    state.history.push(state.user);
  },
  signOut(state) {
    state.user = {};
    state.history.push(state.user);
  },
};
