export default {
  async registerCoach(context, data) {
    // getting userId from store/index.js = current user's userId
    const userId = context.rootGetters.userId;
    const coachData = {
      // not using here anymore after use firebases
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // ----firebase related start here---

    // after finishing the auth[register/login], we add ?auth=token here
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-find-coach-app-1d911-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // --after response done--
    const responseData = await response.json();

    if (!response.ok) {
      // error
      // use in CoachRegistration/methods:saveData
      const error = new Error(responseData.message || 'Failed to register coach.');
      throw error;
    }
    // ---firebase related end here---

    // for local state management
    // sending this to mutationsjs
    context.commit('registerCoach', { ...coachData, id: userId });
  },
  async loadCoaches(context, payload) {
    // we dont want apps to always fetch coaches data throough http everytime
    // just one fetch, the data already copy-paste into local components,
    // in getters we set to local, only fetch back after 1 minute past or refresh button clicked
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    // ---firebase related start here---
    const response = await fetch(
      `https://vue-find-coach-app-1d911-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      // error
      // use in CoachesList/methods:loadCoaches
      const error = new Error(responseData.message || 'Failed to fetch.');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    // ---firebase related end here---

    // for local state management
    // sending this to mutationsjs
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
