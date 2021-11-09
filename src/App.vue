<template>
  <router-view />
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapState, Store, useStore } from "vuex";
import { State } from "./store";
export default defineComponent({
  computed: {
    ...mapState(["exception"])
  },
  name: "App",
  created() {
    const store: Store<State> = useStore();
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store")!)
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(store.state));
    });
  }
});
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>
