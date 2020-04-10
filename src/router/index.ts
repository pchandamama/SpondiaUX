import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import signup from '../views/signup.vue'
import signin from '../views/signin.vue'
// @ts-ignore
import authentication from '../authentication'
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component:signup
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/signin',
    name: 'signin',
    component:signin,
    meta: {
      requiresAuthentication: true
    }
    
  }
]

const router = new VueRouter({
  routes
})

// Global route guard
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuthentication)) {
//     // this route requires auth, check if logged in
//     if (authentication.isAuthenticated()) {
//       // only proceed if authenticated.
//       next();
//     } else {
//      // authentication.signIn();
//     }
//   } else {
//     next();
//   }
// });

export default router
