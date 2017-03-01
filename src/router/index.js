import Vue from 'vue';
import Router from 'vue-router';
import auth from '../api/auth';
import Home from '../components/Home';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import RecoverPassword from '../components/auth/RecoverPassword';
import ResendVerification from '../components/auth/ResendVerification';
import Verify from '../components/auth/Verify';
import AdminHome from '../components/admin/AdminHome';
import AdminDashboard from '../components/admin/Dashboard';
import Groups from '../components/admin/Groups';
import Users from '../components/admin/Users';
import AddUser from '../components/admin/AddUser';
import ShowUser from '../components/admin/ShowUser';

Vue.use(Router);

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
    });
  } else {
    auth.setUser();
    next();
  }
}

function logout(to, from, next) {
  auth.logout();
  next('/');
}

function verifyProps(route) {
  return {
    email: route.query.email,
    token: route.query.token,
  };
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', beforeEnter: logout },
    { path: '/recover_password', name: 'recover-password', component: RecoverPassword },
    { path: '/register', name: 'register', component: Register },
    { path: '/resend_verification', name: 'resend-verification', component: ResendVerification },
    { path: '/verify', name: 'verify', component: Verify, props: verifyProps },
    { path: '/admin',
      component: AdminHome,
      beforeEnter: requireAuth,
      children: [
        { path: '', name: 'dashboard', component: AdminDashboard },
        { path: 'users', name: 'users', component: Users },
        { path: 'users/:id', name: 'show-user', component: ShowUser },
        { path: 'groups', name: 'groups', component: Groups },
        { path: 'add_user', name: 'add-user', component: AddUser },
      ],
    },
  ],
});
