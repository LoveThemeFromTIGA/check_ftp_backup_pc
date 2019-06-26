<template>
  <div class="tab-table">
    <basic-container>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.tab"
          :name="tab.key"
          :key="tab.key">
          <el-table
            :data="dataSource[tab.key]"
            style="width: 100%">
            <el-table-column
              v-for="item, index in columns">

            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import DeleteBalloon from './components/DeleteBalloon';
import EditDialog from './components/EditDialog';
import response from './tab-table.json';

export default {
  components: {
    BasicContainer,
    DeleteBalloon,
    EditDialog,
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource: [],
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '成功', key: 'success' },
        { tab: '进行中', key: 'running' },
        { tab: '失败', key: 'fail' },
      ],
      columns: [
        {
          title: '序号',
          key: 'num',
        },
        {
          title: '地区名称',
          dataIndex: 'area_name',
          key: 'area_name',
        },
        {
          title: '文件名',
          dataIndex: 'filename',
          key: 'filename',
        },
        {
          title: '状态',
          dataIndex: 'current_status',
          key: 'current_status',
        },
        {
          title: '发布时间',
          dataIndex: 'latest_modify_time',
          key: 'latest_modify_time',
        },
        // {
        //   title: '操作',
        //   key: 'action',
        // },
      ],
      visible: false,
    };
  },

  created() {},

  mounted() {
    this.dataSource = response.data;
  },

  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    handleRemove(index, tabKey) {
      this.dataSource[tabKey].splice(index, 1);
    },
    handleMod(row, index, tabKey) {
      this.$set(this.dataSource[tabKey], index, row);
    },
  },
}

</script>

<style>
  .tab-table {

  }
</style>
