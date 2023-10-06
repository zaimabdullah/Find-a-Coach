export default {
  requests(state, _, _2, rootGetters) {
    // get current userId from store/index.js
    const coachId = rootGetters.userId;
    // debug of error in [contactCoach/submitForm catchId: this.$route.id] -> [this.$route.params.id]
    // console.log(state.requests);
    // req that coachId[see requests structure in actionsjs] same as above
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0; // call above requests()
  },
};