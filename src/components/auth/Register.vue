<template>
  <div class="page register">
    <div class="auth-panel">
      <form v-on:submit="submit">

        <div class="panel-header">
          <div class="panel-header-wrapper">
            <h2 class="panel-header-title">{{ $t('register.title') }}</h2>
            <div class="panel-header-supporting-text">
              Enter your details below
            </div>
          </div>
          <div class="panel-header-menu">
            <router-link v-bind:to="{ name: 'home' }" class="btn btn-icon">
              <span class="material-icons">arrow_back</span>
            </router-link>
          </div>
        </div>

        <div v-if="done" class="panel-body">
          <div class="panel-body-info">
            <p class="lead">
              Please check your email for instructions to complete your registration.
            </p>
            <p>
              You should receive an email from us within the next 15 minutes.
              If you don't find it in your inbox, please check your spam folder.
            </p>
          </div>
        </div>
        <div v-else class="panel-body">
          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('name')}"
                   v-validate
                   data-vv-rules="required"
                   v-model="name"
                   name="name"
                   type="text"
                   placeholder="Name">
          </div>
          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('email')}"
                   v-validate
                   data-vv-rules="required|email"
                   v-model="email"
                   name="email"
                   type="email"
                   placeholder="Email">
          </div>
          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('password')}"
                   v-validate
                   data-vv-rules="required"
                   v-model="password"
                   name="password"
                   type="password"
                   placeholder="Password">
          </div>
          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('passwordConfirmation')}"
                   v-validate
                   data-vv-rules="required"
                   v-model="passwordConfirmation"
                   name="passwordConfirmation"
                   type="password"
                   placeholder="Confirm password">
          </div>
          <div class="text-left">
            <router-link :to="{ name: 'login' }">Already have an account?</router-link>
          </div>
        </div>

        <div class="panel-footer">
          <div class="row">
            <button v-if="done" class="btn btn-primary btn-cta" type="button" v-on:click="reset">
              {{ $t('action.go-back') }}
            </button>
            <button v-else class="btn btn-primary btn-cta" type="submit">
              {{ $t('action.register') }}
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import users from '../../api/users';

export default {
  name: 'register',

  data() {
    return {
      done: false,
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },

  methods: {
    reset() {
      this.done = false;
      this.name = null;
      this.email = null;
      this.password = null;
      this.passwordConfirmation = null;
    },

    submit(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        name: this.name,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };

      users.register(user).then((res) => {
        if (res.data) {
          this.done = true;
        }
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="scss">
.page.register {
  height: 100%;
}
</style>
