<template>
  <div id="WebGL-output"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
export default {
  name: "ModelScale",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      sphere: null,
      step: 0,
      stats: null,
      group: null,
      width: 800,
      height: 600,
    };
  },
  methods: {
    init() {
     let container = document.getElementById("WebGL-output");
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf5f5f5);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 100);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth,container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMapEnabled = true;
      let orbitcontrols = new OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      document.getElementById("WebGL-output").appendChild(this.renderer.domElement);
      let axes = new THREE.AxisHelper(100);
      this.scene.add(axes);
      let ambientLight = new THREE.AmbientLight(0x0c0c0c);
      this.scene.add(ambientLight);

      let dirlight = new THREE.DirectionalLight(0xdfebff, 1);
      dirlight.position.set(20, 20, 20);
      this.scene.add(dirlight);
    },
    loadModel() {
      let self = this; //这一点很重要。。
      let loader1 = new GLTFLoader();
    
      loader1.load("http://127.0.0.1:4000/api/savePic/Bee.glb", function(gltf) {
        const loadscene = gltf.scene;
        loadscene.traverse(function(object) {
          if (object.isMesh) {
            object.castShadow = true;
          }
        });
        loadscene.scale.set(1, 1, 1);

        let group = new THREE.Group();
        group.add(loadscene);

        let bbox = new THREE.Box3().setFromObject(group);
        let mdlen = bbox.max.x - bbox.min.x; //边界的最小坐标值 边界的最大坐标值
        let mdhei = bbox.max.y - bbox.min.y;
        let mdwid = bbox.max.z - bbox.min.z;

        group.position.set(0, 0, 0);

        let dist = Math.abs(
          self.camera.position.z - group.position.z - mdwid / 2
        );
        //console.log('dist值为:' + dist );
        let vFov = (self.camera.fov * Math.PI) / 180;
        //console.log('vFov值为:' + vFov );
        let vheight = 2 * Math.tan(vFov * 0.5) * dist;
        //console.log('vheight值为:' + vheight );
        let fraction = mdhei / vheight;
        // console.log('fraction值为:' + fraction );
        let finalHeight = self.height * fraction;
        //console.log('finalHeight值为:' + finalHeight);
        let finalWidth = (finalHeight * mdlen) / mdhei;
        //console.log('finalWidth值为:' + finalWidth );

        let value1 = self.width / finalWidth;

        let value2 = self.height / finalHeight;


        if (value1 >= value2) {
          group.scale.set(value2, value2, value2);
        } else {
          group.scale.set(value1, value1, value1);
        }
        let bbox2 = new THREE.Box3().setFromObject(group);
        let mdlen2 = bbox2.max.x - bbox2.min.x;
        let mdhei2 = bbox2.max.y - bbox2.min.y;
        let mdwid2 = bbox2.max.z - bbox2.min.z;
        group.position.set(
          -(bbox2.max.x + bbox2.min.x) / 2,
          -(bbox2.max.y + bbox2.min.y) / 2,
          -(bbox2.max.z + bbox2.min.z) / 2 - (bbox2.max.z - bbox2.min.z) / 2
        );

        self.scene.add(group);

        let boxhelper = new THREE.BoxHelper(group, 0xbe1915); //外面红色框
        self.scene.add(boxhelper);
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    window.ob = this;
    this.init();
    this.animate();
    this.loadModel();
  }
};
</script>

<style lang="less" scoped>

#WebGL-output {
  width: 100%;
  height: 97%;
}
</style>
