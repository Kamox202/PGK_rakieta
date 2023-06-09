const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.02, 50000 );
camera.position.set ( 0, 1000, 0);


// camera.lookAt( Rocket.position );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color( 0x000000 ) );
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


//Rocket_group.add( camera );


//dodanie obiektów do sceny
const group = new THREE.Group();
group.add( sun_group );
group.add( earth_group );
group.add( mercury_group );
group.add( venus_group );
group.add( mars_group );
group.add( jupiter_group );
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

function Gravitation_2(body, atractor)
{

  var Force_ = Newton_Grav(body, atractor);
  //crash_with_body(body, atractor);

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
  Gravitation_2(Rocket_group, mercury_group);
  Gravitation_2(Rocket_group, venus_group);
  Gravitation_2(Rocket_group, earth_group);
  Gravitation_2(Rocket_group, mars_group);
  Gravitation_2(Rocket_group, jupiter_group);
}

var trailHeadGeometry = [];
trailHeadGeometry.push( 
  new THREE.Vector3( 2.0, 0.0, 0.0 ), 
  new THREE.Vector3( 2.0, 2.0, 0.0 ), 
  new THREE.Vector3( -2.0, 3.0, 0.0 ),
  new THREE.Vector3( -2.0, 0.0, 0.0 )  
);
// create the trail renderer object
var mercury_trail = new TrailRenderer( scene, false );
var venus_trail = new TrailRenderer( scene, false );
var earth_trail = new TrailRenderer( scene, false );
var mars_trail = new TrailRenderer( scene, false );
var jupiter_trail = new TrailRenderer( scene, false );
var Rocket_trail = new TrailRenderer( scene, false );
// create material for the trail renderer
var mercury_trailMaterial = TrailRenderer.createBaseMaterial();	
var venus_trailMaterial = TrailRenderer.createBaseMaterial();	
var earth_trailMaterial = TrailRenderer.createBaseMaterial();	
var mars_trailMaterial = TrailRenderer.createBaseMaterial();
var jupiter_trailMaterial = TrailRenderer.createBaseMaterial();
var Rocket_trailMaterial = TrailRenderer.createBaseMaterial();

// specify length of trail
var trailLength = 200;

// initialize the trail
mercury_trail.initialize( mercury_trailMaterial, trailLength, false, 0, trailHeadGeometry, mercury_group  );
venus_trail.initialize( venus_trailMaterial, trailLength, false, 0, trailHeadGeometry, venus_group  );
earth_trail.initialize( earth_trailMaterial, 1.8*trailLength, false, 0, trailHeadGeometry, earth_group  );
mars_trail.initialize( mars_trailMaterial, 3.2*trailLength, false, 0, trailHeadGeometry, mars_group  );
jupiter_trail.initialize( jupiter_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, jupiter_group  );
Rocket_trail.initialize( Rocket_trailMaterial, trailLength, false, 0, trailHeadGeometry, Rocket_back  );

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

     Rocket_trailMaterial.uniforms.headColor.value.set( 1.0, 0.0, 0.0, 0.75 );
 		Rocket_trailMaterial.uniforms.tailColor.value.set( 0.2, 0.2, 0.2, 0.15 );

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

Rocket_trail.activate();
scene.add(Rocket_trail);

// funkcja zapewniająca animaccję układu
function animate() {

  controls.update();

  for(let j = 0; j < 5; j++)
  {
    Gravitation(group_tab[j]);
    group_tab[j].rotation.y += group_tab[j].userData.rotation;
  }

  rocket_position();

  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket_group.userData.velocity.x.toFixed(2);
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket_group.userData.velocity.z.toFixed(2);
    
  document.getElementById("Mercury_R").innerHTML = "Mercury_R: " + v_distance(mercury_group, sun).toFixed(2);
  document.getElementById("Venus_R").innerHTML = "Venus_R: " + v_distance(venus_group, sun).toFixed(2);
  document.getElementById("Earth_R").innerHTML = "Earth_R: " + v_distance(earth_group, sun).toFixed(2);
  document.getElementById("Mars_R").innerHTML = "Mars_R: " + v_distance(mars_group, sun).toFixed(2);
  document.getElementById("Jupiter_R").innerHTML = "Jupiter_R: " + v_distance(jupiter_group, sun).toFixed(2);


  //camera.lookAt( Rocket_group.position );
    
  mercury_trail.advance();
  venus_trail.advance();
  earth_trail.advance();
  mars_trail.advance();
  jupiter_trail.advance();
  Rocket_trail.advance();
  
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
		    console.log(Rocket_throttle);
      }
		break;
		
	  case 's':
      if(Rocket_throttle > 0)
      {
        Rocket_throttle -= 0.01;
		    console.log(Rocket_throttle);
      }
      if(Rocket_throttle < 0)
      {
        Rocket_throttle = 0.0;
		    console.log(Rocket_throttle);
      }

		break;
		
	  case ' ':
		piloting_acceleration();
		break;
		
    case 'z':
      Rocket_throttle = max_throttle;
      console.log(Rocket_throttle);
		break;

    case 'x':
     // Rocket_throttle = 0;
      Rocket_group.userData.velocity.x = 0;
      Rocket_group.userData.velocity.z = 0;
      console.log(Rocket_throttle);
		break;

    case 'c':
      camera.lookAt( sun.position );
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
      camera.position.set ( 0.1, Rocket.position.y + 0.1, 0);
		break;
            
    case '2':
      camera.position.set ( 5000, Rocket.position.y + 5000, 0);
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