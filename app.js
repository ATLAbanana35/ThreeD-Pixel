import * as THREE from "./three/build/three.module.js";
import { FBXLoader } from "./three/examples/jsm/loaders/FBXLoader.js";
import * as CANNON from "./cannon-es/dist/cannon-es.cjs.js";

console.log("OK");
console.log("start import...");
// Initialisation Three.js
const scene = new THREE.Scene();
let PsersoJump = 0.2;
let arrayPushBox = [];
let PsersoSpeed = 0.05;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Initialisation de la caméra
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 20);

// // Initialisation des contrôles de la caméra
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();
// Initialisation Cannon.js
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
const groundMaterial = new CANNON.Material("groundMaterial");
const defaultMaterial = new CANNON.Material("defaultMaterial");
const contactMaterial = new CANNON.ContactMaterial(
  groundMaterial,
  defaultMaterial,
  { friction: 0.0, restitution: 0.3 }
);
world.addContactMaterial(contactMaterial);

// Création des cubes
let cube1;
let cube2;
let body1;
let body2;
let blocks = 0;

function createCube2() {
  // Three.js cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  cube2 = new THREE.Mesh(geometry, material);
  scene.add(cube2);

  // Cannon.js cube
  const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  const body = new CANNON.Body({ mass: 0 });
  body.addShape(shape);
  body.position.set(0, 0, 0);
  world.addBody(body);
  cube2.userData.physicsBody = body;
}
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const PlaneMaterial = new THREE.MeshBasicMaterial({ color: 0x2986cc });
const plane = new THREE.Mesh(planeGeometry, PlaneMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
let r = 0;
let x = 0;
let z = 0;
let y = 1;
let timeset = 1000;
let herbe = "Blocks/block.dirt.webp";
let herbe_top = "Blocks/block.dirt.webp";
let terre = "Blocks/block.dirt.webp";
herbe = "Blocks/block.dirt.herbe.webp";
herbe_top = "Blocks/grass_block_top.webp";
terre = "Blocks/block.dirt.webp";
function CreateBox() {
  if (x == 30) {
    x = 0;
    z += 1;
    if (z == 30) {
      y++;
      z = 0;
      x = 0;
      if (y == 1) {
        herbe = "Blocks/block.dirt.herbe.webp";
        herbe_top = "Blocks/grass_block_top.webp";
        terre = "Blocks/block.dirt.webp";
      }
    }
  }
  const textureLoader = new THREE.TextureLoader();
  const textureCube3 = [
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(herbe),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(herbe),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(herbe_top),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(terre),
    }),

    new THREE.MeshBasicMaterial({
      map: textureLoader.load(herbe),
    }),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(herbe),
    }),
  ];
  const BoxGeometry = new THREE.BoxGeometry();
  const Box = new THREE.Mesh(BoxGeometry, textureCube3);
  Box.position.x = x;
  Box.position.y = y;
  Box.position.z = z;
  scene.add(Box);
  // Cannon.js cube
  const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  const body = new CANNON.Body({ mass: 0 });
  body.addShape(shape);
  body.position.set(x, y, z);
  world.addBody(body);
  Box.userData.physicsBody = body;
  arrayPushBox.push(Box);
  x++;
  r++;
}
let rBodys = [];
while (r < 400) {
  CreateBox();
}
camera.lookAt(2, 5, 2);
function Structure_arbre(x11, y11, z11) {
  let bois = "Blocks/block.wood.webp";
  let feuille = "Blocks/block.feuille.webp";
  function Create_Cube(x1, y1, z1, materi) {
    const textureLoader = new THREE.TextureLoader();
    const textureCube3 = [
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),

      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(materi),
      }),
    ];
    const BoxGeometry = new THREE.BoxGeometry();
    const Box = new THREE.Mesh(BoxGeometry, textureCube3);
    Box.position.x = x1;
    Box.position.y = y1;
    Box.position.z = z1;
    scene.add(Box);
    // Cannon.js cube
    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const body = new CANNON.Body({ mass: 0 });
    body.addShape(shape);
    body.position.set(x1, y1, z1);
    world.addBody(body);
    Box.userData.physicsBody = body;
    arrayPushBox.push(Box);
  }
  Create_Cube(x11, y11, z11, bois);
  Create_Cube(x11, y11 + 1, z11, bois);
  Create_Cube(x11, y11 + 2, z11, bois);
  Create_Cube(x11, y11 + 3, z11, bois);
  Create_Cube(x11, y11 + 4, z11, bois);
  Create_Cube(x11, y11 + 4, z11 + 1, feuille);
  Create_Cube(x11, y11 + 4, z11 - 1, feuille);
  Create_Cube(x11 + 1, y11 + 4, z11, feuille);
  Create_Cube(x11 + 1, y11 + 4, z11 - 1, feuille);
  Create_Cube(x11 + 1, y11 + 4, z11 + 1, feuille);
  Create_Cube(x11 - 1, y11 + 4, z11, feuille);
  Create_Cube(x11 - 1, y11 + 4, z11 + 1, feuille);
  Create_Cube(x11 - 1, y11 + 4, z11 - 1, feuille);
  Create_Cube(x11, y11 + 5, z11, feuille);
}

let ll = 0;
while (ll < 5) {
  ll++;
  Structure_arbre(Math.random() * 30, 2, Math.random() * 14);
  console.log("OK!");
}

window.addEventListener("keypress", (e) => {
  if (e.key == "n") {
    let l = 0;
    while (l < 10) {
      CreateBox();
      l++;
      console.log(Math.round(Math.random() * 20));
      if (Math.round(Math.random() * 20) == 1) {
        Structure_arbre(x, y, z);
      }
    }
  }
});

function CreateCochon(x, y, z) {
  // Three.js cube
  const geometry = new THREE.BoxGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xfffff,
    transparent: true,
    opacity: 0,
  });
  let cochon = new THREE.Mesh(geometry, material);
  scene.add(cochon);

  // Cannon.js cube
  const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
  const body = new CANNON.Body({ mass: 5 });
  body.addShape(shape);
  body.position.set(x, y, z);
  world.addBody(body);

  // Liaison entre les deux cubes
  cochon.userData.physicsBody = body;
  arrayPushBox.push(cochon);
  let position = [
    Math.round(Math.random() * 30),
    2,
    Math.round(Math.random() * 10),
  ];
  let depX = Math.round(position[0] - cochon.userData.physicsBody.position.x);
  let depZ = Math.round(position[2] - cochon.userData.physicsBody.position.z);
  console.log(depZ);
  console.log(position);
  let ter = true;
  let terr = false;
  let terrr = false;
  setInterval(() => {
    if (ter) {
      if (Math.round(cochon.userData.physicsBody.position.x) == position[0]) {
        ter = false;
        terr = true;
        toogle = false;
      }
      if (Math.round(cochon.userData.physicsBody.position.z) == position[2]) {
        ter = false;
        toogle = false;
      }
      cochon.userData.physicsBody.position.x = position[0] - depX;
      depX -= 0.001;
      cochon.userData.physicsBody.position.z = position[2] - depZ;
      depZ -= 0.001;
    }
  }, 10);
  let toogle = true;
  let loader = new FBXLoader();
  loader.load("piggy.fbx", (fbx) => {
    let model = fbx;
    console.log(this.model);
    model.position.set(5, 5, 5); // position initiale
    model.scale.set(0.05, 0.05, 0.05);
    let x1 = 0;
    let y1 = 6;
    let z1 = 0;
    let mass = 1;
    model.position.set(x1, y1, z1);
    let quaternion = { x: 0, y: 0, z: 0, w: 1 };
    scene.add(model);
    setInterval(() => {
      model.position.x = cochon.position.x;
      model.position.y = cochon.position.y;
      model.position.z = cochon.position.z;
    }, 10);
  });
}

CreateCochon(2, 6, 2);
CreateCochon(4, 6, 4);

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
  side: THREE.BackSide, // Permet de voir l'intérieur de la sphère,
});
const cube3 = new THREE.Mesh(geometry, material);
const texture = new THREE.TextureLoader().load("Blocks/ciel.webp");
material.map = texture;
cube3.position.set(10, 10, 10);
cube3.scale.x = 100;
cube3.scale.y = 100;
cube3.scale.z = 100;
scene.add(cube3);
document.querySelector(".cpi").addEventListener("click", () => {
  if (blocks > 4) {
    blocks -= 5;
    timeset = 0;
    document.querySelector(".inerh1").innerHTML += " 1XPioche";
    alert("PIOCHE ACHETÉE");
  } else {
    alert("PAS ASSEZ DE BLOCKS");
  }
});
document.querySelector(".cbs").addEventListener("click", () => {
  if (blocks > 3) {
    blocks -= 4;
    PsersoSpeed += 0.05;
    document.querySelector(".inerh1").innerHTML += " 1X Bottes";
    alert("BOTTES ACHETÉE");
  } else {
    alert("PAS ASSEZ DE BLOCKS");
  }
});
function createCube1() {
  // Three.js cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0xfffff,
    transparent: true,
    opacity: 0,
  });
  cube1 = new THREE.Mesh(geometry, material);
  scene.add(cube1);

  // Cannon.js cube
  const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  const body = new CANNON.Body({ mass: 5 });
  body.addShape(shape);
  body.position.set(0, 5, 0);
  world.addBody(body);

  // Liaison entre les deux cubes
  cube1.userData.physicsBody = body;
  document.body.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    // Obtenir la position de la souris en pixels
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Mettre à jour le rayon du raycaster
    raycaster.setFromCamera(pointer, camera);
    console.log(raycaster);
    const instersect = raycaster.intersectObjects(scene.children);
    let ifBlock = true;
    try {
      let material = instersect[0].object.material;
    } catch (error) {
      ifBlock = false;
    }
    if (ifBlock) {
      console.log(material);
      const textureLoader = new THREE.TextureLoader();
      setTimeout(() => {
        if (event.ctrlKey) {
          scene.remove(instersect[0].object);
          world.removeBody(instersect[0].object.userData.physicsBody);
          blocks += 1;
          console.log(blocks);
        }
      }, timeset);
    }
  });
  document.body.addEventListener("contextmenu", (event) => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    event.preventDefault();
    // Mettre à jour le rayon du raycaster
    if (blocks > 0) {
      blocks -= 1;
      raycaster.setFromCamera(pointer, camera);
      console.log(raycaster);
      const instersect = raycaster.intersectObjects(scene.children);
      const textureLoader = new THREE.TextureLoader();
      const textureCube3 = [
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(herbe),
        }),
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(herbe),
        }),
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(herbe_top),
        }),
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(terre),
        }),

        new THREE.MeshBasicMaterial({
          map: textureLoader.load(herbe),
        }),
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(herbe),
        }),
      ];
      const BoxGeometry = new THREE.BoxGeometry();
      const Box = new THREE.Mesh(BoxGeometry, textureCube3);
      Box.position.x = 5;
      Box.position.y = 10;
      Box.position.z = 5;
      scene.add(Box);
      // Cannon.js cube
      const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
      const body = new CANNON.Body({ mass: 0 });
      body.addShape(shape);
      body.position.set(
        instersect[0].object.position.x,
        instersect[0].object.position.y + 1,
        instersect[0].object.position.z
      );
      world.addBody(body);
      Box.userData.physicsBody = body;
      arrayPushBox.push(Box);
      x++;
      r++;
    }
  });
  // Parcourez la liste des objets retournés et vérifiez s'ils sont des cubes
}
createCube1();
createCube2();

const arrowKeys = { left: false, up: false, right: false, down: false };

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      arrowKeys.left = true;
      break;
    case "ArrowUp":
      arrowKeys.up = true;
      break;
    case "ArrowRight":
      arrowKeys.right = true;
      break;
    case "ArrowDown":
      arrowKeys.down = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
      arrowKeys.left = false;
      break;
    case "ArrowUp":
      arrowKeys.up = false;
      break;
    case "ArrowRight":
      arrowKeys.right = false;
      break;
    case "ArrowDown":
      arrowKeys.down = false;
      break;
  }
}

// Animation
function animate() {
  requestAnimationFrame(animate);

  world.step(1 / 60);

  // Mise à jour de la position des cubes
  cube1.position.x = cube1.userData.physicsBody.position.x;
  cube1.position.y = cube1.userData.physicsBody.position.y;
  cube1.position.z = cube1.userData.physicsBody.position.z;
  cube1.quaternion.copy(cube1.userData.physicsBody.quaternion);
  cube2.position.x = cube2.userData.physicsBody.position.x;
  cube2.position.y = cube2.userData.physicsBody.position.y;
  cube2.position.z = cube2.userData.physicsBody.position.z;
  cube2.quaternion.copy(cube2.userData.physicsBody.quaternion);

  arrayPushBox.forEach((element) => {
    element.position.x = element.userData.physicsBody.position.x;
    element.position.y = element.userData.physicsBody.position.y;
    element.position.z = element.userData.physicsBody.position.z;
    element.quaternion.copy(element.userData.physicsBody.quaternion);
  });
  camera.position.x = cube1.position.x;
  camera.position.y = cube1.position.y + 2;
  camera.position.z = cube1.position.z;

  // Déplacer la caméra en fonction des touches pressées
  if (arrowKeys.left) {
    camera.rotateY(0.05);
  }
  if (arrowKeys.right) {
    camera.rotateY(-0.05);
  }
  if (arrowKeys.up) {
    camera.rotateX(0.05);
  }
  if (arrowKeys.down) {
    camera.rotateX(-0.05);
  }

  // Mettre à jour la direction de la caméra
  const target = new THREE.Vector3();
  camera.getWorldDirection(target);
  target.add(camera.position);
  camera.lookAt(target);

  renderer.render(scene, camera);
  document.querySelector(".block").textContent = blocks;
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const loader = new FBXLoader();

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

animate();
class Perso {
  constructor(scene, modelPath) {
    // chargement du modèle
    loader.load(modelPath, (fbx) => {
      this.model = fbx;
      console.log(this.model);
      this.model.position.set(5, 5, 5); // position initiale
      this.model.scale.set(0.05, 0.05, 0.05);
      let x1 = 0;
      let y1 = 6;
      let z1 = 0;
      let mass = 1;
      this.model.position.set(x1, y1, z1);
      let quaternion = { x: 0, y: 0, z: 0, w: 1 };
      scene.add(this.model);
      setInterval(() => {
        this.model.position.x = cube1.position.x;
        this.model.position.y = cube1.position.y;
        this.model.position.z = cube1.position.z;
      }, 10);
    });

    // vitesse de déplacement

    // touches enfoncées
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
    };

    // ajout des écouteurs d'événements pour les touches
    document.addEventListener(
      "keydown",
      (event) => this.onKeyDown(event),
      false
    );
    document.addEventListener("keyup", (event) => this.onKeyUp(event), false);
  }

  onKeyDown(event) {
    switch (event.key) {
      case "w":
        this.keys.forward = true;
        break;
      case "a":
        this.keys.left = true;
        break;
      case "s":
        this.keys.backward = true;
        break;
      case "d":
        this.keys.right = true;
        break;
      case " ":
        this.keys.space = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.key) {
      case "w":
        this.keys.forward = false;
        break;
      case "a":
        this.keys.left = false;
        break;
      case "s":
        this.keys.backward = false;
        break;
      case "d":
        this.keys.right = false;
        break;
      case " ":
        this.keys.space = false;
        break;
    }
  }

  update() {
    // déplacement en fonction des touches enfoncées
    if (this.keys.forward) {
      cube1.userData.physicsBody.position.z += PsersoSpeed;
    }
    if (this.keys.backward) {
      cube1.userData.physicsBody.position.z -= PsersoSpeed;
    }
    if (this.keys.left) {
      cube1.userData.physicsBody.position.x += PsersoSpeed;
    }
    if (this.keys.right) {
      cube1.userData.physicsBody.position.x -= PsersoSpeed;
    }
    if (this.keys.space) {
      cube1.userData.physicsBody.position.y += PsersoJump;
    }
  }
}
const perso = new Perso(scene, "steve.fbx");
function animate2() {
  requestAnimationFrame(animate2);
  perso.update();
  renderer.render(scene, camera);
}

animate2();
