<template>
  <div>
    <div>
      <span>实时数据</span>
      <span>{{nowdateO}}</span>
    </div>
    <el-divider class="dividermarg"></el-divider>
    <el-row :gutter="12">
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
        <div>
          <span>24小时数据</span>
          <i class="el-icon-data-analysis" @click="datashowfun()"></i>
        </div>
        <el-divider class="dividermarg"></el-divider>
       <el-table :data="tableData" stripe style="width: 100%" height="450" v-if="!dataShow">
          <el-table-column   label="时间" width="230">{{message.date}}</el-table-column>
          <el-table-column prop="nikename" label="设备名称" width="200"></el-table-column>
          <el-table-column prop="data" label="数据"></el-table-column>
        </el-table>
        <div id="ech" class="block" ref="echer" v-show="dataShow"></div>
      </el-col>
      <el-col :span="4">
        <div>片区信息</div>
        <el-divider class="dividermarg"></el-divider>
        <img src="../../assets/logo.png" alt />
        <div>片区名称：不知道</div>
        <el-divider class="dividermarg"></el-divider>
        <div>片区位置：不知道</div>
        <el-divider class="dividermarg"></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dsa",
  props: {
    message: {
      type: Object
    }
  },
  data() {
    return {
      creatdata: new Array(),
      nowdateO: "",
      myChart1: "",
      dataShow: this.$store.state.datavhouer,
      dasd: this.message,
      tableData: [],
      tChangdata: [],
      dangqianName: "",
      value2: "",
      dialogFormVisible: false,
      Cardlist: [],
      CiconObj: {
        "tair1": "iconfont icon-wendu",
        "tair2": "iconfont icon-wendu",
        "tair3": "iconfont icon-wendu",
        "airhumidity1": "iconfont icon-IOTtubiao_huabanfuben",
        "airhumidity2": "iconfont icon-IOTtubiao_huabanfuben",
        "airhumidity3": "iconfont icon-IOTtubiao_huabanfuben",
        "Soiltemp1": "iconfont icon-turangwendu",
        "Soiltemp2": "iconfont icon-turangwendu",
        "Soiltemp3": "iconfont icon-turangwendu",
        "soilmoisture1": "iconfont icon-turangshidu",
        "soilmoisture2": "iconfont icon-turangshidu",
        "soilmoisture3": "iconfont icon-turangshidu",
        "soi1":"iconfont icon-guangzhao",
        "soi2":"iconfont icon-guangzhao",
        "soi3":"iconfont icon-guangzhao",
        "co21":"iconfont icon-icon-co",
        "co22":"iconfont icon-icon-co",
        "co23":"iconfont icon-icon-co",
      },
      cardcolor: {
        "tair1": "#35C0CD",
        "tair2": "#5EC4CD",
        "tair3": "#1E6D74",
        "airhumidity1": "#0B5FA5",
        "airhumidity2": "#25547B",
        "airhumidity3": "#66A1D2",
        "Soiltemp1": "#ff7400",
        "Soiltemp2": "#ff9640",
        "Soiltemp3": "#BF7130",
        "soilmoisture1": "#A64B00",
        "soilmoisture2": "#ffB273",
        "soilmoisture3": "#A65400",
        "soi1":"#ff4500",
        "soi2":"#ffDE00",
        "soi3":"#ff9973",
        "co21":"#84E900",
        "co22":"#A4F43D",
        "co23":"#37DC74",
      },
      cardfuhao: {
        "tair1": "℃",
        "tair2": "℃",
        "tair3": "℃",
        "airhumidity1": "%",
        "airhumidity2": "%",
        "airhumidity3": "%",
        "Soiltemp1": "℃",
        "Soiltemp2": "℃",
        "Soiltemp3": "℃",
        "soilmoisture1": "%",
        "soilmoisture2": "%",
        "soilmoisture3": "%",
        "soi1":"LUX",
        "soi2":"LUX",
        "soi3":"LUX",
        "co21":"ppm",
        "co22":"ppm",
        "co23":"ppm",
      },
      sensordata_10: [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60]
      ],
      sensordata_11: [
        ["2000-06-05", 6],
        ["2000-06-06", 9],
        ["2000-06-07", 5],
        ["2000-06-08", 6],
        ["2000-06-09", 3],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 0],
        ["2000-06-15", 0],
        ["2000-06-16", 0],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 0],
        ["2000-06-20", 0],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 0],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60]
      ],
      show: false,
      showlindata: {},
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
      option: {
        title: {
          text: "数据折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "土壤温度",
            "土壤湿度",
            "大气温度",
            "大气湿度",
            "光照强度",
            "CO2浓度"
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
          data: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "土壤温度",
            type: "line",

            data: [
              24,
              23,
              25,
              22,
              21,
              19,
              12,
              23,
              22,
              11,
              24,
              13,
              21,
              15,
              19,
              14,
              14,
              21,
              20,
              25,
              19,
              17,
              15,
              13
            ]
          },
          {
            name: "土壤湿度",
            type: "line",

            data: [
              86,
              74,
              78,
              71,
              74,
              76,
              86,
              77,
              88,
              89,
              85,
              99,
              86,
              96,
              84,
              85,
              92,
              84,
              96,
              99,
              91,
              79,
              95,
              85
            ]
          },
          {
            name: "大气温度",
            type: "line",

            data: [
              20,
              30,
              26,
              22,
              18,
              25,
              28,
              17,
              26,
              34,
              17,
              19,
              33,
              21,
              33,
              25,
              30,
              22,
              21,
              20,
              28,
              24,
              18,
              22
            ]
          },
          {
            name: "大气湿度",
            type: "line",

            data: [
              30,
              27,
              22,
              27,
              21,
              33,
              32,
              22,
              31,
              32,
              27,
              37,
              34,
              20,
              32,
              24,
              27,
              22,
              20,
              21,
              27,
              20,
              32,
              20
            ]
          },
          {
            name: "光照强度X10",
            type: "line",

            data: [
              16,
              21,
              38,
              35,
              35,
              18,
              31,
              20,
              29,
              37,
              34,
              28,
              18,
              26,
              11,
              39,
              26,
              29,
              35,
              12,
              17,
              16,
              19,
              28
            ]
          },
          {
            name: "CO2浓度",
            type: "line",

            data: [
              14,
              8,
              17,
              8,
              6,
              10,
              5,
              15,
              12,
              14,
              5,
              14,
              13,
              10,
              17,
              12,
              14,
              8,
              12,
              14,
              13,
              16,
              17,
              16,
              16,
              14
            ]
          }
        ]
      },
      myChart: "",
    };
  },
  created() {
    this.nowdateO = this.message.date;
    this.Cardlist= this.message.value;
    this.tableData= this.message.value;
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.echer);
    this.drawLine();
  },
  methods: {
    biaogedata(){
     const data = this.$http.post('seachdata/24houer',{'machinekey':this.message.machinekey}) 
    },
    //卡片
    creatdatas() {
      console.log(this.Cardlist)
    },
    //切换
    datashowfun() {
      this.$store.commit('datavhouerfun')
      if (this.$store.state.datavhouer) {
        this.myChart.clear();
        this.myChart.setOption(this.option);
      }
    },
    //画曲线
    drawLine() {
      // 窗口大小自适应方案
      this.myChart.setOption(this.option);
    }
  }
};
</script>
<style lang="less" scoped>
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
.iconfont{
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