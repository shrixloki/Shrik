import * as THREE from 'three';
import { random, pickRandom } from './utils';

const carLightsFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
  varying vec2 vUv; 
  uniform vec2 uFade;
  void main() {
    vec3 color = vec3(vColor);
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk['fog_fragment']}
  }
`;

const carLightsVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv; 
  varying vec3 vColor; 
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;

    transformed.xy *= radius;
    transformed.z *= myLength;

    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }
`;

export class CarLights {
  webgl: any;
  options: any;
  colors: any;
  speed: any;
  fade: any;
  mesh: any;

  constructor(webgl: any, options: any, colors: any, speed: any, fade: any) {
    this.webgl = webgl;
    this.options = options;
    this.colors = colors;
    this.speed = speed;
    this.fade = fade;
  }

  init() {
    const options = this.options;
    let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
    let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);

    let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;

    let laneWidth = options.roadWidth / options.lanesPerRoad;

    let aOffset: number[] = [];
    let aMetrics: number[] = [];
    let aColor: number[] = [];

    let colors = this.colors;
    if (Array.isArray(colors)) {
      colors = colors.map((c: number) => new THREE.Color(c));
    } else {
      colors = new THREE.Color(colors);
    }

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      let radius = random(options.carLightsRadius);
      let length = random(options.carLightsLength);
      let speed = random(this.speed);

      let carLane = i % options.lanesPerRoad;
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;

      let carWidth = random(options.carWidthPercentage) * laneWidth;
      let carShiftX = random(options.carShiftX) * laneWidth;
      laneX += carShiftX;

      let offsetY = random(options.carFloorSeparation) + radius * 1.3;

      let offsetZ = -random(options.length);

      aOffset.push(laneX - carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      aOffset.push(laneX + carWidth / 2);
      aOffset.push(offsetY);
      aOffset.push(offsetZ);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(speed);

      aMetrics.push(radius);
      aMetrics.push(length);
      aMetrics.push(speed);

      let color = pickRandom(colors);
      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);

      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);
    }

    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));

    let material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragment,
      vertexShader: carLightsVertex,
      transparent: true,
      uniforms: Object.assign(
        {
          uTime: { value: 0 },
          uTravelLength: { value: options.length },
          uFade: { value: this.fade }
        },
        this.webgl.fogUniforms,
        options.distortion.uniforms
      )
    });

    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        options.distortion.getDistortion
      );
    };

    let mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }

  update(time: number) {
    this.mesh.material.uniforms.uTime.value = time;
  }
}
