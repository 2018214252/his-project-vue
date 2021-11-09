<template>
  <el-dialog title="添加科室" v-model="centerDialogVisible1" center>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      :label-position="top"
      :model="departmentAdd"
    >
      <el-form-item
        :rules="[{ required: true, message: '科室名称不能为空' }]"
        prop="name"
        label="科室名称"
        style="margin: 20px;"
      >
        <el-input autocomplete="off" v-model.number="departmentAdd.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="padding:10px;margin-right:10px"
          @click="centerDialogVisible1 = false"
        >
          取 消
        </el-button>
        <el-button
          style="padding:10px;margin-left:10px"
          type="primary"
          @click="addDepartment"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div style="margin-left:150px;margin-right:200px">
  <div id="addcourse" style="margin-top:15px">
        <el-button @click="centerDialogVisible1 = true" type="primary" plain>
          <span style="margin:10px">添加科室</span>
        </el-button>
 </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column prop="name" label="科室名称" width="300"></el-table-column>
    <el-table-column align="right">
          <template #header>
            <el-input
              style="width:120px;"
              v-model="search"
              size="30px"
              placeholder="科室搜索"
            />
          </template>
          <template #default="scope">
            <div style="display:flex">
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
                    style="width:50px;margin-bottom:1.5px"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed,  Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ADD_DEPARTMENTS, DELETE_DEPARTMENT, GET_DEPARTMENTS } from "@/store/VuexTypes";
export default defineComponent({
  
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_DEPARTMENTS);
    const tableData = computed(()=>store.state.departments);
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    //科室添加
    const centerDialogVisible1 = ref(false);
    const departmentAdd = ref({
      name: null
    });
    const addDepartment = () => {
      const course = {
        name: departmentAdd.value.name,
      };
      store.dispatch(ADD_DEPARTMENTS, course);
      centerDialogVisible1.value = false;
      load();
    };

    const handleDelete = (index: any, row: any) => {
      const cid = row.id;
      store.dispatch(DELETE_DEPARTMENT, cid);
      load();
    };
    
    const search = ref("");
    return{
        tableData,
        addDepartment,
        departmentAdd,
        centerDialogVisible1,
        loading,
        handleDelete,
        search

    }
  },
});
</script>


<style>

</style>