<template>
  <el-table :data="regds" stripe style="width: 100%">
    <el-table-column
      prop="patientName"
      label="病者姓名"
      width="250px"
    ></el-table-column>
    <el-table-column
      prop="patientNumber"
      label="身份证号"
      width="250px"
    ></el-table-column>
    <el-table-column
      prop="department"
      label="就诊科室"
      width="250px"
    ></el-table-column>
    <el-table-column
      prop="doctor"
      label="会诊医生"
      width="250px"
    ></el-table-column>
    <el-table-column label="就诊时间" width="250px">
      {{ medicalRecord.createTime }}
    </el-table-column>
  </el-table>

  <div style="margin-top: 15px; float: left">
    <h1>处方:</h1>
  </div>
  <el-table :data="prescription" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column
      prop="medicineName"
      label="药品名称"
      width="180"
    ></el-table-column>
    <el-table-column
      prop="medicinePrice"
      label="药品价格"
      width="180"
    ></el-table-column>
    <el-table-column
      prop="medicineDetails"
      label="详细信息"
      width="180"
    ></el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          style="width: 120px"
          v-model="search"
          size="30px"
          placeholder="药品搜索"
        />
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 15px">
    <div style="margin-top: 15px; height: 100px">
      <h1>医嘱：</h1>
      <p style="margin-top: 15px">{{ medicalRecord.details }}</p>
    </div>
  </div>

  <div style="margin-top: 40px; text-align: center">
    <el-button @click="goBack" type="primary" plain>
      <span style="margin: 10px">返回</span>
    </el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { State } from "@/store";
import {
  ADD_MEDICALRECORD,
  ADD_PRESCRIPTION,
  GET_MEDICALRECORD,
  GET_MEDICINE,
  GET_PRESCRIPTION,
  GET_REGDSBYID,
  UPDATE_MEDICINE,
  UPDATE_REGD,
} from "@/store/VuexTypes";
import { Prescription } from "@/datasource/Types";
import router from "@/router";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const id = useRoute().query.regd;
    store.dispatch(GET_REGDSBYID, id);
    store.dispatch(GET_PRESCRIPTION, id);
    const regd = computed(() => store.state.regd);
    const regds = computed(() => [
      {
        patientName: regd.value.patientName,
        patientNumber: regd.value.patientNumber,
        department: regd.value.department,
        doctor: regd.value.doctor,
        createTime: regd.value.createTime,
      },
    ]);

    store.dispatch(GET_MEDICINE);
    const centerDialogVisible1 = ref(false);
    const medicine = computed(() => store.state.medicine);
    const prescription = computed(() => store.state.prescription);
    store.dispatch(GET_MEDICALRECORD, id);
    const medicalRecord = computed(() => store.state.medicalRecord);

    const goBack = () => {
      router.push("/doctorIndex/doctorMedical");
    };

    return {
      regd,
      regds,
      medicine,
      prescription,
      centerDialogVisible1,
      medicalRecord,
      goBack,
    };
  },
});
</script>

<style>
.class {
}
</style>
