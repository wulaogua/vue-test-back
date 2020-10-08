<template>
  <div class="childrenUser">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
       <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" :disabled="passwordstate"></el-input>
        <el-button @click="resetPassowrd()">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-divider content-position="left">用户权限</el-divider>
      </el-form-item>
      <!-- 用户权限勾选1 -->
      <el-form-item label="片区数据权限">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="ruleForm.checkeduseris" @change="handleCheckeduserisChange">
          <el-checkbox v-for="user in useris" :label="user" :key="user">{{user}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 片区权限勾选2 -->
      <el-form-item label="片区控制权限">
        <el-checkbox
          :indeterminate="isIndeterminateO"
          v-model="checkAllO"
          @change="handleCheckAllChangeO"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="ruleForm.checkeduserisO" @change="handleCheckeduserisChangeO">
          <el-checkbox v-for="userO in userisO" :label="userO" :key="userO">{{userO}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="exitvalue()">取 消</el-button>
        <el-button type="primary" @click="okvalue('ruleForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'childuser',
   computed: {
    ...mapState(["projectnumb"])
  },
  props: ['message'],
  data() {
    //自定义链表检查
    let chickUsername = async (rule, value, callback) =>
     {
      if (!(await this.usernameRepeat(value))) 
      {
        callback(new Error("用户名重复"));
      } 
      else
       {
        callback();
       }
    };
    return {
      //表单相关
      passwordstate: true,
      checkAll: false,
      useris:[],
      isIndeterminate: false,
      checkAllO: false,
      userisO:[],
      isIndeterminateO: false,
      //父组件点击状态修改？添加
      operation:this.message.operation,
      //生成数组的内容
      ruleForm: {
        name: "",
        password: "",
        phone:'',
        checkeduseris: [],
        checkeduserisO: []
      },
      //表单检查规则
      rules: {
        name: [
          { validator: chickUsername, trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, trigger: "blur" }
        ]
      },
      cData:this.message
    };
  },
  methods: {
    //初始化查询
   async initializeData(key) 
   {
     this.ruleForm.data=this.projectnumb;
     const{data:resdata} = await this.$http.post("user/MachineSchAll",{"data":this.ruleForm.data});
      resdata.forEach((data,i)=>{
      this.useris[i]=data.nickname
      })
      this.userisO=this.useris;
      //增加填充数据
      if (key.operation === "add") {
        this.ruleForm.name = "";
        this.ruleForm.password = "";
        this.ruleForm.checkeduseris = [];
        this.ruleForm.checkeduserisO = [];
        this.passwordstate = false;
      }
      //修改填充数据
       else if (key.operation === "revise")
        {
        this.ruleForm.name = key.cardname;
        this.ruleForm.password = "******"; 
        const{data:res} = await this.$http.post("user/child",this.ruleForm);
            if(!res)
            {
              this.$message.error('读取错误')
            }
            this.ruleForm.checkeduseris=res[0].areadatarights
            this.ruleForm.checkeduserisO=res[0].areacontrolarights
      }
    },
    //多选1
    handleCheckAllChange(val) {
      this.ruleForm.checkeduseris = val ? this.useris : [];
      this.isIndeterminate = false;
    }, //多选2
    handleCheckAllChangeO(valO) {
      this.ruleForm.checkeduserisO = valO ? this.useris : [];
      this.isIndeterminateO = false;
    }, //多选1
    handleCheckeduserisChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.useris.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.useris.length;
    },
    //多选2
    handleCheckeduserisChangeO(valueO) {
      let checkedCountO = valueO.length;
      this.checkAllO = checkedCountO === this.userisO.length;
      this.isIndeterminateO =checkedCountO > 0 && checkedCountO < this.userisO.length;
    },
    //重置密码
    resetPassowrd() {
      this.ruleForm.password = "";
      this.passwordstate = false;
    },
    //子用户名验证
    async usernameRepeat(str) {
      const { data: res } = await this.$http.get(`users/${str}`);
      if (res.meta.status != 200) {
        return false;
      }
      return true;
    },
    //提交
    okvalue(formName) {
      this.ruleForm.data=this.message.projectnumb
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //修改
          if (this.operation === "revise") {
              const{data:resr} = await this.$http.post('user/updatachlidren',
               {'ouserame':this.message.cardname,'newdata':this.ruleForm,"data":this.projectnumb})
            if(!resr){this.$message.error("更新错误")}
            let dialogFormVisible = false;
            this.$message.success("更新成功");
            this.$emit("testvalue", dialogFormVisible);
          }
          //增加
          else if (this.operation === "add") 
          {
            //请求接口上传数据
            const { data: res } = await this.$http.post("user/childregister",this.ruleForm);
            //分析meta.statue弹出提示
            this.$message.success("添加成功");
            let dialogFormVisible = false;
            //传递父组件信息---刷新父组件
            this.$emit("testvalue", dialogFormVisible);
          }
        } else {
          return false;
        }
      });
    },
    //退出表单
    exitvalue() {
      let dialogFormVisible = false;
      this.$emit("testvalue", dialogFormVisible);
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.checkeduseris = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.checkeduserisO = [];
      this.isIndeterminateO = false;
      this.checkAllO = false;
    },
 
  },
  created() {
    /* this.testdata1(this.message); */
    this.initializeData(this.cData)
  },
};
</script>
<style lang="less" slot-scope="scope">
.childrenUser {
  .el-input {
    width: 50%;
  }
}
</style>