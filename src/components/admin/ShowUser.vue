<template>
  <div class="container">
    <section class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <div class="panel user-panel">
          <form class="panel-body" @submit.prevent="validateForm">
            <h1 class="page-description">{{ $t('show-user.update-info') }}</h1>
            <div v-if="errors.any()" class="help-text has-error">
              <span class="material-icons">warning</span>
              {{ $t('errors.errors-found') }}
            </div>
            <div class="form-group">
              <label>{{ $t('user.name') }}</label>
              <input v-bind:class="{ 'form-control':true, 'has-errors':errors.has('name') }"
                     v-validate:name="'required'"
                     v-model="user.name"
                     data-vv-as="Name"
                     name="name"
                     placeholder="Name"
                     type="text">
              <div class="help">
                <span v-show="errors.has('name')" class="help-text has-error">{{ errors.first('name') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('user.email') }}</label>
              <input v-bind:class="{ 'form-control':true, 'has-errors':errors.has('email') }"
                     v-validate:fullName="'required|email'"
                     v-model="user.email"
                     name="email"
                     placeholder="Email"
                     type="email">
              <div class="help">
                <span v-show="errors.has('email')" class="help-text has-error">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('user.last-login') }}</label>
              <input class="form-control" type="text" name="lastLogin" v-model="user.lastLogin">
            </div>
            <div class="form-group">
              <label>{{ $t('user.verified-at') }}</label>
              <input class="form-control" type="text" name="verifiedAt" v-model="user.verifiedAt">
            </div>
            <div class="form-group">
              <label>{{ $t('user.verification-sent-at') }}</label>
              <input class="form-control" type="text" name="verificationSentAt" v-model="user.verificationSentAt">
            </div>
            <div class="form-action">
              <button class="btn btn-accent btn-colored" type="submit">
                {{ $t('action.save-changes') }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-3">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'add-user',

  beforeMount() {
    this.id = this.$route.params.id;
    this.$store.dispatch('showUser', this.id);
  },

  data() {
    return {
      isDirty: false,
    };
  },

  computed: {
    user() {
      return this.$store.getters.user || {};
    },
  },

  methods: {
    updateUser() {
      const id = this.id;
      const user = this.user;
      const data = {
        name: user.name,
        email: user.email,
        last_login: user.lastLogin,
        verified_at: user.verifiedAt,
        verification_sent_at: user.verificationSentAt,
      };

      this.$store.dispatch('updateUser', { id, data }).then((res) => {
        const notification = {
          type: 'success',
          message: `The user, ${res.name}, was updated successfully.`,
        };
        this.$root.$emit('NOTIFICATION', notification);
      }).catch((err) => {
        console.error(err);
      });
    },

    validateForm() {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.updateUser();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/themes/variables";
@import "../../styles/themes/mixins";

.user-panel {
  @include shadow-4dp();

  .form-action {
    margin-top: 16px;
  }
}
</style>
