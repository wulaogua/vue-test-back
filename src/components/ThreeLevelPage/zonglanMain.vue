<template>
  <div>
    <el-row :gutter="12">
      <!--卡片视图 -->
      <el-col :span="8" v-for="i in datalist" :key="i._id">
        <el-card>
          <!-- 卡片头部 -->
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :span="10" class="viceDiv_2">
                <span>2020-66-33 14:00</span>
              </el-col>
              <el-col :span="10" class="viceDiv_1">
                <span >{{i.name}}</span>
              </el-col>
              <el-col :span="4" class="viceDiv_3">
                <el-popover placement="bottom" width="200" trigger="hover">
                  <p>报警条目:{{i.waringnumb}}</p>
                  <p v-show="i.waringnumb>0">报警简讯:{{i.waringstr}}</p>
                  <p>存在任务:{{i.renwuname}}</p>
                  <p>当前任务:{{i.renwuing}}</p>
                  <i
                    slot="reference"
                    class="el-icon-message-solid"
                    :style="{color:(i.waringnumb>0?'red':'green')}"
                  >{{i.waringnumb}}</i>
                </el-popover>
              </el-col>
            </el-row>
          </div>
          <!-- 卡片body -->
          <div>
            <div>
              <el-tabs
                v-model="i.shezhi"
                @tab-click="((data, data2) => {handleClick1(data,data2,i.name)})"
              >
                <el-tab-pane :label="o.name" :name="o.name" v-for="o in i.sensorlist" :key="o.id">
                  <div id="ech" class="Block3" :ref="o.id"></div>
                </el-tab-pane>
                <el-tab-pane label="视频" v-if="i.videobool">
                  <div>
                    <video class="videostyle" :ref="i.videoname" controls></video>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hls from "hls.js";
export default {
   props: ['message'],
  data() {
    return {
      refslist: Array(),
      dataShow: true,
      datalist:this.message
    };
  },
  created() 
  {
    console.log(this.datalist)
  },
  mounted() {
    //初始加载
  
    this.drawLine();
    this.attach();
   this.timedRefreshb();
    //初始化视频

  },
  methods: {
      //定时刷新
      timedRefreshb() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.secahdata();
        },10000);
      }
    },
    //曲线
    secahdata(){
      let optionnn = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: "大气温度"
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "12:20",
            "12:25",
            "12:30",
            "12:35",
            "12:40",
            "12:45",
            "12:50",
            "12:55",
            "13:00",
            "13:05",
            "13:10",
            "13:15",
            "13:20"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "大气温度",
            type: "line",
            data: [20, 30, 26, 22, 18, 25, 100, 17, 26, 34, 17, 19, 33]
          }
        ]
      };
      this.datalist.forEach(item => {
        item.sensorlist.forEach(item1 => {
          if (this.$refs[item1.id][0].clientHeight > 0) 
          {
            //用id查询数据=>optionnn
            let myChartt = this.$echarts.init(this.$refs[item1.id][0]);
            myChartt.clear()
           myChartt.setOption(optionnn);
          }
        });
      });
    },
    //加载视频
    attach() {
      this.datalist.forEach((item, i) => {
        if (item.videobool) {
          //新建实例
          item.hls = new Hls();
          //挂载Video标签
          item.hls.attachMedia(this.$refs[item.videoname][0]);
          //挂载视频源
          item.hls.loadSource(item.videoaddr);
          //挂载成功
          item.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            item.statu = true;
          });
          //挂载失败
          item.hls.on(Hls.Events.ERROR, (event, data) => {
            item.statu = false;
            //this.$message.error("挂载失败：" + item.name);
          });
        }
      });
    },
    //tabl click反馈
    handleClick1(data1, data2, data3) {
      
      let optionn = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: "大气温度"
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "12:20",
            "12:25",
            "12:30",
            "12:35",
            "12:40",
            "12:45",
            "12:50",
            "12:55",
            "13:00",
            "13:05",
            "13:10",
            "13:15",
            "13:20"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "大气温度",
            type: "line",
            data: [20, 30, 26, 22, 18, 25, 28, 17, 26, 34, 17, 19, 33]
          }
        ]
      };
      this.$nextTick(() => {
        this.refslist.forEach(item => {
          if (item[0].clientHeight === 0) {
             let myChart1 = this.$echarts.init(item[0]);
              myChart1.dispose(); 
          }
        });
        this.datalist.forEach((item2)=>{
          if(item2.name===data3){
            item2.sensorlist.forEach((item3)=>{
             if(item3.name===data1.name) {
              let myChart2 = this.$echarts.init(this.$refs[item3.id][0]);
              myChart2.setOption(optionn);
             }
            })
          }
        })
      });
      
    },
    //加载图标
    drawLine() {
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: "大气温度"
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "12:20",
            "12:25",
            "12:30",
            "12:35",
            "12:40",
            "12:45",
            "12:50",
            "12:55",
            "13:00",
            "13:05",
            "13:10",
            "13:15",
            "13:20"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "大气温度",
            type: "line",
            data: [20, 30, 26, 22, 18, 25, 28, 17, 26, 34, 17, 19, 33]
          }
        ]
      };
      this.datalist.forEach(item => {
        item.sensorlist.forEach(item1 => {
          this.refslist.push(this.$refs[item1.id]);
          if (this.$refs[item1.id][0].clientHeight > 0) {
            let myChart = this.$echarts.init(this.$refs[item1.id][0]);
            myChart.setOption(option);
          }
        });
      });
    }
  },
  beforeDestroy() {
    this.datalist.forEach((item, i) => {
      if (item.videobool) {
        item.hls.destroy();
      }
    });
  },
   destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.videostyle {
  border: 3px solid rgba(1, 1, 1, 0.1);
  width: 100px;
  height: 80px;
}
.Block3 {
  width: 100%;
  height: 190px;
}
.viceDiv_2 {
  color: rgb(134, 134, 134);
}
.viceDiv_1 {
  font-size: 1.2em;
}
.viceDiv_3 {
  text-align: center;
  cursor: pointer;
}
.el-card {
  height: 300px;
  margin-top: 10px;
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