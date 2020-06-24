<template>
  <div>
    <el-row :gutter="12">
      <!--卡片视图 -->
      <el-col :span="6" v-for="video in Videolist" :key="video.id" :index="video.id +''">
        <el-card>
          <div slot="header" class="clearfix">
            <span>监控名：{{video.name}}</span>
          </div>
          <el-input placeholder="请输入内容"></el-input>
          <div>
            <video class="videostyle" :ref="video.name" controls></video>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="检测当前项目没有添加视频源"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form :model="formvideo" label-width="100px" class="demo-form" v-if="elformVisible">
        <el-form-item label="AppKey">
          <el-input v-model="formvideo.AppKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Secret">
          <el-input v-model="formvideo.Secret" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
           <el-button @click="elformVisible = false">帮助</el-button>
        </el-form-item>
      </el-form>
      <div class="block" v-show="!elformVisible">
        <el-button type="text" @click="elformVisible = true" >返回</el-button>
        <a href="https://open.ys7.com/" title="萤石云" target="_blank">跳转</a>
        <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="ii in imglist" :key="ii.id">
            <span>{{ii.text}}</span>
            <img :src="require(`../../assets/${ii.url}.png`)" alt="picture">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Hls from "hls.js";
export default {
  props: {
    message: {
      type: Object
    }
  },
  data() {
    return {
      imglist:[
        {
        id:1,
        url:'step1',
        text:"1:登陆萤石云开放平台点击-开发者服务",
        },
        {
        id:2,
        url:'step2',
        text:"2:点击侧边栏的-我的账号-应用信息",
        },
        {
        id:3,
        url:'step3',
        text:"3:依次复制界面中的-Appkey-Secret粘贴到此页面",
        }
      ],
      formvideo: {
        AppKey: "",
        Secret: ""
      },
      dialogVisible: true,
      elformVisible: true,
      Videolist: [
        {
          addr:
            "http://hls01open.ys7.com/openlive/833d6e5a7e334697aac99638d3203d42.m3u8",
          id: 1,
          name: "阳澄湖木屋"
        },
        {
          addr:
            "http://hls01open.ys7.com/openlive/c1e7cef992584d8b988a459a3965683d.m3u8",
          id: 2,
          name: "阳澄湖木屋左"
        }
      ],
      hls: ""
    };
  },
  created() {},
  mounted() {
    //初始化视频
    this.$nextTick(() => {
      this.vueintro();
    });

    this.attach();
  },
  methods: {
    vueintro() {
      let vintro = require("intro.js");
      vintro().start();
    },
    submitForm() {
      console.log(this.formvideo);
    },
    resetForm() {
      console.log("取消");
    },
    //初始化加载
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //初始化挂载
    attach() {
      for (let i = 0; i < this.Videolist.length; i++) {
        //新建实例
        this.Videolist[i].hls = new Hls();
        //挂载Video标签
        this.Videolist[i].hls.attachMedia(
          this.$refs[this.Videolist[i].name][0]
        );
        //挂载视频源
        this.Videolist[i].hls.loadSource(this.Videolist[i].addr);
        //挂载成功
        this.Videolist[i].hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.Videolist[i].statu = true;
        });
        //挂载失败
        this.Videolist[i].hls.on(Hls.Events.ERROR, (event, data) => {
          this.Videolist[i].statu = false;
          this.$message.error("挂载失败：" + this.Videolist[i].name);
        });
      }
    }
  },
  beforeDestroy() {
    for (let io = 0; io < this.Videolist.length; io++) {
      //销毁
      this.Videolist[io].hls.destroy();
    }
  }
};
</script>
<style lang="less" scoped>
a{
  margin-left: 10px;
  color: #409EFF;
  text-decoration: none;
}

.el-card {
  height: 300px;
}
.videostyle {
  border: 3px solid rgba(1, 1, 1, 0.1);
  width: 100%;
  height: 200px;
}
video::-webkit-media-controls-timeline {
  display: none;
}
video::-webkit-media-controls-current-time-display {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
@media screen and (max-width: 1400px) {
}
</style>