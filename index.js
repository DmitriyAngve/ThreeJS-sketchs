import * as THREE from "three";

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

// Создам икосаэдр (первый аргумент(1.0) - радиус / второй аргумент(2) - детализация - чем больше, тем более гладкой будет поверхность икосаэдра)
const geo = new THREE.IcosahedronGeometry(1.0, 2);

// Создам базовый материал для сетки (меша)
const mat = new THREE.MeshBasicMaterial({
  color: 0xccff,
});

// Создам сетку (меш) с использованием заданных ранее геометрии и материала
const mesh = new THREE.Mesh(geo, mat);

// Добавлю созданную сетку (меш) в сцену
scene.add(mesh);

// Render
renderer.render(scene, camera);
