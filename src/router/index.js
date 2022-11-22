import Vue from "vue";
import VueRouter from "vue-router";

import AppMain from "@/views/AppMain.vue";

import NoticeView from "@/views/NoticeView";
import QnaView from "@/views/QnaView";
import MapView from "@/views/MapView";

import jwt from "@/common/jwt";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
    redirect: "/map",
  },

  {
    name: "map",
    path: "/map",
    component: MapView,
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    name: "signin",
    path: "/signin",
    component: () => import("@/views/SigninView.vue"),
  },
  {
    name: "mypage",
    path: "/mypage",
    component: () => import("@/views/MyPageView.vue"),
    meta: { authRequired: true },
  },
  {
    path: "/qna",
    name: "qna",
    component: QnaView,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "view/:no",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "delete/:no",
        name: "boarddelete",
        component: () => import("@/components/board/BoardDelete"),
      },
      {
        path: "modify",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
      },
    ],
  },
  {
    name: "notice",
    path: "/notice",
    component: NoticeView,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "view/:no",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "delete/:no",
        name: "boarddelete",
        component: () => import("@/components/board/BoardDelete"),
      },
      {
        path: "modify",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired;
    })
  ) {
    if (jwt.getToken()) {
      next();
    } else {
      alert("로그인이 필요합니다.");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
