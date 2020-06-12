<template>
  <div>
    <el-row :gutter="10">
      <div>运行信息</div>
      <el-divider></el-divider>
      <el-col :span="18" class="one">
        <div class="Block1">
          <el-row>
            <el-col :span="4" :push="1">
              <i :style="styleObject" :class="classA" class="el-icon-video-play"></i>
            </el-col>
            <el-col :span="4" :push="1">
              <div>
                <i class="el-icon-s-grid textcolor"></i>
                <span class="textcolor">传感数量：</span>
                <span>{{deviceform.sensorsNum}}</span>
              </div>
              <div>
                <i class="el-icon-s-grid textcolor"></i>
                <span class="textcolor">设备数量：</span>
                <span>{{deviceform.deviceNum}}</span>
              </div>
            </el-col>
            <el-col :span="13" :push="1">
              <div>
                <span class="textcolor">本机IP：</span>
                <span>{{deviceform.Ip}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :push="1">
              <span :style="stylecolor">{{deviceform.state}}</span>
            </el-col>
          </el-row>
          <el-row class="buttomtext">
            <el-col :span="5">
              <div>
                <span class="textcolor">网络类型：</span>
                <span>{{deviceform.networkType}}</span>
              </div>
              <div>
                <span class="textcolor">网络状态：</span>
                <span :style="stylecolor">{{deviceform.networkState}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <span>操作：</span>
              <el-button type="primary" plain>重启</el-button>
              <el-button type="warning" plain>关机</el-button>
              <el-button type="danger"  @click="deldetdevice()">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="3" class="rightborder">
        <div class="Block2">
          <div>
            <i ref="one" class="el-icon-warning-outline iconsize1"></i>
          </div>
          <div>
            <span class="textcolorg">无异常</span>
          </div>
        </div>
        <div class="Block2">
          <div>
            <i class="el-icon-location-outline iconsize2"></i>
          </div>
          <div>
            <span>定位</span>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="Block2">
          <div>
            <span class="textcolor2">0</span>
          </div>
          <div>
            <span>系统事件</span>
          </div>
        </div>
        <div class="Block2"></div>
      </el-col>
    </el-row>
    <el-row>
      <div>设备信息</div>
      <el-divider></el-divider>
      <el-col :span="24" class="blockbord2">
        <div class="Block1">
          <el-form label-width="80px" :model="machineform" ref="machineref" :rules="machinerules">
            <el-form-item label="本机KEY" prop="projectkey">
              <el-input v-model="machineform.projectkey" :disabled="inputdisable"></el-input>
              <el-button :disabled="inputdisable" @click="addmachine()">添加</el-button>
            </el-form-item>
            <el-form-item label="归属" prop="ascription">
              <el-input v-model="machineform.ascription" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="输入管脚">
              <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
                <el-checkbox v-for="city in cities" :label="city" :key="city" disabled>{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="输出管脚">
              <el-checkbox-group v-model="checkedCities2" :min="1" :max="2">
                <el-checkbox v-for="city in cities" :label="city" :key="city" disabled>{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <el-row class="netfontstyle" type="flex" align="middle">
          <el-col :span="5">
            <span>网络信息</span>
          </el-col>
          <el-col :span="6" :offset="11">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-col :span="24">
        <div id="myChart" class="Block3"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const cityOptions = [
  "1Pin",
  "2Pin",
  "3Pin",
  "4Pin",
  "5Pin",
  "6Pin",
  "7Pin",
  "8Pin",
  "9Pin",
  "10Pin"
];
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["projectnumb"])
  },
  props: {
    message: {
      type: Array
    }
  },
  data() {
    let checkkey = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输KEY"));
      } else if (!(await this.keyCheck(value))) {
        callback(new Error("KEY不存在"));
      } else {
        callback();
      }
    };
    return {
      inputdisable: true,
      machinerules: {
        projectkey: [{ validator: checkkey, trigger: "blur" }],
        ascription: [{ required: true, message: "请输入归属", trigger: "blur" }]
      },
      classA: "el-icon-video-play",
      styleObject: {
        fontSize: "50px",
        color: "#090"
      },
      stylecolor: {
        color: "#090",
        marginLeft: "9px"
      },
      deviceform: this.message,
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      checkedCities: [],
      checkedCities2: [],
      cities: cityOptions,
      machineform: {
        projectkey: "",
        ascription: "",
        inPin: [],
        outPin: []
      }
    };
  },
  methods: {
   async deldetdevice()
   {
    
      const deletdeve= await this.$http.post("user/deletmachine",{machinekey: this.machineform.projectkey,"projectnumb":this.projectnumb})
      if(!deletdeve)
      {
        this.$message.error("删除失败")
      }
      else
      {
        let dialogFormVisible = true;
      await this.$emit("tvalue",dialogFormVisible);
      }
    },
    addmachine() {
      this.$refs.machineref.validate(async val => {
      if (!val)
       {
        this.$message.error("添加失败失败")
        }
      else{
      const res = await this.$http.post("user/MachineRevise", 
      {nickname: this.deviceform.nickname,machinekey: this.machineform.projectkey,data: this.projectnumb})
      .catch(err => {this.$message.error("网络错误");});
      let dialogFormVisible = true;
      await this.$emit("tvalue",dialogFormVisible);
      }
      });
    },
    async keyCheck(str){
      const { data: res } = await this.$http.get(`machinekey/${str}`);
      if (res.meta.status != 200) {
        return false;
      }
      this.reg2 = !this.reg2;
      return true;
    },
    devicecreat() {
      this.machineform.ascription = this.deviceform.nickname;
      this.machineform.projectkey = this.deviceform.machinekey;
      this.checkedCities = this.deviceform.inPin;
      this.checkedCities2 = this.deviceform.outPin;
      if (!this.machineform.projectkey) {
        this.inputdisable = false;
      } else {
        this.inputdisable = true;
      }
      if (this.deviceform.state != "运行") {
        this.classA = "el-icon-video-pause";
        this.styleObject.color = "reg(0,0,0)";
        this.stylecolor.color = "reg(0,0,0)";
      } else {
        this.classA = "el-icon-video-play";
        this.styleObject.color = "#090";
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
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
      },200);
    }
  },
  created() {
    this.devicecreat();
  },
  mounted() {
    this.drawLine();
  }
};
</script>


<style lang="less" scoped>
.el-form {
  .el-input {
    width: 30%;
  }
}
.blockbord2 {
  border: 1px solid rgba(200, 200, 200, 50);
  margin-bottom: 10px;
}
.buttomtext {
  margin-top: 20px;
  margin-left: 10px;
}
.el-divider {
  width: 100%;
}
.deviceMain {
  position: fixed;
}
.el-header {
  height: 0px;
}
.fontsize {
  font-size: 25px;
  color: aliceblue;
}
.one {
  border: 1px solid rgba(200, 200, 200, 50);
  margin-bottom: 20px;
}
.Block1 {
  margin-top: 15px;
  width: 100%;
  height: 180px;
  /*  background: burlywood; */
}

.Block2 {
  border: 1px solid rgba(200, 200, 200, 50);
  text-align: center;
  width: 100%;
  height: 96px;
  margin-bottom: 2px;
}
.Block3 {
  margin-top: 15px;
  width: 100%;
  height: 300px;
  /*  background: burlywood; */
}

.iconsize {
  font-size: 50px;
  color: #090;
}
.iconsize1 {
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #090;
}
.iconsize2 {
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
  color: #ffc440;
}
.textcolorg {
  color: #090;
}
.textcolor {
  color: rgb(136, 136, 136);
}
.el-row {
  font-size: 14px;
}
.textcolor2 {
  font-size: 50px;
  color: rgb(136, 136, 136);
}
</style>