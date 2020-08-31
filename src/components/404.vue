<template>
  <div class="backpage">
    <div class="pageimg"></div>
    <div class="text404"><span>页面....页面不存在，滚回 <a href="http://localhost:8081/#/">主页</a></span></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.backpage {
  height: 100%;
    .pageimg{
        margin: 0 auto;
        width: 1000px;
        height:500px;
        background-size: 1000px;
        background-image: url(../../src/assets/404.gif);
        background-repeat: no-repeat;
    }
    .text404{
        text-align: center;
        a{
            text-decoration:none;
            color: #4489ff;
        }
        
    }
}
</style>