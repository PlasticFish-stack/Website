export default {
  obtainSize(state, payload) {
    console.log(payload, 'payload');
    state.windowWidth = payload.width;
    state.windowHeight = payload.height;
  }
}