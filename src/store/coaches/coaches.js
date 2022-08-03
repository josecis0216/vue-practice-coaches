export default {
    namespaced: true,
      state() {
          return {
            lastFetch: null,
              coaches: [
                {
                  id: 'c1',
                  firstName: 'Maximilian',
                  lastName: 'Schwarzmüller',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Jose',
                  lastName: 'Cisneros',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Jose and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                },
                {
                    id: 'c3',
                    firstName: 'Jose',
                    lastName: 'Test',
                    areas: ['frontend', 'career'],
                    description:
                      'I am Jose and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                  }
              ]
          };
      },
      mutations: {
        registerCoach(state, payload) {
          state.coaches.push(payload);
        },
        setCoaches(state, payload) {
            state.coaches = payload;
        },
        setLastFetch(state) {
            state.lastFetch = new Date().getTime();
        }
      },
      actions: {
        async registerCoach(context, payload) {
          const coachId = context.rootGetters.userId;
          const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
          };

          const token = context.rootGetters.token;

          const response = await fetch(`https://vue-practice-88f8e-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(coachData)
          })

          //const responseData = await response.json();

          if (!response.ok) {
            // error ...
          }

          context.commit('registerCoach', {
            ...coachData,
            id: coachId
          });
        },
        async loadCoaches(context, payload) {
            if (!payload.forceRefresh && !context.getters.shouldUpdate) {
                return;
            }

            const response = await fetch(`https://vue-practice-88f8e-default-rtdb.firebaseio.com/coaches.json`);

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || "Failed to send!");
                throw error;
            }

            const coaches = [];
            for(const key in responseData) {
                const coachData = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas
                  };
                coaches.push(coachData);
            }
            context.commit('setCoaches', coaches);
            context.commit('setLastFetch');
        }
      }, 
      getters: {
          coaches(state) {
            return state.coaches; 
          },
          hasCoaches(state) {
            return state.coaches && state.coaches.length > 0;
          },
          isCoach(_, getters, _2, rootGetters) {
            const coaches = getters.coaches;
            const userId = rootGetters.userId;
            return coaches.some(coach => coach.id === userId);
          },
          shouldUpdate(state) {
            const lastFetch = state.lastFetch;
            if(!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date().getTime();
            return (currentTimeStamp - lastFetch) / 1000 > 60;
          }
      } 
  }