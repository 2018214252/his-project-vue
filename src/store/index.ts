import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";
import axios from "@/axios";
import {} from "vue-router";
import {
  User,
  Department,
  Doctor,
  Medicine,
  Regd,
  Prescription,
  MedicalRecord
} from "@/datasource/Types";
import { ResultVO } from "@/datasource/Types";
import { ElMessage } from "element-plus";

const open = () => {
  ElMessage.success({
    message: "操作成功",
    type: "success",
    showClose: true,
    offset: 30
  });
};
const open1 = () => {
  setTimeout(() => {
    open();
  }, 50);
};
export interface State {
  departments: Department[];
  doctors: Doctor[];
  medicine: Medicine[];
  users: User[];
  user: User;
  regds: Regd[];
  regd: Regd;
  prescription: Prescription[];
  medicalRecord: MedicalRecord;
  exception: string;
}

const myState: State = {
  departments: [],
  doctors: [],
  medicine: [],
  users: [],
  user: {},
  regds: [],
  regd: {},
  prescription: [],
  exception: "",
  medicalRecord: {}
};

const myMutations: MutationTree<State> = {
  [vxt.UPDATE_DEPARTMENTS]: (state, data) => (state.departments = data),
  [vxt.UPDATE_DOCTOR]: (state, data) => (state.doctors = data),
  [vxt.UPDATE_MEDICINE]: (state, data) => (state.medicine = data),
  [vxt.UPDATE_USERS]: (state, data) => (state.users = data),
  [vxt.UPDATE_REGDS]: (state, data) => (state.regds = data),
  [vxt.UPDATE_REGD]: (state, data) => (state.regd = data),
  [vxt.UPDATE_PRESCRIPTION]: (state, data) => (state.prescription = data),
  [vxt.UPDATE_MEDICALRECORD]: (state, data) => (state.medicalRecord = data),
  [vxt.UPDATE_EXCEPTION]: (state, data: string) => (state.exception = data),

  //
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data)
};

const myActions: ActionTree<State, State> = {
  [vxt.GET_DEPARTMENTS]: async ({ commit }) => {
    //console.log(1);
    const resp = await axios.get<ResultVO>(`/api/common/departments`);
    commit(vxt.UPDATE_DEPARTMENTS, resp.data.data.departments);
  },
  [vxt.ADD_DEPARTMENTS]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/admin/department`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_DEPARTMENTS, resp.data.data.departments);
  },
  [vxt.DELETE_DEPARTMENT]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.delete<ResultVO>(`/api/admin/department/${id}`);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_DEPARTMENTS, resp.data.data.departments);
  },
  [vxt.GET_DOCTOR]: async ({ commit }) => {
    //console.log(1);
    const resp = await axios.get<ResultVO>(`/api/admin/doctors`);
    commit(vxt.UPDATE_DOCTOR, resp.data.data.doctors);
  },
  [vxt.ADD_DOCTOR]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/admin/doctor`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_DOCTOR, resp.data.data.doctors);
  },
  [vxt.DELETE_DOCTOR]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.delete<ResultVO>(`/api/admin/doctor/${id}`);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_DOCTOR, resp.data.data.doctors);
  },
  [vxt.UPDATE_DOCTOR]: async ({ commit }, data) => {
    console.log(data);
    const resp = await axios.patch<ResultVO>(`/api/admin/doctor`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_DOCTOR, resp.data.data.doctors);
  },

  [vxt.GET_MEDICINE]: async ({ commit }) => {
    //console.log(1);
    const resp = await axios.get<ResultVO>(`/api/admin/medicines`);
    commit(vxt.UPDATE_MEDICINE, resp.data.data.medicine);
  },
  [vxt.ADD_MEDICINE]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/admin/medicine`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_MEDICINE, resp.data.data.medicine);
  },
  [vxt.DELETE_MEDICINE]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.delete<ResultVO>(`/api/admin/medicine/${id}`);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_MEDICINE, resp.data.data.medicine);
  },
  [vxt.UPDATE_MEDICINE]: async ({ commit }, data) => {
    //console.log(data);
    const resp = await axios.patch<ResultVO>(`/api/admin/medicine`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_MEDICINE, resp.data.data.medicine);
  },
  [vxt.GET_USERS]: async ({ commit }) => {
    //console.log(1);
    const resp = await axios.get<ResultVO>(`/api/admin/users`);
    commit(vxt.UPDATE_USERS, resp.data.data.users);
  },
  [vxt.DELETE_USER]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.delete<ResultVO>(`/api/admin/user/${id}`);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_USERS, resp.data.data.users);
  },
  [vxt.LOGIN]: async ({ commit }, data) => {
    // try可避免控制台的未捕获异常信息
    try {
      const resp = await axios.post<ResultVO>("/api/login", data);
      
      sessionStorage.setItem("authorization", resp.headers.token);
      commit(vxt.UPDATE_USER, {
        id: resp.data.data.uid,
        role: resp.data.data.role
      });
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  },
  [vxt.GET_DOCTORBYD]: async ({ commit }, data) => {
    const dname = data;
    const resp = await axios.get<ResultVO>(`/api/common/doctors/${dname}`);
    commit(vxt.UPDATE_DOCTOR, resp.data.data.doctors);
  },
  [vxt.ADD_REGD]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/common/regd`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_REGDS, resp.data.data.regds);
  },
  [vxt.GET_REGDS]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>(`/api/common/regds`);
    commit(vxt.UPDATE_REGDS, resp.data.data.regds);
  },
  [vxt.GET_REGDSBYD]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>(`/api/doctor/regds`);
    commit(vxt.UPDATE_REGDS, resp.data.data.regds);
  },
  [vxt.GET_REGDSBYID]: async ({ commit }, data) => {
    const id = data;
    console.log(id);
    const resp = await axios.get<ResultVO>(`/api/doctor/regd/${id}`);
    commit(vxt.UPDATE_REGD, resp.data.data.regd);
  },
  [vxt.GET_PRESCRIPTION]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.get<ResultVO>(`/api/doctor/prescription/${id}`);
    commit(vxt.UPDATE_PRESCRIPTION, resp.data.data.prescription);
  },
  [vxt.ADD_REGD]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/common/regd`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
    commit(vxt.UPDATE_REGDS, resp.data.data.regds);
  },
  [vxt.ADD_MEDICALRECORD]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/doctor/medicalRecord`, data);
  },
  [vxt.ADD_PRESCRIPTION]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/doctor/prescription`, data);
  },
  [vxt.UPDATE_REGD]: async ({ commit }, data) => {
    console.log(data);
    const resp = await axios.patch<ResultVO>(`/api/doctor/regd`, data);
  },
  [vxt.GET_MEDICALRECORD]: async ({ commit }, data) => {
    const id = data;
    const resp = await axios.get<ResultVO>(`/api/common/medicalRecord/${id}`);
    commit(vxt.UPDATE_MEDICALRECORD, resp.data.data.medicalRecord);
  },
  [vxt.REGISTER]: async ({ commit }, data) => {
    const resp = await axios.post<ResultVO>(`/api/register`, data);
    if (resp.status == 200 && resp.data.code == 200) {
      setTimeout(() => {
        open1();
      }, 400);
    }
  }

  /*---------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------*/
};

const myGetters: GetterTree<State, State> = {};

export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters
});
