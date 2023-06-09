var scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.02, 50000000 );
camera.position.set ( 0.1, 10000, 0);


// camera.lookAt( Rocket.position );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color( 0x000000 ) );
document.getElementsByTagName('body')[0].appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

import { GLTFLoader } from './js/GLTFLoader.js';

var loader = new GLTFLoader();

loader.load("rocket.gltf", function(gltf){
    Rocket = gltf.scene;
    Rocket.rotation.z = -3.14/2;	
    Rocket.rotation.y = -3.14/2;

    Rocket.scale.set(100, 100, 100);

    const axes = new THREE.AxesHelper(200);

    Rocket_group.add( Rocket );

    scene.add(Rocket_group);
}, undefined, function ( error ) {

	console.error( error );

} );

var ifupdate = 0;




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

//ustawienia cieni
mercury.receiveShadow = true;
venus.receiveShadow = true;
earth.receiveShadow = true;
mars.receiveShadow = true;
jupiter.receiveShadow = true;

mercury.castShadow = true;
venus.castShadow = true;
earth.castShadow = true;
mars.castShadow = true;
jupiter.castShadow = true;


Rocket_group.add( camera );


//dodanie obiektów do sceny
const group = new THREE.Group();
group.add( sun_group );
group.add( earth_group );
group.add( mercury_group );
group.add( venus_group );
group.add( mars_group );
group.add( jupiter_group );
group.add(asteroid_group);
group.add( Rocket_group );
group.add( ambientLight )



scene.add( group );




function Gravitation(body)
{

  var Force_ = Newton_Grav(body, sun);
  crash_with_body(body, sun);

  body.userData.velocity.x += Force_.x;
  body.userData.velocity.z += Force_.z; 
    
  body.position.x += body.userData.velocity.x; 
  body.position.z += body.userData.velocity.z;
}

function Gravitation_for_objects(body, planet)
{

  var Force_ = Newton_Grav(body, planet);
  crash_with_body(body, planet);

  body.userData.velocity.x += Force_.x;
  body.userData.velocity.z += Force_.z; 
    
  body.position.x += body.userData.velocity.x; 
  body.position.z += body.userData.velocity.z;
}

function rocket_position()
{
    
  Rocket.rotation.y += 0.01745329251994 * Rocket_velocity_lr;
  if(Rocket_velocity_lr > 0)
  {
    Rocket_velocity_lr -= 0.001;
  }
  else if(Rocket_velocity_lr < 0)
  {
    Rocket_velocity_lr += 0.001;
  }

  Gravitation(Rocket_group);
}

var trailHeadGeometry = [];
trailHeadGeometry.push( 
  new THREE.Vector3( -5000.0, 0.0, 0.0 ), 
  new THREE.Vector3( 5000.0, 0.0, 0.0 ), 
  new THREE.Vector3( 5000.0, 5000.0, 0.0 )     
);
// create the trail renderer object
 mercury_group.userData.trail = new TrailRenderer( scene, false );
 venus_group.userData.trail = new TrailRenderer( scene, false );
 earth_group.userData.trail = new TrailRenderer( scene, false );
 mars_group.userData.trail = new TrailRenderer( scene, false );
 jupiter_group.userData.trail = new TrailRenderer( scene, false );
 asteroid_group.userData.trail = new TrailRenderer( scene, false );
 Rocket_group.userData.trail = new TrailRenderer( scene, false );

// create material for the trail renderer
var mercury_trailMaterial = TrailRenderer.createBaseMaterial();	
var venus_trailMaterial = TrailRenderer.createBaseMaterial();	
var earth_trailMaterial = TrailRenderer.createBaseMaterial();	
var mars_trailMaterial = TrailRenderer.createBaseMaterial();
var jupiter_trailMaterial = TrailRenderer.createBaseMaterial();
var asteroid_trailMaterial = TrailRenderer.createBaseMaterial();
var Rocket_trailMaterial = TrailRenderer.createBaseMaterial();

// specify length of trail
var trailLength = 10000;
function trails(){
// initialize the trail
mercury_group.userData.trail.initialize( mercury_trailMaterial, trailLength, false, 0, trailHeadGeometry, mercury_group  );
venus_group.userData.trail.initialize( venus_trailMaterial, trailLength, false, 0, trailHeadGeometry, venus_group  );
earth_group.userData.trail.initialize( earth_trailMaterial, 1.8*trailLength, false, 0, trailHeadGeometry, earth_group  );
mars_group.userData.trail.initialize( mars_trailMaterial, 3.2*trailLength, false, 0, trailHeadGeometry, mars_group  );
jupiter_group.userData.trail.initialize( jupiter_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, jupiter_group  );
asteroid_group.userData.trail.initialize( asteroid_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, asteroid_group  );
Rocket_group.userData.trail.initialize( Rocket_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, Rocket_group  );

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

     asteroid_trailMaterial.uniforms.headColor.value.set( 0.45, 0.25, 0.15, 0.75 );
 		asteroid_trailMaterial.uniforms.tailColor.value.set( 0.0, 0.0, 0.0, 0.15 );

     Rocket_trailMaterial.uniforms.headColor.value.set( 0.45, 0.25, 0.15, 0.75 );
 		Rocket_trailMaterial.uniforms.tailColor.value.set( 0.0, 0.0, 0.0, 0.15 );

// activate the trail
venus_group.userData.trail.activate();

mercury_group.userData.trail.activate();

earth_group.userData.trail.activate();

mars_group.userData.trail.activate();

jupiter_group.userData.trail.activate();

asteroid_group.userData.trail.activate();

Rocket_group.userData.trail.activate();
}
var cam_look = Rocket_group.position;


function update(x) {
  if(x)
  {
    mercury_group.userData.trail.advance();
    venus_group.userData.trail.advance();
    earth_group.userData.trail.advance();
    mars_group.userData.trail.advance();
    jupiter_group.userData.trail.advance();
    asteroid_group.userData.trail.advance();
    Rocket_group.userData.trail.advance();
  }
}

function deactivate_trails()
{
  mercury_group.userData.trail.deactivate();
  mercury_group.userData.trail.destroyMesh();
  venus_group.userData.trail.deactivate();
  venus_group.userData.trail.destroyMesh();
  earth_group.userData.trail.deactivate();
  earth_group.userData.trail.destroyMesh();
  mars_group.userData.trail.deactivate();
  mars_group.userData.trail.destroyMesh();
  jupiter_group.userData.trail.deactivate();
  jupiter_group.userData.trail.destroyMesh();
  asteroid_group.userData.trail.deactivate();
  asteroid_group.userData.trail.destroyMesh();
  Rocket_group.userData.trail.deactivate();
  Rocket_group.userData.trail.destroyMesh();

}

// funkcja zapewniająca animaccję układu
function animate() {

  controls.update();

  for(let j = 0; j < 6; j++)
  {
    Gravitation(group_tab[j]);
    group_tab[j].rotation.y += group_tab[j].userData.rotation;
    if(j>4)
    {
      for(let i = 0; i < 5; i++)
      {
        Gravitation_for_objects(group_tab[j], group_tab[i]);
      }
    }
  }

  if(Rocket){rocket_position()}
  

  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket_group.userData.velocity.x.toFixed(2);
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket_group.userData.velocity.z.toFixed(2);
    
  document.getElementById("Mercury_R").innerHTML = "Mercury_R: " + v_distance(mercury_group, sun).toFixed(2);
  document.getElementById("Venus_R").innerHTML = "Venus_R: " + v_distance(venus_group, sun).toFixed(2);
  document.getElementById("Earth_R").innerHTML = "Earth_R: " + v_distance(earth_group, sun).toFixed(2);
  document.getElementById("Mars_R").innerHTML = "Mars_R: " + v_distance(mars_group, sun).toFixed(2);
  document.getElementById("Jupiter_R").innerHTML = "Jupiter_R: " + v_distance(jupiter_group, sun).toFixed(2);


  update(ifupdate);
  

  camera.lookAt( cam_look );
  
  requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
}

animate();


// obsługa klawiatury
window.addEventListener(
  'keydown',
  function( e ) {
    switch ( e.key ) {
      case 'a':
		piloting_left();
		break;
		
	  case 'd':
		piloting_right();
		break;
		
	  case 'w':
      if(Rocket_throttle < max_throttle)
      {
        Rocket_throttle += 0.01;
      }
		break;
		
	  case 's':
      if(Rocket_throttle > 0)
      {
        Rocket_throttle -= 0.01;
      }
      if(Rocket_throttle < 0)
      {
        Rocket_throttle = 0.0;
      }

		break;
		
	  case ' ':
		piloting_acceleration();
		break;
		
    case 'z':
      Rocket_throttle = max_throttle;
		break;

    case 'x':
      Rocket_throttle = 0;

		break;
		
	  case 'l':
			if ( ALight == false ) 
			{
				scene.add( ambientLight )
				ALight = true
				break;
			}
			ALight = false;
			scene.remove( ambientLight );
			break;
            
    case '1':
      ifupdate = 0;
      deactivate_trails();
      camera.position.set ( 0, 2500, -2500);
      Rocket_group.add( camera );
      cam_look = Rocket_group.position; 
		break;
            
    case '2':
      camera.position.set ( 500000, 500000, 0);
      sun_group.add( camera );
      cam_look = sun.position;

      trails();
      ifupdate = 1;
		break;

            
      default:
        ;
    }   
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
