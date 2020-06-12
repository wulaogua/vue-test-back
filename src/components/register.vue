<template>
  <div class="registPage">
    <div class="registbox">
      <div class="registHead">账户注册</div>
      <el-form
        label-width="0px"
        class="registForm"
        :model="registerForm"
        :rules="registerRules"
        ref="registerRef"
      >
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
          <el-button type="primary" @click="registerMethods()">注册</el-button>
          <el-button type="warning" @click="registerClearMethods()">重置</el-button>
        </el-form-item>
      </el-form>
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
        code: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      registerRules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 8, message: "不为空", trigger: "blur" }
        ],
        tal: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { min: 1, max: 8, message: "不为空", trigger: "blur" }
        ],
        machinekey: [{ validator: checkkey, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
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
      this.$refs.registerRef.validate(async val => {
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
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>

<style lang="less" slot-scope="scope">
.registHead {
  padding: 10px 20px;
}
.registForm {
  position: relative;
  bottom: 0px;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: end;
}
.registbox {
  width: 450px;
  height: 450px;
  background-color: royalblue;
  border-radius: 3px;
}
.registPage {
  height: 100%;
  background: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>