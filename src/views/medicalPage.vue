<template>
  <el-dialog title="添加药品" v-model="centerDialogVisible1" center>
    <el-table :data="medicine" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column
        prop="name"
        label="药品名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="药品价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="药品库存"
        width="180"
      ></el-table-column>
      <el-table-column label="选择">
        <template #default="scope">
          <el-button
            style="width: 50px; margin-bottom: 1.5px"
            size="mini"
            @click="handleAdd(scope.$index, scope.row)"
          >
            添加
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <el-dialog title="添加医嘱" v-model="centerDialogVisible2" center>
    <el-input
      type="textarea"
      :rows="15"
      placeholder="请输入内容"
      v-model="medicalRecord.details"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding: 10px; margin-left: 10px"
          type="primary"
          @click="centerDialogVisible2 = false"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-table :data="regds" stripe style="width: 100%;">
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
      label="预约科室"
      width="250px"
    ></el-table-column>
    <el-table-column
      prop="doctor"
      label="预约医生"
      width="250px"
    ></el-table-column>
    <el-table-column
      prop="createTime"
      label="预约时间"
      width="250px"
    ></el-table-column>
  </el-table>

  <div style="margin-top: 15px; float: left">
    <el-button @click="centerDialogVisible1 = true" type="primary" plain>
      <span style="margin: 10px">添加处方</span>
    </el-button>
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
      <template #default="scope">
        <div style="display: flex">
          <el-button
            style="width: 50px; margin-bottom: 1.5px"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            confirmButtonText="确定"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该条内容吗？"
          >
            <template #reference>
              <el-button
                style="width: 50px; margin-bottom: 1.5px"
                size="mini"
                type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 15px">
    <el-button @click="centerDialogVisible2 = true" type="primary" plain>
      <span style="margin: 10px">添加医嘱</span>
    </el-button>
    <div style="margin-top: 15px;height:100px"><h1>医嘱：</h1><p style="margin-top: 15px">{{medicalRecord.details}}</p></div>
    
  </div>

  <div style="margin-top: 40px;text-align: center">
    <el-button @click="submitRecord" type="primary" plain>
      <span style="margin: 10px">结束会诊</span>
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
    const handleAdd = (index: any, row: any) => {
      prescription.value.push({
        pid: id,
        mid: row.id,
        medicineInventory:row.inventory,
        medicineName: row.name,
        medicinePrice: row.price,
        medicineDetails: row.details,
      } as Prescription);
    };
    const handleDelete = (index: any, row: any) => {
      prescription.value.splice(index, 1);
    };

    const centerDialogVisible2 = ref(false);
    const medicalRecord = ref({
      id:id,
      details:""
    })
    
    const submitRecord = () => {
      store.dispatch(ADD_MEDICALRECORD,{
        id:medicalRecord.value.id,
        details:medicalRecord.value.details
      });
      prescription.value.forEach(p=>{
        store.dispatch(ADD_PRESCRIPTION,{
          pid:p.pid,
          medicine:p.mid
        })
        store.dispatch(UPDATE_MEDICINE,{
          id:p.mid,
          name:p.medicineName,
          price:p.medicinePrice,
          inventory:p.medicineInventory-1,
          details:p.medicineDetails
        })
       })
      store.dispatch(UPDATE_REGD,{
        id:id,
        flag:"是"
      });
      router.push("/doctorIndex");
    };
 
    return {
      regd,
      regds,
      medicine,
      prescription,
      centerDialogVisible1,
      centerDialogVisible2,
      handleAdd,
      handleDelete,
      medicalRecord,
      submitRecord
    };
  },
});
</script>

<style>
.class {
  
}
</style>
