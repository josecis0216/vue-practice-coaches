import { createStore } from 'vuex';

import coachesModule from './coaches/coaches.js';
import requestsModule from './requests/requests.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        reqs: requestsModule
    }, 
    state() {
        return {
            
        }
    }, 
    mutations: {

    },
    actions: {

    }, 
    getters: {

    }
});

export default store;