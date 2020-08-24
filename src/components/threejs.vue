<template>
  <div>
    <div id="threed">
      <div class="info">dsds</div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import OrbitControls from 'three/examples/js/controls/OrbitControls'
//调节动画工具
import dat from "dat.gui";
//加载模型插件
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      /* cube: null, //方体
      controls: {
        rotationSpeed: 1,
        bouncingSpeed: 0.03,
      }, */
      dapeng: null,
    };
  },
  created() {},
  mounted() {
    //this.initgui();
    this.addtd();
    //this.animate();
  },
  methods: {
    initgui() {
      const gui = new dat.GUI(); // gui监测器
      gui.add(this.controls, "rotationSpeed", 0, 1);
      this.addtd();
    },
    addtd() {
      //获取节点
      let threed = document.getElementById("threed");
      //实例化场景
      this.scene = new THREE.Scene();
      /* ==================== */
      /*  //方体
      let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffee6b });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.castShadow = true;
      this.cube.position.x = -10;
      this.cube.position.y = 10;
      this.scene.add(this.cube); */

      //加载模型
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      mtlLoader.load("lpgreenhouse/2312312.mtl", (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
      });
      objLoader.load("lpgreenhouse/2312312.obj", (object) => {
        object.scale.set(0.5, 0.5, 0.5);
        this.dapeng = object;
        this.scene.add(object);
        this.renderee();
      });
      //添加纹理
      //图片放置在静态文佳public中
      //TextureLoader 加载外部图片方法
      //
      /* new THREE.TextureLoader().load("/favicon.ico", (texture) => {
        this.cube.material = new THREE.MeshLambertMaterial({ map: texture });
      }); */
      //添加平面
      let planegeometry = new THREE.PlaneGeometry(80, 70); //实例化一个平面集合体
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0x424242 }); //实例化一个cccc材质
      let plane = new THREE.Mesh(planegeometry, planeMaterial);
      plane.receiveShadow = true; //接收阴影
      plane.rotation.x = -0.5 * Math.PI; //旋转角度
      this.scene.add(plane);
      //添加光源
      let lit = new THREE.SpotLight(0xffffff);
      lit.position.set(40, 90, -20);
      lit.castShadow = true;
      //添加光源
      this.scene.add(lit);
      //添加环境光
      let ambiColor = "#523318";
      let ambientLight = new THREE.AmbientLight(ambiColor);
      this.scene.add(ambientLight);
      /* ==================== */
      //实例化相机，相机位置    45相机的视椎体的垂直视角   w/h相机视锥体的长宽比 0.1相机视锥体的近平面 1000相机视锥体远平面
      this.camera = new THREE.PerspectiveCamera(
        50,
        threed.clientWidth / threed.clientHeight,
        0.1,
        1000
      );
      this.camera.position.x = 40;
      this.camera.position.y = 40;
      this.camera.position.z = 40;
      //旋转相机对象以面向世界空间中的某个点
      this.camera.lookAt(this.scene.position);
      //实例化渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0xcfcfcf); //设置背景色
      this.renderer.setSize(threed.clientWidth, threed.clientHeight); //场景大小
      this.renderer.shadowMap.enabled = true; //阴影
      /* ==================== */
      //threed添加子节点
      threed.appendChild(this.renderer.domElement);
      /* ==================== */
      //渲染器渲染场景，相机
      let sbcontrolss = new THREE.OrbitControls(this.camera, this.renderer.domElement)

      sbcontrolss.addEventListener('change', this.renderee);//监听鼠标、键盘事件
    },
    renderee(){
        this.renderer.render(this.scene, this.camera);
      },
    animate() {
      /*    let { controls } = this;
      windowAPI 执行动画
      requestAnimationFrame(this.animate);
      //旋转
      this.dapeng.rotation.x += 0.06;
      this.dapeng.rotation.y += 0.06;
      //渲染
      this.renderer.render(this.scene, this.camera); */
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
}
#threed {
  width: 1000px;
  height: 600px;
}
</style>