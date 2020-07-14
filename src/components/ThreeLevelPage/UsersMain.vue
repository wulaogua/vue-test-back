<template>
  <div>
    <div v-if="dateshow">
      <span>实时数据</span>
      <span>{{nowdateO}}</span>
    </div>
    <el-divider class="dividermarg"></el-divider>
    <el-row :gutter="12" v-if="dateshow">
      <!--卡片视图 -->
      <el-col :span="4" v-for="citem in Cardlist" :key="citem.id" :index="citem.id +''">
        <el-card class="card" :style="{background:cardcolor[citem.name]}">
          <el-row type="flex" align="middle">
            <el-col :span="5" class="iconsize">
              <i :class="CiconObj[citem.name]"></i>
            </el-col>
            <el-col :span="19" align="center">
              <div class="fontsize">
                <span>{{citem.nikename}}</span>
                <div>{{citem.data}} {{cardfuhao[citem.name]}}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-row class="biaotoushijian">
          <el-col :span="3">
            <span>小时数据</span>
            <i class="el-icon-data-analysis" @click="datashowfun()"></i>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <span>选择时间：</span>
          </el-col>
          <el-col :span="9">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button @click="seachdata()">查询</el-button>
          </el-col>
        </el-row>
        <el-divider class="dividermarg"></el-divider>
        <el-table :data="tableData" stripe style="width: 100%" height="430" v-show="!dataShow">
          <el-table-column prop="date" label="时间" width="280"></el-table-column>
          <el-table-column prop="nikename" label="设备名称" width="200"></el-table-column>
          <el-table-column prop="data" label="数据"></el-table-column>
        </el-table>
        <div id="ech" class="block" ref="echer" v-show="dataShow"></div>
      </el-col>
      <el-col :span="4">
        <div>片区信息</div>
        <el-divider class="dividermarg"></el-divider>
        <img src="../../assets/logo.png" alt />
        <div>片区名称：苏鲜润大棚</div>
        <el-divider class="dividermarg"></el-divider>
        <div>片区位置：</div>
        <el-divider class="dividermarg"></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dsa",
  props: ["message"],
  computed: {
    listData() {
      return this.message;
    }
  },
  watch: {
    listData(val) {
      this.dateshow = false;
      if (!this.message.machinekey) {
        this.qixiangzhan();
         
      } else {
        this.nowdateO = this.message.date;
        this.Cardlist = this.message.value;
        this.$nextTick(() => {
          this.dateshow = true;
        });
      }
    }
  },
  data() {
    return {
      dateshow: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: [],
      creatdata: new Array(),
      nowdateO: "",
      dataShow: this.$store.state.datavhouer,
      dasd: this.message,
      tableData: [],
      dialogFormVisible: false,
      Cardlist: [],
      CiconObj: {
        tair1: "iconfont icon-wendu",
        tair2: "iconfont icon-wendu",
        tair3: "iconfont icon-wendu",
        airhumidity1: "iconfont icon-IOTtubiao_huabanfuben",
        airhumidity2: "iconfont icon-IOTtubiao_huabanfuben",
        airhumidity3: "iconfont icon-IOTtubiao_huabanfuben",
        Soiltemp1: "iconfont icon-turangwendu",
        Soiltemp2: "iconfont icon-turangwendu",
        Soiltemp3: "iconfont icon-turangwendu",
        soilmoisture1: "iconfont icon-turangshidu",
        soilmoisture2: "iconfont icon-turangshidu",
        soilmoisture3: "iconfont icon-turangshidu",
        soi1: "iconfont icon-guangzhao",
        soi2: "iconfont icon-guangzhao",
        soi3: "iconfont icon-guangzhao",
        co21: "iconfont icon-icon-co",
        co22: "iconfont icon-icon-co",
        co23: "iconfont icon-icon-co",
        fengsu: "iconfont icon-fengsu",
        fengxiang: "iconfont icon-wind-direction"
      },
      cardcolor: {
        tair1: "#35C0CD",
        tair2: "#5EC4CD",
        tair3: "#1E6D74",
        airhumidity1: "#0B5FA5",
        airhumidity2: "#25547B",
        airhumidity3: "#66A1D2",
        Soiltemp1: "#ff7400",
        Soiltemp2: "#ff9640",
        Soiltemp3: "#BF7130",
        soilmoisture1: "#A64B00",
        soilmoisture2: "#ffB273",
        soilmoisture3: "#A65400",
        soi1: "#ff4500",
        soi2: "#ffDE00",
        soi3: "#ff9973",
        co21: "#84E900",
        co22: "#A4F43D",
        co23: "#37DC74",
        fengsu: "#37DC74",
        fengxiang: "#ffDE00"
      },
      cardfuhao: {
        tair1: "℃",
        tair2: "℃",
        tair3: "℃",
        airhumidity1: "%",
        airhumidity2: "%",
        airhumidity3: "%",
        Soiltemp1: "℃",
        Soiltemp2: "℃",
        Soiltemp3: "℃",
        soilmoisture1: "%",
        soilmoisture2: "%",
        soilmoisture3: "%",
        soi1: "LUX",
        soi2: "LUX",
        soi3: "LUX",
        co21: "ppm",
        co22: "ppm",
        co23: "ppm",
        fengsu: "m/s",
        fengxiang: "°"
      },
      xzdateh: [],
      show: false,
      biaodata: [],
      show: false,
      biaodata: ["", "", "", "", "", ""],
      option: {},
      myChart: "",
      qixiangzhandata: {}
    };
  },
  created() {
    if (!this.message.machinekey) {
      this.qixiangzhan();
    } else {
      this.nowdateO = this.message.date;
      this.Cardlist = this.message.value;
      this.dateshow = true;
      //this.biaogedata();
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.echer);
    //this.drawLine();
  },

  methods: {
    //时间格式转换函数（data为转换自定义new Date（）或者element中的日期时间按钮组件v-model的值）
    formdate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    seachdata() {
      let fdate = this.formdate(this.value2[0]);
      let sdate = this.formdate(this.value2[1]);
      this.biaogedata(fdate, sdate);
    },
    qixiangzhan() {
     // const { data } = await this.$http.post("seachdata/qx24houer");
      this.qixiangzhandata = {
        date: this.message.time,
        value: [
          {
            data: this.message.airhumidity1,
            nikename: "空气湿度",
            name: "airhumidity1"
          },
          { data: this.message.tair1, nikename: "空气温度", name: "tair1" },
          { data: this.message.soi1, nikename: "光照强度", name: "soi1" },
          { data: this.message.fengsu, nikename: "风速", name: "fengsu" },
          { data: this.message.fengxiang, nikename: "风向", name: "fengxiang" }
        ]
      };
      this.Cardlist = this.qixiangzhandata.value;
      //this.tableData = data;
      this.dateshow = true;
    },
    async biaogedata(fdate, sdate) {
      const { data } = await this.$http.post("seachdata/24houer", {
        machinekey: this.message.machinekey,
        fdate: fdate,
        sdate: sdate
      });
      if (data) {
        this.tableData = data[0];
        this.biaodata = data[1];
        this.xzdateh = data[2];
        this.drawLine();
      } else {
        this.$message.error("获取错误");
      }
    },
    //卡片
    creatdatas() {},
    //切换
    datashowfun() {
      this.$store.commit("datavhouerfun");
      if (this.$store.state.datavhouer) {
        this.myChart.clear();
        this.myChart.setOption(this.option);
      }
    },
    //画曲线
    drawLine() {
      // 窗口大小自适应方案
      this.option = {
        title: {
          text: "数据折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "土壤温度（平均）",
            "土壤湿度（平均）",
            "大气温度（平均）",
            "大气湿度（平均）",
            "光照强度X10（平均）",
            "CO2浓度x10（平均）"
          ]
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "5%",
          bottom: "0%",
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
          data: this.xzdateh
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "土壤温度（平均）",
            type: "line",
            data: this.biaodata[0]
          },
          {
            name: "土壤湿度（平均）",
            type: "line",
            data: this.biaodata[1]
          },
          {
            name: "大气温度（平均）",
            type: "line",
            data: this.biaodata[2]
          },
          {
            name: "大气湿度（平均）",
            type: "line",
            data: this.biaodata[3]
          },
          {
            name: "光照强度X10（平均）",
            type: "line",
            data: this.biaodata[4]
          },
          {
            name: "CO2浓度x10（平均）",
            type: "line",
            data: this.biaodata[5]
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
  }
};
</script>
<style lang="less" scoped>
.biaotoushijian {
  .el-col {
    line-height: 40px;
  }
}
.el-date-picker {
  width: 300px;
}
.block {
  width: 100%;
  height: 300px;
}
.el-card {
  margin-bottom: 10px;
  .el-card__body {
    padding: 0;
  }
}
.iconfont {
  font-size: 30px;
}
.el-header {
  height: 0px;
}
.fontsize {
  font-size: 20px;
  color: aliceblue;
}
.iconsize {
  //font-size: 50px;
  color: aliceblue;
}
.toggle-button {
  cursor: pointer;
}
.dividermarg {
  margin: 10px 0;
}
@media screen and (max-width: 1400px) {
  img {
    max-width: 130px;
    max-height: 130px;
  }
  .iconsize {
    font-size: 40px;
    color: aliceblue;
  }
  .fontsize {
    font-size: 18px;
    color: aliceblue;
  }
}
</style>