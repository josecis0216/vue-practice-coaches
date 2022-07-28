export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
        state.requests = payload;
    }
  },
  actions: {
    contactCoach(context, payload) {
      const reqId = new Date().toISOString();
      const requestData = {
        coachId: payload.coachId,
        userEmail: payload.email,
        message: payload.message,
      };
      const response = await fetch(`https://vue-http-f9db8-default-rtdb.firebaseio.com/requests/${reqId}.json`, {
            method: 'PUT',
            body: JSON.stringify(requestData)
          })

          //const responseData = await response.json();

          if (!response.ok) {
            // error ...
          }

          context.commit('addRequest', {
            ...requestData,
            id: reqId
          });
    },
    async loadRequests(context) {
      const response = await fetch(`https://vue-http-f9db8-default-rtdb.firebaseio.com/requests.json`);

      const responseData = response.json();

      const requests = [];
      for (const key in responseData) {
        const requestData = {
          id: key,
          coachId: responseData[key].coachId,
          userEmail: responseData[key].email,
          message: responseData[key].message,
        };
        requests.push(requestData);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      console.log(state.requests);
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
