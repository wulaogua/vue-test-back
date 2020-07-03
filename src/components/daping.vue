<template>
  <div class="hid">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <el-row class="headrow">
      <el-col :span="7">LOGO</el-col>
      <el-col :span="10">名字</el-col>
      <el-col :span="7">时间</el-col>
    </el-row>

    <el-row class="biaolan">
      <el-col :span="6" style="overflow:hidden;">
        <el-row class="zcb">
          <el-col class="xinwen">
            <div class="xinwentotle">
              <span>农业新闻</span>
            </div>
            <div class="xinwenbody" v-for="o in xinwenlist" :key="o.id">
             <i class="el-icon-link"></i>
              <a :href="o.url">{{o.title}}</a>
              <div>{{o.body}}</div>
            </div>
          </el-col>
          <el-col></el-col>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="zj"></el-col>
      <el-col :span="6">
        <el-row class="ycb">
          <el-col></el-col>
          <el-col></el-col>
          <el-col></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xinwenlist: [
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
        {
          title: "澳华！火爆背后的真相",
          body:
            "中国水产频道独家报道，行业的单品爆品，养殖户的好口碑，是什么？",
          url: "#"
        },
      ]
    };
  },
  created() {},
  mounted() {
      this.jiequzfc();
  },
  methods: {
      jiequzfc(){
          this.xinwenlist.forEach((item)=>{
              if(item.title.length>26){
                  item.title= item.title.substring(0,26)+'...';
              }
              if(item.body.length>26){
              item.body= item.body.substring(0,26)+'...'
              }
              
          })
      }
  }
};
</script>

<style lang="less" scoped>
.hid {
  width: 100%;
  height: 100%;
  background-color: rgb(2, 29, 46);
  overflow: hidden;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute; //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
.headrow {
  padding-top: 1.5%;
  color: white;
  text-align: center;
}
.biaolan {
  padding-top: 1.5%;
}
.zcb {
  a {
    color:rgb(149, 214, 238);;
	text-decoration: none;
  }
  margin: 1%;
  height: 100%;
  .xinwentotle {
    margin: 4px;
    span {
      white-space: nowrap;
      color: rgb(149, 214, 238);

    }
  }
  .xinwenbody {
    margin: 3px;
    color: white;
    font-size: 1em;
    div{
        margin-top:7px;
        margin-bottom:7px;
    }
  }
  .el-col {
    border: 8px solid;
    border-radius: 10px;
    height: 19rem;
    margin-top: 5%;
    background: rgba(16, 39, 95, 0.329);
    border-image: -webkit-linear-gradient(
        rgba(0, 195, 255, 0.445),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: -moz-linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
    border-image: linear-gradient(
        rgba(0, 195, 255, 0.44),
        rgba(29, 29, 206, 0.418)
      )
      30 30;
  }
}
.zj {
  border: 2px solid rgba(147, 186, 231, 0.8);
  border-radius: 10px;
  margin-top: 1.5%;
  height: 60rem;
  background: rgba(16, 39, 95, 0.329);
}
.ycb {
  margin: 1%;
  height: 100%;
  .el-col {
    border: 2px solid rgba(4, 40, 80, 0.8);
    border-radius: 10px;
    height: 19rem;
    margin-top: 5%;
    background: rgba(16, 39, 95, 0.329);
  }
}
</style>