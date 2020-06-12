<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
        <el-row
          :style="{background:(button1[0]?'#c4eeff':'#ffffff'),boxShadow:(button1[0]?'1px 1px 3px #8888':'0px 0px 0px #ffffff')}"
        >
          <el-col :span="5">
            <div class="grid-content switch">
             <!-- <el-switch
                v-model="value1"
                active-text="平台用户"
                inactive-text="个人用户"
                @change="switchchange()"
                :disabled="button1[0]?false:true"
              ></el-switch> -->
                        <el-button-group>
            <el-button type="primary" @click="personal()">上一页</el-button>
            <el-button type="primary" @click="platform()">下一页</el-button>
          </el-button-group>
            </div>
          </el-col>
          <el-col :span="3" :offset="16" v-if="button1[0]">
            <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
          </el-col>
        </el-row>
      <el-collapse-transition>
        <el-form-item prop="name">
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
              <el-button style="margin-top: 12px;" @click="next('form')">下一步</el-button>
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
            <div v-if="button1[4]"></div>
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
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 4) 
      {
        return value.slice(0, 4) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      value1: true, //switch状态
      button1: [true, false, false, false, false], //
      form: {
        name: null //平台名称
      },
      rules: {
        name: [
          { required: true, message: "请输入平台名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      viewform: {
        name: "平台配置", //平台名称
        region: "行业配置", //行业应用
        date1: "项目配置", //项目名称
        date2: "基地配置" //基地名称
      },
      chartData: {},
    };
  },
   created() {

  },
  mounted() {
   this.value1 = this.$store.state.newproject.mainSwitch; //切换
    this.button1 = this.$store.state.newproject.mainBool; //步骤
    this.chartData = this.$store.state.newproject.mainTree; //图表数据
    this.$nextTick(() => {
      this.mountOrgchart(); //图表初始化
    });
    if(this.$store.state.newproject.asiadActive === 4)
    {
        this.$store.commit("NMJump",true);
        this.$router.push("/nn");
    }
  },
 
  methods: {
    mountOrgchart() {
      //查询图表
      console.log(this.$store.state.newproject.asiadActive)
      if (this.$store.state.newproject.asiadActive === 2) {
        this.$children[0].$children[2].$children[0].$children.forEach(item => {
          item.orgchart !== undefined ? (this.orgchart = item.orgchart) : null;
        });
      } 
      else if (this.$store.state.newproject.asiadActive === 3) {
        this.$children[0].$children[3].$children[0].$children.forEach(item => {
          item.orgchart !== undefined ? (this.orgchart = item.orgchart) : null;
        });
      }
    },
    //添加
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
    //删除
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
    //打印josn
    exportJSON() {
      const ChartJSON = this.orgchart.getChartJSON();
      /* for (var i = 0; i < ChartJSON.children.length; i++) {
        this.form.region[i] = ChartJSON.children[i].name;
      } */
      this.$store.commit("NMTree", ChartJSON);
      //this.form.arry = ChartJSON;
      //return ChartJSON;
    },
    //生成ID
    getId() {
      return new Date().getTime() * 1000 + Math.floor(Math.random() * 1001);
    },
    //下一步
    next(formName) {
      //平台名称时
      if (this.$store.state.newproject.asiadActive === 1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
        this.$store.commit("NMTreeName",this.form.name);
        this.$store.commit("NasiadActive");
        this.$store.commit("NMBool");
          } 
          else 
          {
            console.log("error submit!!");
            return false;
          }
        });
      } 
      else {
        if (this.orgchart) 
        {
          this.exportJSON();
        }
        this.$store.commit("NasiadActive");
        this.$store.commit("NMBool");
      }

    },
    //切换
    switchchange() {
      if (this.value1) {
        this.$store.commit("NSasiadActive", 0);
        this.$store.commit("NSwitch");

      } 
      else 
      {
        this.$store.commit("NSasiadActive", 2);
        this.$store.commit("NSwitch");
      }
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