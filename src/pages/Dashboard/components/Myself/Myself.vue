<template>
    <div>
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号">
      <template slot-scope="scope">
          <!--scope.row.xxxx 会自动帮忙for循环-->
        <span style="margin-left: 10px">{{ scope.$index+1}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地区名称">
      <template slot-scope="scope">
          <!--scope.row.xxxx 会自动帮忙for循环-->
        <span style="margin-left: 10px">{{ scope.row.area_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文件大小">
      <template slot-scope="scope">
          <!--scope.row.xxxx 会自动帮忙for循环-->
        <!--<span style="margin-left: 10px">{{ scope.row.current_file_size}}</span>-->
        <!--<span style="margin-left: 10px" v-if="scope.row.current_file_size <= 1024*1024 && scope.row.current_file_size > 1024">{{scope.row.current_file_size/1024}}K</span>-->
        <span style="margin-left: 10px" >{{scope.row.current_file_size | transition_num}}</span>
        <!--<span style="margin-left: 10px" v-if="scope.row.current_file_size > 1024*1024*1024 ">{{ scope.row.current_file_size/1024/1024}}G</span>-->

      </template>
    </el-table-column>
    <el-table-column
      label="最后修改时间">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
          <!--scope.row.xxxx 会自动帮忙for循环-->
        <span style="margin-left: 10px">{{ scope.row.latest_modify_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="当前状态">
      <template slot-scope="scope" scope="scope">
        <!--<el-popover trigger="hover" placement="top">-->
  <!--</el-popover>-->
          <div slot="reference" class="name-wrapper">
            <!--<el-tag size="medium"  :type="scope.row.status=='失败'?'danger':''">{{ scope.row.status }}</el-tag>-->
            <el-tag v-if="scope.row.current_status==0" size="medium"  type="primary">成功</el-tag>
            <el-tag v-if="scope.row.current_status==1" size="medium"  type="info">进行中</el-tag>
            <el-tag v-if="scope.row.current_status==2" size="medium"  type="danger">失败</el-tag>
          </div>
      </template>
    </el-table-column>
    <!--<el-table-column label="操作">-->
      <!--<template slot-scope="scope">-->
        <!--<el-button-->
          <!--size="mini"-->
          <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      <!--</template>-->
    <!--</el-table-column>-->


  </el-table>
    <el-pagination class="paginations"
      background
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
        </div>

</template>

<script>

  export default {
    name: "Myself",
    data() {
      return {
          tableData: [],
          successed: 0,
          running: 1,
          failed: 2,
          current_status_text: '',
          current_file_size: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    },
    mounted(){
        this.$axios.get(this.$settings.host+"/data/current_status/").then(response=>{
            this.tableData = response.data
        }).catch(error=>{
            console.log(error.response);
        })
    },
    computed: {
    },
    filters: {
        transition_num: function(num){
            if (num <= 1024){
                let trasn_num = num + 'B';
                return trasn_num
            } else if (num <= 1024*1024 && num > 1024){
                let trasn_num = (num/1024).toFixed(2) + 'K';
                return trasn_num
            } else if (num <= 1024*1024*1024 && num > 1024*1024){
                let trasn_num = (num/1024/1024).toFixed(2) + 'M';
                return trasn_num
            } else if (num > 1024*1024*1024){
                let trasn_num = (num/1024/1024/1024).toFixed(2) + 'G';
                return trasn_num
            }

      }
    }

  }
</script>



<style scoped>
    .paginations {
          margin-top: 20px;
          margin-bottom: 20px;
          overflow: hidden;
    }
    .el-pagination{
        float: right;
    }
</style>