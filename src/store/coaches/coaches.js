export default {
    namespaced: true,
      state() {
          return {
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
                }
              ]
          };
      },
      mutations: {
        registerCoach(state, payload) {
          state.coaches.push(payload);
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
          const response = await fetch(`https://vue-http-f9db8-default-rtdb.firebaseio.com/coaches/${coachId}.json`, {
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
          }
      } 
  }