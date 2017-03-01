<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" :class="classes">
      <div class="notification-icon">
        <span class="material-icons">info</span>
      </div>
      <div class="notification-body">
        <h4 class="notification-title" v-if="title">{{ title }}</h4>
        <div class="notification-message">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'notification',

  data() {
    return {
      duration: 6000,
      message: null,
      show: false,
      timer: null,
      title: null,
      type: null,
    };
  },

  computed: {
    classes() {
      return `notification ${this.type}`;
    },

    icon() {
      switch (this.type) {
        case 'danger':
          return 'warning';
        case 'info':
          return 'info';
        case 'success':
          return 'check_circle';
        default:
          return null;
      }
    },
  },

  mounted() {
    this.$root.$on('NOTIFICATION', this.showNotification);
  },

  methods: {
    close() {
      this.show = false;
    },

    showNotification(notification) {
      this.show = true;
      this.message = get(notification, 'message');
      this.title = get(notification, 'title');
      this.type = get(notification, 'type', 'info');

      setTimeout(() => {
        this.show = false;
        this.message = null;
        this.title = null;
        this.type = null;
      }, this.duration);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/themes/colors";
@import "../styles/themes/variables";
@import "../styles/themes/mixins";

.notification {
  display: flex;
  align-items: center;
  position: fixed;
  top: 30px;
  left: 15px;
  right: 15px;
  max-width: 960px;
  margin: 0 auto;
  padding: 12px 16px;
  background-color: #e5f3fe;
  z-index: 1001;
  @include shadow-24dp();

  &-icon {
    margin-right: 1rem;
    color: rgba(33,150,243,1);
  }

  &.danger {
    background-color: #fae1e1;
    .notification-icon {
      color: rgba(213,0,0,1);
    }
  }

  &.info {
    background-color: #e5f3fe;
    .notification-icon {
      color: rgba(33,150,243,1);
    }
  }

  &.success {
    background-color: #eaf6ea;
    .notification-icon {
      color: rgba(76,175,80,1);
    }
  }

  &-title {
    margin-top: 0;
    line-height: 24px;
  }
}
</style>
