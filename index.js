import * as THREE from "three";

// Set the size of the window
const w = window.innerWidth; // возвращает размер текущего окна
const h = window.innerHeight;

// antialias - сглаживание. С true ренденер создаст изображение с использованием методов сглаживания, что улучшит качество отображаемых объектов
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h); // устанавливает размеры рендерера равным Ш и В окна браузера
document.appendChild(renderer.domElement); // добавляет этот элемент <canvas> в DOM, чтобы он отображался на странице

const fov = 75; // 75 degrees
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
