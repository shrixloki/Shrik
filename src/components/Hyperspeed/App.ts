import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import { CarLights } from './CarLights';
import { LightsSticks } from './LightsSticks';
import { Road } from './Road';
import { lerp, resizeRendererToDisplaySize } from './utils';
import { distortion_uniforms, distortion_vertex } from './distortions';

export class App {
  options: any;
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  fogUniforms: any;
  clock: THREE.Clock;
  assets: any;
  disposed: boolean;
  road: Road;
  leftCarLights: CarLights;
  rightCarLights: CarLights;
  leftSticks: LightsSticks;
  fovTarget: number;
  speedUpTarget: number;
  speedUp: number;
  timeOffset: number;
  renderPass: any;
  bloomPass: any;

  constructor(container: HTMLElement, options: any = {}) {
    this.options = options;
    if (this.options.distortion == null) {
      this.options.distortion = {
        uniforms: distortion_uniforms,
        getDistortion: distortion_vertex
      };
    }
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.composer = new EffectComposer(this.renderer);
    container.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000
    );
    this.camera.position.z = -5;
    this.camera.position.y = 8;
    this.camera.position.x = 0;
    this.scene = new THREE.Scene();
    this.scene.background = null;

    let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
    this.scene.fog = fog;
    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    };
    this.clock = new THREE.Clock();
    this.assets = {};
    this.disposed = false;

    this.road = new Road(this, options);
    this.leftCarLights = new CarLights(
      this,
      options,
      options.colors.leftCars,
      options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade)
    );
    this.rightCarLights = new CarLights(
      this,
      options,
      options.colors.rightCars,
      options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade)
    );
    this.leftSticks = new LightsSticks(this, options);

    this.fovTarget = options.fov;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(width, height);
  }

  initPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1
      })
    );

    const smaaPass = new EffectPass(
      this.camera,
      new SMAAEffect({
        preset: SMAAPreset.MEDIUM,
        searchImage: SMAAEffect.searchImageDataURL,
        areaImage: SMAAEffect.areaImageDataURL
      })
    );
    this.renderPass.renderToScreen = false;
    this.bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(smaaPass);
  }

  loadAssets() {
    const assets = this.assets;
    return new Promise<void>(resolve => {
      const manager = new THREE.LoadingManager(resolve);

      const searchImage = new Image();
      const areaImage = new Image();
      assets.smaa = {};
      searchImage.addEventListener('load', function () {
        assets.smaa.search = this;
        manager.itemEnd('smaa-search');
      });

      areaImage.addEventListener('load', function () {
        assets.smaa.area = this;
        manager.itemEnd('smaa-area');
      });
      manager.itemStart('smaa-search');
      manager.itemStart('smaa-area');

      searchImage.src = SMAAEffect.searchImageDataURL;
      areaImage.src = SMAAEffect.areaImageDataURL;
    });
  }

  init() {
    this.initPasses();
    const options = this.options;
    this.road.init();
    this.leftCarLights.init();

    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
    this.rightCarLights.init();
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
    this.leftSticks.init();
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

    this.container.addEventListener('mousedown', this.onMouseDown);
    this.container.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('mouseout', this.onMouseUp);

    this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.container.addEventListener('touchend', this.onTouchEnd, { passive: true });
    this.container.addEventListener('touchcancel', this.onTouchEnd, { passive: true });

    this.container.addEventListener('contextmenu', this.onContextMenu);

    this.tick();
  }

  onMouseDown(ev: MouseEvent) {
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  onMouseUp(ev: MouseEvent) {
    if (this.options.onSlowDown) this.options.onSlowDown(ev);
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  onTouchStart(ev: TouchEvent) {
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
    this.fovTarget = this.options.fovSpeedUp;
    this.speedUpTarget = this.options.speedUp;
  }

  onTouchEnd(ev: TouchEvent) {
    if (this.options.onSlowDown) this.options.onSlowDown(ev);
    this.fovTarget = this.options.fov;
    this.speedUpTarget = 0;
  }

  onContextMenu(ev: Event) {
    ev.preventDefault();
  }

  update(delta: number) {
    let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
    this.timeOffset += this.speedUp * delta;

    let time = this.clock.elapsedTime + this.timeOffset;

    this.rightCarLights.update(time);
    this.leftCarLights.update(time);
    this.leftSticks.update(time);
    this.road.update(time);

    let updateCamera = false;
    let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6;
      updateCamera = true;
    }

    if (this.options.distortion.getJS) {
      const distortion = this.options.distortion.getJS(0.025, time);

      this.camera.lookAt(
        new THREE.Vector3(
          this.camera.position.x + distortion.x,
          this.camera.position.y + distortion.y,
          this.camera.position.z + distortion.z
        )
      );
      updateCamera = true;
    }
    if (updateCamera) {
      this.camera.updateProjectionMatrix();
    }
  }

  render(delta: number) {
    this.composer.render(delta);
  }

  dispose() {
    this.disposed = true;

    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.composer) {
      this.composer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }

    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.container) {
      this.container.removeEventListener('mousedown', this.onMouseDown);
      this.container.removeEventListener('mouseup', this.onMouseUp);
      this.container.removeEventListener('mouseout', this.onMouseUp);

      this.container.removeEventListener('touchstart', this.onTouchStart);
      this.container.removeEventListener('touchend', this.onTouchEnd);
      this.container.removeEventListener('touchcancel', this.onTouchEnd);
      this.container.removeEventListener('contextmenu', this.onContextMenu);
    }
  }

  setSize(width: number, height: number, updateStyles: boolean) {
    this.composer.setSize(width, height, updateStyles);
  }

  tick() {
    if (this.disposed || !this) return;
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    const delta = this.clock.getDelta();
    this.render(delta);
    this.update(delta);
    requestAnimationFrame(this.tick);
  }
}
