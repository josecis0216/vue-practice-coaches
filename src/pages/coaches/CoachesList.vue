<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :rate="coach.rate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h1 v-else>Sorry no coaches found at the moment...</h1>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>
