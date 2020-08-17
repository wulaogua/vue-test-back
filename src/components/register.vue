<template>
  <div class="registPage">
    <div class="registbox">
      <div class="backdiv">
        <img src="../../src/assets/logo2.png" alt />
      </div>
      <div class="rebox">
        <div class="registHead">账户注册</div>
        <el-form class="registForm" :model="registerForm" :rules="registerRules" ref="registerRef">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码">
              <i slot="prefix" class="el-icon-lollipop"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="tal">
            <el-input v-model="registerForm.tal" placeholder="请输入联系方式">
              <i slot="prefix" class="el-icon-lollipop"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="machinekey">
            <el-input v-model="registerForm.machinekey" placeholder="请输入设备号">
              <i slot="prefix" class="el-icon-lollipop"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" v-model="registerForm.code" placeholder="请输入验证码">
              <template slot="append">
                <div class="login-code" @click="refreshCode">
                  <Identify :identifyCode="identifyCode"></Identify>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="btns">
            <div class="btnlist">
              <el-button type="primary" @click="registerMethods()">注册</el-button>
              <el-button type="warning" @click="registerClearMethods()">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Identify from "./bock/identify";
export default {
  components: { Identify },
  data() {
    let checkUsername = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输用户名"));
      } else if (!(await this.usernameRepeat(value))) {
        callback(new Error("用户名重复"));
      } else {
        callback();
      }
    };
    let checkkey = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输KEY"));
      } else if (!(await this.keyCheck(value))) {
        callback(new Error("KEY不存在"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        tal: "",
        machinekey: "",
        code: "",
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      registerRules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 8, message: "不为空", trigger: "blur" },
        ],
        tal: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { min: 1, max: 8, message: "不为空", trigger: "blur" },
        ],
        machinekey: [{ validator: checkkey, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 重置验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    registerClearMethods() {
      this.$refs.registerRef.resetFields();
      /* this.registerstau=true */
    },
    registerMethods() {
      this.$refs.registerRef.validate(async (val) => {
        if (!val) return;
        if (
          this.registerForm.code.toLowerCase() !==
          this.identifyCode.toLowerCase()
        ) {
          this.$message.error("请填写正确验证码");
          this.refreshCode();
          return;
        }
        const { data: res } = await this.$http.post(
          "register",
          this.registerForm
        );
        if (res.meta.status != 200) return;
        this.$router.push({ path: "/login" });
      });
    },
    async keyCheck(str) {
      const { data: res } = await this.$http.get(`machinekey/${str}`);
      if (res.meta.status != 200) {
        return false;
      }
      this.reg2 = !this.reg2;
      return true;
    },
    async usernameRepeat(str) {
      const { data: res } = await this.$http.get(`users/${str}`);
      if (res.meta.status != 200) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
};
</script>
<style lang="less" scoped>
.btnlist{
  float: right;
}
.btns /deep/ .el-form-item__content{
  width: 100%;
}
.registHead {
  padding-top: 30px;
  text-align: center;
}
.registForm {
  padding-top: 40px;
  position: relative;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: end;
}
.registbox {
  width: 800px;
  height: 500px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(78, 78, 78, 0.2);
  border-radius: 10px;
  .backdiv {
    float: left;
    width: 40%;
    height: 100%;
    img {
      width: 150px;
      padding: 50% 30%;
    }
  }
  .rebox {
    width: 50%;
    float: right;
    padding: 10px 30px;
  }
}

.registPage {
  height: 100%;
  background: rgb(250, 249, 249);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>