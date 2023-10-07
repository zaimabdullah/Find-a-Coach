export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    // ---firebase related start here---
    const response = await fetch(`https://FIREBASE_REALTIME_DB_LINK/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    // --after response done,--
    const responseData = await response.json();
    // can extract new generated ID for the request just now from Firebase to local data
    newRequest.id = responseData.name;
    // newRequest{ id:..., ... } - create id attr
    newRequest.coachId = payload.coachId;

    if (!response.ok) {
      // error
      // use in ContactCoach/methods:submitForm
      const error = new Error(responseData.message || 'Failed to send request.'); 
      throw error;
    }
    // ---firebase related end here---

    // for local state management
    // sending this to mutationsjs
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    // ---firebase related start here---

    // after finishing the auth[register/login], we add ?auth=token here
    const token = context.rootGetters.token;

    const response = await fetch(`https://FIREBASE_REALTIME_DB_LINK/requests/${coachId}.json?auth=${token}`);

    const responseData = await response.json();

    if (!response.ok) {
      // error
      const error = new Error(responseData.message || 'Failed to fetch requests.'); // use in ContactCoach/methods:submitForm
      throw error;
    }
    // ---firebase related end here---

    // transform Firebase data structure[see Firebase] 
    // into local data structure[see above, newRequest{ userEmail, message, id, coachId }]
    const requests = [];

    for (const key in responseData) {
      // coachId is from above, after async fetchRequests()
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    // for local state management
    // sending this to mutationsjs
    context.commit('setRequests', requests);
  },
};
