<template>
  <div class="hid">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <el-row class="headrow">
      <el-col :span="7" class="nocenter">
        <span>后台管理</span>
      </el-col>
      <el-col :span="10">
        <span style="font-size:2em">南京宏顺物联网智慧水产平台</span>
        <dv-decoration-5 style="height:28px" />
      </el-col>
      <el-col :span="7">
        <p class="date" v-if="datebool">{{ datea }} {{ timea }}</p>
      </el-col>
    </el-row>

    <el-row class="biaolan">
      <el-col :span="6" style="overflow:hidden;">
        <el-row class="zcb">
          <el-col class="xinwen">
            <div class="xinwentotle">
              <span>农业新闻</span>
            </div>
            <div class="xinwenbody" v-for="o in xinwenlist" :key="o.id">
              <i class="el-icon-link"></i>
              <a :href="o.url">{{o.title}}</a>
              <div>{{o.body}}</div>
            </div>
          </el-col>
          <el-col>
            <div class="xinwentotle">
              <span>天气预报</span>
            </div>
            <div style="margin-top:40px;text-align:center;">
              <el-row :gutter="20" style="margin:1px">
                <el-col :span="8" v-for="i in 3 " :key="i.id" class="noborad">
                  <el-card class="box-card" style="color: rgb(51, 136, 255);">
                    <div slot="header">
                      <span>7月5号今天</span>
                    </div>
                    <div>
                      <i class="el-icon-heavy-rain"></i>
                    </div>
                    <div>
                      <span style="color:rgb(170, 203, 248);">多云转小雨</span>
                      <span style="color:red">22°-26°</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col>
            <div class="xinwentotle">
              <span>实时行情</span>
            </div>
            <!-- <div class="t_btn2">
              <el-table :data="tableData" height="240" border style="width: 100%">
                <el-table-column prop="name" label="品名" width="80"></el-table-column>
                <el-table-column prop="jiage" label="价格" width="100"></el-table-column>
                <el-table-column prop="date" label="日期"></el-table-column>
              </el-table>
            </div>-->
            <dv-scroll-board :config="config" style="width:100%;height:240px" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="zj">
        <el-row>
          <el-col class="shuju">
            <div class="xinwentotle">
              <el-row>
                <el-col :span="2" class="noborad">
                  <span>实时数据</span>
                </el-col>
                <el-col :span="20" class="noborad">
                  <el-pagination
                    background
                    layout="pager"
                    :total="80"
                    @current-change="sizechangeA"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8" class="cardph" v-for="y in cgcardlist" :key="y.i">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>{{y.id}}号槽</span>
                    </div>
                    <div>
                      <span class="cardvlu">{{y.vlu}}:</span>
                      <span class="carddata">{{y.data}}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col class="ditu">
            <baidu-map
              class="bm-view"
              :center="center"
              :zoom="zoom"
              @ready="handler"
              ak="Wys7Yq0iibMhAVzAOVwKtRHRpeMQah3e"
            >
              <bm-marker
                :position="{lng: 118.935335, lat: 31.822074}"
                :dragging="true"
                animation="BMAP_ANIMATION_BOUNCE"
              ></bm-marker>
              <bm-map-type
                :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                anchor="BMAP_ANCHOR_TOP_LEFT"
              ></bm-map-type>
            </baidu-map>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="ycb">
          <el-col>
            <div class="xinwentotle">
              <el-row>
                <el-col :span="4" class="noborad">
                  <span>数据统计</span>
                </el-col>
                <el-col :span="18" class="noborad">
                  <el-pagination background layout="pager" :total="80" @current-change="sizechange"></el-pagination>
                </el-col>
              </el-row>
            </div>
            <div>
              <div id="dpmyChart" class="Block3"></div>
            </div>
          </el-col>
          <el-col>
            <div class="xinwentotle">
              <span>水槽监控</span>
            </div>
            <div class="jiankong">
              <video class="videostyle" ref="dovideo1" controls></video>
            </div>
          </el-col>
          <el-col>
            <div class="xinwentotle">
              <span>外围监控</span>
            </div>
            <div class="jiankong">
              <video class="videostyle" ref="dovideo2" controls></video>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import { BmMarker, BmMapType } from "vue-baidu-map";
import Hls from "hls.js";
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmMapType
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      datebool: true,
      hls: "",
      hls1: "",
      cgcardlist: [
        {
          id: 1,
          vlu: "pH",
          data: "4.5"
        },
        {
          id: 1,
          vlu: "T",
          data: "25"
        },
        {
          id: 1,
          vlu: "DO",
          data: "4.5"
        }
      ],
      echartdata: [
        {
          title: "1号槽",
          codvalue: [4, 5, 5, 7, 4, 3, 3, 8, 6, 4, 5, 3],
          phvalue: [7, 6, 5, 3, 4, 6, 7, 8, 2, 5, 6, 7],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "2号槽",
          codvalue: [4, 5, 6, 8, 4, 4, 3, 2, 6, 4, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "3号槽",
          codvalue: [4, 5, 5, 7, 7, 3, 4, 8, 3, 7, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "4号槽",
          codvalue: [4, 5, 5, 5, 5, 3, 4, 5, 3, 7, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "5号槽",
          codvalue: [4, 5, 2, 7, 7, 3, 4, 3, 3, 2, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "6号槽",
          codvalue: [4, 5, 1, 7, 7, 3, 4, 8, 3, 3, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "7号槽",
          codvalue: [4, 5, 5, 2, 7, 3, 4, 8, 3, 3, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        {
          title: "8号槽",
          codvalue: [4, 5, 6, 7, 7, 7, 8, 8, 6, 7, 5, 3],
          phvalue: [7.1, 7.7, 7.8, 7.9, 6.5, 6.4, 6.2, 5.8, 5.4, 4.2, 7.5, 6.1],
          time: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        }
      ],
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

      config: {
        header: ["日期", "名称", "价格"],
        data: [["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],
        ["2016-05-03", "小鱼", "20/斤"],]
        
      },

      xinwenlist: [
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        }
      ],
      timea: "",
      datea: "",
      weeka: [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ]
    };
  },
  created() {
    this.timedRefreshb();
  },
  mounted() {
    this.drawLine(this.echartdata[0]);
    this.jiequzfc();
    //初始化视频
    this.$nextTick(() => {
      this.vueintro();
    });
    this.attach();
  },
  methods: {
    handler({ BMap, map }) {
      (this.center.lng = 118.935335),
        (this.center.lat = 31.822074),
        (this.zoom = 17);
    },
    sizechangeA(data) {},
    timedRefreshb() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.datebool = false;
          this.updateTime();
          this.datebool = true;
        }, 1200);
      }
    },
    updateTime() {
      let cd = new Date();
      this.timea =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.datea =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.weeka[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    ///////////////////////
    sizechange(data) {
      let myChart = this.$echarts.init(document.getElementById("dpmyChart"));
      myChart.clear();
      this.drawLine(this.echartdata[data - 1]);
      // console.log("data", data);
    },
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("dpmyChart"));
      let colors = ["#5793f3", "#d14a61", "#675bba"];
      // 绘制图表配置
      let option = {
        title: {
          text: data.title,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["溶解氧", "pH值"],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.time,
          axisLabel: {
            textStyle: {
              //改变刻度字体样式
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            textStyle: {
              //改变刻度字体样式
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "溶解氧",
            type: "line",
            data: data.codvalue,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "#8cd5c2" //改变折线颜色
                }
              }
            }
          },
          {
            name: "pH值",
            type: "line",
            data: data.phvalue,
            smooth: true
          }
        ]
      };
      // 窗口大小自适应方案
      myChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    },

    vueintro() {
      let vintro = require("intro.js");
      vintro().start();
    },
    attach() {
      //新建实例
      this.hls = new Hls();
      this.hls1 = new Hls();
      //挂载Video标签
      this.hls.attachMedia(this.$refs.dovideo1);
      this.hls1.attachMedia(this.$refs.dovideo2);
      //挂载视频源
      this.hls.loadSource(this.Videolist[0].addr);
      this.hls1.loadSource(this.Videolist[1].addr);
      //挂载成功
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.statu = true;
      });
      this.hls1.on(Hls.Events.MANIFEST_PARSED, () => {
        this.statu = true;
      });
      //挂载失败
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        this.statu = false;
        //this.$message.error("挂载失败：" + this.message.channelName);
      });
      this.hls1.on(Hls.Events.ERROR, (event, data) => {
        this.statu = false;
        //this.$message.error("挂载失败：" + this.message.channelName);
      });
    },
    beforeDestroy() {
      //销毁
      this.hls.destroy();
      this.hls1.destroy();
    },

    jiequzfc() {
      this.xinwenlist.forEach(item => {
        if (item.title.length > 26) {
          item.title = item.title.substring(0, 26) + "...";
        }
        if (item.body.length > 26) {
          item.body = item.body.substring(0, 26) + "...";
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cardph {
  height: 260px;
  margin-top: 5%;
  .el-card {
    height: 260px;
    text-align: center;
    letter-spacing: 0.2em;
  }
  .clearfix {
    font-size: 1.8em;
    color: rgb(130, 179, 247);
  }
  .cardvlu {
    font-size: 3em;
    color: rgb(130, 179, 247);
  }
  .carddata {
    font-size: 7em;
    color: rgb(194, 53, 49);
  }
}
.shuju {
  width: 98%;
  height: 450px;
  margin: 10px;
  border: 2px solid rgb(149, 214, 238);
}
.ditu {
  height: 500px;
  margin: 0px 5px;
}
.bm-view {
  border-top: 2px solid rgba(170, 203, 248, 0.5);
  width: 99%;
  height: 480px;
}
.date {
  color: #daf6ff;
  letter-spacing: 0.1em;
  font-size: 24px;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  margin-top: 5px;
}
/////////////////////////////////
.Block3 {
  width: 100%;
  height: 245px;
  // background: burlywood;
}
.jiankong {
  width: 100%;
  position: relative;
  padding-bottom: 53%; /*9除以16*/
  height: 0;
}
.videostyle {
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-table {
  color: rgb(170, 203, 248);
}
.el-card {
  background: none;
}
.xinwentotle /deep/ .el-pager li {
  font-size: 5px;
  height: 20px;
  line-height: 20px;
}
.xinwentotle /deep/ .el-pagination.is-background .el-pager li {
  margin: 0 2px;
  min-width: 20px;
  background-color: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.t_btn2 /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
.t_btn2 /deep/ .el-table thead {
  color: rgb(130, 179, 247);
}
.t_btn2 /deep/ .el-table tr {
  background-color: transparent !important;
}

.t_btn2 /deep/ .el-table th {
  background-color: transparent !important;
}

.t_btn2 /deep/ .el-table__row > td {
  border: none;
}
.t_btn2 /deep/ .el-table--border th {
  border-right: none;
}
.t_btn2 /deep/ .el-table--border {
  border: none;
}
.t_btn2 /deep/ .el-table--border::after {
  background-color: transparent !important;
}
/* 清除底部横线 */
.el-table::before {
  height: 0px;
}

.noborad {
  i {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 70px;
    color: rgb(51, 136, 255);
  }
}

#noborad /deep/ .el-card__body {
  padding: 0px;
}
#noborad /deep/ .el-card__header {
  padding: 0px;
}

/////////////////////////////////////
.hid {
  width: 100%;
  height: 100%;
  background-color: rgb(2, 29, 46);
  overflow: hidden;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
.headrow :not(.nocenter) {
  padding-top: 0.2%;
  color: white;
  text-align: center;
}
.nocenter {
  cursor: pointer;
  margin-top: 1%;
  span {
    margin: 10px;
    padding: 10px;
    border: 1px solid white;
  }
}

.zcb {
  a {
    color: rgb(149, 214, 238);
    text-decoration: none;
  }
  margin: 1%;
  height: 100%;
  .xinwentotle {
    margin: 10px;
    span {
      white-space: nowrap;
      color: rgb(149, 214, 238);
    }
  }
  .xinwenbody {
    margin: 3px;
    color: white;
    font-size: 1em;
    div {
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
  .el-col:not(.noborad) {
    border: 8px solid;
    border-radius: 10px;
    height: 19rem;
    margin-top: 15px;
    background: rgba(16, 39, 95, 0.329);
    border-image: -webkit-linear-gradient(
        rgba(0, 195, 255, 0.445),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: -moz-linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
  }
}
.zj {
  border: 2px solid rgba(147, 186, 231, 0.8);
  border-radius: 10px;
  margin-top: 15px;
  height: 60rem;
  background: rgba(16, 39, 95, 0.329);
  .xinwentotle {
    margin: 10px;
    span {
      white-space: nowrap;
      color: rgb(149, 214, 238);
    }
  }
}
.ycb {
  margin: 1%;
  height: 100%;
  .xinwentotle {
    margin: 10px;
    span {
      white-space: nowrap;
      color: rgb(149, 214, 238);
    }
  }
  .el-col:not(.noborad) {
    border: 8px solid;
    border-radius: 10px;
    height: 19rem;
    margin-top: 15px;
    background: rgba(16, 39, 95, 0.329);
    border-image: -webkit-linear-gradient(
        rgba(0, 195, 255, 0.445),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: -moz-linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
  }
}
</style>