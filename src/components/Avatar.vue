<template>
  <div v-bind:class="menuClass">
    <click-outside v-if="user !== null" v-bind:handler="closeMenu">
      <div class="avatar-wrapper" v-on:click="toggleMenu">
        <img class="user-image" src="~assets/avatar.jpg" />
      </div>
    </click-outside>
    <ul class="dropdown-menu">
      <li>
        <router-link v-bind:to="{ name: 'logout' }">
          <span class="material-icons">exit_to_app</span>
          {{ $t('action.log-out') }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from 'onclick-outside';

export default {
  name: 'avatar',

  components: { ClickOutside },

  props: {
    user: {
      type: Object,
      default: null,
    },
    showCard: {
      type: Boolean,
      default: false,
    },
    showDisplayName: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  computed: {
    menuClass() {
      return this.isActive ? 'avatar open' : 'avatar';
    },
  },

  methods: {
    closeMenu() {
      this.isActive = false;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/themes/colors.scss";

.avatar {
  display: inline-block;

  .dropdown-menu {
    min-width: 250px;
    padding: 0;
    border: 0;
    border-radius: 0;
  }
  .dropdown-toggle {
    display: inline-block;
  }
  .avatar-footer {
    padding: 8px;
    background-color: transparent;
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .user-image {
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
}
</style>
