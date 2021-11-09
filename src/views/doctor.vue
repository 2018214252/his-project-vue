<template>
  <el-dialog title="添加医生" v-model="centerDialogVisible1" center>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="doctorAdd"
    >
      <el-form-item
        :rules="[{ required: true, message: '医生id不能为空' }]"
        prop="id"
        label="医生职工号"
        style="margin: 20px"
      >
        <el-input autocomplete="off" v-model.number="doctorAdd.id"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '医生姓名不能为空' }]"
        prop="name"
        label="医生名称"
        style="margin: 20px"
      >
        <el-input autocomplete="off" v-model.number="doctorAdd.name"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '医生科室不能为空' }]"
        prop="department"
        label="科室名称"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="doctorAdd.department"
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
          v-model.number="doctorAdd.details"
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
          @click="addDoctor"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="编辑医生信息" v-model="centerDialogVisible" center>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="doctorEdit"
    >
      <el-form-item
        :rules="[{ required: true, message: '医生姓名不能为空' }]"
        prop="name"
        label="医生名称"
        style="margin: 20px"
      >
        <el-input autocomplete="off" v-model.number="doctorEdit.name"></el-input>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true, message: '医生科室不能为空' }]"
        prop="department"
        label="科室名称"
        style="margin: 20px"
      >
        <el-input
          autocomplete="off"
          v-model.number="doctorEdit.department"
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
          v-model.number="doctorEdit.details"
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
          @click="updateDoctor"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div id="addcourse" style="margin-top: 15px">
    <el-button @click="centerDialogVisible1 = true" type="primary" plain>
      <span style="margin: 10px">添加医生</span>
    </el-button>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column prop="id" label="医生id" width="180"></el-table-column>
    <el-table-column prop="name" label="医生姓名" width="180"></el-table-column>
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
    <el-table-column align="right">
      <template #header>
        <el-input
          style="width: 120px"
          v-model="search"
          size="30px"
          placeholder="医生搜索"
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
import { ADD_DOCTOR, DELETE_DOCTOR, GET_DOCTOR, UPDATE_DOCTOR } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_DOCTOR);
    const tableData = computed(() => store.state.doctors);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    //医生添加
    const centerDialogVisible1 = ref(false);
    const doctorAdd = ref({
      id: null,
      name: null,
      department: null,
      details: null,
    });
    const addDoctor = () => {
      const doctor = {
        id: doctorAdd.value.id,
        name: doctorAdd.value.name,
        department: doctorAdd.value.department,
        details: doctorAdd.value.details,
      };
      store.dispatch(ADD_DOCTOR, doctor);
      centerDialogVisible1.value = false;
      load();
    };

    const handleDelete = (index: any, row: any) => {
      const cid = row.id;
      store.dispatch(DELETE_DOCTOR, cid);
      load();
    };
//医生信息修改
    const centerDialogVisible = ref(false);
    const doctorEdit = ref({
      id: null,
      name: null,
      department: null,
      details: null,
    });
    const handleEdit = (index: any, row: any) => {
      console.log(1);
      centerDialogVisible.value = true;
      doctorEdit.value = {
        id: row.id,
        name: row.name,
        department: row.department,
        details: row.details
      };
      //console.log(doctorEdit.value.id);
    };
    const updateDoctor = () => {
      const doctor = {
        id: doctorEdit.value.id,
        name: doctorEdit.value.name,
        department: doctorEdit.value.department,
        details: doctorEdit.value.details,
      };
      
      store.dispatch(UPDATE_DOCTOR, doctor);
      centerDialogVisible.value = false;
      load();
    };

    const search = ref("");
    return {
      tableData,
      addDoctor,
      doctorAdd,
      centerDialogVisible1,
      loading,
      handleDelete,
      search,
      handleEdit,
      updateDoctor,
      centerDialogVisible,
      doctorEdit
    };
  },
});
</script>
