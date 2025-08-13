import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/pages/UnderConstruction.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("@/components/pages/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/transactions",
    component: () => import("@/components/pages/TransactionsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    component: () => import("@/components/pages/CategoriesPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    component: () => import("@/components/pages/ReportsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    component: () => import("@/components/pages/RegisterPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/recovery",
    component: () => import("@/components/pages/RecoveryPage.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//  teste
const isMockAuthenticated = true;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isMockAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isMockAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
