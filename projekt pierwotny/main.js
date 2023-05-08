const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x0AC );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.02, 150000000 );
camera.position.set ( -0.5, Rocket.position.y + 0.5, 0);


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
saturn.userData.nazwa = 'saturn';
uran.userData.nazwa = 'uran';
neptun.userData.nazwa = 'neptun';

mercury.userData.predkosc = 0.05;
mercury.userData.odl_od_slonca = 35;

sun.userData.nazwa = 'reset';
//pierscien_s.userData.nazwa = 'reset';

//ustawienia cieni
mercury.receiveShadow = true;
venus.receiveShadow = true;
earth.receiveShadow = true;
mars.receiveShadow = true;
jupiter.receiveShadow = true;
saturn.receiveShadow = true;
uran.receiveShadow = true;
neptun.receiveShadow = true;


//pierscien_s.receiveShadow = true;

//pierscien_s.castShadow = true;

mercury.castShadow = true;
venus.castShadow = true;
earth.castShadow = true;
mars.castShadow = true;
jupiter.castShadow = true;
saturn.castShadow = true;
uran.castShadow = true;

// goal = new THREE.Object3D;
// follow = new THREE.Object3D;
// follow.position.z = -cameraDistance;
// Rocket.add( follow );
const Rocket_group = new THREE.Group();
Rocket_group.add( Rocket );
Rocket_group.add( camera );

Rocket_group.userData.mass = 10;

Rocket_group.position.x = 2000000;



//dodanie obiektów do sceny
const group = new THREE.Group();
group.add( sun_group );
group.add( earth_group );
group.add( mercury_group );
group.add( venus_group );
group.add( mars_group );
group.add( jupiter_group );
group.add( saturn_group );
group.add( uran_group );
group.add( neptun_group );
group.add( Rocket_group );


scene.add( group );



function body_movement(name, speed, center_distance){
	
  name.rotation.y += speed;
  name.position.set( center_distance*Math.cos(name.rotation.y),0,center_distance*Math.sin(name.rotation.y));

}

function point_out_objects(){
	
	for(let j = 0; j < 8; j++)
	{
		body_movement(name_tab[j], speed_tab[j], sun_distance_tab[j], group_tab[j]);
	}
}

function rocket_position(){
	
  Rocket.rotation.y += 0.01745329251994 * Rocket_velocity_lr;
  if(Rocket_velocity_lr > 0)
  {
    Rocket_velocity_lr -= 0.001;
  }
  else if(Rocket_velocity_lr < 0)
  {
    Rocket_velocity_lr += 0.001;
  }

	Rocket_group.position.x += Rocket_velocity_x; 
	Rocket_group.position.z += Rocket_velocity_z; 
}

// funkcja zapewniająca animaccję układu
function animate() {
  controls.update();
  point_out_objects();
  rocket_position();
  crash_with_body(Rocket_group, sun);
  Newton_Grav(Rocket_group, sun, 14000000);
  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle;
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket_velocity_x;
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket_velocity_z;

  // a.lerp(Rocket.position, cameraDistance);
  // b.copy(goal.position);
  
  // dir.copy( a ).sub( b ).normalize();
  // const dis = a.distanceTo( b ) - cameraDistance;
  // goal.position.addScaledVector( dir, dis );
  // goal.position.lerp(temp, 0.02);
  // temp.setFromMatrixPosition(follow.matrixWorld);

  camera.lookAt( Rocket_group.position );
  


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
      Rocket_throttle += 0.01;
      console.log(Rocket_throttle);
		break;
		
	  case 's':
      Rocket_throttle -= 0.01;
		  console.log(Rocket_throttle);
		break;
		
	  case ' ':
		piloting_acceleration();
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

const axes = new THREE.AxesHelper(500);
scene.add( axes );