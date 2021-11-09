import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/admin",
    component: () => import("@/views/admin.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/user.vue")
      },
      {
        path: "user",
        component: () => import("@/views/user.vue")
      },
      {
        path: "department",
        component: () => import("@/views/department.vue")
      },
      {
        path: "doctor",
        component: () => import("@/views/doctor.vue")
      },
      {
        path: "medicine",
        component: () => import("@/views/medicine.vue")
      }
    ]
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/registered.vue")
      },
      {
        path: "registered",
        component: () => import("@/views/registered.vue")
      },
      {
        path: "registeredRecord",
        component: () => import("@/views/registeredRecord.vue")
      },
      {
        path: "medicalRecord",
        component: () => import("@/views/medicalRecord.vue")
      },
      {
        path:"registeredDoctor",
        component: () => import("@/views/registeredDoctor.vue")
      }
    ]
  },
  {
    path: "/doctorIndex",
    component: () => import("@/views/doctorIndex.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/doctorRegistered.vue")
      },
      {
        path: "doctorRegistered",
        component: () => import("@/views/doctorRegistered.vue")
      },
      {
        path: "doctorMedical",
        component: () => import("@/views/doctorMedical.vue")
      },
      {
        path: "medicalPage",
        component: () => import("@/views/medicalPage.vue")
      },
      {
        path: "medicalHistory",
        component: () => import("@/views/medicalHistory.vue")
      },
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
