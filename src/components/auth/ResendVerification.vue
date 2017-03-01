<template>
  <div class="page reset-password">
    <div class="auth-panel">
      <form @submit.prevent="validateForm">

        <div class="panel-header">
          <div class="panel-header-wrapper">
            <h2 class="panel-header-title">{{ $t('resend-verification.title') }}</h2>
          </div>
          <div class="panel-header-menu">
            <router-link v-bind:to="{ name: 'home' }" class="btn btn-icon">
              <span class="material-icons">arrow_back</span>
            </router-link>
          </div>
        </div>

        <div v-if="done" class="panel-body">
          <div class="panel-body-info">
            We've just sent you an email with a link to verify your email.
            Please note the link is only valid for the next 15 minutes.
          </div>
        </div>
        <div v-else class="panel-body">
          <div class="panel-body-info">
            You'll need to first verify your email befor you can sign in and
            start using your account. If you haven't received an email from us
            with a verification link, ask us to resend it to you by entering
            your email below.
          </div>
          <div class="form-group">
            <input v-bind:class="{'form-control': true, 'has-error': errors.has('email')}"
                   v-validate
                   data-vv-rules="required|email"
                   v-model="email"
                   name="email"
                   type="email"
                   placeholder="Email">
            <div class="help">
              <span v-show="errors.has('email')" class="help-text has-error">
                {{ errors.first('email') }}
              </span>
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <div class="row text-center">
            <button v-if="done" class="btn btn-primary btn-cta" type="button" v-on:click="reset">
              {{ $t('recover-password.try-again') }}
            </button>
            <button v-else class="btn btn-primary btn-cta" type="submit">
              {{ $t('resend-verification.send-verification-link') }}
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import auth from '../../api/auth';

export default {
  name: 'resend-verification',

  data() {
    return {
      done: false,
      email: null,
      error: null,
    };
  },

  methods: {
    reset() {
      this.done = false;
      this.email = null;
      this.error = null;
    },

    submit() {
      auth.resendVerification(this.email).then((res) => {
        if (res.status === 200 && res.data) {
          this.done = true;
        }
      }).catch(() => {
        this.error = true;
      });
    },

    validateForm() {
      this.$validator.validateAll().then((res) => {
        if (res) this.submit();
      });
    },
  },
};
</script>

<style lang="scss">
  .page.reset-password {
    height: 100%;
  }
</style>
