<template>
  <el-dialog title="确认信息" v-model="centerDialogVisible1" center>
    <el-table :data="doctorData" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column
        prop="name"
        label="医生名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="department"
        label="所属科室"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="details"
        label="详细信息"
        width="180"
      ></el-table-column>
    </el-table>
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
          @click="addRegd"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column prop="name" label="医生名称" width="180"></el-table-column>
    <el-table-column
      prop="department"
      label="所属科室"
      width="180"
    ></el-table-column>
    <el-table-column
      prop="details"
      label="详细信息"
      width="180"
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          @click="(centerDialogVisible1 = true), (doctor = scope.row)"
          plain
        >
          <span style="margin: 10px">预约</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { State } from "@/store";
import { ADD_REGD, GET_DOCTORBYD } from "@/store/VuexTypes";
import { computed, defineComponent, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";

export default defineComponent({
  setup() {
    const dpartmentName = useRoute().query.departmentName;
    const store: Store<State> = useStore();
    store.dispatch(GET_DOCTORBYD, dpartmentName);
    const tableData = computed(() => store.state.doctors);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };
    const doctor = ref({
      id: null,
      name: null,
      department: null,
      details: null,
    });
    const doctorData = computed(() => {
      return [
        {
          id: doctor.value.id,
          name: doctor.value.name,
          department: doctor.value.department,
          details: doctor.value.details,
        },
      ];
    });
    const search = ref("");
    const centerDialogVisible1 = ref(false);
    const addRegd = () => {
      const regd = {
        department: doctor.value.department,
        doctor: doctor.value.id,
        flag: "否",
      };
      store.dispatch(ADD_REGD, regd);
      centerDialogVisible1.value = false;
      load();
    };
    return {
      tableData,
      loading,
      search,
      load,
      centerDialogVisible1,
      doctor,
      doctorData,
      addRegd
    };
  },
});
</script>
