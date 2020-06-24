<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 二级侧边栏 -->
    <el-row :gutter="30">
      <el-col :span="4">
        <el-input placeholder="请输入内容"></el-input>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="tabdata">
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
        <videos v-bind:message="chindredata" v-if="sonRefreshb"></videos>
      </el-col>
    </el-row>
    <video id="video"></video>
  </div>
</template>
<script>
import videoMain from "@/components/ThreeLevelPage/videoMain";
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState(["projectnumb"])
  },
  data() {
    return {
      sonRefreshb: false,
      activeName: "",
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
    ////
    /////
   async secahdata()
   {
     const {data:res} = await this.$http.post("seachdata")
     if(!res)
     { 
       this.$message.error('链接错误')
       this.sonRefreshb = false;
       /* return this.$message.error('链接错误'); */
       }
     else{
       this.chindredata=res[0]
       this.sonRefreshb = true;
     }
    },
    writervideo(res){
      if (!res)
       {
        return this.$message.error("错误");
      } 
      else
       { 
         this.labedata = res;
          this.activeName=res[0].machinekey;
        // this.secahdata();
      }
    },
    async deviceMcreated() 
    {
      if(this.$store.state.platedata===3)
      {
        const { data: resVI } = await this.$http.post("user/MachineSchOne", { data: this.$store.state.areadata}).catch(err => {this.$message.error("网络错误");
        });
        console.log(resVI)
        if(resVI)
        { 
          this.writervideo(resVI)
        }
      }
      else
      {
         const { data: resVI3 } = await this.$http.post("user/MachineSchAll", { data: this.projectnumb}).catch(err => {this.$message.error("网络错误"); });
           if(resVI3)
        {
          this.writervideo(resVI3)
        }
       
      }

    },
    tabdata(data) {
    /*   this.chindredata = data.name;
      this.sonRefreshb = false;
      this.$nextTick(() => {
        this.sonRefreshb = true;
      }); */
    }
  },
  components: {
   videos: videoMain
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