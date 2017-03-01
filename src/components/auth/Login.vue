<template>
  <div class="page login">
    <div class="auth-panel">
      <form v-on:submit="submit">
        <div class="panel-header">
          <div class="panel-header-wrapper">
            <h2 class="panel-header-title">{{ $t('login.title') }}</h2>
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

        <div class="panel-body">
          <div v-if="errors.has('notVerified')">
            <p class="help-text info">
              <span class="material-icons">info</span>
              {{ $t('errors.not-verified') }}
            </p>
            <p class="help-text">
              Your email has not been verified. Please check your email for our
              verification link. If you didn't receive one, please ask us to
              <router-link v-bind:to="{ name: 'resend-verification' }">resend it</router-link>
              to you.
            </p>
          </div>
          <div class="form-group">
            <input v-bind:class="{'form-control':true, 'floating-label':true, 'has-error':errors.has('email') || errors.has('auth')}"
                   v-validate
                   data-vv-rules="required|email"
                   v-model="email"
                   name="email"
                   type="email"
                   placeholder="Email">
            <div class="help">
              <span v-show="errors.has('email')" class="help-text has-error">{{ errors.first('email') }}</span>
            </div>
          </div>

          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('password') || errors.has('auth')}"
                   v-validate
                   data-vv-rules="required"
                   v-model="password"
                   name="password"
                   type="password"
                   placeholder="Password">
            <div class="help">
              <span v-show="errors.has('password')" class="help-text has-error">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="text-left">
            <router-link :to="{ name: 'recover-password' }">Forgot password?</router-link>
          </div>
        </div>

        <div class="panel-footer">
          <div class="row">
            <button class="btn btn-primary btn-cta" type="submit">Sign In</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import auth from '../../api/auth';
import getErrorField from '../../helpers/error-utils';

export default {
  name: 'login',

  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    submit(e) {
      e.preventDefault();

      auth.login(this.email, this.password).then(() => {
        this.$router.push({ name: 'dashboard' });
      }).catch((error) => {
        error.forEach((err) => {
          this.errors.add(getErrorField(err), err.title);
          if (err.title === 'Email not verified') {
            this.errors.add('notVerified', err.title);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.page.login {
  height: 100%;
}
</style>
