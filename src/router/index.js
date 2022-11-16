import Vue from "vue";
import VueRouter from "vue-router";

import AppMain from "@/views/AppMain.vue";

import NoticeView from "@/views/NoticeView";
import QnaView from "@/views/QnaView";
import MapView from "@/views/MapView";
import CommunityView from "@/views/CommunityView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
    redirect: "/map",
  },
  {
    name: "notice",
    path: "/notice",
    component: NoticeView,
  },
  {
    name: "map",
    path: "/map",
    component: MapView,
  },
  {
    name: "community",
    path: "/community",
    component: CommunityView,
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
        component: () => import("@/components/board/BoardList2"),
      },
      {
        path: "view/:articleno",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
