import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import CalendarPage from "@/pages/CalendarPage.vue";
import WeekPage from "@/pages/WeekPage.vue";
import AccountPage from "@/pages/AccountPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  { path: '/main', component: MainPage },
  { path: '/calendar', component: CalendarPage },
  { path: '/week', component: WeekPage },
  { path: '/account', component: AccountPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage } 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
