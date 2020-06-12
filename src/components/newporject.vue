<template>
  <el-container>
    <el-aside width="130px">
      <div class="asidestep">
        <el-steps direction="vertical" :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
          <el-step title="步骤 4"></el-step>
          <el-step title="步骤 5"></el-step>
        </el-steps>
      </div>
    </el-aside>
    <el-main>
      <newp v-if="newpbolon"></newp>
    </el-main>
  </el-container>
</template>
<script>
//import newporject from "@/components/testt";
import newporject from "@/components/newporject_1";
export default {
  data() {
    return {
      newpbolon: false,
      active: 0
    };
  },
  methods: {
    //初始化值
  },
  components: {
    newp: newporject
  },
  computed: {
    listData() {
      return this.$store.state.newproject.asiadActive;
    }
  },
  watch: {
    listData(val) {
      this.newpbolon = false;
      this.active = val;
      this.$nextTick(() => {
        this.newpbolon = true;
      });
    }
  },
  created() {
    
  },
  mounted() 
  {
    this.newpbolon = true;
    this.active = this.$store.state.newproject.asiadActive;
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  display: flex;
  text-align: center;
  box-shadow: 1px 0px 3px #eeeeee;
}
.asidestep {
  width: 100px;
  margin: 20px 30px;
}
.el-container {
  direction: horizontal;
  height: 100%;
}
</style>