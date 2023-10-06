<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError"
      ><p>{{ error }}</p></base-dialog
    >
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <h2>{{ switchTitle }}</h2>
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <input
            type="email"
            id="email"
            class="email"
            v-model.trim="email.val"
            required
            placeholder=""
            @blur="clearValidity('email')"
          />
          <label for="email">E-mail</label>
          <!-- <p v-if="!email.isValid">Please enter a valid email.</p> -->
        </div>
        <div class="form-control" :class="{ invalid: !password.isValid }">
          <input
            type="password"
            id="password"
            class="pwd"
            v-model.trim="password.val"
            required
            placeholder=""
            @blur="clearValidity('password')"
          />
          <label for="password">Password</label>
          <p v-if="!password.isValid">
            Password must be at least 6 characters long.
          </p>
        </div>
        <!-- <p v-if="!formIsValid">Opps, please try again.</p> -->
        <div class="btn">
          <base-button>
            {{ submitButtonCaption }}
          </base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Register';
      }
    },
    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'Register instead';
      } else {
        return 'Login instead';
      }
    },
    switchTitle() {
      if (this.mode === 'login') {
        return 'Welcome Back';
      } else {
        return 'Create Account';
      }
    },
    switchActiveClass() {
      return this.mode === '';
    },
  },
  methods: {
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '' || this.password.val.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
      };

      try {
        // http request send
        if (this.mode === 'login') {
          // sending this to actionjs
          await this.$store.dispatch('login', actionPayload);
        } else {
          // sending this to actionjs
          await this.$store.dispatch('signup', actionPayload);
        }
        // from Login button in CoachesList
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

h2 {
  font-size: 1.35em;
  margin-bottom: 1.75rem;
  text-align: center;
}

.form-control {
  margin: 1.5rem 0;
  position: relative;
}

input {
  font-family: 'Open Sans', sans-serif;
  width: 90%;
  padding: 10px 0;
  padding-left: 10px;
  font-size: 16px;
  font-weight: lighter;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  margin: 0 40px 10px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  background: transparent;
}

input:hover,
input:focus,
input:valid {
  outline: none;
  border-bottom: 1px solid #f391e3;
}

.form-control label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  margin: 0 40px;
  font-size: 16px;
  color: grey;
  pointer-events: none;
  transition: 0.5s;
}

/* .form-control input:hover ~ label,
.form-control input:focus ~ label,
.form-control input:valid ~ label {
  top: -20px;
  left: 0;
  color: #f391e3;
  font-size: 12px;
} */

.form-control input:hover ~ label,
.form-control input:focus ~ label,
.form-control input:valid ~ label,
.form-control input:not(:placeholder-shown) ~ label {
  top: -20px;
  left: 0;
  color: #f391e3;
  font-size: 12px;
}

.form-control p {
  font-size: 12px;
  margin-left: 40px;
}

.btn {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.invalid label,
.invalid input:focus ~ label,
.invalid input:valid ~ label {
  color: red;
}

.invalid input {
  border-bottom: 1px solid red;
}
</style>
