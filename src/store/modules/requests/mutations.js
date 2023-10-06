export default {
  // all use in actionjs
  addRequest(state, payload) {
    // requests come from indexjs requests folder = requests: []
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};