<template>
  <div class="backcolor">
    <el-container>
      <el-header>
        <div class="headtext">
          <img src="../../src/assets/logo3.png" alt /> 项目列表
        </div>
        <el-button plain @click="backbutton()">退出</el-button>
      </el-header>
      <el-main>
        <el-row class="elrow">
          <el-col
            el-col
            :span="5"
            v-for="cardid in Cardlist"
            :key="cardid._id"
            :offset="2"
            class="elcol"
          >
            <!--  重复生成col============================================================================================================= --> 
            <div class="card-3d" >
            <!-- 正面-->
              <div class="card card-z" ref="cardz">
                 <el-card>
                  <div slot="header">
                    <span>项目名:{{cardid.areaname}}</span>
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="drawLine(cardid.projectnumb)"
                    >曲线>></el-button>
                  </div>
                  <div class="text">
                    <div>
                      <div>
                        <span>管理员：</span>
                        <span>{{cardid.username}}</span>
                      </div>
                      <div style="padding:3px 0px">
                        <span>子账户：</span>
                        <span>{{cardid.usernumb}}个</span>
                      </div>
                      <div>
                        <span>子片区：</span>
                        <span>{{cardid.areanumb}}个</span>
                      </div>
                      <div>
                        <span>异常统计：</span>
                        <span>{{cardid.errornumb}}个</span>
                      </div>
                      <div>
                        <span>报警统计：</span>
                        <span>{{cardid.waringnumb}}个</span>
                      </div>
                    </div>
                    <el-button type="primary" class="buttonbtn" style="float: right;" @click="managebutton(cardid.projectnumb)">
                      管理
                      <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                  </div>
                </el-card>
              </div>
              <!-- 反面-->
              <div :class="['card card-back','card-f-y']" ref="cardf">
                <el-card>
                  <div slot="header">
                    <span>dasca{{cardid.name}}</span>
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="managerbool(cardid.projectnumb)"
                    >管理>></el-button>
                  </div>
                  <div class="text">
                    <div>
                      <div :id="cardid.projectnumb" class="Block3"></div>
                    </div>
                    <el-button type="primary" class="buttonbtn2" style="float: right;" @click="managebutton()">
                      详情
                      <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                  </div>
                </el-card>
              </div>
            </div>
            <!--  重复生成col============================================================================================================= -->
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      surface: [],
      Cardlist: [],
      arr: [],
      test: ["rotateY(180deg)", "rotateY(0deg)"]
    };
  },
  created() {
    this.serchnumb();
  },
  mounted() {},
  methods: {
    backbutton(){
          window.sessionStorage.clear();
      this.$router.push("/");
    },
    managerbool(key) {
        //点击引发反转
      this.fn_reserve_action(this.surface[key - 1], key);
    },
    drawLine(key) {
        //点击引发反转
      this.fn_reserve_action(this.surface[key - 1], key);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(key));
      // 绘制图表配置
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["土壤温度", "温度"]
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "5%",
          bottom: "1%",
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
            name: "温度",
            type: "line",
            stack: "总量",
            data: [20, 18, 11, 23, 29, 33, 31]
          },
          {
            name: "土壤温度",
            type: "line",
            stack: "总量",
            data: [15, 23, 20, 15, 19, 33, 35]
          }
        ]
      };
      // 窗口大小自适应方案
      myChart.setOption(option);
      myChart.on('click',(item)=>{
        console.log(item)
      })
    },
    managebutton(key) { 
      this.$store.commit("addpjecnum", key);
      this.$router.push("/index");
    },
    //获取项目数据
    async serchnumb() {
      let platename=this.$store.state.platename
      const { data: res } = await this.$http.post("project/searchproject",{platename:platename});
      this.Cardlist = res.data;
      for (var i = 0; i < this.Cardlist.length; i++) {
        this.arr[i] = this.test;
        this.surface[i] = true;
      }
    },
    //卡片翻转
    fn_reserve_action(bool, msg) {
      this.$refs.cardz[msg - 1].style.transform = bool
        ? this.arr[msg - 1][0]
        : this.arr[msg - 1][1];
      this.$refs.cardf[msg - 1].style.transform = !bool
        ? this.arr[msg - 1][0]
        : this.arr[msg - 1][1];
      this.surface[msg - 1] = !this.surface[msg - 1];
    },
  }
};
</script>
<style lang="less" scoped>
/* ------------- */
.headtext {
  color: #fff;
  font-size: 1.1em;
  letter-spacing: 2px;
  img {
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }
}
.Block3 {
  width: 100%;
}
.text {
  height: 100%;
}
.el-card {
  width: 100%;
  height: 100%;
  background: #ffff;
  .buttonbtn{
      margin-top: 30px;
  }
  .buttonbtn2{
      margin-top: 5px;
  }
}
.box-card {
  width: 100%;
  height: 100%;
}
.backcolor {
  height: 100%;
  background: rgb(250, 249, 249);
}
.el-header {
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  background-color: #38a9e7;
  align-items: center;
  text-align: center;
  line-height: 60px;
  .el-button:hover {
    color: #333;
  }
}
.el-main {
  color: #333;
  height: 100%;
}
.elrow {
  margin-top: 20px;

}
.elcol {
  margin-bottom: 20px;
}
//卡片视图
.card-3d {
  width: 100%;
  height: 280px;
  transition: all 0.2s;
  position: relative;
  perspective: 1500px;
  background-color: transparent;
  .card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 4px;
    border: 1px solid #e8eaec;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: #eee;
    }
    &.card-z {
    }
    &.card-back {
    }
    &.card-f-y {
      transform: rotateY(-180deg);
    }
    &.card-f-x {
      transform: rotateX(-180deg);
    }
  }
}
</style>