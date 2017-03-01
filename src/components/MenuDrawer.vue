<template>
  <div class="drawer menu-drawer">
    <div class="drawer-panel">
      <div class="drawer-panel-header">
        <h1 class="drawer-panel-title">{{ $t('menu-drawer.title') }}</h1>
      </div>
      <div class="drawer-panel-body">

        <ul v-if="user" v-on:click="selected">
          <router-link v-bind:to="{ name: 'dashboard' }">
            <li>
              <span class="material-icons">dashboard</span>
              {{ $t('nav.dashboard') }}
            </li>
          </router-link>
          <router-link v-bind:to="{ name: 'users' }">
            <li>
              <span class="material-icons">people</span>
              {{ $t('nav.users') }}
            </li>
          </router-link>
        </ul>

        <ul v-else v-on:click="selected">
          <router-link v-bind:to="{ name: 'home' }">
            <li>
              <span class="material-icons">home</span>
              {{ $t('nav.home') }}
            </li>
          </router-link>
          <router-link v-bind:to="{ name: 'login' }">
            <li>
              <span class="material-icons">launch</span>
              {{ $t('nav.login') }}
            </li>
          </router-link>
          <router-link v-bind:to="{ name: 'register' }">
            <li>
              <span class="material-icons">assignment</span>
              {{ $t('nav.register') }}
            </li>
          </router-link>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import auth from '../api/auth';

export default {
  name: 'menu-drawer',

  data() {
    return {
      user: auth.user,
    };
  },

  methods: {
    selected() {
      this.$store.dispatch('toggleDrawer');
    },
  },
};
</script>

<style lang="scss">
@import "../styles/themes/colors";
@import "../styles/themes/variables";

$panel-padding: 24px;

.drawer {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: $drawer-width;
  max-width: 320px;
  background-color: rgba(0,0,0,.04);
  font-size: 14px;
  overflow-x: hidden;
  transition-property: all;
  transition-duration: $drawer-transition-duration;
  transition-timing-function: $drawer-transition-timing-function;
  will-change: transform;
  z-index: 99;

  .drawer-panel {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .drawer-panel-header {
    display: flex;
    align-items: center;
    height: $navbar-static-top-height;
    padding: $panel-padding;

    .admin & {
      height: $navbar-static-top-height-admin;
    }
  }

  .drawer-panel-label {
    margin-top: 0;
    margin-bottom: 14px;
    color: $color-panel-label;
    font-size: 14px;
    font-weight: 500;
  }

  .drawer-panel-body {
    flex: 1;
    overflow-y: auto;

    ul {
      padding: 0;
      list-style: none;
    }

    li {
      padding: 8px $panel-padding;
    }

    .material-icons {
      margin-right: 10px;
    }
  }

  .drawer-panel-title {
    margin: 0;
    font-size: 1em;
    text-transform: uppercase;
  }

  .menu-drawer {
    background-color: #fff;
    border-color: $color-nav-border;
  }
}

.drawer-left {
  .drawer {
    left: -$drawer-width;
    border-right: 1px solid transparent;
  }

  &.drawer-open {
    .drawer {
      left: 0;
    }
  }
}
</style>
