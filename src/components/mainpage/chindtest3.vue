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
      labedata: [],
      videodata: []
    };
  },
  created() {
    this.deviceMcreated();
  },
  mounted() {},
  methods: {
    ////
    async serchvideo(mk) {
      const data = await this.$http.post("", { machinekey: mk });
    },
    tabdata(data, data1) {
      this.sonRefreshb = false;
      // console.log(data.label);
      this.videodata.forEach(item => {
        if ((item.nikenmae === data.label)) {
          this.chindredata = item;
        }
      });
      this.$nextTick(() => {
        this.sonRefreshb = true;
      });
    },

    async secahdata(data) {
      const { data: res } = await this.$http.post("user/uservideo");
      if (res) {
        this.videodata = res;
        res.forEach(item => {
          if ((item.nikenmae === data)) {
            this.chindredata = item;
          }
        });
        this.sonRefreshb = false;
        this.$nextTick(() => {
          this.sonRefreshb = true;
        });
      } else {
        return false;
      }
    },
    writervideo(res) {
      if (!res) {
        return this.$message.error("错误");
      } else {
        this.labedata = res;
        this.activeName = res[0].machinekey;
        this.secahdata(res[0].nickname);
      }
    },
    async deviceMcreated() {
      const { data: resCdata2 } = await this.$http.post("user/userdatak");
      if (resCdata2.meta.meta === 200) {
        this.writervideo(resCdata2.resd);
      } else {
        this.$message.error("错误");
      }
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