<template>
  <el-dialog title="账号注册" v-model="centerDialogVisible1" center>
    <el-form
      label-width="150px"
      class="demo-ruleForm"
      :label-position="top"
      :model="registerForm"
    >
      <el-form-item
        :rules="[{ required: true, message: '姓名不能为空' }]"
        prop="name"
        label="姓名"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="registerForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '身份证号不能为空' }]"
        prop="number"
        label="身份证号"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="registerForm.number"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '手机号不能为空' }]"
        prop="phoneNumber"
        label="手机号（登录账号）"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="registerForm.phoneNumber"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '密码不能为空' }]"
        prop="password"
        label="请输入密码"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          type="password"
          v-model.number="registerForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '密码不能为空' }]"
        prop="repeat"
        label="请再次输入密码"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          type="password"
          v-model.number="registerForm.repeat"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding: 10px; margin-right: 10px"
          @click="centerDialogVisible1 = false"
        >
          取 消
        </el-button>
        <el-button
          style="padding: 10px; margin-left: 10px"
          type="primary"
          @click="register"
        >
          注册
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div id="loginContainer">
    <div class="common-layout">
      <el-container>
        <el-header>
          <p style="font-family: KaiTi; font-size: 25px">——his医疗管理系统——</p>
        </el-header>
        <el-main>
          <el-form
            ref="numberValidateForm"
            class="demo-ruleForm"
            label-width="100px"
            :label-position="left"
            :model="userForm"
          >
            <el-form-item
              :rules="[{ required: true, message: '用户名不能为空' }]"
              prop="userName"
              label="用户名"
              style="margin: 20px"
            >
              <el-input
                class="login-el-input"
                v-model="userForm.userName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '密码不能为空' }]"
              prop="password"
              label="密码"
              style="margin: 20px"
            >
              <el-input
                type="password"
                class="login-el-input"
                v-model="userForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <div class="login-button">
              <el-button @click="login" type="primary" round>登录</el-button>
              <el-button
                @click="centerDialogVisible1 = true"
                type="primary"
                round
              >
                注册
              </el-button>
            </div>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts">
import { UserForm } from "@/datasource/Types";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { State } from "@/store";
import { LOGIN, REGISTER } from "@/store/VuexTypes";
import { useRouter } from "vue-router";
function useLogin(userForm: Ref<UserForm>, store: Store<State>) {
  const login = (): void => {
    const user = {
      userName: userForm.value.userName,
      password: userForm.value.password
    };
    store.dispatch(LOGIN, user);
    setTimeout(() => {
      userForm.value.userName = "";
      userForm.value.password = "";
    }, 1000);
  };
  return {
    login
  };
}
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const userForm = ref<UserForm>({ userName: "", password: "" });
    const { login } = useLogin(userForm, store);
    const userRef = computed(() => store.state.user);
    const router = useRouter();
    watch(userRef, () => {
      if (userRef.value.role == 9) {
        const toAdmin = () => {
          router.push("/admin");
        };
        setTimeout(() => toAdmin(), 500);
      } else if (userRef.value.role == 5) {
        const toDoctor = () => {
          router.push("/doctorIndex");
        };
        setTimeout(() => toDoctor(), 500);
      } else {
        const toUser = () => {
          router.push("/index");
        };
        setTimeout(() => toUser(), 500);
      }
    });
    const centerDialogVisible1 = ref(false);
    const registerForm = ref({
      name: null,
      number: null,
      phoneNumber: null,
      password: null,
      repeat: null
    });
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };
    const register = () => {
      if (registerForm.value.password != registerForm.value.repeat) {
        alert("密码不一致");
      } else {
        store.dispatch(REGISTER, {
          name: registerForm.value.name,
          number: registerForm.value.number,
          phoneNumber: registerForm.value.phoneNumber,
          password: registerForm.value.password,
          repeat: registerForm.value.repeat
        });
        load();
        centerDialogVisible1.value = false;
      }
    };
    return {
      userForm,
      login,
      centerDialogVisible1,
      registerForm,
      register
    };
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 登录-start */
#loginContainer {
  padding: 3px;
  position: fixed;
  background-image: url(./../assets/背景.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#loginContainer .common-layout {
  text-align: center;
  width: 480px;
  border: 3px solid black;
  border-radius: 5px;
  padding-top: 60px;
}
#loginContainer .el-header {
  position: fixed;
  top: 235px;
  background-color: aliceblue;
  color: #333;
  text-align: center;
  height: 150px;
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#loginContainer .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#loginContainer .el-main .login-el-input {
  margin: 10px;
  width: 300px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#loginContainer .el-dropdown .el-button {
  padding: 10px;
}
#loginContainer .el-dropdown-menu {
  width: 200px;
}
#loginContainer .el-dropdown-item {
  display: block;
}
#loginContainer .el-select {
  width: 105px;
}
#loginContainer .el-button {
  margin-left: 20px;
}
#loginContainer .el-select {
  margin-right: 20px;
}
#loginContainer .login-button {
  margin-top: 10px;
}

/* 登录-end */
</style>
