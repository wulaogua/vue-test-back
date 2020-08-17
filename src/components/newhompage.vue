<template>
  <div>
    <el-container>
      <el-header style="height:102px !important">
        <div class="set-img">
          <div class="imgg">
            <img src="../../src/assets/logo1.png" alt />
          </div>
          <div class="textt">
            <span class="line1">平台名称</span>
            <span class="line2">PingTaimingcheng</span>
          </div>
        </div>
        <div class="menu-text">
          <ul class="menu-prime">
            <li ref="li1" @click="$router.push({ path: '/' })" >首页</li>
            <li ref="li2" @click="$router.push({ path: '/' })">控制台</li>
            <li ref="li3" @click="$router.push({ path: '/login' })">登录</li>
            <li ref="li4" @click="$router.push({ path: '/register' })">注册</li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <div style="border-bottom: 1px solid #dceaff;">
          <section class="main">
            <div class="container">
              <p>
                <strong>XX物联网平台</strong>
                智能化物联网设备，共享XXIOT能力,智能化物联网设备，共享XXIOT能力,智能化物联网设备
              </p>
              <p>
                <a class="button-arrow" href="#">登录Login</a>
              </p>
              <span class="animation"></span>
            </div>
          </section>
        </div>
        <div class="sec2" style="border-bottom: 1px solid #dceaff;">
          <section class="main">
            <div class="container">
              <h3>我们能做什么？</h3>
              <p
                class="sec2-text"
              >E-Commerce comes in all shapes and sizes. Whether you’re looking to expand your client base, streamline your order fulfillment process or better serve your customers with your existing platform, we have the experience and the diverse skill set it takes to find you the best and most cost-effective solution.</p>
            </div>
          </section>
          <div class="cardlist">
            <el-row>
              <el-col v-for="i in 6" :key="i" :span="4">
                <el-card class="box-card" shadow="never">
                  <div class="card-img">
                    <img src="../../src/assets/ecommerce-implementation.svg" alt />
                  </div>
                  <h4>标题标题</h4>
                  <div class="card-text">
                    <p>这是什么gone能那是什么功能这是什么功能那是什么功能</p>
                  </div>
                  <div class="jiantou">
                    <a href="#">
                      <i class="el-icon-right"></i>
                    </a>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="sec3" style="border-bottom: 1px solid #dceaff;">
          <section class="main">
            <div class="container">
              <h3>XX平台</h3>
            </div>
            <div class="sec3-text">
              <el-carousel :interval="4000" type="card" height="330px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <h3 class="medium">最近，深感自己的表达欲有井喷之势。大概是因为近来多睡梦吧，梦里各路的人马场景玄幻莫测，不过最玄幻的是我发现自己恍惚间竟有沉溺梦中的欲望，时而就做起了所谓的白日梦。好吧，我也许大概可能真的是有病吧，亦或者我只是闲的慌，自己无病呻吟</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </section>
        </div>
      </el-main>
      <el-footer style="height:100% !important">
        <div class="main">
          <el-row class="container">
            <el-col :span="17">
              <div>
                <h3>注册个账号吧！</h3>
                <el-form :inline="true" label-width="100px">
                  <el-form-item>
                    <el-input v-model="form.name" placeholder="用户名*"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="form.name" placeholder="手机号*"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="form.name" placeholder="密码*"></el-input>
                  </el-form-item>
                </el-form>
                  <el-button type="primary">注册Register <i class="el-icon-right"></i> </el-button>
              </div>
            </el-col>
            <el-col :span="6" :offset="1">
              <div class="footerright">XXXX是一家精品定制软件开发公司，专门为电子商务和电子商务需求提供创新、可扩展的技术解决方案。</div>
              <el-row>
                <el-col :span="12" class="fott"><h4>地址</h4>中国江苏省南京市XX区XX胡同XX号</el-col>
                <el-col :span="10" class="fott" :offset="2"><h4>电话</h4>(+86)12345678944</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods:{
  },
};
</script>

<style lang="less" scoped>
.el-header {
  font-family: "sofia-pro-soft", sans-serif;
  max-width: 1330px;
  margin: 0 auto;
  width: 100%;
}
.el-main {
  overflow: hidden;
  padding: 0;
  p {
    letter-spacing: 2px;
    font-size: 2em;
    line-height: 80px;
  }
}
.main {
  margin: 0 auto;
  max-width: 1330px;
}
.set-img {
  margin-top: 25px;
  .imgg {
    float: left;
    width: 50px;
    height: 50px;
    img {
      float: left;
      width: 50px;
      height: 50px;
    }
  }
  .textt {
    cursor: pointer;
    color: #2a303a;
    float: left;
    margin-left: 10px;
    .line1 {
      letter-spacing: 2px;
      font-size: 1.1em;
      display: block;
      margin-bottom: 7px;
      font-weight: 600;
    }
    .line2 {
      font-size: 0.8em;
      font-weight: 400;
    }
  }
}
.menu-text {
  font-size: 0.9em;
  font-weight: 600;
  letter-spacing: 4px;
  float: right;
  ul {
    list-style: none;
  }
  li {
    color: #4489ff;
    transition:color 0.5s;
    cursor: pointer;
    float: left;
    margin-left: 34px;
  }
  li:hover{
    color: #005748f6;
  }
}
.menu-prime {
  float: left;
}
.button-arrow {
  border: 0px solid #fff;
  transition:border 0.5s;
  font-size: 17px;
  padding: 14px 54px 16px 22px;
  background-size: 15px 13px;
  background-position: right 18px center;
  line-height: 20px;
  background-color: #4489ff;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  background-repeat: no-repeat;
  top: 50%;
  background-image: url("../../src/assets/arrow-right.svg");
}
.button-arrow:hover {
border:1px solid rgba(21, 219, 245, 0.445)
}
.container {
  display: block;
  position: relative;
  padding: 0 20px;
  padding-right: 450px;
  .animation {
    width: 336px;
    height: 446px;
    position: absolute;
    background-position: 85px bottom;
    background-repeat: no-repeat;
    background-image: url("../../src/assets/home-banner.svg");
    bottom: 0;
    right: 0;
  }
}
.sec2-text {
  margin-bottom: 90px;
}
.sec2 {
  p {
    font-size: 0.9em;
    line-height: 30px;
    font-weight: 540;
    letter-spacing: 1px;
    font-family: "sofia-pro-soft", sans-serif;
  }
  h3 {
    color: #4489ff;
  }
  .cardlist {
    margin-left: 50px;
    margin-bottom: 50px;
  }
  .el-card {
    border: 2px solid rgba(200, 242, 221, 0.7);
    border-radius: 20px;
  }
  .el-card:hover{
   transform:translatey(-15px);
  }
  .box-card {
    width: 273px;
    height: 473px;
    text-align: center;
    .card-text {
      margin-bottom: 50px;
    }
    .card-img {
      padding: 0 10px 0 10px;
      position: relative;
      margin-top: 30px;
      margin-bottom: 22px;
    }
    a {
      color: #fff;
    }
    .jiantou {
      cursor: pointer;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      background-color: #69efad;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 70px;
      i {
        font-size: 2em;
      }
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 0 auto;
      display: block;
    }
  }
}
.sec3 {
  background-color: #f4faff;
  color: #4489ff;
  .medium{
    line-height: 20px;
  }
  .container {
    padding-top: 115px;
  }
  h3 {
    background-image: url("../../src/assets/logo1.png");
    background-repeat: no-repeat;
    background-size: 50px 50px;
    min-height: 50px;
    padding-left: 71px;
    padding-top: 11px;
  }
  .sec3-text {
    padding-top: 25px;
    padding-bottom: 50px;
  }
}
.sec3 /deep/ .el-carousel__indicators--outside button{
  background-color:#69efad;
}
.el-carousel__item h3 {
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  border: 2px solid rgba(134, 248, 233, 0.9);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
}
.el-carousel__item:nth-child(2n + 1) {
  border: 2px solid rgba(134, 248, 233, 0.9);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
}
.el-footer {
  letter-spacing: 2px;
  background-color: #344966;
  color: #fff;
  .footerright{
    padding-bottom: 30px;
    font-weight: 500;
    font-size: 0.90em;
  }
  .container {
    padding-top: 122px;
    padding-bottom: 80px;
    padding-right: 0px;
    .fott{
      h4{
        font-size:1em;
        margin:5px 0;
      }
      font-weight: 500;
      font-size:0.9em;
    }
  }
}
.el-footer /deep/ .el-input__inner {
  color: #fff;
  background-color: #1d3a4e;
  height: 60px;
  line-height: 60px;
  width: 280px;
}
.el-footer /deep/ .el-button {
  line-height:2;
  width: 250px;
}
</style>