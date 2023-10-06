export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // coaches is true
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    // call above coaches()
    const coaches = getters.coaches;
    // get current userId from store/auth/getters.js
    const userId = rootGetters.userId;
    // checking userId with available coaches Id, true/false
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    // if there is no timestamp
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    // timestamp saved is more than a minute ago = return true, then update again
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};