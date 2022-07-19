<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <span v-for="area in areas" :key="area">{{ area }}</span>
        </div>
        <div class="actions">
            <router-link :to="coachesContactLink">Contact Coach</router-link>
            <router-link :to="coachesDetailLink">View Details</router-link>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
        computed: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            },
            coachesContactLink() {
                return this.$route.path + '/' + this.id + '/contact'; //coaches/c1/contact
            },
            coachesDetailLink() {
                return this.$store.path + '/' + this.id; //coaches/c1
            }
        }
    }
</script>