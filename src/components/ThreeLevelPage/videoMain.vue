<template>
  <div>
    <el-row :gutter="12">
      <!--卡片视图 -->
      <el-col :span="6" v-for="video in Videolist" :key="video.id" :index="video.id +''">
        <el-card>
          <div slot="header" class="clearfix">
            <span>监控名：{{video.name}}</span>
          </div>
          <div>
            <video class="videostyle" :ref="video.name" controls></video>
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
        },
     
      ],
      hls: ""
    };
  },
  created() {},
  mounted() {
    //初始化视频
    this.attach();
  },
  methods: {
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
.el-card{
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