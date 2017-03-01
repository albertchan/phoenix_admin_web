<template>
  <div v-bind:class="{ 'page home':true, 'drawer-left':true, 'drawer-open':isDrawerOpen }">

    <menu-drawer></menu-drawer>

    <section class="jumbotron">
      <nav class="navbar navbar-static-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button class="navbar-brand" type="button" v-on:click="openDrawer">
              <span class="material-icons">menu</span>
            </button>
          </div>
          <div class="collapse navbar-collapse">
            <ul v-if="user" class="nav navbar-nav navbar-right">
              <li>
                <router-link v-bind:to="{ name: 'dashboard' }">{{ $t('nav.dashboard') }}</router-link>
              </li>
            </ul>
            <ul v-else class="nav navbar-nav navbar-right">
              <li>
                <router-link v-bind:to="{ name: 'register' }">{{ $t('nav.register') }}</router-link>
              </li>
              <li>
                <router-link v-bind:to="{ name: 'login' }">{{ $t('nav.login') }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container content">
        <div class="content-masthead">
          <p class="lead">
            PhoenixAdmin is a simple, API driven user management system written
            using the Phoenix framework for the backend and Vue.js for the front
            end.
          </p>
          <p class="lead">
            <a href="https://github.com/albertchan/phoenix_admin_web" class="btn btn-lg btn-outline-inverse">
              Read documentation
            </a>
          </p>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="content-blockquote">
        <q>
          Phoenix and Vue.js bring back joy to writing web applications.
        </q>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h2 class="column-title">Why Phoenix?</h2>
          <p>
            Phoenix leverages the Erlang VM's ability to handle millions of
            connections alongside Elixir's beautiful syntax and productive
            tooling for building fault-tolerant systems.
          </p>
        </div>
        <div class="col-md-6">
          <h2 class="column-title">Why Vue.js?</h2>
          <p>
            Vue.js is approachable, versatile and performant. It has a simple,
            minimal core with an incrementally adoptable stack that can handle
            apps of any scale.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import auth from '../api/auth';
import MenuDrawer from './MenuDrawer';
import Navbar from './Navbar';

export default {
  name: 'home',

  components: { MenuDrawer, Navbar },

  data() {
    return {
      user: auth.user,
    };
  },

  computed: {
    ...mapGetters([
      'isDrawerOpen',
    ]),
  },

  methods: {
    openDrawer() {
      this.$store.dispatch('toggleDrawer');
    },
  },
};
</script>

<style lang="scss">
@import "../styles/themes/colors";

.home {
  font-size: 16px;

  p {
    color: $color-text-light;
  }

  .navbar-static-top {
    background-color: transparent;
    border-bottom: 1px solid rgba(255,255,255,.7);
    box-shadow: none;

    .nav > li > a,
    .navbar-brand {
      color: #fff;
    }

    .nav > li > a:hover {
      background-color: transparent;
      color: rgba(255,255,255,.7);
    }

    .navbar-right {
      padding: 0 30px;
    }
  }

  section:not(.jumbotron) {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .content-blockquote {
    margin: 3rem 0;
    text-align: center;
    font-size: 3rem;
    font-style: italic;
    font-weight: 300;
  }
}

.jumbotron {
  position: relative;
  height: 640px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-image: url('~assets/bg1.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;

  .btn {
    padding: 15px 30px;
    font-size: 20px;
  }

  .content {
    display: flex;
    height: 500px;
    padding-left: 48px;
    padding-right: 48px;
    align-items: center;
    justify-content: center;
  }

  .lead {
    margin-bottom: 1em;
    color: #fff;
    font-size: 2.143em;
    text-align: center;
  }
}

</style>
