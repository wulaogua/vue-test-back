<template>
  <div class="addChildrenUse">
    <div>
      <span>子用户管理</span>
      <el-divider></el-divider>
    </div>
    <el-row :gutter="10">
      <!-- 卡片视图 -->
      <el-col :span="6" v-for="citem in Cardlist" :key="citem._id" :index="citem._id +''">
        <el-card class="card" shadow="hover" :body-style="{ padding: '5px' }">
          <el-row type="flex" align="middle">
            <el-col :span="5" class="iconsize">
              <i class="el-icon-user-solid"></i>
            </el-col>
            <el-col :span="19" align="left">
              <el-row type="flex" align="center">
                <el-col :span="12">
                  <span class="fontstyle">名字:{{citem.username}}</span>
                </el-col>
                <el-col :span="12" align="right">
                  <span class="userIconStyle">
                    <i class="el-icon-edit" @click="reviseUsermessage(citem.username)"></i>
                    <i class="el-icon-delete" @click="deletUser(citem.username)"></i>
                  </span>
                </el-col>
              </el-row>
              <div class="downfontstyle">权限:{{citem.Jurisdiction}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 新增按钮-->
      <el-col :span="6" align="center">
        <el-button
          type="warning"
          icon="el-icon-plus"
          circle
          class="addchildrenicon"
          @click="addChildrenIcon()"
        ></el-button>
      </el-col>
    </el-row>
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible" @close="closeDialog">
      <!--子组件-->
      <User v-bind:message="chindredata" @testvalue="testvalue"></User>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import childrenUsere from "@/components/Dialogpage/childrenUser";
export default {
   computed:{
    ...mapState(['projectnumb'])
  },
  //刷新界面
  inject: ["reload"],
  data() {
    return {
      Cardlist: [],
      chindredata: [],
      currentDate: new Date(),
      dialogFormVisible: false
    };
  },
 
  methods: {
    //删除用户
   async deletUser(name)
   {
      const deletchildren = await this.$http.post("user/deletchlidren",{'nanme':name,"data":this.projectnumb});
      if(!deletchildren){this.$message.error('删除失败')}
      this.$message.success('删除成功')
       this.reload();
    },
    //关闭跳转
    closeDialog() {
      //刷新界面
      this.reload();
    },
    testvalue(val) {
      this.dialogFormVisible = val;
    },
    //修改按钮
    reviseUsermessage(key) {
      //保存数据
      //渲染
      this.chindredata.cardname = key;
      this.chindredata.projectnumb = this.projectnumb;
      this.chindredata.operation = "revise";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    //添加按钮按钮
    async addChildrenIcon() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.chindredata.operation = "add";
      this.chindredata.projectnumb = this.projectnumb;
    },
    //获取子用户列表
    async findchildrenuser() {
      const chindrendata = await this.$http.post("user/childuser",{"data":this.projectnumb});
      if (chindrendata.status != 200) {
        return this.$message.error("拉取失败");
      }
      this.Cardlist = chindrendata.data;
    }
  },

  mounted() {},
  created() {
    this.findchildrenuser();
  },
  components: {
    User: childrenUsere
  }
};
</script>

<style lang="less" scoped>
.addChildrenUse {
  .addchildrenicon {
    margin-top: 5%;
  }
  .el-col {
    padding-bottom: 5px;
  }
  .downfontstyle {
    margin-top: 10px;
    font-size: 5px;
    color: rgb(252, 86, 86);
  }
  .userIconStyle {
    font-size: 20px;
    color: rgb(97, 97, 97);
    > * {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .fontstyle {
    font-size: 18px;
    color: rgb(182, 182, 182);
  }
  .iconsize {
    font-size: 50px;
    color: rgb(206, 206, 206);
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}
</style>