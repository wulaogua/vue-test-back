<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="4" class="nnassiad">
      <span>设备</span>
      <el-row :gutter="5" style="margin:5px">
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{name:'people', pull:'clone',put: false }"
          @change="log"
        >
          <el-col :span="6" v-for="element in list1" :key="element.name">
            <div class="nnblock">{{ element.name }}</div>
          </el-col>
        </draggable>
      </el-row>
    </el-col>
    <el-col :span="19" class="nnmain" v-if="dsad">
      <div class="nnleftblck" v-for="i in listform" :key="i.id">
        <span>{{value.name}}>{{b[i.id].Fname}}>{{b[i.id].Sname}}></span>
        <div class="inputkuang">
          <el-row :gutter="5" style="margin-left:5px">
            <draggable
              class="dragArea list-group"
              :list="i.list"
              :group="{name:'people',pull:'clone',}"
              @change="log"
            >
              <el-col :span="2" v-for="(element,idx) in i.list" :key="element.name">
                <div class="nnblock">
                  {{ element.name }}
                  <i class="el-icon-close" @click="removeAt(idx,i.list)"></i>
                </div>
              </el-col>
            </draggable>
          </el-row>
        </div>
      </div>
      <div class="updone"> 
        <el-button  type="success" round @click="putJSON()">提交</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      value: [],
      b: Array(),
      dsad: false,
      UpLevelForm: [],
      listform: [],
      list1: [
        { name: "槽1", id: 51 },
        { name: "槽2", id: 61 },
        { name: "槽3", id: 71 },
        { name: "槽4", id: 72 },
        { name: "槽5", id: 73 },
        { name: "槽6", id: 74 },
        { name: "槽7", id: 75 },
        { name: "槽8", id: 76 },
        { name: "1号dp", id: 77 },
        { name: "2号dp", id: 78 },
        { name: "3号dp", id: 79 },
         {name: "4号dp", id: 80 },
          {name: "5号dp", id: 81 },
           {name: "qixaign", id: 82 },
        
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.moutfuction();
      this.dsad = true;
    });
  },
  mounted() {},
  beforeDestroy(){
    this.$store.commit("mResState");
  },
  methods: {
    moutfuction() {
      if (!this.$store.state.newproject.mainJump) {
        const data = confirm("数据丢失跳转上一级");
        if (data) {
          this.$router.push("/new");
        } else {
          this.$router.push("/new");
        }
      } else {
        this.UpLevelForm = this.$store.state.newproject.mainTree;
        this.value = JSON.parse(JSON.stringify(this.UpLevelForm));
        this.value.children.forEach((data, i) => {
          if (data.children) {
            data.children.forEach(data1 => {
              this.b.push({ Fname: data.name, Sname: data1.name });
            });
          }
        });
        for (var i = 0; i < this.b.length; i++) {
          this.listform.push({ id: i, list: [] });
        }
      }
    },
   async putJSON(){
      const putdata={'b':this.b,'UpLevelForm':this.UpLevelForm,'listform':this.listform}
      const {data:res} = await this.$http.post("chartdata/add",putdata);
      if(res.meta.status===200)
      {
        this.$message.success('添加成功')
        this.$router.push('/plate')
      }
      else{
        this.$message.error("添加失败")
      }
    },
    removeAt(idx, data) {
      this.dsad = false;
      data.splice(idx, 1);
      this.dsad = true;
    },
    log: function(evt) {
      this.dsad = false;
      window.console.log(evt);
      this.dsad = true;
    }
  }
};
</script>

<style lang="less" scoped>
span {
  margin: 10px;
}

.nnassiad {
  background: salmon;
  height: 100%;
  position: sticky;
  top: 0px;
}
.nnmain {
  background: seagreen;

  height: 100%;
  .el-row {
    height: 100%;
    margin: 0;
  }
  .list-group {
    height: 100%;
  }
}
.nnblock {
  height: 70px;
  background: darkmagenta;
  margin-top: 3px;
  border-radius: 10px;
  text-align: center;
  color: aliceblue;
}
.inputkuang {
  overflow-y: auto;
  overflow-x: hidden;
  height: 160px;
  background: #ffffff;
  margin: 10px;
  border-radius: 10px;
}
.nnleftblck {
  max-height: 200px;
}
.updone{
  margin: 10px;
  .el-button{
    width: 100%;
  }
}
</style>