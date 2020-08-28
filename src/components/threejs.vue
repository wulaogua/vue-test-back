<template>
  <div>
    <div id="threed">
      <div class="info">dsds</div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/js/controls/OrbitControls";
import FBXLoader from "three/examples/js/loaders/FBXLoader";
//import "three/examples/js/libs/inflate.min.js";
//调节动画工具
import dat from "dat.gui";
//加载模型插件
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
export default {
  data() {
    return {
      mixer: null,
       mixer2: null,
      clock: null,
      action: null,
      action2: null,
      action3: null,
      action4: null,
      divele: null,
      camera: null,
      scene: null,
      renderer: null,
      selectObject: null,
      cube: null, //方体
      cube1: null,
      controls: {
        rotationSpeed: 1,
        bouncingSpeed: 0.03,
      },
      dapeng: null,
      dapeng2: null,
    };
  },
  created() {},
  mounted() {
    //this.initgui();
    this.addtd();
    this.clock = new THREE.Clock();
    this.animate();
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
      this.divele = threed;
      //实例化场景
      this.scene = new THREE.Scene();
      /* ==================== */
      //方体
      /*  let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffee6b });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.castShadow = true;
      this.cube.name = "123";
      this.cube.position.x = 20;
      this.cube.position.y = 20;
      this.cube.position.z = 20;
      this.scene.add(this.cube);
      //方体
      let cubeGeometry1 = new THREE.BoxGeometry(3, 3, 3);
      let cubeMaterial1 = new THREE.MeshLambertMaterial({ color: 0xffdddd });
      this.cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
      this.cube1.castShadow = true;
      this.cube1.name = "456";
      this.cube1.position.x = 20;
      this.cube1.position.y = 10;
      this.cube1.position.z = 20;
      this.scene.add(this.cube1); */

      //加载模型
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      /*       mtlLoader.load("lpgreenhouse/2312312.mtl", (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
      });
      objLoader.load("lpgreenhouse/2312312.obj", (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.side = THREE.DoubleSide;
          }
        });
        object.scale.set(1, 1, 1);
        this.dapeng = object;
        this.dapeng.position.z = 20;
        this.scene.add(object);
        this.renderee();
      }); */
      /*  mtlLoader.load("lpgreenhouse/11133.mtl", (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
      });
      objLoader.load("lpgreenhouse/11133.obj", (object) => {
        object.scale.set(0.5, 0.5, 0.5);
        this.dapeng2 = object;
        this.scene.add(object);
        this.renderee();
      }); */
      //fbx导入
      let fbx_loader = new THREE.FBXLoader();
      fbx_loader.load("lpgreenhouse/test2.fbx", (object) => {
        object.scale.set(0.6, 0.6, 0.6);
        object.position.x = -5;
        object.position.y = 0;
        object.position.z = 20;
        this.scene.add(object);
        // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
        this.mixer = new THREE.AnimationMixer(object);
        console.log(object)
        // obj.animations[0]：获得剪辑对象clip
        console.log(object.animations);
        this.action = this.mixer.clipAction(object.animations[0]);
        this.action2 = this.mixer.clipAction(object.animations[1]);
        this.action3 = this.mixer.clipAction(object.animations[2]);
        this.action4 = this.mixer.clipAction(object.animations[3]);
        // 缩放模型大小
        this.action.play();
        console.log(this.action2.time)
        this.action2.time=0.7 ;
        this.action2.play();
        this.action3.play();
        this.action4.play();
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
      plane.name = "789";
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
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.x = 40;
      this.camera.position.y = 40;
      this.camera.position.z = 40;
      //旋转相机对象以面向世界空间中的某个点
      this.camera.lookAt(0, 0, 0);
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
      let sbcontrolss = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      sbcontrolss.addEventListener("change", this.renderee); //监听鼠标、键盘事件
      addEventListener("dblclick", this.onMouseDblclick, false);
    },

    renderee() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      //windowAPI 执行动画
      requestAnimationFrame(this.animate);
      //旋转
      //this.cube1.rotation.x += 0.06;
      //渲染
      this.renderer.render(this.scene, this.camera);
      if (this.mixer !== null) {
        this.mixer.update(this.clock.getDelta());
      }
    },
    //双击事件
    onMouseDblclick(event) {
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event);
      //console.log(this.action.paused);
      console.log(intersects);
      // 获取选中最近的 Mesh 对象
      if (
        intersects.length != 0 &&
        intersects[0].object instanceof THREE.Mesh
      ) {
        switch (true) {
          case intersects[0].object.name === "fan_blades" ||
            intersects[0].object.name === "fan_body":
            this.action.paused = !this.action.paused;
            break;
          case intersects[0].object.name === "fan_blades001" ||
            intersects[0].object.name === "fan_body001":
            this.action2.paused = !this.action2.paused;
            break;
          case intersects[0].object.name === "fan_blades002" ||
            intersects[0].object.name === "fan_body002":
            this.action3.paused = !this.action3.paused;
            break;
          case intersects[0].object.name === "fan_blades003" ||
            intersects[0].object.name === "fan_body003":
            this.action4.paused = !this.action4.paused;
            break;
        }

        /*         if (intersects[0].object.name === "fan_blades" ||intersects[0].object.name ==="fan_body") {
          this.action.paused = !this.action.paused;
        } else {
          this.selectObject = intersects[0].object;
          this.changeMaterial(this.selectObject);
        } */
      } else {
        console.log("未选中 Mesh!");
      }
    },
    //点击MASH事件
    changeMaterial(object) {
      let material = new THREE.MeshLambertMaterial({
        color: 0xffffff * Math.random(),
        transparent: object.material.transparent ? false : true,
        opacity: 0.8,
      });
      object.material = material;
      this.renderee();
    },
    //获取与射线相交的对象数组
    getIntersects(event) {
      event.preventDefault();
      let getBoundingClientRect = this.divele.getBoundingClientRect();
      //console.log("event.clientX:"+event.clientX)
      // console.log("event.clientY:"+event.clientY)

      // 声明 raycaster 和 mouse 变量
      let raycaster = new THREE.Raycaster(); //对象从屏幕上的点击位置向场景中发射一束光线
      let mouse = new THREE.Vector2();
      let mouse1 = new THREE.Vector2();

      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      mouse1.x =
        ((event.clientX - getBoundingClientRect.left) /
          this.divele.offsetWidth) *
          2 -
        1;
      mouse1.y =
        -(
          (event.clientY - getBoundingClientRect.top) /
          this.divele.offsetHeight
        ) *
          2 +
        1;
      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置  起点，方向向量
      raycaster.setFromCamera(mouse1, this.camera);

      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      //console.log('children',this.scene.children)
      let intersects = raycaster.intersectObjects(this.scene.children, true);
      // console.log('intersects',intersects)
      //返回选中的对象
      return intersects;
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