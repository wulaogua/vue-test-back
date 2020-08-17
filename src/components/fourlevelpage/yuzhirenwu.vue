<template>
  <div>
    <!--定时任务-->
    <div v-for="(y,idd) in card2datalist" :key="y.devicename">
      <!--卡片-->
      <el-card :ref="y.id" @click.native="rwcardfun(y,idd)" v-show="true">
        {{y.devicename}}
        <i class="el-icon-circle-plus-outline" style="margin-left:50px" />
      </el-card>
      <!--卡片-->
      <!--进度条-->
      <el-row v-show="false" :ref="'t'+y.id">
        <el-col :span="2" class="colbut">
          <el-button
            :ref="'bt'+y.id"
            type="primary"
            round
            @mouseenter.native="xiugai(`bt${y.id}`,y.devicename)"
            @mouseleave.native="xiugai1(`bt${y.id}`)"
            @click="xiugaibtn(y,idd)"
          >修改</el-button>
        </el-col>
        <el-col :span="21" class="stepcss">
          <el-steps simple hidden="true" finish-status="success">
            <el-step :title="es.name" v-for="es in y.timetasklist" :key="es.id" class="elstep"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <!--进度条-->
    </div>
    <!--弹窗-->
    <el-dialog
      :title="`${dilogname} 任务设置`"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      @close="closedia()"
    >
      <el-collapse accordion @change="colch">
        <el-collapse-item :name="cl.id" v-for="cl in collapselist" :key="cl.id" class="el2">
          <template slot="title">
            {{cl.name}}
            <span style="margin-left:10%;color: rgb(204, 204, 204);">{{cl.janj}}</span>
          </template>
          <el-form :model="cl.form" :inline="true" :ref="'bd'+cl.id">
            <el-form-item label="任务名称" :label-width="formLabelWidth">
              <el-input v-model="cl.form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="任务类型" :label-width="formLabelWidth">
              <el-select
                v-model="cl.form.region"
                placeholder="请选择任务类型"
                style="width:203px"
                @change="((data)=>{regionchan(data,cl)})"
              >
                <el-option label="阈值" value="yuzhi"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级" :label-width="formLabelWidth">
              <el-select
                v-model="cl.form.youxian"
                placeholder="请选择优先级"
                style="width:203px"
                @change="slectch"
              >
                <el-option
                  :label="ii.label"
                  :value="ii.value"
                  v-for="ii in yxlist"
                  :key="ii.id"
                  :disabled="ii.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--阈值 -->
            <div v-show="!cl.dingshi">
              <el-form-item label="决断参数" :label-width="formLabelWidth">
                <el-select v-model="cl.form.canshu" placeholder="请选择参数" style="width:203px">
                  <el-option
                    v-for="s in cl.canshulist"
                    :key="s.name"
                    :label="s.name"
                    :value="s.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="阈值范围"
                :label-width="formLabelWidth"
                prop="data1"
                :rules="[{ pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入小数或者整数',trigger: 'blur'}]"
              >
                <el-input v-model="cl.form.data1"></el-input>
              </el-form-item>
              <el-form-item
                label="阈值范围"
                :label-width="formLabelWidth"
                prop="data2"
                :rules="[{ pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入小数或者整数',trigger: 'blur'}]"
              >
                <el-input v-model="cl.form.data2"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="addi">
        <i class="el-icon-circle-plus-outline ijuzhong" @click="addcollapse()"></i>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogoff">取 消</el-button>
        <el-button type="primary" @click="dialogok">确 定</el-button>
      </div>
    </el-dialog>
    <!--弹窗-->
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    let isNum = (rule, value, callback) => {
      let age = /^(\-|\+)?\d+(\.\d+)?$/;
      if (age.test(this.collapselist[0].form.data1)) {
        callback();
      } else {
        callback(new Error(age.test(value)));
      }
    };
    return {
      muqiannum: Number,
      yxlist: [],
      dkey: "",
      fanweitime: { selectableRange: "00:00:00 - 23:59:59" },
      acttime: "",
      offtime: "",
      tdicrc: "",
      tid: "",
      tnmb: "",
      collapselist: [],
      bendilist: {
        name: "任务1",
        id: "1",
        dingshi: false,
        janj: "无",
        form: {
          name: "", //任务名
          region: "", //任务类型
          date1: "", //开始时间
          date2: "", //结束时间
          canshu: "", //决断参数
          data1: "", //阈值上限
          data2: "", //阈值下限
          youxian: Number, //优先级
        },
        canshulist: [],
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      dilogname: "",
      anniutext: "修改",
      carddatalist: Array(),
      card2datalist: [],
    };
  },
  created() {
    this.dkey = this.message[0].devicekey;
    this.carddatalist = this.message;
    this.message.forEach((itme) => {
      this.card2datalist.push({
        id: itme.id,
        devicename: itme.devicename,
        devicekey: itme.devicekey,
        timetasklist: [],
      });
    });
    for (let i = 0; i < 30; i++) {
      this.yxlist.push({ value: i + 1, label: i + 1, disabled: false });
    }
  },
  mounted() {
    this.chushihua();
  },
  updated() {},
  methods: {
    //数组排序
    compare(property, desc) {
        return  (a, b)=>{
          let value1 = a.form[property];
          let value2 = b.form[property];
          if (desc == true) {
            //升序排列
            return value1 - value2;
          } else {
            // 降序排列
            return value2 - value1;
          }
        };
    },
    closedia() {
      this.muqiannum = "";
    },
    //优先级选择
    slectch(data) {
      this.muqiannum = data;
    },
    //折叠面板
    colch(data) {
      this.yxlist.forEach((item) => {
        if (item.value === this.muqiannum) {
          item.disabled = true;
        }
      });
    },
    timeeo(i) {
      let date = [
        this.collapselist[i].form.date1.getHours(),
        this.collapselist[i].form.date1.getMinutes(),
        this.collapselist[i].form.date1.getSeconds(),
      ];
      let date1 = this.fanweitime.selectableRange.split(" - ");
      date1[0] = date.join(":");
      this.fanweitime.selectableRange = date1.join(" - ");
    },
    timeek(i) {
      let date = [
        this.collapselist[i].form.date2.getHours(),
        this.collapselist[i].form.date2.getMinutes(),
        this.collapselist[i].form.date2.getSeconds(),
      ];
      let date1 = this.fanweitime.selectableRange.split(" - ");
      date1[0] = date.join(":");
      this.fanweitime.selectableRange = date1.join(" - ");
    },
    xiugaibtn(data, data2) {
      this.rwcardfun(data, data2);
    },
    chushihua() {
      this.card2datalist.forEach(async (item, i) => {
        const { data: taskdata } = await this.$http.post("device/searchtask1", {
          devicekey: item.devicekey,
          id: item.id,
        });
        if (taskdata.meta.status === 200) {
          if (taskdata.adataa.task1.length !== 0) {
            item.timetasklist = taskdata.adataa.task1;
            this.$refs[item.id][0].$el.hidden = true;
            this.$refs[`t${item.id}`][0].$el.style.display = "";
          }
        } else {
          item.timetasklist.length = 0;
        }
      });
    },
    //生成进度条
    shengcheng() {
        console.log(this.collapselist)
      this.collapselist.forEach((item, i) => {
        if (item.dingshi) {
          this.$set(this.card2datalist[this.tnmb].timetasklist, i, item);
        }
      });
      this.dialogFormVisible = false;
      this.$refs[this.tid][0].$el.hidden = true;
      this.$refs[`t${this.tid}`][0].$el.style.display = "";
    },
    xiugai(data, name) {
      this.$refs[data][0].$el.innerText = name;
    },
    xiugai1(data) {
      this.$refs[data][0].$el.innerText = "修改";
    },
    dialogoff() {
      this.dialogFormVisible = false;
    },
    //弹窗确认
    async dialogok() {
      this.dialogFormVisible = false;
      this.collapselist.sort(this.compare("youxian", true));
      this.collapselist.forEach((item) => {
        if (item.dingshi) {
          item.form.canshu = "";
          item.form.data1 = "";
          item.form.data2 = "";
        } else {
          item.form.date1 = "";
          item.form.date2 = "";
        }
        item.janj = item.form.name;
      });
      const { data: diadata } = await this.$http.post("device/task1add", {
        devicekey: this.tdicrc,
        id: this.tid,
        task1: this.collapselist,
      });
      if (diadata.meta.status !== 200) {
        this.$message.error("更新失败");
      } else {
        this.$message.success("更新成功");
        this.shengcheng();
      }
    },
    async addcollapse() {
      let listdata = {
        name: `任务${this.collapselist.length + 1}`,
        id: `${this.collapselist.length + 1}`,
        dingshi: false,
        janj: "无",
        form: {
          name: "", //任务名
          region: "", //任务类型
          date1: "", //开始时间
          date2: "", //结束时间
          canshu: "", //决断参数
          data1: "", //阈值上限
          data2: "", //阈值下限
        },
        canshulist: [],
      };
      const { data: data1 } = await this.$http.post("seachdataOne", {
        machinekey: this.dkey,
      });
      if (data1) {
        data1.value.forEach((itme, i) => {
          listdata.canshulist.push({
            name: itme.nikename,
            id: i + 1,
            value: itme.name,
          });
        });
      }

      this.$set(this.collapselist, this.collapselist.length, listdata);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    regionchan(data, data2) {
      if (data === "yuzhi") {
        data2.dingshi = false;
      } else {
        data2.dingshi = true;
      }
    },
    //打开dilog动作
    async rwcardfun(data, num) {
      this.yxlist.forEach((item, i) => {
        item.disabled = false;
      });
      this.tdicrc = data.devicekey;
      this.tid = data.id;
      this.tnmb = num;
      if (this.bendilist.canshulist.length === 0) {
        const { data: data1 } = await this.$http.post("seachdataOne", {
          machinekey: data.devicekey,
        });
        data1.value.forEach((itme, i) => {
          this.bendilist.canshulist.push({
            name: itme.nikename,
            id: i + 1,
            value: itme.name,
          });
        });
      }
      const { data: taskdata } = await this.$http.post("device/searchtask1", {
        devicekey: data.devicekey,
        id: data.id,
      });
      if (taskdata.meta.status === 422) {
        this.collapselist.length = 0;
        let ii = JSON.parse(JSON.stringify(this.bendilist));
        this.$set(this.collapselist, 0, ii);
      } else {
        taskdata.adataa.task1.forEach((item, i) => {
          this.$set(this.collapselist, i, item);
        });
      }
      this.dialogFormVisible = true;
      this.dilogname = data.devicename;
    },
  },
};
</script>

<style lang="less" scoped>
.addi {
  cursor: pointer;
  margin-top: 10px;
  color: #949494;
  text-align: center;
  font-size: 2em;
}
.elstep {
  flex-basis: 110px !important;
}
.stepcss /deep/ .el-steps--simple {
  background: #fdfdfd;
}
.el-card {
  width: 140px;
  height: 50px;
  line-height: 40px;
  margin: 8px 0px;
  cursor: pointer;
}
.el-steps {
  padding: 13px 14px;
}
.el-button {
  width: 70px;
  transition: width 0.6s;
}
.el-button:hover {
  width: 100px;
}
.colbut {
  width: 80px;
  line-height: 50px;
  transition: width 0.6s;
}
.colbut:hover {
  width: 130px;
}
</style>