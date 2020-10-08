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
      <el-col :span="1" class="nocenter" onclick="window.open('http://120.79.194.86:9527/','_self')" style="font-size:0.9em">
        <span>后台管理</span>
      </el-col>
       <el-col :span="6" class="xinjia">
        <span>2017年江苏省重点研发计划（现代农业）项目示范班基地</span>
      </el-col>
      <el-col :span="10" >
        <span style="font-size:1.5em;" >基于“互联网大数据的农村科技服务智慧平台关键技术研发与集成示范”项目（BE2017371）--</span>
        <span style="font-size:1.3em">坤泰农业物联网平台</span>
        <dv-decoration-5 style="height:28px" />
      </el-col>
      <el-col :span="7">
        <p class="date" v-if="datebool">{{ datea }} {{ timea }}</p>
      </el-col>
    </el-row>
    <el-row class="biaolan">
      <el-col :span="6" style="overflow:hidden;">
        <el-row class="zcb">
          <el-col class="xinwen" v-loading="login1" element-loading-background="rgba(0, 0, 0, 0.2)">
            <div class="xinwentotle">
              <span>农业新闻</span>
            </div>
            <div class="xinwenbody" v-for="o in xinwenlist" :key="o.id">
              <i class="el-icon-link"></i>
              <a :href="o.href" target="_blank" class="xinwenbiaoti">{{o.name}}</a>
            </div>
          </el-col>
          <el-col>
            <div class="xinwentotle">
              <span>天气预报</span>
            </div>
            <div style="margin-top:40px;text-align:center;">
              <el-row :gutter="20" style="margin:1px">
                <el-col :span="8" v-for="i in tianqilist " :key="i.id" class="noborad">
                  <el-card class="box-card" style="color: rgb(51, 136, 255);">
                    <div slot="header">
                      <span>{{i.date}}</span>
                    </div>
                    <div>
                      <i :class="i.icon"></i>
                    </div>
                    <div>
                      <div style="color:rgb(170, 203, 248);">{{i.tianqi}}</div>
                      <div style="color:red">{{i.qiwen}}</div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col v-loading="login2" element-loading-background="rgba(0, 0, 0, 0.2)">
            <div class="xinwentotle">
              <span>实时行情（批发）</span>
            </div>
            <dv-scroll-board :config="config" style="width:100%;height:240px" v-if='hangqi' />
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
                    :total="50"
                    @current-change="sizechangeA"
                  ></el-pagination>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8" class="cardph" v-for="y in cgcardlist" :key="y.i">
                  <el-card sty>
                    <div slot="header" class="clearfix">
                      <span>{{y.id}}号槽</span>
                    </div>
                    <div>
                      <span class="cardvlu">{{y.vlu}}:</span>
                      <span class="carddata">{{y.data}}</span>
                      <span style="color:rgb(130, 179, 247);padding-left: 3px;">{{y.fuhao}}</span>
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
              <!-- 这里改变跳动的点的定位-->
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
                  <el-pagination background layout="pager" :total="50" @current-change="sizechange"></el-pagination>
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
import { ConeGeometry } from 'three';
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmMapType,
  },
  data() {
    return {
      hangqi:true,
      login1: true,
      login2:true,
      tianqilist: [],
      texti: 0,
      sssjbt: null,
      //地图定位经纬度（不用改）
      center: { lng: 0, lat: 0 },
      //地图（不用改）
      zoom: 3,
      //时间显示（不用改）
      datebool: true,
      //视频实例（不用改）
      hls: "",
      //视频实例（不用改）
      hls1: "",
      //实时数据数据源
      sssjlist: [
        [
          {
            id: 1,
            vlu: "pH",
            data: 7.2,
          },
          {
            id: 1,
            vlu: "温度",
            data: "31.1",
            fuhao: "℃",
          },
          {
            id: 1,
            vlu: "溶解氧",
            data: "9.1",
            fuhao: "mg/L",
          },
        ],
        [
          {
            id: 2,
            vlu: "pH",
            data: "7.5",
          },
          {
            id: 2,
            vlu: "温度",
            data: "31.05",
            fuhao: "℃",
          },
          {
            id: 2,
            vlu: "溶解氧",
            data: "7.7",
            fuhao: "mg/L",
          },
        ],
        [
          {
            id: 3,
            vlu: "pH",
            data: "7.6",
          },
          {
            id: 3,
            vlu: "温度",
            data: "31.15",
            fuhao: "℃",
          },
          {
            id: 3,
            vlu: "溶解氧",
            data: "7.9",
            fuhao: "mg/L",
          },
        ],
        [
          {
            id: 4,
            vlu: "pH",
            data: "7.6",
          },
          {
            id: 4,
            vlu: "温度",
            data: "31.16",
            fuhao: "℃",
          },
          {
            id: 4,
            vlu: "溶解氧",
            data: "9.0",
            fuhao: "mg/L",
          },
        ],
        [
          {
            id: 5,
            vlu: "pH",
            data: "7.5",
          },
          {
            id: 5,
            vlu: "温度",
            data: "31.11",
            fuhao: "℃",
          },
          {
            id: 5,
            vlu: "溶解氧",
            data: "8.7",
            fuhao: "mg/L",
          },
        ],
      ],
      //实时数据当前数据
      cgcardlist: [],
      //数据统计数据源
      echartdata: [
        {
          title: "1号槽",
          codvalue: [
            2.2,
            1.9,
            1.7,
            1.9,
            3.7,
            6.1,
            8.2,
            8.6,
            9.0,
            6.4,
            4.7,
            3.7,
          ],
          phvalue: [7.2, 7.2, 7.2, 7.5, 7.6, 7.7, 7.2, 7.7, 7.3, 8.1, 7.3, 7.5],
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
            "22:00",
          ],
        },
        {
          title: "2号槽",
          codvalue: [2.2, 1.8, 1.9, 2, 3.5, 5.1, 8.6, 8.7, 9.0, 6.3, 4.2, 3.2],
          phvalue: [7.5, 7.2, 7.6, 7.5, 7.6, 7.2, 7.4, 7.1, 7.6, 7.7, 7.4, 7.6],
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
            "22:00",
          ],
        },
        {
          title: "3号槽",
          codvalue: [2, 1.5, 1.6, 1.9, 4, 7, 8.7, 8.9, 9.2, 6.1, 4.2, 2.2],
          phvalue: [7.2, 7.4, 7.3, 7.7, 7.4, 7.3, 7.4, 7.4, 7.5, 7.6, 7.4, 7.3],
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
            "22:00",
          ],
        },
        {
          title: "4号槽",
          codvalue: [2.6, 1.0, 1.9, 3.0, 4.2, 7.5, 9, 9.1, 9.2, 6.5, 3.9, 2.0],
          phvalue: [7.6, 7.7, 7.6, 7.5, 7.4, 7.3, 7.6, 7.5, 7.3, 7.2, 7.2, 7.6],
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
            "22:00",
          ],
        },
        {
          title: "5号槽",
          codvalue: [1.2, 1.0, 3.2, 3.5, 5, 6.5, 7.8, 7.6, 7.7, 6.2, 4.2, 2.0],
          phvalue: [7.2, 7.5, 7.7, 7.3, 7.6, 7.5, 7.4, 7.5, 7.4, 7.3, 7.5, 7.2],
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
            "22:00",
          ],
        },
      ],
      //视屏原数据地址
          Videolist: [
        {
          addr:
            "http://hls.open.ys7.com/openlive/375c7862239a4cdf9fe71d2bfb523bcd.m3u8",
          id: 1,
          name:"槽内1",
        },
        {
          addr:
            "http://hls01open.ys7.com/openlive/54e7f3d3561e4da9a1bd294ec84cf7c6.m3u8",
          id: 2,
          name: "槽内2",
        },
      ],
      //实时行情数据源地址
      config: {
        header: ["日期", "名称", "价格"],
        data: [],
      },
      //农业新闻数据源地址
      xinwenlist: [],
      //时间1（不用改）
      timea: "",
      //时间2（不用改）
      datea: "",
      //时间3（不用改）
      weeka: [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
    };
  },
  created() {
    //数据处理
    //1.页面定时刷新1.2s
    //--1.刷新时间
    this.timedRefreshb();
    //新闻数据
    this.hangqi=false;
    this.xinwenpc();
    this.tianqipc();
    this.hangqingpc();
  },
  mounted() {
    //初始化图标
    this.drawLine(this.echartdata[0]);
    //初始化农业新闻部分字数限制工能

    this.$nextTick(() => {
      //初始化头部特效
      this.vueintro();
      //初始化实时数据
      this.cgcardlist = this.sssjlist[0];
    });
    //挂载视频
    this.attach();
  },
  methods: {
    //行情
    async hangqingpc() {
      const { data } = await this.$http.get("pachongshuichan");
      console.log(data)
       if (data) { 
         this.config.data=data;
         this.hangqi=true;
         this.login2=false;
      } else {
        this.$message.error("获取新闻错误");
      }
    },
    //新闻爬虫
    async xinwenpc() {
      const { data } = await this.$http.get("pachong");
      if (data) {
        data.length = 10;
        let aa = data;
        for (let i = 0; i < aa.length; i++) {
          if (aa[i].name.length > 20) {
            aa[i].name = aa[i].name.substring(0, 23) + "...";
          }
        }
        this.xinwenlist = aa;
        this.login1 = false;
      } else {
        this.$message.error("获取新闻错误");
      }
    },
    //天气爬虫
    async tianqipc() {
      const { data } = await this.$http.get("pachongtianqi");
      if (data) {
        let datalist = data
        for(let i=0;i<datalist.length;i++){
          switch(true){
          case datalist[i].icon==="d00":
          datalist[i].icon="el-icon-sunny";
          break;
          case datalist[i].icon==="d01"||datalist[i].icon==="d02":
          datalist[i].icon="el-icon-cloudy-and-sunny";
          break;
          case datalist[i].icon==="d08":
          datalist[i].icon="el-icon-heavy-rain";
          break;
        }
        }
        for (let i = 0; i < data.length; i++) {
          this.tianqilist[i]={
            date: datalist[i].date,
            icon: datalist[i].icon,
            tianqi: datalist[i].wea,
            qiwen: datalist[i].temp,
          };
        }
      } else {
        this.$message.error("获取天气错误");
      }
    },
    //地图定位经纬度，zoom：缩放等级
    handler({ BMap, map }) {
      //昆泰经纬度
      //lng:118.972209 lat31.810735
      (this.center.lng = 118.935335),
        (this.center.lat = 31.822074),
        (this.zoom = 17);
    },
    //实时数据部分改变标号进行的函数
    sizechangeA(data) {
      this.sssjbt = data;
      this.cgcardlist = this.sssjlist[data - 1];
    },
    //刷新函数
    timedRefreshb() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.datebool = false;
          this.updateTime();
          this.datebool = true;
          //this.shuju();
        }, 1200);
      }
    },
    //实时数据获取函数
    shuju() {
      if (this.sssjbt) {
        if (this.texti < 14) {
          this.texti += 1;
        } else {
          this.texti = 0;
        }
        this.sssjlist[this.sssjbt - 1][0].data = this.texti;
        this.cgcardlist = this.sssjlist[this.sssjbt - 1];
      } else {
        if (this.texti < 14) {
          this.texti += 1;
        } else {
          this.texti = 0;
        }
        this.sssjlist[0][0].data = this.texti;
        this.cgcardlist = this.sssjlist[0];
      }
    },
    //时间显示相关
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
    //时间显示相关
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    //////////////////////////
    //数据统计改变标号触发的函数
    sizechange(data) {
      let myChart = this.$echarts.init(document.getElementById("dpmyChart"));
      myChart.clear();
      this.drawLine(this.echartdata[data - 1]);
      // console.log("data", data);
    },
    //绘制曲线
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("dpmyChart"));
      let colors = ["#5793f3", "#d14a61", "#675bba"];
      // 绘制图表配置
      let option = {
        title: {
          text: data.title,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["溶解氧", "pH值"],
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.time,
          axisLabel: {
            textStyle: {
              //改变刻度字体样式
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            textStyle: {
              //改变刻度字体样式
              color: "#fff",
            },
          },
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
                  color: "#8cd5c2", //改变折线颜色
                },
              },
            },
          },
          {
            name: "pH值",
            type: "line",
            data: data.phvalue,
            smooth: true,
          },
        ],
      };
      // 窗口大小自适应方案
      myChart.setOption(option);
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize();
        };
      }, 200);
    },
    //初始化头部特效
    vueintro() {
      let vintro = require("intro.js");
      vintro().start();
    },
    //视频加载
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
    //退出后销毁
    beforeDestroy() {
      //销毁
      this.hls.destroy();
      this.hls1.destroy();
    },
  },
};
</script>

<style lang="less" scoped>
.xinjia{
  margin-top:20px ;
}
.xinwenbiaoti {
  padding-left: 5px;
  color: #95d6ee;
  transition: color 1s;
  transition: font-size 0.5s;
}
.xinwenbiaoti:hover {
  color: rgb(255, 255, 255);
  font-size: 1.02em;
}
.cardph {
  height: 260px;
  margin-top: 1%;

  .el-card {
    background-color: rgba(151, 151, 151, 0.4);
    border: 0;
    margin: 10px;
    height: 160px;
    text-align: center;
    letter-spacing: 0.2em;
    transition: border 1s;
    transition: background 1s;
  }
  .el-card:hover {
    border: 1px solid rgba(255, 255, 255, 0.445);
    background-color: rgba(255, 255, 255, 0.5);
  }
  .clearfix {
    font-size: 1.2em;
    color: rgb(130, 179, 247);
  }
  .cardvlu {
    font-weight: 700;
    line-height: 110px;
    font-size: 1.8em;
    color: rgb(130, 179, 247);
  }
  .carddata {
    font-weight: 700;
    font-size: 2em;
    color: rgb(194, 53, 49);
    padding-left: 3px;
  }
}
.shuju {
  width: 98%;
  height: 250px;
  margin: 10px;
  border: 2px solid rgb(149, 214, 238);
}
.ditu {
  height: 700px;
  margin: 0px 5px;
}
.bm-view {
  border-top: 2px solid rgba(170, 203, 248, 0.5);
  width: 99%;
  height: 680px;
  padding: 2px 0px;
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
.box-card {
  background: none;
  transition: background 1s;
}
.box-card:hover {
  background: rgba(255, 255, 255, 0.5);
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
    padding: 0px;
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