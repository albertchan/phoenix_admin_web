<template>
  <div v-bind:class="{ 'page':true, 'admin':true, 'drawer-left':true, 'drawer-open':isDrawerOpen }">
    <navbar></navbar>
    <menu-drawer></menu-drawer>
    <notification></notification>
    <main id="main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuDrawer from '../MenuDrawer';
import Navbar from '../Navbar';
import Notification from '../Notification';

export default {
  name: 'admin-dashboard',
  components: { MenuDrawer, Navbar, Notification },
  computed: {
    ...mapGetters([
      'isDrawerOpen',
    ]),
  },
};
</script>

<style lang="scss">
#main {
  padding: 45px 15px;
}
</style>
