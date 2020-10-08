<template>
  <div class="Porrjtl">
    <div>
      <span>项目图片</span>
      <el-divider></el-divider>
    </div>
    <el-upload
      class="avatar-uploader"
      action="http://39.99.205.217:4000/api/usericon"
      name="usericon"
      :headers="heahersToken"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-upload="beforeAvatarUpload"
      :data="projectnub"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <span>项目介绍</span>
    <el-divider></el-divider>
    <el-form label-width="80px" :model="userform" :rules="userDataRules" ref="userDataRef">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="userform.projectName"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="userform.companyName"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="userform.companyAddress"></el-input>
      </el-form-item>
      <el-form-item label="公司传真">
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="userform.companyFax" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公司电话">
            <el-input v-model="userform.companyTal" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="项目介绍">
        <el-input type="textarea" maxlength="50" v-model="userform.projectSuggest" show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round class="tijiao" @click="userDataUpload()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["projectnumb"])
  },
  data() {
    return {
      projectnub:{
        "numb":this.$store.state.projectnumb
      },
      //渲染前判断是否添加/修改
      projectBool: false,
      //图片地址
      imageUrl: "",
      //头部token
      heahersToken: {
        token: ""
      },
      //表单
      userform: {
        projectSuggest: "",
        companyTal: "",
        companyFax: "",
        companyAddress: "",
        companyName: "",
        projectName: "",
        projectnum: ""
      },
      //表单验证
      userDataRules: {
        projectSuggest: [{ required: true, trigger: "blur" }],
        companyTal: [{ required: true, trigger: "blur" }],
        companyFax: [{ required: true, trigger: "blur" }],
        companyAddress: [{ required: true, trigger: "blur" }],
        companyName: [{ required: true, trigger: "blur" }],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.searchUserData();
  },
  mounted() {
    this.headtoken();
  },
  methods: {
    //头像上传失败
    handleAvatarError(file) {
      this.$message.error("上传失败");
    },
    //头像上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.success("上传成功");
    },
    //头像上传条件
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //未渲染前寻找数据
    async searchUserData() {
      const { data: res } = await this.$http.post("/projectinr", {"data": this.projectnumb});
    
      if (!res) {
        return this.$message.error('获取错误');
      } 
      else 
      {
        this.userform.projectSuggest = res[0].projectintr;
        this.userform.companyTal = res[0].compantal;
        this.userform.companyFax = res[0].companfex;
        this.userform.companyAddress = res[0].companaddr;
        this.userform.companyName = res[0].comnpanyname;
        this.userform.projectName = res[0].projectname;
        this.imageUrl ="http://"+res[0].usericonadder;
    }
    },
      //获取头部token
  headtoken() {
    this.heahersToken.token = window.sessionStorage.token;
  },
  //数据上传
  async userDataUpload() {
    this.userform.data = this.projectnumb;
    this.$refs.userDataRef.validate(async val => {
      if (!val) return;
      const { data: res } = await this.$http
        .post("/register/project", this.userform)
        .catch(err => {
          this.$message.error("网络错误");
        });
      if (res.meta.status != 200) {
        this.$message.error("提交失败");
      }
      this.$message.success("提交成功");
    });
  }
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.Porrjtl {
  .el-input {
    width: 50%;
  }
}
</style>