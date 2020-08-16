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
            <li>首页</li>
            <li>控制台</li>
            <li>登录</li>
            <li>注册</li>
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
            <h3>
              我们能做什么？
            </h3>
            <p class="">
              E-Commerce comes in all shapes and sizes. Whether you’re looking to expand your client base, streamline your order fulfillment process or better serve your customers with your existing platform, we have the experience and the diverse skill set it takes to find you the best and most cost-effective solution.
            </p>
            </div>
          </section>

        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  
  padding:0;
  p {
    letter-spacing: 2px;
    font-size: 2em;
    line-height: 80px;
  }
}
.main{
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
  color: #4489ff;
  float: right;
  ul {
    list-style: none;
  }
  li {
    float: left;
    margin-left: 34px;
  }
}
.menu-prime {
  float: left;
}
.button-arrow {
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
.container {
  display:block;
  position: relative;
 padding: 0 20px;
  padding-right: 270px;
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
.sec2{
  p{
    font-size: 0.9em;
    line-height:30px;
    font-weight: 540;
    letter-spacing:1px;
    font-family:"sofia-pro-soft", sans-serif;
  }
  h3{
    color: #4489ff;
  }
}
</style>