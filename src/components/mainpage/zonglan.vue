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
        <el-tabs v-model="activeName" tab-position="left" @tab-click="tabclickfun">
          <el-tab-pane
            v-for="citemtab in labedata"
            :key="citemtab.machinekey"
            :label="citemtab.nickname"
            :name="citemtab.machinekey+''"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
       <users v-bind:message="chindredata" v-if="sonRefreshb"></users>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import UsersMain from "@/components/ThreeLevelPage/zonglanMain";
export default {
  data() {
    return {
      sonRefreshb: false,
      activeName: String(),
      chindredata: [],
      labedata: []
    };
  },
  created() {
    this.deviceMcreated()
  },
  mounted() {
  },
  methods: {
    tabclickfun(data1)
    { 
      this.sonRefreshb = false;
      this.searchdata(data1.name)
    },
   async searchdata(value)
    {
      const {data:zongdata} =await this.$http.post("zonglan/searchdata",{machinekey:value})
      
      if(zongdata.meta.status===200)
      {
       this.chindredata = zongdata.zonglandata;
       this.$nextTick(()=>{
          this.sonRefreshb = true;
        })
      }
      else{
        this.$message.error("采集错误")
      }
    },
   
    //查询所有子片区
   async deviceMcreated() 
    {
       const { data: resCdata2 } = await this.$http.post("user/userdatak", {
        platedata: this.$store.state.platedata,"payload":this.$store.state.areadata,"projectnumb":this.$store.state.projectnumb
      });
      if (resCdata2.meta.meta === 200)
       {
        this.labedata = resCdata2.resd;
        this.activeName = resCdata2.resd[0].machinekey;
        this.searchdata(this.activeName)
       } 
      else 
      {
        this.$message.error("错误");
      }
    },
  },
  components: {
    users: UsersMain
  },
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