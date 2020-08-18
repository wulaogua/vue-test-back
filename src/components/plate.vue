<template>
  <div class="backcolor">
    <el-container style="background: rgb(250, 249, 249);">
      <el-header>
        <div class="headtext">
          <img src="../../src/assets/logo3.png" alt /> 平台列表
        </div>
        <el-button plain @click="backbutton()">退出</el-button>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col
            :span="7"
            class="elcol"
            v-for="i in Dardlist"
            :key="i.id"
            style="padding:0 !important"
          >
            <el-row class="elcolrow">
              <el-col :span="18">
                <!--平台名字-->
                <div class="coldiv" >
                  <span class="nameclick">平台名称:</span>
                  <div>{{i.name}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <!--修改按钮-->
                <div class="coldiv1" @click="changrplate(i)">
                  <i class="el-icon-edit changerplate" ></i>
                </div>
              </el-col>
            </el-row>
            <!--each预留-->
            <div :id="i.name" class="elchart" style="height:1px"></div>
            <div class="coldiv2" @click="drawLine(i)">
              <span>查看详情</span>
              <i class="el-icon-right"></i>
            </div>
          </el-col>
          <!-- 新增按钮-->
          <el-col :span="6" align="center" style="line-height:112px;">
            <el-button type="warning" icon="el-icon-plus" circle @click="addplate()" ></el-button>
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
      data1: {
        name: "平台1",
        relationship: "001",
        children: [
          {
            name: "行业2",
            children: [
              {
                name: "1项目",
                value: 1231,
                relationship: "110",
              },
              {
                name: "2项目",
                value: 3312,
              },
            ],
            relationship: "110",
          },
          {
            name: "2行业",
            children: [
              { name: "3项目", value: 8833 },
              { name: "4项目", value: 1732 },
              { name: "5项目", value: 3623 },
            ],
          },
          {
            name: "3行业",
            children: [{ name: "6项目", value: 4116 }],
          },
          {
            name: "4行业",
            children: [
              { name: "7项目", value: 1616 },
              { name: "8项目", value: 1027 },
              { name: "9项目", value: 3891 },
              { name: "10项目", value: 891 },
              { name: "11项目", value: 2893 },
              { name: "12项目", value: 5103 },
              { name: "13项目", value: 3677 },
              { name: "14项目", value: 781 },
              { name: "15项目", value: 4141 },
              { name: "16项目", value: 933 },
              { name: "17项目", value: 5130 },
              { name: "18项目", value: 3617 },
              { name: "19项目", value: 3240 },
              { name: "20项目", value: 2732 },
              { name: "21项目", value: 2039 },
              { name: "22项目", value: 1214 },
              { name: "23项目", value: 3748 },
              { name: "24项目", value: 843 },
              { name: "25项目", value: 843 },
              { name: "26项目", value: 1554 },
              { name: "27项目", value: 970 },
              { name: "28项目", value: 13896 },
              { name: "29项目", value: 1594 },
              { name: "30项目", value: 4130 },
              { name: "31项目", value: 791 },
              { name: "32项目", value: 1124 },
              { name: "33项目", value: 1876 },
              { name: "34项目", value: 1101 },
            ],
          },
        ],
      }, //树 数据
      Dardlist: Array(), //多重树 名称
      test: false,
      myChart: undefined,
      tree_ele: undefined,
    };
  },
  created() {},
  mounted() {
    this.screahdata();
    //this.drawLine();
  },
  methods: {
    async changrplate(key) {
      let { data: resPlate } = await this.$http.post("chartdata/query", {
        id: key.id,
      });
      if (resPlate.meta.status === 200) {
        this.$store.commit("addsontree", resPlate.meta.data[0]);
      } else {
        return;
      }
      this.$message.success(`修改平台：${key.name}`);
      this.$router.push("/new");
    },
    addplate() {
      this.$router.push("/new");
    },
    async screahdata() {
      const { data: res } = await this.$http.post("chartdata/seek");
      res.meta.data.forEach((item) => {
        this.Dardlist.push({ name: item.formname, id: item._id });
      });
    },

    backbutton() {
      this.$store.commit("allrestate");
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    zhaobaba(tree, value) {
      tree.children.forEach((hangye) => {
        hangye.children.forEach((xiangmu) => {
          xiangmu.children.forEach((jidi) => {
            if (jidi.name === value) {
            }
          });
        });
      });
    },

    async drawLine(key) {
      let { data: resPlate } = await this.$http.post("chartdata/query", {
        id: key.id,
      });
      if (resPlate.meta.status === 200) {
        this.data1 = resPlate.meta.data[0];
      } else {
        return;
      }
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            //类型
            type: "tree",
            id: 0,
            name: "tree1",
            data: [this.data1],
            top: "0%",
            left: "11%",
            bottom: "0%",
            right: "13%",
            symbolSize: 10,
            //曲线
            edgeShape: "polyline",
            edgeForkPosition: "30%",
            initialTreeDepth: 3,
            
            lineStyle: {
              width: 2,
              color:"#fff",
            },
            label: {
              position: "top",
              verticalAlign: "bottom",
              align: "center",
              fontSize:12,
              color:"#fff"
            },
            leaves: {
              label: {
                position: "top",
                verticalAlign: "bottom",
                align: "center",
              },
            },
            //展开等级
            initialTreeDepth: 3,
            //是否移动
            roam: "move",
            expandAndCollapse: true,
            animationDuration: 400,
            animationDurationUpdate: 800,
          },
        ],
      };
      if (this.myChart === undefined) {
        this.myChart = this.$echarts.init(document.getElementById(key.name));
        this.tree_ele = document.getElementById(key.name);
        this.myChart.setOption(option);

        const nodes = 1 * this.myChart._chartsViews[0]._data._graphicEls.length;
        const height = window.innerHeight;
        const newHeight = Math.max(nodes, height);

        this.tree_ele.style.height = newHeight + "px";
        this.myChart.resize();
        this.myChart.on("click", async (item) => {
          //获取序列
          let duilielist = item.event.event.path[2].textContent.split(".");
          if (duilielist.length < 2) {
            duilielist = item.event.event.path[2].textContent.split("。");
          }
          if (item.dataIndex === 1) {
            //跳转平台设置界面
            this.$store.commit("addplatedata", 1);
            this.$store.commit("addplatename", item.name);
            this.$router.push("/projectlist");
          }
          if (item.data.children && !item.data.children[0].children) {
            //跳转项目设置界面
            const { data: pronumb } = await this.$http.post(
              "project/searchprojectOne",
              {
                platename: duilielist[0],
                areaname: item.name,
              }
            );
            console.log(pronumb);
            this.$store.commit("addpjecnum", pronumb.data[0].projectnumb);
            this.$store.commit("addheardname", this.Dardlist[0].name);
            this.$store.commit("addplatedata", 2);
            this.$router.push("/index");
          } else {
            if (item.value !== undefined) {
              //跳转到片区
              this.$store.commit("addplatedata", 3);
              this.$store.commit("addareadata", duilielist);
              this.$router.push("/index");
            }
          }
        });
      } else {
        this.tree_ele.style.height = 40 + "px";
        this.myChart.dispose();

        this.myChart = this.$echarts.init(document.getElementById(key.name));
        this.tree_ele = document.getElementById(key.name);
        this.myChart.setOption(option);

        const nodes = 1 * this.myChart._chartsViews[0]._data._graphicEls.length;
        const height = window.innerHeight;
        const newHeight = Math.max(nodes, height);
        this.tree_ele = document.getElementById(key.name);
        this.tree_ele.style.height = newHeight + "px";
        this.myChart.resize();

        this.myChart.on("click", async (item) => {
          const duilielist = item.event.event.path[2].textContent.split(".");
          if (item.dataIndex === 1) {
            //跳转平台设置界面
            this.$store.commit("addplatedata", 1);
            this.$store.commit("addplatename", item.name);
            this.$router.push("/projectlist");
          }
          if (item.data.children && !item.data.children[0].children) {
            //跳转项目设置界面
            const { data: pronumb } = await this.$http.post(
              "project/searchprojectOne",
              {
                platename: duilielist[0],
                areaname: item.name,
              }
            );
            this.$store.commit("addpjecnum", pronumb.data[0].projectnumb);
            this.$store.commit("addplatedata", 2);
            this.$router.push("/index");
          } else {
            if (item.value !== undefined) {
              //跳转到片区
              this.$store.commit("addplatedata", 3);
              this.$store.commit("addareadata", duilielist);
              this.$router.push("/index");
            }
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
i {
  cursor: pointer;
  margin-left: 2%;
}
.nameclick {
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
  .el-button {
    border: 1px solid rgba(200, 242, 221, 0.89);
  }
  .el-button:hover {
    color: #333;
  }
}
.el-main {
  color: #333;
  height: 100%;
}
.elcol {
  border-radius: 3px;
  background: #4db5ab;
  border: 1.5px solid rgba(114, 114, 114, 0.459);
  .coldiv {
    padding: 10px;
    text-align: center;
    color: #fff;
    background: #4db5ab;
    font-size: 1.2em;
  }
  .coldiv1 {
    cursor: pointer;
    padding: 10px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background: #4db5ab;
    transition:background 0.5s;
    font-size: 1.2em;
  }
  .coldiv1:hover{
     background: #694db5;
  }
  .coldiv2 {
    cursor: pointer;
    color: #7cb6dc;
    font-size: 0.9em;
    padding: 10px;
    text-align: left;
    background: #fff;
    transition:background 0.5s;
    i {
      font-size: 1.3em;
      float: right;
    }
  }
  .coldiv2:hover{
    color: #fff;
     background: #694db5;
  }
}

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
//卡片视图
</style>