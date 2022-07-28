<template>
  <section>
    <base-dialogue :show="!!error" title="An error occured!!" @close="handleError">
    <p>{{ error }}</p>
    </base-dialogue>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
      <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['reqs/requests'];
    },
    hasRequests() {
      return this.$store.getters['reqs/hasRequests'];
    },
  },
  methods: {
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
