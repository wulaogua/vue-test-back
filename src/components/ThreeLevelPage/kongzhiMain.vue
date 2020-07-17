<template>
  <div>
    <el-row>
      <div>
        <span>
          设备控制
          <i class="el-icon-c-scale-to-original"></i>
        </span>
      </div>
      <el-divider class="dividermarg"></el-divider>
      <el-col v-for="c in carddatalist" :key="c.id" :span="8">
        <div class="cardstyle">
          <el-row>
            <div>
              <span class="deviceID">ID：{{c.id}}</span>
            </div>
            <el-row :gutter="20">
              <!-- 名称-->
              <el-col :span="6">
                <div class="devicename">{{c.devicename}}</div>
              </el-col>
              <!-- 状态-->
              <el-col :span="4">
                <div class="wrap">
                  <div>供电</div>
                  <div
                    class="border50"
                    :style="{background:(c.power?'rgb(31, 185, 0)':'rgb(158, 158, 158)')}"
                  ></div>
                </div>
                <div class="wrap">
                  <div>远程</div>
                  <div
                    class="border50"
                    :style="{background:(c.remote?'rgb(31, 185, 0)':'rgb(158, 158, 158)')}"
                  ></div>
                </div>
                <div class="wrap" v-if="c.value!=2">
                  <div>运行</div>
                  <div
                    class="border50"
                    :style="{background:(c.status===1?'rgb(31, 185, 0)':'rgb(158, 158, 158)')}"
                  ></div>
                </div>

                <div class="wrap" v-if="c.value===2">
                  <div>运行</div>
                  <div
                    class="border50"
                    :style="{background:(c.status!=2?'rgb(31, 185, 0)':'rgb(158, 158, 158)')}"
                  ></div>
                </div>
                <div class="wrap" v-if="c.value===2">
                  <div>方向</div>
                  <div
                    class="border50"
                    :style="{background:(c.status===1?'rgb(31, 185, 0)':'rgb(253, 194, 31)')}"
                    v-if="c.status!=2"
                  ></div>
                </div>
              </el-col>
              <!--参数-->
              <el-col :span="4">
                <div style="font-size:8px;margin-bottom:2px">电压：{{c.voltage}}</div>
                <div style="font-size:8px;">电流：{{c.ec}}</div>
              </el-col>
              <!--控制-->
              <el-col :span="10">
                <div style="text-align:center;line-height:45px" v-if="c.value===1">
                  <el-radio-group v-model="c.status" size="mini" @change="singledevice(c)">
                    <el-radio-button label="1" :loading="true">开</el-radio-button>
                    <el-radio-button label="2" :loading="true">关</el-radio-button>
                  </el-radio-group>
                </div>

                <div style="text-align:center;line-height:45px" v-if="c.value===2">
                  <el-radio-group v-model="c.status" size="mini" @change="doubledevice(c)">
                    <el-radio-button label="1" :loading="true">左</el-radio-button>
                    <el-radio-button label="2" :loading="true">停</el-radio-button>
                    <el-radio-button label="3" :loading="true">右</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="block" v-if="c.value===3">
                  <div>值：{{c.Nvalue}}</div>
                  <el-slider v-model="c.Nvalue" @change="adjustdevice(c)"></el-slider>
                </div>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div>
      <span>任务</span>
    </div>
    <el-divider class="dividermarg"></el-divider>
    <div v-for="y in card2datalist" :key="y.devicename">
      <el-card :ref="y.id+y.devicename" @click.native="rwcardfun(y)">
        {{y.devicename}}
        <i class="el-icon-circle-plus-outline" style="margin-left:50px" />
      </el-card>
      <el-row v-show="false">
        <el-col :span="2" class="colbut">
          <el-button
            type="primary"
            round
            @mouseenter.native="anniutext='控制1'"
            @mouseleave.native="anniutext='修改'"
          >{{anniutext}}</el-button>
        </el-col>
        <el-col :span="21">
          <el-steps :active="1" simple v-show="true" class="stepcss">
            <el-step title="任务 1" icon="el-icon-edit" @click.native="testfun(1)"></el-step>
            <el-step title="任务 2" icon="el-icon-upload" @click.native="testfun(2)"></el-step>
            <el-step title="任务 3" icon="el-icon-picture" @click.native="testfun(3)"></el-step>
            <el-step title="任务 4" icon="el-icon-picture"></el-step>
            <el-step title="任务 5" icon="el-icon-picture"></el-step>
            <el-step title="任务 6" icon="el-icon-picture"></el-step>
            <el-step title="任务 7" icon="el-icon-picture"></el-step>
            <el-step title="任务 8" icon="el-icon-picture"></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="`${dilogname} 任务设置`" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-collapse accordion>
        <el-collapse-item :name="cl.id" v-for="cl in collapselist" :key="cl.id">
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
                <el-option label="定时" value="dingshi"></el-option>
                <el-option label="阈值" value="yuzhi"></el-option>
              </el-select>
            </el-form-item>
            <!-- 定时-->
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
            <!-- 阈值-->
            <div v-show="cl.dingshi">
              <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-time-picker v-model="cl.form.date1" style="width:203px"></el-time-picker>
              </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-time-picker v-model="cl.form.date2" style="width:203px"></el-time-picker>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      collapselist: [
        {
          name: "任务1",
          id: "1",
          dingshi: false,
          janj: "五",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务2",
          id: "2",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务3",
          id: "3",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务4",
          id: "4",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务5",
          id: "5",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务6",
          id: "6",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务7",
          id: "7",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        },
        {
          name: "任务8",
          id: "8",
          dingshi: false,
          janj: "无",
          form: {
            name: "", //任务名
            region: "", //任务类型
            date1: "", //开始时间
            date2: "", //结束时间
            canshu: "", //决断参数
            data1: "", //阈值上限
            data2: "" //阈值下限
          },
          canshulist: [
            { name: "温度", id: 1, value: "wendu" },
            { name: "日照", id: 2, value: "rizhao" }
          ]
        }
      ],
      formLabelWidth: "80px",
      dialogFormVisible: false,
      dilogname: "",
      anniutext: "修改",
      refresh: true,
      carddatalist: Array(),
      card2datalist: []
    };
  },
  created() {
    this.carddatalist = this.message.adata;
    console.log(this.message.adata);
    this.message.adata.forEach(itme => {
      this.card2datalist.push({
        id: itme.id,
        devicename: itme.devicename,
        devicekey: itme.devicekey
      });
    });
  },
  mounted() {},
  updated() {
    this.refresh = false;
    this.$nextTick(() => {
      this.refresh = true;
    });
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    regionchan(data, data2) {
      if (data === "yuzhi") {
        data2.dingshi = false;
      } else {
        data2.dingshi = true;
      }
    },
    rwcardfun(data) {
      this.dialogFormVisible = true;
      this.dilogname = data.devicename;
    },
    chufa1() {
      this.anniutext = "任务一";
    },
    testfun(e) {
      console.log(e);
    },
    //单控c
    async singledevice(data) {
      data.status = parseInt(data.status);
      const { data: singledevicedata } = await this.$http.post(
        "device/updata",
        {
          machinekey: data.devicekey,
          id: data.id,
          status: data.status,
          Nvalue: data.Nvalue
        }
      );
      if (singledevicedata.meta.status != 200) {
        this.$message.error("操作失败");
      } else {
        if (singledevicedata.data.status === data.status) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败/数据异常");
        }
      }
    },
    //双控
    async doubledevice(data) {
      data.status = parseInt(data.status);
      const { data: singledevicedata } = await this.$http.post(
        "device/updata",
        {
          machinekey: data.devicekey,
          id: data.id,
          status: data.status,
          Nvalue: data.Nvalue
        }
      );
      if (singledevicedata.meta.status != 200) {
        this.$message.error("操作失败");
      } else {
        if (singledevicedata.data.status === data.status) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败/数据异常");
        }
      }
    },
    //调值
    async adjustdevice(data) {
      data.status = parseInt(data.status);
      const { data: singledevicedata } = await this.$http.post(
        "device/updata",
        {
          machinekey: data.devicekey,
          id: data.id,
          status: data.status,
          Nvalue: data.Nvalue
        }
      );
      if (singledevicedata.meta.status != 200) {
        this.$message.error("操作失败");
      } else {
        if (singledevicedata.data.status === data.status) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败/数据异常");
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
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
  width: 8.3%;
  line-height: 100%;
  transition: width 0.6s;
}
.colbut:hover {
  width: 10%;
}
.block {
  margin: 10px;
}
.wrap {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 1px;
  margin-bottom: 1px;
  .border50 {
    margin-left: 6px;
    height: 10px;
    width: 10px;
    border-radius: 50px;
  }
}

.devicename {
  font-size: 18px;
  text-align: center;
  margin: 5px;
  line-height: 45px;
}
.deviceID {
  font-size: 5px;
  margin: 2px;
  color: rgb(124, 124, 124);
}
.cardstyle {
  margin: 5px;
  height: 95px;

  border: 1px solid black;
}
</style>