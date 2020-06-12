<template>
  <div class="loginPage">
    <div class="loginbox">
      <div class="loginHead">账户登录</div>
      <el-form
        label-width="0px"
        class="loginForm"
        :model="loginForm"
        :rules="loginRules"
        ref="loginRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入内容">
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入内容">
            <i slot="prefix" class="el-icon-lollipop"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码">
            <template slot="append">
              <div class="login-code" @click="refreshCode">
                <Identify :identifyCode="identifyCode"></Identify>
              </div>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="loginMethods()">登陆</el-button>
          <el-button type="warning" @click="loginClearMethods()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Identify from "./bock/identify";
export default {
  components: { Identify },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        code: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      loginRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 8, message: "不为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
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

    loginClearMethods() {
      this.$refs.loginRef.resetFields();
    },
    loginMethods() {
      this.$refs.loginRef.validate(async val => {
        if (!val) {
          return;
        } 
        else {
          if (
          this.loginForm.code.toLowerCase() !==
          this.identifyCode.toLowerCase()
        ) {
          this.$message.error("请填写正确验证码");
          this.refreshCode();
          return;
        }
          const { data: res } = await this.$http
            .post("login", this.loginForm)
            .catch(err => {
              this.$message.error("网络错误");
            });
          if (res.meta.status != 200) {
            return this.$message.error("登陆失败");
          } else {
            //子用用户登录
            if (res.Jurisdiction === "user") {
              window.sessionStorage.setItem("token", res.token);
              this.$store.commit("addstarlore", res.Jurisdiction);
              this.$store.commit("addplatedata", 3);
              this.$router.push("/index");
            } else {
              //主用户登陆
              window.sessionStorage.setItem("token", res.token);
              const key = await this.$http.get("user/role");
              this.$store.commit("addstarlore", key.data);
              const { data: resdata } = await this.$http.post("chartdata/seek");
              if (resdata.meta.status === 422) {
                const namedata = confirm(
                  "此账号没有片区/个人纪录是否创建新的？"
                );
                if (namedata) {
                  this.$router.push("/new");
                } else {
                  return;
                }
              } else {
                this.$router.push("/plate");
              }
            }
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>

<style lang="less" slot-scope="scope">
.loginHead {
  padding: 10px 20px;
}
.loginForm {
  position: relative;
  bottom: 0px;

  padding: 40px 20px;
  box-sizing: border-box;
}
.btns {
  display: -webkit-box;
  justify-content: end;
}
.loginbox {
  width: 450px;
  height: 320px;
  background-color: royalblue;
  border-radius: 3px;
}
.loginPage {
  height: 100%;
  background: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>