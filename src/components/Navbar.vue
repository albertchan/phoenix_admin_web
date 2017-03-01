<template>
  <nav class="navbar navbar-static-top">
    <div v-if="user" class="container-fluid">
      <div class="navbar-header">
        <button class="navbar-brand" type="button" v-on:click="openDrawer">
          <span class="material-icons">menu</span>
        </button>
      </div>
      <div class="collapose navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="navbar-title">{{ title }}</li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown user-menu">
            <a href="javascript:;" class="dropdown-toggle">
              <avatar v-bind:user="user"
                      v-bind:showCard="true"
                      v-bind:showDisplayName="true" />
            </a>
          </li>
        </ul>
      </div>
      <div class="navbar-action">
        <button class="btn btn-fab" type="button" v-on:click="clickAction">
          <span class="material-icons">{{ action.icon }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar';
import auth from '../api/auth';

export default {
  name: 'navbar',

  components: { Avatar },

  data() {
    return {
      user: auth.user,
    };
  },

  computed: {
    title() {
      const routeName = this.$route.name;
      return this.$t(`nav.${routeName}`);
    },

    action() {
      const fab = {};

      // Update navbar FAB button state
      switch (this.$route.name) {
        case 'dashboard':
          fab.icon = 'people';
          break;
        case 'users':
          fab.icon = 'add';
          fab.label = this.$t('action.add-user');
          break;
        case 'add-user':
        case 'show-user':
          fab.icon = 'arrow_back';
          fab.label = this.$t('nav.users');
          break;
        default:
          break;
      }
      return fab;
    },
  },

  methods: {
    openDrawer() {
      this.$store.dispatch('toggleDrawer');
    },

    clickAction() {
      let next;

      switch (this.$route.name) {
        case 'dashboard':
          next = 'users';
          break;
        case 'users':
          next = 'add-user';
          break;
        case 'add-user':
        case 'show-user':
          next = 'users';
          break;
        default:
          break;
      }
      this.$router.push({ name: next });
    },
  },

  watch: {
    $route() {
      this.user = auth.user;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/themes/colors";
@import "../styles/themes/variables";

.navbar-static-top {
  position: relative;
  height: $navbar-static-top-height;
  margin: 0;
  background-color: inherit;
  border-bottom: 1px solid transparent;
  color: $color-nav-link;
  font-size: 13px;

  .btn-navbar {
    padding: 12px;
  }

  .nav > li > a,
  .navbar-brand {
    color: $color-nav-link;
    font-weight: 500;
    text-transform: uppercase;
  }

  .nav > li > a:active,
  .nav > li > a:focus,
  .nav > li > a:hover {
    background-color: transparent;
  }

  .dropdown-menu li a {
    padding: 10px 20px;
  }

  .user-menu {
    .dropdown-toggle {
      padding: 0;
    }
  }

  .avatar {
    height: 50px;

    .user-image {
      width: 28px;
      height: 28px;
      margin-top: -2px;
      vertical-align: baseline;
    }
  }

  .avatar-wrapper {
    padding: 12px;
  }

  .user-text {
    margin-right: 8px;
    font-size: 13px;

    .user-display-name {
      float: left;
    }

    .material-icons {
      display: inline-block;
      float: left;
    }
  }
}

.navbar-action {
  position: absolute;
  top: $navbar-static-top-height-admin - $button-fab-size/2;
  left: $navbar-static-top-container-padding + $navbar-static-top-menu-size + $navbar-static-top-title-padding;

  .btn-fab {
    background-color: #FFAA7E;
    color: #fff;
  }
}

.navbar-brand {
  padding: 12px;
  appearance: none;
  background: transparent;
  border: none;
  outline: none;

  > img {
    height: 20px;
  }
}

.navbar-title {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 36px;
  font-weight: 300;
  line-height: $navbar-static-top-title-line-height;
}

.admin .navbar-static-top {
  height: $navbar-static-top-height-admin;
  background-color: $color-brand;
  color: #fff;

  .nav > li > a,
  .navbar-brand {
    color: #fff;
  }

  .container-fluid {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .navbar-collapse {
    flex: 1;
  }

  .avatar-wrapper {
    padding: 7px;
  }

  .avatar .user-image {
    height: 36px;
    width: 36px;
    margin: 0;
  }
}
</style>
