<template>
  <div class="container">
    <section>
      <div class="meta meta-top">
        {{ $t('users.meta-top', { totalEntries }) }}
      </div>
      <div class="list list-users">
        <div class="list-header row">
          <div class="col-sm-5">
            {{ $t('users.list-header.name') }}
          </div>
          <div class="col-sm-5">
            {{ $t('users.list-header.email') }}
          </div>
          <div class="col-sm-2">
            {{ $t('users.list-header.verified') }}
          </div>
        </div>
        <div v-for="user in users" class="list-item row">
          <div class="col-sm-5">
            <router-link v-bind:to="`/admin/users/${user.id}`">{{ user.name }}</router-link>
          </div>
          <div class="col-sm-5">
            {{ user.email }}
          </div>
          <div class="col-sm-2">
            <span v-if="user['verified-at']" class="material-icons">done</span>
            <span v-else class="material-icons dimmed">not_interested</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'users',
  beforeMount() {
    this.$store.dispatch('usersFetchPage');
  },
  computed: {
    totalEntries() {
      return get(this.$store.getters.users, 'meta.total_entries');
    },
    users() {
      return get(this.$store.getters.users, 'data');
    },
  },
};
</script>

<style lang="scss">
// @import "../../styles/themes/colors";

.meta-top {
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: 300;
}

.list-users {
  margin: 2rem 0;
}
</style>
