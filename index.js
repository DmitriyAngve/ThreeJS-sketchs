import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"; // OrbitControls позволяет пользователю вращать, увеличивать и панорамировать камеру с помощью мыши

// CORE of this Project
// Set the size of the window
const w = window.innerWidth; // возвращает размер текущего окна
const h = window.innerHeight;

// antialias - сглаживание. С true ренденер создаст изображение с использованием методов сглаживания, что улучшит качество отображаемых объектов
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h); // устанавливает размеры рендерера равным Ш и В окна браузера
document.body.appendChild(renderer.domElement); // добавляет этот элемент <canvas> в DOM, чтобы он отображался на странице

const fov = 75; // 75 degrees
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// scooch the camera back
camera.position.z = 2;
const scene = new THREE.Scene();
// CORE of this Project

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// // Наклон оси
// const tiltAngle = THREE.MathUtils.degToRad(23.5);
// const axis = new THREE.Vector3(1, 0, 0);
// mesh.rotateOnAxis(axis, tiltAngle);
// wireMesh.rotateOnAxis(axis, tiltAngle);

// Создам икосаэдр (первый аргумент(1.0) - радиус / второй аргумент(2) - детализация - чем больше, тем более гладкой будет поверхность икосаэдра)
const geo = new THREE.IcosahedronGeometry(1.0, 2);

// Создам базовый материал для сетки (меша)
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

// Создам сетку (меш) с использованием заданных ранее геометрии и материала
const mesh = new THREE.Mesh(geo, mat);
// Добавлю созданную сетку (меш) в сцену
scene.add(mesh);

// Добавлю линии меша каркаса икосаэдра
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001); // убирает фликеринг
mesh.add(wireMesh);

// hemiLight - это переменная для хранения объекта света.  new THREE.HemisphereLight - создаю объект света
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// Add an animation
function animate(t = 0) {
  //   console.log(t);
  requestAnimationFrame(animate); // Запрашивается следующий кадр анимации. Рекурсия - для непрерывности анимации
  //   mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0); // устанавливает масщтаб по всем осям (x, y, z) одинаково используя это значение. Икосаэдр будет пульсировать, изменяя свой размер в зависимости от косинуса функции (Math.cos) времени
  mesh.rotation.y = t * 0.0001;

  // Render
  renderer.render(scene, camera);
  controls.update();
}

animate();
