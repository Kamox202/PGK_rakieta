const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 320;
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
group.add(earth);
group.add(mercury);
group.add(venus);
group.add(marsgroup);
group.add(jupitergroup);
group.add(saturngroup);
group.add(urangroup);
group.add(neptun);
scene.add( group );



function ruch_cial(nazwa, predkosc, odl_od_slonca){
	
  nazwa.rotation.y += predkosc;
  nazwa.position.set( odl_od_slonca*Math.cos(nazwa.rotation.y),0, odl_od_slonca*Math.sin(nazwa.rotation.y));

  // venus.rotation.y += v_venus;
  // venus.position.set( d_venus*Math.sin(venus.rotation.y),0, d_venus*Math.cos(venus.rotation.y));

  // earth.rotation.y += v_earth;
  // earthgroup.position.set((d_earth*Math.cos(earth.rotation.y)),0, (d_earth*Math.sin(earth.rotation.y)));

  // earth_m.rotation.y +=0.02;
  // earth_m.position.set( 5*Math.cos(earth_m.rotation.y),0, 5*Math.sin(earth_m.rotation.y));

  // mars.rotation.y += v_mars;
  // marsgroup.position.set( d_mars*Math.cos(mars.rotation.y),0, d_mars*Math.sin(mars.rotation.y));

  // mars_m1.rotation.y +=0.02;
  // mars_m1.position.set( 5*Math.cos(mars_m1.rotation.y),0, 5*Math.sin(mars_m1.rotation.y));

  // mars_m2.rotation.y +=0.02;
  // mars_m2.position.set( -5*Math.cos(mars_m2.rotation.y),0, -5*Math.sin(mars_m2.rotation.y));
  
  // jupiter.rotation.y += v_jupiter;
  // jupitergroup.position.set( d_jupiter*Math.cos(jupiter.rotation.y),0, d_jupiter*Math.sin(jupiter.rotation.y));

  // jup_mc1.rotation.y +=0.02;
  // jup_mc1.position.set( 12*Math.cos(jup_mc1.rotation.y),0, 12*Math.sin(jup_mc1.rotation.y));

  // saturn.rotation.y += v_saturn;
  // saturngroup.position.set( d_saturn*Math.cos(saturn.rotation.y),0, d_saturn*Math.sin(saturn.rotation.y));

  // uran.rotation.y += v_uran;
  // urangroup.position.set( d_uran*Math.cos(uran.rotation.y),0, d_uran*Math.sin(uran.rotation.y));

  // neptun.rotation.y += v_neptun;
  // neptun.position.set( d_neptun*Math.cos(neptun.rotation.y),0, d_neptun*Math.sin(neptun.rotation.y));
}

function p(){
	
	for(let j = 0; j < 8; j++)
	{
		ruch_cial(nazwa_tab[j], predkosc_tab[j], odleglosc_tab[j]);
	}
}

// funkcja zapewniająca animaccję układu
function animate() {
  controls.update();
  p();
  
  requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();


// obsługa klawiatury
window.addEventListener(
  'keydown',
  function( e ) {
    switch ( e.key ) {
      case 'w':
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