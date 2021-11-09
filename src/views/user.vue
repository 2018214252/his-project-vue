<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="#" width="180"></el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      width="180"
    ></el-table-column>
    <el-table-column label="密码" width="180">******</el-table-column>
    <el-table-column prop="role" label="账号类型" width="180"></el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          style="width: 120px"
          v-model="search"
          size="30px"
          placeholder="账号搜索"
        />
      </template>
      <template #default="scope">
        <div style="display: flex">
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
import { defineComponent, watch } from "vue";
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { DELETE_USER, GET_USERS } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    store.dispatch(GET_USERS);
    const tableData = computed(() => store.state.users);
    watch(tableData,()=>{
      tableData.value.forEach(d=>{
        d.password="******"
      })
    })
    const loading = ref(false);
    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const handleDelete = (index: any, row: any) => {
      const cid = row.id;
      store.dispatch(DELETE_USER, cid);
      load();
    };

    const search = ref("");
    return {
      tableData,
      loading,
      handleDelete,
      search,
    };
  },
});
</script>
