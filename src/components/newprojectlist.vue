<template>
  <div class="backcolor">
    <el-container>
      <el-header>
        <div class="headtext">
          <img src="../../src/assets/logo3.png" alt /> 项目列表
        </div>
        <el-button plain @click="backbutton()">退出</el-button>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="6" v-for="cardid in Cardlist" :key="cardid._id">
            <el-card>
              <div class="ecard">
                <div class="cardname">{{cardid.areaname}}</div>
                <div class="carduser">
                  <div class="carduser">
                    <img src="../../src/assets/Admin.svg" alt />
                    :{{cardid.username}}
                  </div>
                </div>
                <div class="cardicnlist">
                  <el-row>
                    <el-col :span="6">
                      <div class="clt1">
                        <span>{{cardid.usernumb}}个</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="clt2">
                        <span>{{cardid.areanumb}}个</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="clt3">
                        <span>{{cardid.errornumb}}个</span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="clt4">
                        <span>{{cardid.waringnumb}}个</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="cardbtn" @click="managebutton(cardid.projectnumb)">
                <span>查看详情</span>
                <img src="../../src/assets/zuo.svg" alt />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Cardlist: [],
    };
  },
  created() {
    this.serchnumb();
  },
  mounted() {},
  methods: {
    managebutton(key) {
      this.$store.commit("addpjecnum", key);
      this.$router.push("/index");
    },
    //获取项目数据
    async serchnumb() {
      let platename = this.$store.state.platename;
      const { data: res } = await this.$http.post("project/searchproject", {
        platename: platename,
      });
      this.Cardlist = res.data;
    },
    backbutton() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
<style lang="less" scoped>
/* ------------- */
.headtext {
  color: #fff;
  font-size: 1.1em;
  letter-spacing: 2px;
  img {
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }
}
.backcolor {
  height: 100%;
  background: rgb(250, 249, 249);
}
.el-header {
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  background-color: #38a9e7;
  align-items: center;
  text-align: center;
  line-height: 60px;
  .el-button:hover {
    color: #333;
  }
}
.el-main {
  color: #333;
  height: 100%;
}
.el-card /deep/ .el-card__body {
  padding: 0;
}
.el-card {
  border: 1px solid rgba(122, 122, 122, 0.342);
  .cardbtn {
    cursor: pointer;
    color: #fff;
    span {
      line-height: 20px;
      float: left;
    }
    height: 22px;
    background: #4db5ab;
    padding: 10px;
    text-align: center;
    transition: background 1s;
    img {
      float: right;
      width: 20px;
      height: 20px;
    }
  }
  .cardbtn:hover {
    background: #2b6660;
  }
  border-radius: 10px;
  .ecard {
    padding: 20px;
  }
  .cardname {
    text-align: center;
    font-size: 1em;
    padding-bottom: 5px;
  }
  .carduser {
    text-align: center;
    font-size: 1.2em;
    img {
      height: 40px;
      width: 40px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .cardicnlist {
    padding-top: 23px;
    img {
      height: 35px;
      width: 35px;
    }
    .clt1 {
      color: #02ad4d;
      text-align: center;
      width: 40px;
      height: 40px;
      padding-top: 50px;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      background-image: url(../../src/assets/user.svg);
    }
    .clt2 {
      color: #003882;
      text-align: center;
      width: 40px;
      height: 40px;
      padding-top: 50px;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      background-image: url(../../src/assets/area.svg);
    }
    .clt3 {
      color: #fe8800;
      text-align: center;
      width: 40px;
      height: 40px;
      padding-top: 50px;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      background-image: url(../../src/assets/circle-abnormal.svg);
    }
    .clt4 {
      color: red;
      text-align: center;
      width: 40px;
      height: 40px;
      padding-top: 50px;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      background-image: url(../../src/assets/alarm.svg);
    }
  }
}
</style>