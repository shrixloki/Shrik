import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { BloomEffect, SMAAEffect } from "postprocessing";

const HyperspeedBackground = ({ lines = 8, speed = 0.4 }: { lines?: number; speed?: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 60);

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const key = new THREE.DirectionalLight(0xffffff, 0.25);
    key.position.set(5, 10, 10);
    scene.add(key);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new BloomEffect({ intensity: 1.6, luminanceThreshold: 0.2, luminanceSmoothing: 0.1, radius: 0.8 });
    const smaa = new SMAAEffect();
    const effects = new EffectPass(camera, bloom, smaa);
    effects.renderToScreen = true;
    composer.addPass(effects);

    const makeStripeTexture = (c1: string, c2: string) => {
      const size = 256;
      const cvs = document.createElement("canvas");
      cvs.width = size; cvs.height = 8;
      const g = cvs.getContext("2d")!;
      const grd = g.createLinearGradient(0, 0, size, 0);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.15, c1);
      grd.addColorStop(0.5, c2);
      grd.addColorStop(0.85, c1);
      grd.addColorStop(1, "transparent");
      g.fillStyle = grd;
      g.fillRect(0, 0, size, 8);
      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(6, 1);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const colors: [string, string][] = [
      ["#f43f5e", "#ef4444"],
      ["#60a5fa", "#22d3ee"],
      ["#a78bfa", "#22c55e"],
      ["#f59e0b", "#fb7185"],
    ];

    const tubes: { mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>; tex: THREE.Texture; dir: number }[] = [];

    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const makeCurve = () => {
      const points: THREE.Vector3[] = [];
      const turns = rng(0.6, 1.2);
      const radius = rng(8, 16);
      const height = rng(18, 26);
      for (let i = 0; i < 200; i++) {
        const t = i / 199;
        const angle = t * Math.PI * 2 * turns + rng(-0.05, 0.05);
        const r = radius * (0.6 + 0.6 * Math.sin(t * Math.PI));
        const x = Math.cos(angle) * r + rng(-1.2, 1.2);
        const y = (t - 0.5) * height + rng(-0.6, 0.6);
        const z = Math.sin(angle) * r + rng(-1.2, 1.2);
        points.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(points);
    };

    for (let i = 0; i < lines; i++) {
      const curve = makeCurve();
      const geom = new THREE.TubeGeometry(curve, 400, rng(0.15, 0.4), 8, false);
      const [c1, c2] = colors[i % colors.length];
      const tex = makeStripeTexture(c1, c2);
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(c2), emissiveIntensity: 2.0, roughness: 0.2, metalness: 0.0, map: tex, transparent: true });
      mat.map!.wrapS = THREE.RepeatWrapping;
      mat.map!.repeat.set(6, 1);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.y -= 2;
      scene.add(mesh);
      tubes.push({ mesh, tex, dir: Math.random() > 0.5 ? 1 : -1 });
    }

    scene.fog = new THREE.FogExp2(0x0b0614, 0.018);

    const clock = new THREE.Clock();
    let boost = 1;
    const animate = () => {
      const delta = clock.getDelta();
      tubes.forEach(({ mesh, tex, dir }, idx) => {
        tex.offset.x = (tex.offset.x + delta * speed * boost * (1.5 + idx * 0.15) * dir) % 1;
        mesh.rotation.y += delta * 0.1 * dir;
      });
      camera.position.z = 60 + Math.sin(clock.elapsedTime * 0.5) * 2;
      composer.render(delta);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onPointerDown = () => { boost = 2.5; };
    const onPointerUp = () => { boost = 1; };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      composer.dispose();
      renderer.dispose();
      scene.traverse(obj => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry.dispose();
          if (Array.isArray(m.material)) m.material.forEach(mm => mm.dispose());
          else m.material.dispose();
        }
      });
      container.removeChild(renderer.domElement);
    };
  }, [lines, speed]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};

export default HyperspeedBackground;
