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


const axes = new THREE.AxesHelper(200);

const Rocket_group = new THREE.Group();
Rocket_group.add( Rocket );
Rocket_group.add( axes );
Rocket_group.add( camera );

Rocket_group.userData.velocity = new THREE.Vector3(0, 0, 0);

Rocket_velocity_lr = 0;

var Rocket_throttle = 0;
var max_throttle = 1;

Rocket_group.position.x = 1500000;
Rocket_group.userData.mass = 10;

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
}

function rocket_position()
{

  console.log("Pozycja grupy: ",Rocket_group.position.x);
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

	Rocket_group.position.x += Rocket_group.userData.velocity.x; 
	Rocket_group.position.z += Rocket_group.userData.velocity.z; 
  
  console.log("Pozycja grupy: ",Rocket_group.position.x);
}


// funkcja zapewniająca animaccję układu
function animate() {

  controls.update();

  //for(let j = 0; j < 1; j++)
  //{
  //  console.log(name_tab[j]);
  //  Gravitation(name_tab[j]);
  //}

  rocket_position();

  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket_group.userData.velocity.x.toFixed(2);
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket_group.userData.velocity.z.toFixed(2);

  
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
