import Vue from 'vue';
import Router from 'vue-router';
//import Home from './views/Home.vue';
//import Login from './views/Login.vue';
//import Register from './views/Register.vue';

Vue.use(Router);




export const router = new Router({
    mode: 'history',
    routes: [
        {    
            path: '/',
            redirect: { name: 'index' },
            name: 'index',
            component: () => import("@/layouts/front/Layout.vue"),
            children: [                
                {
                    path: '/',
                    name: 'home',
                    component: () => import("@/views/front/Home.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                        //permission: 'user'
                    }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import("@/views/front/Login.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: () => import("@/views/front/Register.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import("@/views/front/Profile.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import("@/views/front/user.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                
                /*
                  Catch Alls
                  */
                { path: '_=_', redirect: '/' }
            ]
        },
        {    
            path: '/admin',
            redirect: { name: 'admin' },
            name: 'admin',
            component: () => import("@/layouts/admin/admin.vue"),
            children: [                
                {
                    path: '/admin',
                    name: 'Adashboard',
                    component: () => import("@/views/admin/Home.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                        //permission: 'user'
                    }
                },
                {
                    path: 'login',
                    name: 'admin-login',
                    component: () => import("@/views/admin/Login.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: 'profile',
                    name: 'admin-profile',
                    component: () => import("@/views/admin/Profile.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: 'user',
                    name: 'admin-user',
                    component: () => import("@/views/admin/user.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: 'parts',
                    name: 'parts',
                    component: () => import("@/views/admin/Parts.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: 'addnewparts',
                    name: 'addnewparts',
                    component: () => import("@/views/admin/AddNewParts.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: `parts/edit/:id`,
                    name: 'updateparts',
                    component: () => import("@/views/admin/UpdateParts.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                {
                    path: 'spinenquiry',
                    name: 'spinenquiry',
                    component: () => import("@/views/admin/SpinEnquiryListing.vue"),
                    //beforeEnter: requireAuth,
                    meta: {
                       // permission: 'user'
                    }
                },
                
                /*
                  Catch Alls
                  */
                { path: '_=_', redirect: '/' }
            ]

        },        
        /*{
            path: '/login',
            component: Login
        },*/
        /*{
            path: '/register',
            component: Register
        }, */       
        /*{
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue')
        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () => import('./views/BoardModerator.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () => import('./views/BoardUser.vue')
        }*/
    ]
});

/*router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
      next('/login');
  } else {
      next();
  }
});*/
