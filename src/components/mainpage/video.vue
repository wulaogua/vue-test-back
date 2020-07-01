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
            :key="citemtab.channelNo"
            :label="citemtab.channelName"
            :name="citemtab.channelName"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <!-- 子栏占位 <users v-bind:message="chindredata" v-if="sonRefreshb"></users> -->
        <videos v-bind:message="chindredata" v-if="sonRefreshb"></videos>
      </el-col>
    </el-row>
    <video id="video"></video>
    <el-dialog
      title="检测当前项目没有添加视频源"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form
        :model="formvideo"
        label-width="100px"
        class="demo-form"
        v-if="elformVisible"
        :rules="rules"
        ref="videoForm"
      >
        <el-form-item label="AppKey" prop="AppKey">
          <el-input v-model="formvideo.AppKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Secret" prop="Secret">
          <el-input v-model="formvideo.Secret" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('videoForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="elformVisible = false">帮助</el-button>
        </el-form-item>
      </el-form>
      <div class="block" v-show="!elformVisible">
        <el-button type="text" @click="elformVisible = true">返回</el-button>
        <a href="https://open.ys7.com/" title="萤石云" target="_blank">跳转</a>
        <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="ii in imglist" :key="ii.id">
            <span>{{ii.text}}</span>
            <img :src="require(`../../assets/${ii.url}.png`)" alt="picture" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import videoMain from "@/components/ThreeLevelPage/videoMain";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["projectnumb"])
  },
  inject: ["reload"],
  data() {
    
    return {
            imglist: [
        {
          id: 1,
          url: "step1",
          text: "1:登陆萤石云开放平台点击-开发者服务"
        },
        {
          id: 2,
          url: "step2",
          text: "2:点击侧边栏的-我的账号-应用信息"
        },
        {
          id: 3,
          url: "step3",
          text: "3:依次复制界面中的-Appkey-Secret粘贴到此页面"
        }
      ],
      dialogVisible: false,
      elformVisible: false,
      formvideo: {
        AppKey: "bc824dc91c664a1c8c2469a3c03e0f06",
        Secret: "19ec4402541c7258cf51d4275db6f445"
      },
      rules: {
        AppKey: [{ required: true, message: "请输入AppKey1", trigger: "blur" }],
        Secret: [{ required: true, message: "请输入Secret", trigger: "blur" }]
      },
      sonRefreshb: false,
      activeName: "",
      chindredata: [],
      labedata: []
    };
  },
  created() {
    this.seachvideourl();
    //this.deviceMcreated();
  },
  mounted() {
     this.$store.commit("loadingactiveF");
  },
  updated(){
    //this.$store.commit("loadingactiveF");
  },
  methods: {
    resetForm() {
      console.log("取消");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(data) {
      this.$refs[data].validate(async valid => {
        if (valid) {
          const { data: data } = await this.$http.post("seachdata/seachvideo", {
            AppKey: this.formvideo.AppKey,
            Secret: this.formvideo.Secret,
            projectnumb: this.$store.state.projectnumb
          });
          if (data.meta.status === 200) {
            this.$message.success("查询成功");
            this.dialogVisible = false;
            this.$store.commit("loadingactive");
            this.reload()
          } 
          else {
            this.$message.error(data.meta.msg);
          }
        } 
        else {
          return false;
        }
      });
    },
    async seachvideourl() {
      const { data:data } = await this.$http.post("seachdata/oneseachvideo",{'projectnumb':this.$store.state.projectnumb});
      if (data.meta.status === 200) 
      {
        this.dialogVisible = false;
        this.elformVisible = false;
        this.labedata = data.data.videourl;
        this.activeName = data.data.videourl[0].channelName
        this.chindredata = data.data.videourl[0];
        this.sonRefreshb = true;
        //this.$store.commit("loadingactive");
      } 
      else {
        this.dialogVisible = true;
        this.elformVisible = true;
        this.$message.error("加载错误");
        return;
      }
    },
    tabdata(data,data1) {
      this.labedata.every(item=>{
        if(item.channelName===data.name)
        {
          this.chindredata = item;
          return false
        }
        else{
          return true
        }
      })
      this.sonRefreshb = false;
      this.$nextTick(() => {
        this.sonRefreshb = true;
      });
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