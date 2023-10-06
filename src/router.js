import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

// lazy loading routes
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        // /coaches/c1/contact - to contact specific coache(1person) for a request
        { path: 'contact', component: ContactCoach },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
      // beforeEnter(_, _2, next) {
      //   const isCoach = store.getters['coaches/isCoach'];
      //   console.log(store.getters.userId); // from auth
      //   console.log(store.getters['coaches/coaches']);
      //   console.log('isCoach: ' + isCoach);
      //   if (isCoach) {
      //     next('/coaches');
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      // view all request made to coach
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    // meta /auth diff with /register & /requests
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  // isAuthenticated in auth/getters
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // for unauthorise user who want to get into register coach & contact coach pages
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // for authorise user who want to get back into login page
    next('/coaches');
  } else {
    next();
  }
});

export default router;
