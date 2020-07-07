<template>
  <el-container class="index">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>{{heardname}}物联网后台</span>
      </div>
      <el-button type="info" @click="loginout()">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <!-- :unique-opened只允许打开一个下拉列表 -->
      <!-- :collapse侧边栏展开与折叠 -->
      <!--collapse-transition侧边栏展开动画-->
      <!--:default-active="this.$route.path"-->
      <!--:default-active="activePath""-->
      <el-aside :width="isCollapse ? '64px' :'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          :default-active="this.$route.path"
          background-color="#FFFFFF"
          text-color="#333333"
          active-text-color="#FF6A00"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item :index="itemi.path" v-for="itemi in menulistdan" :key="itemi.id">
            <i class="el-icon-setting"></i>
            <span slot="title">{{itemi.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主要显示区域 -->
        <el-main>
          <!-- 路由占位符号 -->
           <vueloading class="vueloading" :active="this.$store.state.loadingactive" spinner="line-down" color="#ff6700" background-color="rgba(232,232,232,0.9)"/>
          <router-view></router-view>
        </el-main>
        <!-- 底部区域 -->
        <el-footer>@2016-2020 nanjings</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      heardname:this.$store.state.heardname,
      isCollapse: false,
      activePath: ""
    };
  },
  created() {
    /* this.getMenuList(); */
    this.activePath = window.sessionStorage.getItem("activePath");
    let getData = [];
    //获取路由权限标识符
    let nameList = this.$store.state.lore;
    let typedata = this.$store.state.platedata;
    for (let i = 0; i < this.$router.options.routes[4].children.length; i++) 
    {
      let children = this.$router.options.routes[4].children[i]
      let item = children.meta.role;
      let typenum = children.meta.typenub;
      if (item.includes(nameList)) 
      {
        if(typenum.includes(typedata))
        {
          getData.push(children);
        }
      }
    }
    this.menulistdan=getData
  },
   mounted() 
  {
  },
  methods: {
    //退出
    loginout() {
      this.$store.commit('allrestate')
      window.sessionStorage.clear();
      this.$router.push("/");
      /* this.$socket.close(); */
    },
    /* 获取所有菜单 */
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      /*       获取返回的结果!=200报错返回/login
       */ if (res.meta.status != 200) {
        this.$message.error(res.meta.msg);
        this.$router.push("/login");
      } else {
        /*         获取返回的结果==200获取元素
         */
        if (res.children === null) 
        {
          this.menulistdan = res.data;
        }
        this.menulist = res.data;
        console.log(res);
      }
    },
    /* 侧边栏折叠展开 */
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    /* 保存链接状态 */
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" slot-scope="scope">
.index {
  margin-bottom: 0;
  height: 100%;
  .el-header {
    background-color: #e95420;
    color: rgb(255, 255, 255);
    line-height: 60px;
    display: flex;
    padding-left: 0;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    > div {
      span {
        margin-left: 20px;
      }
    }
  }

  .el-footer {
    background-color: #e5e4e4;
    color: #333;
    text-align: center;
    height: 20px;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #fdfdfd;
    color: #333;
    box-shadow: inset 0px 0px 4px 0px #929191;
  }
  .toggle-button {
    background-color: #ff6a00;
    font-size: 10px;
    line-height: 24px;
    color: rgb(17, 17, 17);
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
</style>
