<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: false,
      locale: null,
    };
  },
  watch: {
    // locale(val, old) {
    //   const self = this;
    // },
  },
};
</script>

<style lang="scss">
@import "./styles/bootstrap.scss";
@import "./styles/themes/ui-light.scss";

html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0,0,0,.87);
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

a {
  color: $color-link;
  text-decoration: none;

  &:focus,
  &:hover {
    color: darken($color-link, 15%);
    text-decoration: none;
  }
}

.dimmed {
  color: $color-dimmed;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.material-icons {
  vertical-align: middle;
}
</style>
