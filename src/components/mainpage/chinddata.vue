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
        <el-tabs v-model="activeName" tab-position="left" @tab-click="tableclickfun">
          <el-tab-pane
            v-for="citemtab in labedata"
            :key="citemtab.machinekey"
            :label="citemtab.nickname"
            :name="citemtab.machinekey"
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
    ...mapState(["projectnumb", "datavhouer"])
  },
  data() {
    return {
      sonRefreshb: false,
      chindredata: [],
      labedata: [],
      activeName: ""
    };
  },
  created() {
    this.deviceMcreated();
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
          this.secahdatatime();
        }, 10000);
      }
    },
    async secahdatatime() {
      if (this.activeName === "FX050") {
        const { data: res } = await this.$http.post("seach/qixiangzhan");
        if (!res) {
          this.$message.error("链接错误");
          return;
          /* return this.$message.error('链接错误'); */
        } else {
          this.chindredata = res;
        }
      } else {
        const { data: res } = await this.$http.post("seachdataOne", {
          machinekey: this.activeName
        });
        if (!res) {
          this.$message.error("链接错误");
          return;
          /* return this.$message.error('链接错误'); */
        } else {
          this.chindredata = res;
        }
      }
    },
    //查询
    async secahdata() 
    {
      if (this.activeName === "FX050") {
        const { data: res } = await this.$http.post("seach/qixiangzhan");
        if (!res) {
          this.$message.error("链接错误");
          this.sonRefreshb = false;
          return;
        } else {
          this.chindredata = res;
          this.sonRefreshb = false;
          this.$nextTick(() => {
            this.sonRefreshb = true;
            this.chindredata = res;
          });
        }
      } else {
        const { data: res } = await this.$http.post("seachdataOne", {
          machinekey: this.activeName
        });
        if (!res) {
          this.$message.error("链接错误");
          this.sonRefreshb = false;
          return;
        } else {
          this.chindredata = res;
          this.sonRefreshb = false;
          this.$nextTick(() => {
            this.sonRefreshb = true;
            this.chindredata = res;
          });
        }
      }
    },
    writerdataV(res) {
      if (!res) {
        return this.$message.error("错误");
      } else {
        this.labedata = res;
        this.activeName = res[0].machinekey;
        this.secahdata();
      }
    },
    //查询所有子账户
        async deviceMcreated() 
    {
      const { data: resCdata1 } = await this.$http.post("user/userdata");
      if(resCdata1){
        this.writerdataV(resCdata1);
      }  
    },
    tableclickfun(data1, data2) {
      this.secahdata();
    }
  },
  components: {
    users: UsersMain
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    datavhouer(n, o) {
      this.secahdata();
    }
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