<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 二级侧边栏 -->
    <el-row :gutter="30">
      <el-col :span="4">
        <el-input placeholder="请输入内容"></el-input>
        <el-tabs v-model="activeName" tab-position="left">
          <el-tab-pane
            v-for="citemtab in labedata"
            :key="citemtab.machinekey"
            :label="citemtab.nickname"
            :name="citemtab.machinekey+''"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <!-- 子栏占位 <users v-bind:message="chindredata" v-if="sonRefreshb"></users> -->
        <users v-bind:message="chindredata" v-if="sonRefreshb"></users>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import UsersMain from "@/components/ThreeLevelPage/UsersMain";
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState(["projectnumb"])
  },
  data() {
    return {
      sonRefreshb: false,
      activeName: '',
      chindredata: [],
      labedata: []
    };
  },
  created() {
 this.deviceMcreated()
  },
  mounted() {
    this.timedRefreshb();
  },
  methods: {
        //定时刷新
    timedRefreshb() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.secahdata();
        },10000);
      }
    },
    //时间
   async secahdata()
   {  
     const {data:res} = await this.$http.post("seachdata")
     if(!res)
     { 
       this.$message.error('链接错误')
       this.sonRefreshb = false;
       this.$nextTick(()=>{
           this.sonRefreshb = true;
        })
       /* return this.$message.error('链接错误'); */
       }
     else{
       this.chindredata=res[0]
        this.sonRefreshb = false;
        this.$nextTick(()=>{
           this.sonRefreshb = true;
        })
      
     }
    },
    //查询所有子片区
    async deviceMcreated() 
    {
      const { data: resCdata1 } = await this.$http.post("user/userdata");
      if(resCdata1){
        this.labedata=resCdata1;
        this.activeName=resCdata1[0].machinekey;
        this.secahdata();
      }
        
    },
  },
  components: {
    users: UsersMain
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.el-input {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-tabs {
  margin-left: 60px;
}
.el-divider {
  height: 100%;
}
</style>