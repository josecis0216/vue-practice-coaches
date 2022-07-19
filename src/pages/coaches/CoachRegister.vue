<template>
    <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(data) {
            return this.$dispatch('register-coach', data);
        }
    }
}
</script>