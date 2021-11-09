<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column prop="name" label="科室名称" width="180"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <router-link
          :to="`/index/registeredDoctor?departmentName=${scope.row.name}`"
        >
          <el-button type="primary" plain>
            <span style="margin: 10px">选择</span>
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  GET_DEPARTMENTS,
} from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_DEPARTMENTS);
    const router = useRouter();
    const tableData = computed(() => store.state.departments);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const search = ref("");
    return {
      tableData,
      loading,
      search,
    };
  },
});
</script>


<style>
</style>