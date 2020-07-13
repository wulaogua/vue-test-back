<template>
  <div class="waiwei">
    <div class="xiaomokuai">
      <div class="biaotilan">
          <el-row class="tou">
            <el-col :span="3">
              <div class="son">溶解氧</div>
            </el-col>
            <el-col :span="2">
              <div class="son">时间：</div>
            </el-col>
            <el-col :span="15">
              <div class="block">
                  <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    align="left"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00', '08:00:00']"
                  ></el-date-picker>
              </div>
            </el-col>
            <el-col :span="2" style="line-height:50px">
                <el-button type="primary" round @click="buclick()">查询</el-button>
            </el-col>
          </el-row>
      </div>
      <div class="biaolan">
        <div id="ech" class="Block3" ref="etste" ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        value2: ""
    };
  },
  mounted() {
    //初始加载
    this.drawLine();
    //初始化视频
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.etste);
      // 绘制图表配置
      let option = {
        title: {
          text: "网络（外网）"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["接收", "发送"]
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "接收",
            type: "line",
            stack: "总量",
            data: [12, 30, 5, 42, 22, 29, 3]
          },
          {
            name: "发送",
            type: "line",
            stack: "总量",
            data: [32, 52, 0, 12, 23, 31, 15]
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
    buclick() {
      console.log(this.value2);
      let myChart = this.$echarts.init(this.$refs.etste); 
      myChart.dispose();
      this.drawLine()
    }
  }
};
</script>
<style lang="less" scoped>
.xiaomokuai {
  padding: 20px;
}
.tou {
  height: 100%;
  width: 700px;
}
.biaotilan {
  width: 700px;
  height: 50px;
  background-color: white;
  margin-bottom: 10px;
   border-radius:5px;
   border: 1px solid rgba(200, 200, 200, 0.8);
  .son {
    text-align: center;
    line-height: 50px;
  }
}
.biaolan {
  width: 700px;
  border-radius:5px;
  border: 1px solid rgba(200, 200, 200, 0.8);
  background-color: rgb(255, 255, 255);
}
.waiwei {
  width: 800px;
  background-color: rgb(255, 255, 255);
  height: 700px;
}
.Block3 {
  width: 700px;
  height: 300px;
}
.block {
  line-height: 50px;
  width: 100%;
}
</style>