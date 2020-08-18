<template>
  <div>
    <!-- 二级侧边栏 -->
    <el-row :gutter="30">
      <el-col :span="3">
        <el-input placeholder="请输入内容"></el-input>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="tabclick()">
          <el-tab-pane
            v-for="citemtab in labedata"
            :key="citemtab.machinekey"
            :label="citemtab.nickname"
            :name="citemtab.machinekey"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="21">
        <kzmain v-bind:message="chindredata" v-if="sonRefreshb"></kzmain>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import kongzhiMain from "@/components/ThreeLevelPage/kongzhiMain";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["projectnumb"])
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
    // this.timedRefreshb();
  },
  methods: {
    tabclick() {
      this.secahdata();
    },
    ////
    //定时刷新
    timedRefreshb() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.secahdata();
        }, 10000);
      }
    },
    //时间
    async secahdata() {
      const { data: res } = await this.$http.post("device/search", {
        machinekey: this.activeName
      });
      if (!res) {
        this.$message.error("链接错误");
        this.sonRefreshb = false;
        this.$nextTick(() => {
          this.sonRefreshb = true;
        });
        /* return this.$message.error('链接错误'); */
      } else {
        this.chindredata = res;
        this.sonRefreshb = false;
        this.$nextTick(() => {
          this.sonRefreshb = true;
        });
      }
    },
    //查询所有子账户
    async deviceMcreated() {
      const { data: resCdata2 } = await this.$http.post("user/userdatak", {
        platedata: this.$store.state.platedata,"payload":this.$store.state.areadata,"projectnumb":this.$store.state.projectnumb
      });
      if (resCdata2.meta.meta === 200) {
        this.labedata = resCdata2.resd;
        this.activeName = resCdata2.resd[0].machinekey;
        this.secahdata();
      } else {
        this.$message.error("错误");
      }
    }
  },
  components: {
    kzmain: kongzhiMain
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