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

const axes = new THREE.AxesHelper(200);


const Rocket_group = new THREE.Group();
Rocket_group.add( Rocket );
Rocket_group.add( camera );
Rocket_group.add( axes );


Rocket_group.position.x = 200000;



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
group.add( ambientLight )


scene.add( group );



function body_movement(object){
	
  var Force_ = Newton_Grav(object, sun);
  crash_with_body(object, sun);

  object.userData.velocity_x += Force_.x;
  object.userData.velocity_z += Force_.z; 
  console.log("Velocity_X: ", object.userData.velocity_x);
  console.log("Force_X: ", Force_.x); 
}

function Grav(object)
{
  var Force_ = Newton_Grav(object, sun);
  crash_with_body(object, sun);

  object.userData.velocity_x += Force_.x;
  object.userData.velocity_z += Force_.z; 

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

	Rocket_group.position.x += Rocket.userData.velocity_x; 
	Rocket_group.position.z += Rocket.userData.velocity_z; 
  
  console.log("Pozycja: ",Rocket_group.position.x);
}


// funkcja zapewniająca animaccję układu
function animate() {

  controls.update();

  for(let j = 0; j < 1; j++)
  {
    body_movement(name_tab[j]);
  }

  rocket_position();

  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket.userData.velocity_x.toFixed(2);
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket.userData.velocity_z.toFixed(2);

  
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
      Rocket_throttle = 0;
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
