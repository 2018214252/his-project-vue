<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="60"></el-table-column>
    <el-table-column
      prop="patientName"
      label="病者姓名"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="patientNumber"
      label="身份证号"
      width="200"
    ></el-table-column>
    <el-table-column
      prop="department"
      label="预约科室"
      width="180"
    ></el-table-column>
    <el-table-column
      prop="doctor"
      label="预约医生"
      width="180"
    ></el-table-column>
    <el-table-column
      prop="createTime"
      label="预约时间"
      width="230"
    ></el-table-column>
    <el-table-column prop="flag" label="是否就诊" width="180"></el-table-column>
    <el-table-column>
      <template #default="scope">
        <router-link
          :to="`/doctorIndex/medicalPage?regd=${scope.row.id}`"
        >
          <el-button type="primary" plain>
            <span style="margin: 10px">查看</span>
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
import { GET_DEPARTMENTS, GET_REGDS, GET_REGDSBYD } from "@/store/VuexTypes";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_REGDSBYD);
    const tableData = computed(() => store.state.regds.filter(r=>r.flag=="否"));
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