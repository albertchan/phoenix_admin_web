<template>
  <div class="container">
    <section class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <div class="panel user-panel">
          <form class="panel-body" @submit.prevent="validateForm">
            <h1 class="page-description">{{ $t('add-user.user-info') }}</h1>
            <div v-if="errors.any()" class="help-text has-error">
              <span class="material-icons">warning</span>
              {{ $t('errors.errors-found') }}
            </div>
            <div class="form-group">
              <label>{{ $t('user.name') }}</label>
              <input v-bind:class="{ 'form-control':true, 'has-errors':errors.has('name') }"
                     v-validate:name="'required'"
                     v-model="name"
                     data-vv-as="Name"
                     name="name"
                     type="text">
              <div class="help">
                <span v-show="errors.has('name')" class="help-text has-error">{{ errors.first('name') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('user.email') }}</label>
              <input v-bind:class="{'form-control':true, 'floating-label':true, 'has-error':errors.has('email') }"
                     v-validate:email="'required|email'"
                     v-model="email"
                     name="email"
                     type="email">
              <div class="help">
                <span v-show="errors.has('email')" class="help-text has-error">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('user.password') }}</label>
              <input v-bind:class="{'form-control':true, 'floating-label':true, 'has-error':errors.has('email') }"
                     v-validate:password="'required'"
                     v-model="password"
                     name="password"
                     type="password">
              <div class="help">
                <span v-show="errors.has('password')" class="help-text has-error">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-action">
              <button class="btn btn-accent btn-colored" type="submit">
                {{ $t('action.add-user') }}
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
import getErrorField from '../../helpers/error-utils';

export default {
  name: 'add-user',

  data() {
    return {
      email: null,
      name: null,
      password: null,
    };
  },

  methods: {
    addUser() {
      const user = {
        email: this.email,
        name: this.name,
        password: this.password,
      };

      this.$store.dispatch('createUser', user).then((res) => {
        const notification = {
          type: 'success',
          message: `A new user, ${res.name}, was created successfully.`,
        };
        this.$root.$emit('NOTIFICATION', notification);
        this.$router.push({ name: 'users' });
      }).catch((error) => {
        const notification = {
          type: 'danger',
          message: 'An error occurred when creating a new user.',
        };

        error.forEach((err) => {
          this.errors.add(getErrorField(err), err.detail);
        });
        this.$root.$emit('NOTIFICATION', notification);
      });
    },

    validateForm() {
      this.$validator.validateAll().then((res) => {
        if (res) {
          this.addUser();
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>
