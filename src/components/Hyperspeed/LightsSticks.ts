import * as THREE from 'three';
import { random, pickRandom } from './utils';

const sideSticksVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY( in float angle ) {
    return mat4(	cos(angle),		0,		sin(angle),	0,
                 0,		1.0,			 0,	0,
            -sin(angle),	0,		cos(angle),	0,
            0, 		0,				0,	1);
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;

    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

    transformed.z += - uTravelLength + time;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    transformed.y += height / 2.;
    transformed.x += -width / 2.;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }
`;

const sideSticksFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.);
    ${THREE.ShaderChunk['fog_fragment']}
  }
`;

export class LightsSticks {
  webgl: any;
  options: any;
  mesh: any;

  constructor(webgl: any, options: any) {
    this.webgl = webgl;
    this.options = options;
  }

  init() {
    const options = this.options;
    const geometry = new THREE.PlaneGeometry(1, 1);
    let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
    let totalSticks = options.totalSideLightSticks;
    instanced.instanceCount = totalSticks;

    let stickoffset = options.length / (totalSticks - 1);
    const aOffset: number[] = [];
    const aColor: number[] = [];
    const aMetrics: number[] = [];

    let colors = options.colors.sticks;
    if (Array.isArray(colors)) {
      colors = colors.map((c: number) => new THREE.Color(c));
    } else {
      colors = new THREE.Color(colors);
    }

    for (let i = 0; i < totalSticks; i++) {
      let width = random(options.lightStickWidth);
      let height = random(options.lightStickHeight);
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());

      let color = pickRandom(colors);
      aColor.push(color.r);
      aColor.push(color.g);
      aColor.push(color.b);

      aMetrics.push(width);
      aMetrics.push(height);
    }

    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));

    const material = new THREE.ShaderMaterial({
      fragmentShader: sideSticksFragment,
      vertexShader: sideSticksVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        {
          uTravelLength: { value: options.length },
          uTime: { value: 0 }
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

    const mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    this.webgl.scene.add(mesh);
    this.mesh = mesh;
  }

  update(time: number) {
    this.mesh.material.uniforms.uTime.value = time;
  }
}
