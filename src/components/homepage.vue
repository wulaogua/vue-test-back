<template>
  <el-container class="homepage">
    <el-header>
      <el-row class="Lhead">
        <el-col :span="2">
          <div class="Llogo">LOGO</div>
        </el-col>
        <el-col :span="22">
          <el-row type="flex" justify="end" class="Rhead">
            <el-col :span="1">
              <div class="headSculpture"></div>
            </el-col>
            <el-col :span="1">
              <el-link :underline="false" href="#">主页</el-link>
            </el-col>
            <el-col :span="1">
              <el-link :underline="false" @click="loginroult()">登陆</el-link>
            </el-col>
            <el-col :span="2">
              <el-link :underline="false" href="#" class="RadminLogin">超管登陆</el-link>
            </el-col>
            <el-col :span="1">
              <el-button type="text" class="Rexit">退出</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="homepageEl-main">
      <el-row class="registerRow">
        <div class="companyName">XX公司</div>
        <div class="companyPlatform">XX平台</div>
        <div>
          <el-button round @click="Registerroult()">注册</el-button>
        </div>
      </el-row>
      <el-row class="projectRow">
        <el-row class="seachRow">
          <el-col :span="4">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input placeholder="请输入内容">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-search" circle></el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20" class="projectHeadName">项目列表</el-col>
        </el-row>
        <el-row class="cardRow" :gutter="20">
          <el-col :span="4" v-for="o in 6" :key="o">
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination :page-size="100" layout="total, prev, pager, next" :total="1000"></el-pagination>
      </el-row>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    Registerroult() {
      this.$router.push({ path: "/register" });
    },
    loginroult() {
      this.$router.push({ path: "/login" });
    }
  },
  mounted(){
    
  }
};
</script>

<style lang="less"  scoped>
.projectHeadName {
  white-space: nowrap;
  text-align: center;
  font-size: 28px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: Arial;
  color: rgb(0, 0, 0);
}
.projectRow {
  background-color: rgb(245, 245, 245);
}
.homepage {
  .el-link,
  .el-button {
    font-size: 18px;
  }
  .image {
    width: 100%;
  }
  .el-header {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: rgb(242, 242, 242);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

}

.headSculpture {
  width: 50px;
  height: 50px;
  border: 2px solid rgb(177, 177, 177);
  border-radius: 50%;
  box-shadow: 0px 0px 1px black;
  margin: 5px;
}
.seachRow {
  margin: 10px;
}
.cardRow {
  margin: 10px;
}
.registerRow {
  border-bottom: 1px solid rgba(175, 175, 175, 1);
  margin-bottom: 10px;
  height: 390px;
  top: 15%;
  .companyName {
    font-size: 32px;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: Arial;
    margin-bottom: 20px;
  }
  .companyPlatform {
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: Arial;
    margin-bottom: 20px;
  }
}
.homepageEl-main {
  color: #333;
  text-align: center;
  padding: 10px;
}
</style>