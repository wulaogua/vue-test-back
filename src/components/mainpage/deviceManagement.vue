<template>
  <div>
    <!--  -->
    <el-row type="flex">
      <el-col :span="3" class="color1">
        <!-- 侧边栏设备表 -->
        <div>片区列表</div>
        <el-tag
          :key="tag.nickname"
          effect="dark"
          type="success"
          v-for="tag in dynamicTags"
          :disable-transitions="false"
          @click="handleClick(tag)"
        >{{tag.nickname}}</el-tag>
      </el-col>
      <!-- 三级子栏 -->
      <el-col :span="21" class="color">
        <!--子组件占位-->
        <deviceMain v-bind:message="deviceForm" v-if="sonRefresh" @tvalue="tvalue"></deviceMain>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import deviceMain from "@/components/ThreeLevelPage/deviceMain";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["projectnumb"])
  },
  inject: ["reload"],
  data() {
    return {
      sonRefresh: false,
      deviceForm: [],
      tagabreadcrumb: "",
      //侧边栏标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      dialogFormVisible: false
    };
  },
  methods: {
    tvalue(val) {
        if(val){
          this.reload()
        }
    },
    //定时刷新
    timedRefresh() {
      if (this.timer) 
      {
        clearInterval(this.timer);
      } 
      else {
        this.timer = setInterval(() => {
          this.timeClick(this.deviceForm.machinekey);
        }, 30000);
      }
    },
    writerdata(res){
      if (!res) 
      {
        return this.$message.error("错误");
      } 
      else
       {
        this.dynamicTags = res;
        this.tagabreadcrumb = res[0].nickname;
        this.deviceForm.Ip = res[0].Ip;
        this.deviceForm.AdminName = res[0].AdminName;
        this.deviceForm.machinekey = res[0].machinekey;
        this.deviceForm.nickname = res[0].nickname;
        this.deviceForm.state = res[0].state;
        this.deviceForm.sensorsNum = res[0].sensorsNum;
        this.deviceForm.deviceNum = res[0].deviceNum;
        this.deviceForm.networkType = res[0].networkType;
        this.deviceForm.networkState = res[0].networkState;
        this.deviceForm.Location = res[0].Location;
        this.deviceForm.inPin = res[0].inPin;
        this.deviceForm.outPin = res[0].outPin;
        this.sonRefresh = false;
        this.$nextTick(()=>{
          this.sonRefresh = true;
        })
      }
    },
    //查询片区
    async deviceMcreated() 
    {
      if(this.$store.state.platedata===3)
      {
        const { data: res } = await this.$http.post("user/MachineSchOne", { data: this.$store.state.areadata}).catch(err => {this.$message.error("网络错误");
        });
        if(res)
        { 
          this.writerdata(res)
        }
      }
      else
      {
         const { data: resP3 } = await this.$http.post("user/MachineSchAll", { data: this.projectnumb}).catch(err => {this.$message.error("网络错误");});
           if(resP3)
        {
          this.writerdata(resP3)
        }
        
      }
    },
async platedevice()
{
   const { data: resP } = await this.$http
        .post("user/MachineSchAll", { data: this.projectnumb})
        .catch(err => {
          this.$message.error("网络错误");
        });
       if (!resP) {
        return this.$message.error("错误");
      } 
       else {
        this.dynamicTags = resP;
        this.tagabreadcrumb = resP[0].nickname;
        this.deviceForm.Ip = resP[0].Ip;
        this.deviceForm.AdminName = resP[0].AdminName;
        this.deviceForm.machinekey = resP[0].machinekey;
        this.deviceForm.nickname = resP[0].nickname;
        this.deviceForm.state = resP[0].state;
        this.deviceForm.sensorsNum = resP[0].sensorsNum;
        this.deviceForm.deviceNum = resP[0].deviceNum;
        this.deviceForm.networkType = resP[0].networkType;
        this.deviceForm.networkState = resP[0].networkState;
        this.deviceForm.Location = resP[0].Location;
        this.deviceForm.inPin = resP[0].inPin;
        this.deviceForm.outPin = resP[0].outPin;
        this.sonRefresh = false;
        this.$nextTick(()=>{
          this.sonRefresh = true;
        })
      }
},
  //点击事件 //查询子账户
    async handleClick(key) {
      if(key.machinekey)
      { 
         const { data: res1 } = await this.$http
        .post("user/MachineSch", { machinekey: key.machinekey })
        .catch(err => {
          this.$message.error("网络错误");
        });
        if (res1===undefined) 
        {
        return this.$message.error("查询错误");
        } 
        else 
        {
        this.tagabreadcrumb = key.nickname;
        this.deviceForm.machinekey = key.machinekey;
        this.deviceForm.Ip = res1.Ip;
        this.deviceForm.AdminName = res1.AdminName;
        this.deviceForm.machinekey = res1.machinekey;
        this.deviceForm.nickname = res1.nickname;
        this.deviceForm.state = res1.state;
        this.deviceForm.sensorsNum = res1.sensorsNum;
        this.deviceForm.deviceNum = res1.deviceNum;
        this.deviceForm.networkType = res1.networkType;
        this.deviceForm.networkState = res1.networkState;
        this.deviceForm.Location = res1.Location;
        this.deviceForm.inPin = res1.inPin;
        this.deviceForm.outPin = res1.outPin;
        this.sonRefresh = false;
        this.$nextTick(() => {
          this.sonRefresh = true;
         });
        }
      }
      else{
        this.tagabreadcrumb = key.nickname;
        this.deviceForm.nickname =key.nickname;
        this.deviceForm.machinekey=key.machinekey
        this.sonRefresh = false;
        this.$nextTick(() => {
          this.sonRefresh = true;
        });
      }
        
  
    },
  //定时刷新
    async timeClick(key) {
      this.sonRefresh = false;
        this.$nextTick(() => {
          this.sonRefresh = true;
        });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => 
      {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
   //设备注册
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        const data = this.$http.post("/user/Machineregister", {
          data: this.projectnumb,
          nickname: this.inputValue
        });
        this.dynamicTags.push({ nickname: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  mounted() {
    this.timedRefresh();
  },
 created() {
    this.deviceMcreated();
  },
  components: {
    deviceMain: deviceMain
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-row {
  margin-top: 20px;
}
.color {
  margin-left: 10px;
}
.color1 {
  border-right: 1px solid rgba(200, 200, 200, 50);
  > * {
    margin: 3px;
  }
}
</style>