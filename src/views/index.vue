<template>
  <div class="container">
    <el-container>
      <el-header>
        <p>HIS医疗管理系统</p>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div
            style="
              font-size: 50px;
              color: white;
              margin-left: 20px;
              font-style: italic;"
              
          >
            <i class="el-icon-info"></i>
            <span class="span-title" style="font-size:50px">HIS</span>
          </div>
          <el-menu
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            router
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template v-slot:title>
                <i class="el-icon-menu"></i>
                <span class="span-title">用户中心</span>
              </template>
              <el-menu-item index="/index/registered">挂号预约</el-menu-item>
              <el-menu-item index="/index/registeredRecord">预约记录</el-menu-item>
              <el-menu-item index="/index/medicalRecord">就诊记录</el-menu-item>
            </el-submenu>
            <el-menu-item index="/login"><i class="el-icon-d-arrow-right"></i>
                <span class="span-title">退出登录</span></el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="margin-left: 200px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    //
  },
});
</script>

<style>
.container {
  position:initial;
  height: 100%;
  width: 100%;
  background-color: white;
}
.el-header {
  width: 100vw;
  background-color: #545c64;
  text-align: center;
  line-height: 60px;
  color: white;
  font-size: 25px;
}
.el-aside {
  position: fixed;
  background-color: #545c64;
  height: 100%;
  top: 0;
}
.span-title {
  font-size: 20px;
}
</style>
