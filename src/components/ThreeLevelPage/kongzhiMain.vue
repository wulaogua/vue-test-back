<template>
  <div>
    <el-row>
      <div>
        <span>设备控制 <i class="el-icon-c-scale-to-original"></i> </span>
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
              <el-col :span="4" >
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
              <el-col :span="10" >

                <div style="text-align:center;line-height:45px" v-if="c.value===1">
                  <el-radio-group v-model="c.status" size="mini" @change="singledevice(c)">
                    <el-radio-button label=1 :loading="true" >开</el-radio-button>
                    <el-radio-button label=2 :loading="true" >关</el-radio-button>
                  </el-radio-group>
                </div>

                <div style="text-align:center;line-height:45px" v-if="c.value===2">
                  <el-radio-group v-model="c.status" size="mini" @change="doubledevice(c)">
                    <el-radio-button label=1  :loading="true" >左</el-radio-button>
                    <el-radio-button label=2  :loading="true" >停</el-radio-button>
                    <el-radio-button label=3 :loading="true" >右</el-radio-button>
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
      <span>操作日志</span>
    </div>
    <el-divider class="dividermarg"></el-divider>
  </div>
</template>

<script>
export default {
    props: ['message'],
  data() {
    return {
    refresh:true,
    carddatalist:Array(),
    };
  },
  created() {
    this.carddatalist = this.message.adata
  },
  mounted() {},
  updated(){
     this.refresh=false
          this.$nextTick(()=>{
            this.refresh=true
          })
  },
  methods: {
    //单控c
  async  singledevice(data)
    {
      data.status=parseInt(data.status)
      const {data:singledevicedata} =await this.$http.post('device/updata',{"machinekey":data.devicekey,"id":data.id,"status":data.status,"Nvalue":data.Nvalue})
      if(singledevicedata.meta.status!=200)
      {
        this.$message.error("操作失败")
      }
      else
      {
        if(singledevicedata.data.status===data.status)
        {
          this.$message.success("操作成功")
        }
        else
        {
          this.$message.error("操作失败/数据异常")
        }
      }
    },
    //双控
   async  doubledevice(data){
      data.status=parseInt(data.status)
      const {data:singledevicedata} =await this.$http.post('device/updata',{"machinekey":data.devicekey,"id":data.id,"status":data.status,"Nvalue":data.Nvalue})
      if(singledevicedata.meta.status!=200)
      {
        this.$message.error("操作失败")
      }
      else
      {
        if(singledevicedata.data.status===data.status)
        {
          this.$message.success("操作成功")
        }
        else
        {
          this.$message.error("操作失败/数据异常")
        }
      }
    },
    //调值
   async adjustdevice(data){
            data.status=parseInt(data.status)
      const {data:singledevicedata} =await this.$http.post('device/updata',{"machinekey":data.devicekey,"id":data.id,"status":data.status,"Nvalue":data.Nvalue})
      if(singledevicedata.meta.status!=200)
      {
        this.$message.error("操作失败")
      }
      else
      {
        if(singledevicedata.data.status===data.status)
        {
          this.$message.success("操作成功")
        }
        else
        {
          this.$message.error("操作失败/数据异常")
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
.block{
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