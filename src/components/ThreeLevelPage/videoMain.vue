<template>
  <div>
    <el-row :gutter="12">
      <!--卡片视图 -->
      <el-col :span="16">
        <el-card>
          <div slot="header" class="clearfix">
            <span>监控名：{{message.channelName}}</span>
          </div>
          <div>
            <video class="videostyle" ref="video1" controls></video>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
      hls:'',
      statu:"",
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
    };
  },
  created() {

  },
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
    //初始化加载
    //初始化挂载
    attach() {
        //新建实例
        this.hls = new Hls
        //挂载Video标签
        this.hls.attachMedia(
          this.$refs.video1
        );
        //挂载视频源
        this.hls.loadSource(this.message.picUrl);
        //挂载成功
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.statu = true;
        });
        //挂载失败
        this.hls.on(Hls.Events.ERROR, (event, data) => {
          this.statu = false;
          //this.$message.error("挂载失败：" + this.message.channelName);
        });
    }
  },
  beforeDestroy() {
      //销毁
      this.hls.destroy();
  }
};
</script>
<style lang="less" scoped>
a {
  margin-left: 10px;
  color: #409eff;
  text-decoration: none;
}
.vueloading {
  position: absolute;
  height: 100%;
}
.el-card {
  height: 500px;
}
.videostyle {
  border: 3px solid rgba(1, 1, 1, 0.1);
  width: 100%;
  height: 400px;
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