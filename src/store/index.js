import { createStore } from 'vuex';

import coachesModule from './coaches/coaches.js';
import requestsModule from './requests/requests.js';
import authModule from './auth/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        reqs: requestsModule,
        auth: authModule
    }, 
    mutations: {

    },
    actions: {

    }
});

export default store;