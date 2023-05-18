// import * as THREE from "js/thre/src/build/three.module.js";
// import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { AfterimagePass } from 'js/thre/src/examples/jsm/postprocessing/AfterimagePass.js';

// import { OrbitControls } from 'js/thre/src/examples/jsm/controls/OrbitControls.js';



const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 200;
camera.lookAt( scene.position );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color( 0x000000 ) )
document.getElementsByTagName('body')[0].appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


//skybox

const skybox = new THREE.CubeTextureLoader().load([
    
    "./skybox/bkg1_right.png",
    "./skybox/bkg1_left.png", 
    "./skybox/bkg1_top.png",
    "./skybox/bkg1_bot.png",
    "./skybox/bkg1_front.png",
    "./skybox/bkg1_back.png"
]);
scene.background = skybox;

//orbitcontrols
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

//zmienne dla raycaster
const kursor = new THREE.Vector2();
const ray = new THREE.Raycaster();

//kształty i materiały
const geometry = new THREE.SphereGeometry( 20, 80, 80 );
const sfera = new THREE.SphereGeometry( 2, 20, 20 );
const sfera1 = new THREE.SphereGeometry( 1, 20, 20 );




const sun_tex = new THREE.TextureLoader().load('./tex/sun.jpg');
const sun_tex_mat = new THREE.MeshBasicMaterial( { map: sun_tex});

const mercury_tex = new THREE.TextureLoader().load('./tex/mercury.jpg');
const mercury_tex_mat = new THREE.MeshStandardMaterial( { map: mercury_tex});

const venus_tex = new THREE.TextureLoader().load('./tex/venus.jfif');
const venus_tex_mat = new THREE.MeshStandardMaterial( { map: venus_tex});

const earth_tex = new THREE.TextureLoader().load('./tex/earth.jfif');
const earth_tex_mat = new THREE.MeshStandardMaterial( { map: earth_tex});

const mars_tex = new THREE.TextureLoader().load('./tex/mars.webp');
const mars_tex_mat = new THREE.MeshStandardMaterial( { map: mars_tex});

const jupiter_tex = new THREE.TextureLoader().load('./tex/jupiter.jfif');
const jupiter_tex_mat = new THREE.MeshStandardMaterial( { map: jupiter_tex});

const saturn_tex = new THREE.TextureLoader().load('./tex/saturn.jfif');
const saturn_tex_mat = new THREE.MeshStandardMaterial( { map: saturn_tex});

const uran_tex = new THREE.TextureLoader().load('./tex/uran.jpg');
const uran_tex_mat = new THREE.MeshStandardMaterial( { map: uran_tex});

const neptun_tex = new THREE.TextureLoader().load('./tex/neptun.jfif');
const neptun_tex_mat = new THREE.MeshStandardMaterial( { map: neptun_tex});

const moon_tex = new THREE.TextureLoader().load('./tex/moon.jfif');
const moon_tex_mat = new THREE.MeshStandardMaterial( { map: moon_tex});

const ring_tex = new THREE.TextureLoader().load('./tex/ring.jfif');
const ring_tex_mat = new THREE.MeshBasicMaterial( { map: ring_tex, side: THREE.DoubleSide});
//ustawienie textury pierścienia
ring_tex.offset.set(-0.2,0);
ring_tex.wrapS = THREE.RepeatWrapping;
ring_tex.wrapT = THREE.RepeatWrapping;
ring_tex.repeat.set(1,1);
ring_tex.rotation= 1.04;

//słońce i światło
const sun = new THREE.Mesh( geometry, sun_tex_mat);
sun.position.set( 0, 0, 0 );
const sw = new THREE.PointLight(0xffffff, 1, 1000);
sw.position.set(0,0,0);
sw.castShadow = true;
sun.position.copy(sw.position);
const sungroup = new THREE.Group();
sungroup.add(sun);
sungroup.add(sw);

//merkury
var odl_x = 40;
var odl_z = 50.5;
const mercury = new THREE.Mesh( sfera, mercury_tex_mat );
mercury.position.set( odl_x, 0, odl_z);
mercury.scale.set(0.9, 0.9, 0.9);

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(1.2, 1.2, 1.2);
venus.position.set(80, 0, 0);

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
earth.position.set( 120, 0, 0 );
earth.scale.set(1.3, 1.3, 1.3);
const earth_m = new THREE.Mesh( sfera1, moon_tex_mat );
earth_m.position.set( 2, 1, 0 );
const earthgroup = new THREE.Group();
earthgroup.add(earth);
earthgroup.add(earth_m);
earthgroup.position.set(600,0,0)

//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.position.set( 160, 0, 0 );
mars.scale.set(0.95, 0.95, 0.95);
const mars_m1 = new THREE.Mesh();
const mars_m2 = new THREE.Mesh();
mars_m1.copy(earth_m);
mars_m2.copy(earth_m);
const marsgroup = new THREE.Group();
marsgroup.add(mars);
marsgroup.add(mars_m1);
marsgroup.add(mars_m2);

//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(5, 5, 5);
jupiter.position.set(200, 0, 0);
const jup_mc1 = new THREE.Mesh();
jup_mc1.copy(earth_m);
const jupitergroup = new THREE.Group();
jupitergroup.add(jupiter);
jupitergroup.add(jup_mc1);

//saturn i pierścień
const pierscien = new THREE.RingGeometry(10, 15, 20, 1, 1, 3.2);
const saturn = new THREE.Mesh( sfera, saturn_tex_mat );
saturn.scale.set(4.5, 4.5, 4.5);
const pierscien_s = new THREE.Mesh(pierscien, ring_tex_mat);
const pierscien2 = new THREE.Mesh();
pierscien2.copy(pierscien_s);
const saturngroup = new THREE.Group();
saturngroup.add(saturn);
saturngroup.add(pierscien_s);
saturngroup.add(pierscien2);
pierscien_s.rotateX(1.57);
pierscien2.rotateX(-1.57);
pierscien2.rotateZ(-2.1);

//uran 
const uran = new THREE.Mesh( sfera, uran_tex_mat );
uran.scale.set(2.25, 2.25, 2.25);
const urangroup = new THREE.Group();
urangroup.add(uran);

//neptun
const neptun = new THREE.Mesh( sfera, neptun_tex_mat );
neptun.scale.set(2.2, 2.2, 2.2);

//zmienne własne określające nazwy obiektów
mercury.userData.nazwa = 'mercury';
venus.userData.nazwa = 'venus';
earth.userData.nazwa = 'earth';
mars.userData.nazwa = 'mars';
jupiter.userData.nazwa = 'jupiter';
saturn.userData.nazwa = 'saturn';
uran.userData.nazwa = 'uran';
neptun.userData.nazwa = 'neptun';

mercury.userData.predkosc = 0.05;
mercury.userData.odl_od_slonca = 35;

sun.userData.nazwa = 'reset';
earth_m.userData.nazwa = 'reset';
mars_m1.userData.nazwa = 'reset';
mars_m2.userData.nazwa = 'reset';
jup_mc1.userData.nazwa = 'reset';
pierscien_s.userData.nazwa = 'reset';

//ustawienia cieni
mercury.receiveShadow = true;
venus.receiveShadow = true;
earth.receiveShadow = true;
mars.receiveShadow = true;
jupiter.receiveShadow = true;
saturn.receiveShadow = true;
uran.receiveShadow = true;
neptun.receiveShadow = true;

earth_m.receiveShadow = true;
mars_m1.receiveShadow = true;
mars_m2.receiveShadow = true;
jup_mc1.receiveShadow = true;
pierscien_s.receiveShadow = true;

earth_m.castShadow = true;
mars_m1.castShadow = true;
mars_m2.castShadow = true;
jup_mc1.castShadow = true;
pierscien_s.castShadow = true;

mercury.castShadow = true;
venus.castShadow = true;
earth.castShadow = true;
mars.castShadow = true;
jupiter.castShadow = true;
saturn.castShadow = true;
uran.castShadow = true;

//dodanie obiektów do sceny
const group = new THREE.Group();
group.add( sungroup );
group.add(mercury);
group.add(venus);
group.add(earth);
group.add(mars);
group.add(jupiter);

scene.add( group );
 var m_g = 0.01;


 
 const grav_constans = 0.033;
  sun.userData.mass = 30;
  
  mercury.userData.mass = 1;
  mercury.userData.velocity_x = 0;
  mercury.userData.velocity_z = 0;

  venus.userData.mass = 5;
  venus.userData.velocity_x = 0;
  venus.userData.velocity_z = 0;

  earth.userData.mass = 6;
  earth.userData.velocity_x = 0;
  earth.userData.velocity_z = 0;

  mars.userData.mass = 4;
  mars.userData.velocity_x = 0;
  mars.userData.velocity_z = 0;

  jupiter.userData.mass = 10;
  jupiter.userData.velocity_x = 0;
  jupiter.userData.velocity_z = 0;

function v_distance(grav_victim, attractor) {
  const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
  const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
  return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
}


function crash_with_sun(victim,victim_trail , body)
{
  if(v_distance(victim, body)< 22)
  {
    group.remove(victim);
    victim_trail.deactivate();
  }
}
function crash_with_body(victim,victim_trail, body)
{
  if(v_distance(victim, body)< (2*body.scale.x) )
  {
    group.remove(victim);
   victim_trail.deactivate();
  }
}




function Newton_Grav(Small_mass, Big_mass, soi ) {
  if(v_distance(Small_mass, Big_mass) < soi);
 var r= v_distance(Small_mass,Big_mass);
 var sm = Small_mass.userData.mass;
 var bm = Big_mass.userData.mass;
 
 var rx = Small_mass.position.x-Big_mass.position.x;
 var rz = Small_mass.position.z-Big_mass.position.z;
 var force_scalar = -grav_constans*((bm*sm)/Math.pow(r,3));
 var fx = force_scalar*rx;
 var fz = force_scalar*rz;
 var Force = new THREE.Vector3(fx,0,fz);
 
Small_mass.userData.velocity_x += Force.x;
Small_mass.userData.velocity_z += Force.z;

 Small_mass.position.x += Small_mass.userData.velocity_x;
 Small_mass.position.z += Small_mass.userData.velocity_z;
 


 console.log(fx);


return Force;
}



var trailHeadGeometry = [];
trailHeadGeometry.push( 
  new THREE.Vector3( -1.0, 0.0, 0.0 ), 
  new THREE.Vector3( 1.0, 0.0, 0.0 ), 
  new THREE.Vector3( -1.0, 1.0, 0.0 ),
  new THREE.Vector3( 1.0, -1.0, 0.0 )  
);
// create the trail renderer object
var mercury_trail = new TrailRenderer( scene, false );
var venus_trail = new TrailRenderer( scene, false );
var earth_trail = new TrailRenderer( scene, false );
var mars_trail = new TrailRenderer( scene, false );
var jupiter_trail = new TrailRenderer( scene, false );
// create material for the trail renderer
var mercury_trailMaterial = TrailRenderer.createBaseMaterial();	
var venus_trailMaterial = TrailRenderer.createBaseMaterial();	
var earth_trailMaterial = TrailRenderer.createBaseMaterial();	
var mars_trailMaterial = TrailRenderer.createBaseMaterial();
var jupiter_trailMaterial = TrailRenderer.createBaseMaterial();

// specify length of trail
var trailLength = 2000;

// initialize the trail
mercury_trail.initialize( mercury_trailMaterial, trailLength, false, 0, trailHeadGeometry, mercury  );
venus_trail.initialize( venus_trailMaterial, trailLength, false, 0, trailHeadGeometry, venus  );
earth_trail.initialize( earth_trailMaterial, 1.8*trailLength, false, 0, trailHeadGeometry, earth  );
mars_trail.initialize( mars_trailMaterial, 3.2*trailLength, false, 0, trailHeadGeometry, mars  );
jupiter_trail.initialize( jupiter_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, jupiter  );

mercury_trailMaterial.uniforms.headColor.value.set( 0.0, 0.0, 0.5, 0.75 );
mercury_trailMaterial.uniforms.tailColor.value.set( 0.8, 0.5, 0.2, 0.15 );

     venus_trailMaterial.uniforms.headColor.value.set( 0.9, 0.5, 0.3, 0.75 );
 		venus_trailMaterial.uniforms.tailColor.value.set( 0.4, 0.2, 0.01, 0.15 );

     earth_trailMaterial.uniforms.headColor.value.set( 0.0, 0.6, 0.0, 0.75 );
 		earth_trailMaterial.uniforms.tailColor.value.set( 0.6, 0.6, 1.0, 0.15 );

     mars_trailMaterial.uniforms.headColor.value.set( 1.0, 0.0, 0.0, 0.75 );
 		mars_trailMaterial.uniforms.tailColor.value.set( 0.2, 0.2, 0.2, 0.15 );

     jupiter_trailMaterial.uniforms.headColor.value.set( 0.45, 0.25, 0.15, 0.75 );
 		jupiter_trailMaterial.uniforms.tailColor.value.set( 0.0, 0.0, 0.0, 0.15 );

// activate the trail
venus_trail.activate();
scene.add(venus_trail);

mercury_trail.activate();
scene.add(mercury_trail);

earth_trail.activate();
scene.add(earth_trail);

mars_trail.activate();
scene.add(mars_trail);

jupiter_trail.activate();
scene.add(jupiter_trail);

function animate(){

  controls.update();
  // mercury.rotation.y += 0.01;
  // venus.position.x -= 0.0;
  //   venus.position.z -= 0.36;
  //   mercury.position.z -= 0.12;
  //   mercury.position.x += 0.06;
   
  //   jupiter.position.z -= 0.30;
//  crash_with_sun(mercury,mercury_trail,sun);
//  crash_with_body(mercury,mercury_trail,jupiter);
//  crash_with_body(mercury,mercury_trail,venus);

//  crash_with_sun(venus,venus_trail,sun);
//  crash_with_body(venus,venus_trail,jupiter);

//  crash_with_sun(jupiter,jupiter_trail,sun);
 
//   Newton_Grav(jupiter,sun, 800000);
//   Newton_Grav(mercury,sun, 80000);
//   Newton_Grav(venus,sun, 80000);
//   Newton_Grav(mercury,venus, 800000);
 

mercury.position.x -= 0.08;
mercury.position.z += 0.08;
venus.position.z -= 0.26;
earth.position.z += 0.23;
mars.position.z += 0.16;
jupiter.position.z += 0.22;

  
   Newton_Grav(mercury,sun, 80000);
   Newton_Grav(venus,sun, 80000);
   Newton_Grav(earth,sun, 800000);
   Newton_Grav(mars,sun, 800000);
   Newton_Grav(jupiter,sun, 800000);
 
 
 
   //  Newton_Grav(saturn,sun, 800000);
  //  Newton_Grav(uran,sun, 800000);
  //  Newton_Grav(neptun,sun, 800000);


  mercury_trail.advance();
  venus_trail.advance();
  earth_trail.advance();
  mars_trail.advance();
  jupiter_trail.advance();
  requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
}

// function p(){
	
// 	for(let j = 0; j < 1; j++)
// 	{
// 		ruch_cial(nazwa_tab[j].userData.nazwa, nazwa_tab[j].userData.predkosc, nazwa_tab[j].userData.odl_od_slonca);
// 	}
// }

// funkcja zapewniająca animaccję układu




animate();
var rozmiar = venus.getSize;

// obsługa klawiatury
window.addEventListener(
  'keydown',
  function( e ) {
    switch ( e.key ) {
      case 'w':
		break;
    case 'r':
      //ang(mercury);
      //console.log(v_distance(mercury, sun));
      //console.log(attraction(mercury,sun, 80));
      console.log(rozmiar);
      break;
      default:
        ;
    }   
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
  },
  false
);

// zmiana rozmiaru okna
window.addEventListener(
  'resize',
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
  },
  false
);