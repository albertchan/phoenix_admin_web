<template>
  <div class="page verify">
    <div class="auth-panel">
      <form>

        <div class="panel-header">
          <div class="panel-header-wrapper">
            <h2 v-if="expired" class="panel-header-title">{{ $t('verify.title-expired') }}</h2>
            <h2 v-else class="panel-header-title">{{ $t('verify.title') }}</h2>
          </div>
          <div class="panel-header-menu">
            <router-link v-bind:to="{ name: 'home' }" class="btn btn-icon">
              <span class="material-icons">arrow_back</span>
            </router-link>
          </div>
        </div>

        <div v-if="expired" class="panel-body">
          <div class="panel-body-info">
            Sorry, the verification link has expired. You can ask us to resend a
            new verification link to your email below.
          </div>
        </div>
        <div v-else class="panel-body">
          <div class="panel-body-info">
            Congratulations! Your email has been verified. You can now login and start
            using your account.
          </div>
        </div>

        <div class="panel-footer">
          <div class="row text-center">
            <router-link v-if="expired" v-bind:to="{ name:'resend-verification' }" class="btn btn-primary btn-cta" >
              {{ $t('verify.resend-verification-link') }}
            </router-link>
            <router-link v-else v-bind:to="{ name:'login' }" class="btn btn-primary btn-cta">
              {{ $t('verify.goto-login') }}
            </router-link>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
// import get from 'lodash/get';
import auth from '../../api/auth';

export default {
  name: 'verify',

  props: [
    'email',
    'token',
  ],

  data() {
    return {
      expired: false,
      errors: null,
    };
  },

  beforeMount() {
    auth.verify(this.email, this.token).then((res) => {
      if (res.data) {
        this.expired = false;
        this.error = null;
      }
    }).catch((err) => {
      if (err.response) {
        if (err.response.status === 410) this.expired = true;
        // const errors = get(err.response, 'data.errors');
      }
    });
  },
};
</script>

<style lang="scss">
  .page.verify {
    height: 100%;
  }
</style>
