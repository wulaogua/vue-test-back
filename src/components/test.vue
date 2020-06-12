<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-row
          :style="{background:(button1[0]?'#c4eeff':'#ffffff'),boxShadow:(button1[0]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
        >
          <el-col :span="5">
            <div class="grid-content switch">
              <el-switch
                v-model="value1"
                active-text="平台用户"
                inactive-text="个人用户"
                @change="switchchange()"
                :disabled="button1[0]?false:true"
              ></el-switch>
            </div>
          </el-col>
          <el-col :span="3" :offset="16" v-if="button1[0]">
            <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-collapse-transition>
        <el-form-item>
          <el-row
            type="flex"
            justify="center"
            v-if="value1"
            :style="{background:(button1[1]?'#c4eeff':'#ffffff'),boxShadow:(button1[1]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
          >
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span v-if="!button1[1]">{{viewform.name}}</span>
                <el-input
                  v-model="form.name"
                  placeholder="请输入平台名称"
                  v-if="button1[1]"
                  class="input-new-tag"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="3" :offset="16" v-if="button1[1]">
              <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-collapse-transition>
      <el-collapse-transition>
        <el-row
          type="flex"
          justify="center"
          v-if="value1"
          :style="{background:(button1[2]?'#c4eeff':'#ffffff'),boxShadow:(button1[2]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
        >
          <el-col :span="button1[2]?21:5">
            <div class="grid-content bg-purple" v-if="!button1[2]">
              <span>{{viewform.region|ellipsis}}</span>
            </div>
            <!-- 树形控件  v-show="button1[2]"-->
            <div v-if="button1[2]">
              <vo-edit :data="chartData" :draggable="true" :pan="true" :zoom="true" class="voedit"></vo-edit>
              <!-- 添加控件 -->
              <div id="edit-panel" class="view-state edit-container">
                <div class="item item-half">
                  <div class="input-node-container">
                    <label class="selected-node-group">选定的标签</label>
                    <input type="text" id="selected-node" class="selected-node-group new-node" />
                  </div>
                  <div>
                    <label>新标签</label>
                    <ul id="new-nodelist">
                      <li>
                        <input type="text" class="new-node" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="node-type-panel" class="radio-panel item">
                  <input type="radio" name="node-type" id="rd-child" value="children" />
                  <label for="rd-child">子集</label>
                  <input type="radio" name="node-type" id="rd-sibling" value="siblings" />
                  <label for="rd-sibling">同级</label>
                </div>
                <div class="item">
                  <el-button @click="addNodes()">添加</el-button>
                  <el-button @click="deleteNodes()">删除</el-button>
                  <el-button @click="exportJSON()">生成josn</el-button>
                </div>
              </div>
              <!-- 添加控件 -->
            </div>
            <!-- 树形控件 -->
          </el-col>
          <el-col :span="3" :offset="button1[2]?0:16" v-if="button1[2]">
            <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
          </el-col>
        </el-row>
      </el-collapse-transition>

      <el-row
        type="flex"
        justify="center"
        :style="{background:(button1[3]?'#c4eeff':'#ffffff'),boxShadow:(button1[3]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
      >
        <el-col :span="button1[3]?21:5">
          <div class="grid-content bg-purple" v-if="!button1[3]">
            <span v-if="!button1[3]">{{viewform.date1}}</span>
            <el-input
              v-model="form.date1"
              placeholder="请输入项目名称"
              v-if="button1[3]"
              class="input-new-tag"
            ></el-input>
          </div>
          <!-- 树形控件  v-show="button1[2]"-->
          <div v-if="button1[3]">
            <vo-edit :data="chartData" :draggable="true" :pan="true" :zoom="true" class="voedit"></vo-edit>
            <!-- 添加控件 -->
            <div id="edit-panel" class="view-state edit-container">
              <div class="item item-half">
                <div class="input-node-container">
                  <label class="selected-node-group">选定的标签</label>
                  <input type="text" id="selected-node" class="selected-node-group new-node" />
                </div>
                <div>
                  <label>新标签</label>
                  <ul id="new-nodelist">
                    <li>
                      <input type="text" class="new-node" />
                    </li>
                  </ul>
                </div>
              </div>
              <div id="node-type-panel" class="radio-panel item">
                <input type="radio" name="node-type" id="rd-child" value="children" />
                <label for="rd-child">子集</label>
                <input type="radio" name="node-type" id="rd-sibling" value="siblings" />
                <label for="rd-sibling">同级</label>
              </div>
              <div class="item">
                <el-button @click="addNodes()">添加</el-button>
                <el-button @click="deleteNodes()">删除</el-button>
                <el-button @click="exportJSON()">生成josn</el-button>
              </div>
            </div>
            <!-- 添加控件 -->
          </div>
          <!-- 树形控件 -->
        </el-col>
        <el-col :span="3" :offset="button1[3]?0:16" v-if="button1[3]">
          <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
        </el-col>
      </el-row>
      <el-form-item>
        <el-row
          type="flex"
          justify="center"
          :style="{background:(button1[4]?'#c4eeff':'#ffffff'),boxShadow:(button1[4]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
        >
          <el-col :span="button1[4]?21:5">
            <div class="grid-content bg-purple" v-if="!button1[4]">
              <span v-if="!button1[4]">{{viewform.date2}}</span>
              <el-input
                v-model="form.date2"
                placeholder="请输入基地名称"
                v-if="button1[4]"
                class="input-new-tag"
              ></el-input>
            </div>
            <div v-if="button1[4]">{{this.message.jidiarry}}</div>
          </el-col>
          <el-col :span="3" :offset="button1[4]?0:16" v-if="button1[4]">
            <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VoEdit } from "vue-orgchart";
export default {
  components: { VoEdit },
  props: {
    message: {
      type: Array //可指定接收类型，如:Array.
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 4) {
        return value.slice(0, 4) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      lastjosndata:[],
      lastarrydata: [],
      lastarry: [],
      form: {
        name: "", //平台名称
        region: [], //行业应用
        date1: "", //项目名称
        date2: "", //基地名称
        delivery: Boolean,
        type: [],
        resource: "",
        desc: "",
        arry: Array
      },
      viewform: {
        name: "", //平台名称
        region: [], //行业应用
        date1: "", //项目名称
        date2: "" //基地名称
      },
      updata: "",
      active: this.message.active,
      button1: this.message.boolenObj,
      value1: this.message.stepboln,
      chartData: new Object()
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.mountOrgchart();
    });
  },
  created() {
    this.updata = this.message.form.formname;
    this.form.name = this.message.form.formname;
    this.form.region = this.message.form.formregion;
    this.form.date1 = this.message.form.formdata1;
    this.form.date2 = this.message.form.formdata2;
    this.chartDataF();
  },
  methods: {
    chartDataF() {
      if (!this.message.chartchildren) {
        this.chartData = {
          name: this.message.form.formname,
          children: [
            {
              name: "行业应用",
              children: [{ name: "项目名称" }]
            }
          ]
        };
        this.viewform = {
          name: "平台名称", //平台名称
          region: "行业应用", //行业应用
          date1: "项目名称", //项目名称
          date2: "基地名称" //基地名称
        };
      } else {
        this.chartData = {
          name: this.message.form.formname,
          children: this.message.chartchildren.children
        };
        this.viewform = {
          name: "平台名称", //平台名称
          region: "业应用", //行业应用
          date1: "项目名称", //项目名称
          date2: "基地名称" //基地名称
        };
      }
    },
    async update(key, key1) {
      //数据库添加
      const { data: res } = await this.$http.post("chartdata/add", {
        form: this.form
      });
      if (res.meta.status != 200) {
        this.$message.error("更新失败");
        this.$emit("chindvalue", key);
      } else {
        if (key === 3) {
          this.$message.success("更新成功");
          this.$emit("chindvalue", key, key1);
        } else if (key === 4) {
          this.$message.success("更新成功");
          this.$emit("chindvalue", key, key1);
        }
        this.$message.success("更新成功");
        this.$emit("chindvalue", key);
      }
    },
    mountOrgchart() {
      if (this.message.active === 2) {
        this.$children[0].$children[2].$children[0].$children.forEach(item => {
          item.orgchart !== undefined ? (this.orgchart = item.orgchart) : null;
        });
      } else if (this.message.active === 3) {
        this.$children[0].$children[3].$children[0].$children.forEach(item => {
          item.orgchart !== undefined ? (this.orgchart = item.orgchart) : null;
        });
      }
    },
    addNodes() {
      let chartContainer = document.getElementById("chart-container");
      let nodeVals = [];
      Array.from(
        document.getElementById("new-nodelist").querySelectorAll(".new-node")
      ).forEach(item => {
        let validVal = item.value.trim();
        if (validVal) {
          nodeVals.push(validVal);
        }
      });
      let selectedNode = document.getElementById(
        document.getElementById("selected-node").dataset.node
      );
      if (!nodeVals.length) {
        alert("Please input value for new node");
        return;
      }
      let nodeType = document.querySelector('input[name="node-type"]:checked');
      if (!nodeType) {
        alert("Please select a node type");
        return;
      }
      if (nodeType.value !== "parent" && !document.querySelector(".orgchart")) {
        alert(
          "Please creat the root node firstly when you want to build up the orgchart from the scratch"
        );
        return;
      }
      if (nodeType.value !== "parent" && !selectedNode) {
        alert("Please select one node in orgchart");
        return;
      }
      //添加对象是parent
      if (nodeType.value === "parent") {
        if (!chartContainer.children.length) {
          // if the original chart has been deleted
          this.orgchart = new OrgChart({
            chartContainer: "#chart-container",
            data: { name: nodeVals[0] },
            parentNodeSymbol: "fa-th-large",
            createNode: function(node, data) {
              node.id = this.getId();
            }
          });
          this.orgchart.chart.classList.add("view-state");
        } else {
          this.orgchart.addParent(chartContainer.querySelector(".node"), {
            name: nodeVals[0],
            Id: this.getId()
          });
        }
      }
      //添加对象是siblings
      else if (nodeType.value === "siblings") {
        this.orgchart.addSiblings(selectedNode, {
          siblings: nodeVals.map(item => {
            return { name: item, relationship: "110", Id: this.getId() };
          })
        });
      }
      //添加对象是chinder
      else {
        let hasChild = selectedNode.parentNode.colSpan > 1;
        if (!hasChild) {
          let rel = nodeVals.length > 1 ? "110" : "100";
          this.orgchart.addChildren(selectedNode, {
            children: nodeVals.map(item => {
              return { name: item, relationship: rel, Id: this.getId() };
            })
          });
        } else {
          this.orgchart.addSiblings(
            closest(selectedNode, el => el.nodeName === "TABLE")
              .querySelector(".nodes")
              .querySelector(".node"),
            {
              siblings: nodeVals.map(function(item) {
                return { name: item, relationship: "110", Id: this.getId() };
              })
            }
          );
        }
      }
    },
    /////////////////////////////////////////////////////
       Family(data) {
            data.forEach((data) => {
                this.b.push(data)
                if (data.children) {
                    this.Family(data.children)
                }
                
            });
            return this.b;
      },
  
    /*  funTree(data) 
    {
      console.log('funtree')
        let b = Array();
        //树形转为一维数组
        function Family(data) {
            data.forEach((data) => {
                b.push(data);
                if (data.children !== 0) {
                    Family(data.children)
                }
                else{
                  console.log('null')
                }
            });
            console.log(b)
        }
       let c = Array();
        //查找整个树形家族
         function FamilyFun(data) {
            let n = data[0];
            for (let i = 0; i < n.length; i++) {
                if (n[i].id === data[1]) {
                    c.push(n[i]);
                    FamilyFun([n, n[i].parentId])
                }
            }
            return c
        }
        return FamilyFun(Family(data,id))
    } */
    deleteNodes() {
      let sNodeInput = document.getElementById("selected-node");
      let sNode = document.getElementById(sNodeInput.dataset.node);
      if (!sNode) {
        alert("Please select one node in orgchart");
        return;
      } else if (
        sNode === document.querySelector(".orgchart").querySelector(".node")
      ) {
        if (
          !window.confirm("Are you sure you want to delete the whole chart?")
        ) {
          return;
        }
      }
      this.orgchart.removeNodes(sNode);
      sNodeInput.value = "";
      sNodeInput.dataset.node = "";
    },
    exportJSON() {
      const ChartJSON = this.orgchart.getChartJSON();
      for (var i = 0; i < ChartJSON.children.length; i++) {
        this.form.region[i] = ChartJSON.children[i].name;
      }
      this.form.arry = ChartJSON;
      return ChartJSON;
    },
    getId() {
      return new Date().getTime() * 1000 + Math.floor(Math.random() * 1001);
    },
    next() {
      this.active = this.message.active;
      //平台模式
      if (this.value1) {
        if (this.active > 3)
         {
          this.message.jidiarry.forEach((time,i)=>{
            this.lastjosndata[i] = time.name
          })
          this.active = 5;
          this.$emit("chindvalue", this.active);
        } 
        else
        {
          this.button1[this.active] = false;
          this.button1[this.active + 1] = true;
          if (this.active === 3) 
          {
            console.log("act===3>",this.message.chartchildren);
            const datada = JSON.parse(JSON.stringify(this.message.chartchildren));
            console.log(datada.children);
            datada.children.forEach((item, i) => {
              if (!item.children) {
                console.log("没有二级元素");
              } else {
                if (!item.children) {
                  console.log("没有三级元素");
                } else {
                  this.lastarrydata[i] = item.children;
                }
              }
            });
            this.lastarrydata.forEach((item, y) => {
              this.lastarry = this.lastarry.concat(item);
            });
            this.active = 4;
            const data = this.lastarry;
            this.$emit("chindvalue",this.active,this.message.chartchildren,data);
          }
          this.active += 1;
          if (this.active === 3) {
            const data = this.exportJSON();
            console.log("active2+1>",data)
            // this.$emit("chindvalue", this.active, data);
            this.update(this.active, data);
          } 
          else {
            this.update(this.active);
            //this.$emit("chindvalue", this.active);
          }
        }
      }
      //个人模式
      else {
        if (this.active > 3) {
          this.active = 5;
          this.update(this.active);
        } else {
          this.button1[0] = false;
          this.button1[this.active] = false;
          this.button1[this.active + 1] = true;
          this.active += 1;
          this.update(this.active);
        }
      }
    },
    switchchange() {
     // this.$emit("chindvalueO", this.value1);
    }
  }
};
</script>

<style lang="less" scoped>
.voedit {
  line-height: 20px;
}
.el-row {
  line-height: 80px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
  &:first-child {
    margin-top: 10px;
    margin-left: 5px;
    text-align: center;
  }
}
.el-col {
  height: 100%;
  //border-radius: 50px;
}
.bg-purple {
  border: 2px solid rgba(0, 0, 0, 0.1);
}
.grid-content {
  border-radius: 4px;
  height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>