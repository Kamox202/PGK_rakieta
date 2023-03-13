const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 100;
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
var odl_x = 70;
var odl_z = -70;
const mercury = new THREE.Mesh( sfera, mercury_tex_mat );
mercury.position.set( odl_x, 0, odl_z);
mercury.scale.set(0.9, 0.9, 0.9);

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(1.2, 1.2, 1.2);

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
earth.position.set( 0, 0, 0 );
earth.scale.set(1.3, 1.3, 1.3);
const earth_m = new THREE.Mesh( sfera1, moon_tex_mat );
earth_m.position.set( 2, 1, 0 );
const earthgroup = new THREE.Group();
earthgroup.add(earth);
earthgroup.add(earth_m);
earthgroup.position.set(600,0,0)

//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
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

scene.add( group );
 var m_g = 0.01;


 function distance(o1, o2){
   var x1,y1, x2,y2;
   x1 = o1.position.x;
   y1 = o1.position.z;
   x2 = o2.position.x;
   y2 = o2.position.z;

   var dis = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
  
   return dis;
 }

 var momentum = 0;
 
 function exit(v){
   momentum = v;
  return momentum;
 }
function faccing(o1, o2)
{
   
  var face = Math.sin(o1.position.x);
 // console.log(face);
  return face;

}

function ang(o1)
{
  var ref_x = o1.position.x;
  var ref_z = o1.position.z;
  var aob = ref_x * 1;
  var f = distance(sun, mercury)*(Math.pow(1,2));
  var fin = (aob/f);
  console.log(fin);
  return fin;
}

function animate(){

  controls.update();
  mercury.position.z += 0.1;
  mercury.rotation.y += 0.01;
  mercury.position.x -= momentum;
  

  if(distance(sun, mercury) < 80){
    if(ang(mercury) > 0){
    mercury.position.x -= m_g;
    }else{
     mercury.position.z -= m_g;
    }
  m_g += 0.0001;
  if(distance(sun, mercury) > 79){
    exit(m_g);
  }
  }
  

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


// obsługa klawiatury
window.addEventListener(
  'keydown',
  function( e ) {
    switch ( e.key ) {
      case 'w':
		break;
    case 'r':
      ang(mercury);
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