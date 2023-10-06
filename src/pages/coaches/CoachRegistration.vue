<template>
  <div>
    <!-- !! = change string value/truthy value into boolean -->
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <base-spinner v-if="isLoading"></base-spinner>
        <coach-form @save-data="saveData" v-else></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    // getting data from save-data emits in CoachForm.vue
    async saveData(data) {
      this.isLoading = true;
      try {
        // sending this to actionjs
        await this.$store.dispatch('coaches/registerCoach', data);
        // console.log(data);
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // use replace -> cannot go back to prev pages
      this.$router.replace('/coaches');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
