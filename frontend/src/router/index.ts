import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/components/pages/LoginPage.vue";
import RecoveryPage from "@/components/pages/RecoveryPage.vue";
import RegisterPage from "@/components/pages/RegisterPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: RecoveryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
