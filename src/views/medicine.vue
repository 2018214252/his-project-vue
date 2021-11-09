<template>
  <el-dialog title="添加药品" v-model="centerDialogVisible1" center>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="medicineAdd"
    >
      <el-form-item
        :rules="[{ required: true, message: '药品名称不能为空' }]"
        prop="name"
        label="药品名称"
        style="margin: 20px"
      >
        <el-input autocomplete="off" v-model.number="medicineAdd.name"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '药品价格不能为空' }]"
        prop="price"
        label="价格"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineAdd.price"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '药品库存不能为空' }]"
        prop="inventory"
        label="库存"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineAdd.inventory"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '详细信息不能为空' }]"
        prop="details"
        label="详细信息"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineAdd.details"
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
          @click="addMedicine"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="编辑药品信息" v-model="centerDialogVisible" center>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="medicineEdit"
    >
      <el-form-item
        :rules="[{ required: true, message: '药品名称不能为空' }]"
        prop="name"
        label="药品名称"
        style="margin: 20px"
      >
        <el-input autocomplete="off" v-model.number="medicineEdit.name"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '药品价格不能为空' }]"
        prop="price"
        label="价格"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineEdit.price"
        ></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '药品库存不能为空' }]"
        prop="inventory"
        label="库存"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineEdit.inventory"
        ></el-input>
      </el-form-item>

      <el-form-item
        :rules="[{ required: true, message: '详细信息不能为空' }]"
        prop="details"
        label="详细信息"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="medicineEdit.details"
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
          @click="updateMedicine"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div id="addMedicine" style="margin-top: 15px">
    <el-button @click="centerDialogVisible1 = true" type="primary" plain>
      <span style="margin: 10px">添加药品</span>
    </el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column prop="name" label="药品名称" width="180"></el-table-column>
    <el-table-column prop="price" label="药品价格" width="180"></el-table-column>
    <el-table-column prop="inventory" label="药品库存" width="180"></el-table-column>
    <el-table-column
      prop="details"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ADD_DOCTOR, ADD_MEDICINE, DELETE_DOCTOR, DELETE_MEDICINE, GET_DOCTOR, GET_MEDICINE, UPDATE_DOCTOR, UPDATE_MEDICINE } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_MEDICINE);
    const tableData = computed(() => store.state.medicine);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    //医生添加
    const centerDialogVisible1 = ref(false);
    const medicineAdd = ref({
      id: null,
      name: null,
      inventory: null,
      price: null,
      details: null,
    });
    const addMedicine = () => {
      const medicine = {
        name: medicineAdd.value.name,
        inventory: medicineAdd.value.inventory,
        price: medicineAdd.value.price,
        details: medicineAdd.value.details,
      };
      store.dispatch(ADD_MEDICINE, medicine);
      centerDialogVisible1.value = false;
      load();
    };

    const handleDelete = (index: any, row: any) => {
      const cid = row.id;
      store.dispatch(DELETE_MEDICINE, cid);
      load();
    };
//医生信息修改
    const centerDialogVisible = ref(false);
    const medicineEdit = ref({
      id: null,
      name: null,
      inventory: null,
      price:null,
      details: null,
    });
    const handleEdit = (index: any, row: any) => {
      centerDialogVisible.value = true;
      medicineEdit.value = {
        id: row.id,
        name: row.name,
        inventory: row.inventory,
        price: row.price,
        details: row.details
      };
      //console.log(doctorEdit.value.id);
    };
    const updateMedicine = () => {
      const medicine = {
        id: medicineEdit.value.id,
        name: medicineEdit.value.name,
        inventory: medicineEdit.value.inventory,
        price: medicineEdit.value.price,
        details: medicineEdit.value.details,
      };
      
      store.dispatch(UPDATE_MEDICINE, medicine);
      centerDialogVisible.value = false;
      load();
    };

    const search = ref("");
    return {
      tableData,
      addMedicine,
      medicineAdd,
      centerDialogVisible1,
      loading,
      handleDelete,
      search,
      handleEdit,
      updateMedicine,
      centerDialogVisible,
      medicineEdit
    };
  },
});
</script>
