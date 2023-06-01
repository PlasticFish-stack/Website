export default {
  obtainSize(state, payload) {
    state.windowWidth = payload.width;
    state.windowHeight = payload.height;
  }
}