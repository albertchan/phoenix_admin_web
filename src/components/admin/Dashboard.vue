<template>
  <div class="container admin-dashboard">
    <section class="row">
      <div class="col-md-6">
        <h1>{{ $t('dashboard.title') }}</h1>
        <p class="lead">
          Welcome to the Admin Dashboard! You can find shortcuts to all major
          tasks like adding a new user or viewing users here.
        </p>
      </div>
      <div class="col-md-6">
        <ul class="admin-dashboard-shortcuts list-group">
          <router-link v-bind:to="{ name: 'add-user' }">
            <li>{{ $t('nav.add-user') }}</li>
          </router-link>
          <router-link v-bind:to="{ name: 'users' }">
            <li>{{ $t('nav.users') }}</li>
          </router-link>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'admin-dashboard',
  computed: {},
};
</script>

<style lang="scss">
@import "../../styles/themes/colors";
@import "../../styles/themes/variables";
@import "../../styles/themes/mixins";

ul.admin-dashboard-shortcuts {
  max-width: 300px;
  margin: 2rem 1rem;
  padding: 0;
  font-size: 1.6rem;
  list-style: none;
  text-align: center;

  li {
    margin: 20px 0;
    padding: 24px;
    border: 2px solid $color-link;
    border-radius: 4px;

    &:hover {
      border-color: darken($color-link, 5%);
    }
  }
}
</style>
