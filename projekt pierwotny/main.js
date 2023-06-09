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
group.add( comet1_group );
group.add( comet2_group );
group.add( comet3_group );
group.add( comet4_group );
group.add( comet5_group );
group.add( comet6_group );
group.add( comet7_group );
group.add( comet8_group );
group.add( comet9_group );
group.add( comet10_group );
group.add( ambientLight )


scene.add( group );





function Gravitation(body, b_tail, b_tailmat)
{

  var Force_ = Newton_Grav(body, sun);
  crash_with_body(body, sun, b_tail,b_tailmat);

  body.userData.velocity.x += Force_.x;
  body.userData.velocity.z += Force_.z; 
    
  body.position.x += body.userData.velocity.x; 
  body.position.z += body.userData.velocity.z;
}

function Gravitation_2(body, atractor, b_tail, b_tailmat)
{

  var Force_ = Newton_Grav(body, atractor);
  crash_with_body(body, atractor, b_tail, b_tailmat);

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

  Gravitation_2(Rocket_group, comet1_group);
  Gravitation_2(Rocket_group, comet2_group);
  Gravitation_2(Rocket_group, comet3_group);
  Gravitation_2(Rocket_group, comet4_group);
  Gravitation_2(Rocket_group, comet5_group);


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
var comet1_trail = new TrailRenderer( scene, false );
var comet2_trail = new TrailRenderer( scene, false );
var comet3_trail = new TrailRenderer( scene, false );
var comet4_trail = new TrailRenderer( scene, false );
var comet5_trail = new TrailRenderer( scene, false );

var comet6_trail = new TrailRenderer( scene, false );
var comet7_trail = new TrailRenderer( scene, false );
var comet8_trail = new TrailRenderer( scene, false );
var comet9_trail = new TrailRenderer( scene, false );
var comet10_trail = new TrailRenderer( scene, false );

// create material for the trail renderer
var mercury_trailMaterial = TrailRenderer.createBaseMaterial();	
var venus_trailMaterial = TrailRenderer.createBaseMaterial();	
var earth_trailMaterial = TrailRenderer.createBaseMaterial();	
var mars_trailMaterial = TrailRenderer.createBaseMaterial();
var jupiter_trailMaterial = TrailRenderer.createBaseMaterial();
var Rocket_trailMaterial = TrailRenderer.createBaseMaterial();

var comet1_trailMaterial = TrailRenderer.createBaseMaterial();
var comet2_trailMaterial = TrailRenderer.createBaseMaterial();
var comet3_trailMaterial = TrailRenderer.createBaseMaterial();
var comet4_trailMaterial = TrailRenderer.createBaseMaterial();
var comet5_trailMaterial = TrailRenderer.createBaseMaterial();

var comet6_trailMaterial = TrailRenderer.createBaseMaterial();
var comet7_trailMaterial = TrailRenderer.createBaseMaterial();
var comet8_trailMaterial = TrailRenderer.createBaseMaterial();
var comet9_trailMaterial = TrailRenderer.createBaseMaterial();
var comet10_trailMaterial = TrailRenderer.createBaseMaterial();

var comet_trailMaterial = TrailRenderer.createBaseMaterial();

// specify length of trail
var trailLength = 750;

// initialize the trail
mercury_trail.initialize( mercury_trailMaterial, trailLength, false, 0, trailHeadGeometry, mercury_group  );
venus_trail.initialize( venus_trailMaterial, trailLength, false, 0, trailHeadGeometry, venus_group  );
earth_trail.initialize( earth_trailMaterial, 1.8*trailLength, false, 0, trailHeadGeometry, earth_group  );
mars_trail.initialize( mars_trailMaterial, 3.2*trailLength, false, 0, trailHeadGeometry, mars_group  );
jupiter_trail.initialize( jupiter_trailMaterial, 2.7*trailLength, false, 0, trailHeadGeometry, jupiter_group  );
Rocket_trail.initialize( Rocket_trailMaterial, trailLength, false, 0, trailHeadGeometry, Rocket_back  );


comet1_trail.initialize( comet1_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet1_group  );
comet2_trail.initialize( comet2_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet2_group  );
comet3_trail.initialize( comet3_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet3_group  );
comet4_trail.initialize( comet4_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet4_group  );
comet5_trail.initialize( comet5_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet5_group  );

comet6_trail.initialize( comet6_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet6_group  );
comet7_trail.initialize( comet7_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet7_group  );
comet8_trail.initialize( comet8_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet8_group  );
comet9_trail.initialize( comet9_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet9_group  );
comet10_trail.initialize( comet10_trailMaterial, trailLength, false, 0, trailHeadGeometry, comet10_group  );

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

     Rocket_trailMaterial.uniforms.headColor.value.set( 1.0, 1.0, 0.0, 0.75 );
 		Rocket_trailMaterial.uniforms.tailColor.value.set( 0.2, 0.2, 0.0, 0.15 );

    comet1_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet1_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet2_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet2_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet3_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet3_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet4_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet4_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet5_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet5_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );


     comet6_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet6_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet7_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet7_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet8_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet8_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet9_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet9_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     comet10_trailMaterial.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
 		comet10_trailMaterial.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

     var comet_trsilmat_group = [comet1_trailMaterial, comet2_trailMaterial, comet3_trailMaterial, comet4_trailMaterial, comet5_trailMaterial, comet6_trailMaterial, comet7_trailMaterial, comet8_trailMaterial, comet9_trailMaterial, comet10_trailMaterial];

     var comet_trsild_group = [comet1_trail, comet2_trail, comet3_trail, comet4_trail, comet5_trail, comet6_trail, comet7_trail, comet8_trail, comet9_trail, comet10_trail];
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


for(let i = 0; i <10; i++)
{
  comet_trsild_group[i].activate();
scene.add(comet_trsild_group[i]);
}


var start = true;
animate();
var start = true;
function sstart()
{
 // console.log(start);
  start = !start;
  if (start == true) animate();
}

//stoper
var myfunc = setInterval(function() {
  
  }, 1000)

// funkcja zapewniająca animaccję układu
function animate() {

  requestAnimationFrame( animate );
	 renderer.render( scene, camera );

  if (!start) return;
  
  controls.update();
  
  for(let j = 0; j < 15; j++)
  {
    if(j < 5)
    Gravitation(group_tab[j]);
    else Gravitation(group_tab[j], comet_trsild_group[j-5], comet_trsilmat_group[j-5]);
  }
  for(let j = 0; j < 5; j++){
    group_tab[j].rotation.y += group_tab[j].userData.rotation;
  }

  for(let j = 5; j < 15; j++)
  {
    Out_of_Bounds(group_tab[j],comet_trsild_group[j-5], comet_trsilmat_group[j-5]);
  }

  for(let j = 0; j < 5; j++)
  {
    Gravitation_2(comet1_group ,group_tab[j], comet1_trail, comet1_trailMaterial);
    Gravitation_2(comet2_group ,group_tab[j], comet2_trail, comet2_trailMaterial);
    Gravitation_2(comet3_group ,group_tab[j], comet3_trail,comet3_trailMaterial);
    Gravitation_2(comet4_group ,group_tab[j], comet4_trail, comet4_trailMaterial);
    Gravitation_2(comet5_group ,group_tab[j], comet5_trail, comet5_trailMaterial);

    Gravitation_2(comet6_group ,group_tab[j], comet6_trail, comet6_trailMaterial);
    Gravitation_2(comet7_group ,group_tab[j], comet7_trail, comet7_trailMaterial);
    Gravitation_2(comet8_group ,group_tab[j], comet8_trail,comet8_trailMaterial);
    Gravitation_2(comet9_group ,group_tab[j], comet9_trail, comet9_trailMaterial);
    Gravitation_2(comet10_group ,group_tab[j], comet10_trail, comet10_trailMaterial);
  }

  for(let j = 0; j < 10; j++)
  {
    if (j != 0)  Gravitation_2(comet1_group ,comet_group[j], comet1_trail, comet1_trailMaterial);
    if (j != 1)  Gravitation_2(comet2_group ,comet_group[j], comet2_trail, comet2_trailMaterial);
    if (j != 2)  Gravitation_2(comet3_group ,comet_group[j], comet3_trail,comet3_trailMaterial);
    if (j != 3) Gravitation_2(comet4_group ,comet_group[j], comet4_trail, comet4_trailMaterial);
    if (j != 4) Gravitation_2(comet5_group ,comet_group[j], comet5_trail, comet5_trailMaterial);

    if (j != 5)  Gravitation_2(comet6_group ,comet_group[j], comet6_trail, comet6_trailMaterial);
    if (j != 6)  Gravitation_2(comet7_group ,comet_group[j], comet7_trail, comet7_trailMaterial);
    if (j != 7)  Gravitation_2(comet8_group ,comet_group[j], comet8_trail, comet8_trailMaterial);
    if (j != 8) Gravitation_2(comet9_group ,comet_group[j], comet9_trail, comet9_trailMaterial);
    if (j != 9) Gravitation_2(comet10_group ,comet_group[j], comet10_trail, comet10_trailMaterial);
  }

    Gravitation_2(comet1_group ,Rocket_group, comet1_trail, comet1_trailMaterial);
    Gravitation_2(comet2_group ,Rocket_group, comet2_trail, comet2_trailMaterial);
    Gravitation_2(comet3_group ,Rocket_group, comet3_trail,comet3_trailMaterial);
   Gravitation_2(comet4_group ,Rocket_group, comet4_trail, comet4_trailMaterial);
   Gravitation_2(comet5_group ,Rocket_group, comet5_trail, comet5_trailMaterial);

  rocket_position();

  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_throttle").innerHTML = "Throttle: " + Rocket_throttle.toFixed(2);
  document.getElementById("Rocket_velocity_x").innerHTML = "Velocit X: " + Rocket_group.userData.velocity.x.toFixed(2);
  document.getElementById("Rocket_velocity_z").innerHTML = "Velocit Z: " + Rocket_group.userData.velocity.z.toFixed(2);
    
  document.getElementById("Mercury_R").innerHTML = "Mercury_R: " + v_distance(mercury_group, Rocket_group).toFixed(2);
  document.getElementById("Venus_R").innerHTML = "Venus_R: " + v_distance(venus_group, Rocket_group).toFixed(2);
  document.getElementById("Earth_R").innerHTML = "Earth_R: " + v_distance(earth_group, Rocket_group).toFixed(2);
  document.getElementById("Mars_R").innerHTML = "Mars_R: " + v_distance(mars_group, Rocket_group).toFixed(2);
  document.getElementById("Jupiter_R").innerHTML = "Jupiter_R: " + v_distance(jupiter_group, Rocket_group).toFixed(2);




  //camera.lookAt( Rocket_group.position );
    
  mercury_trail.advance();
  venus_trail.advance();
  earth_trail.advance();
  mars_trail.advance();
  jupiter_trail.advance();
  Rocket_trail.advance();
  comet1_trail.advance();
  comet2_trail.advance();
  comet3_trail.advance();
  comet4_trail.advance();
  comet5_trail.advance();
  comet6_trail.advance();
  comet7_trail.advance();
  comet8_trail.advance();
  comet9_trail.advance();
  comet10_trail.advance();


   
}


animate();

var et_act = true;

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
      //Rocket_throttle = max_throttle;
      //console.log(Rocket_throttle);
      et_act = true;
      earth_trail.initialize( earth_trailMaterial, 1.8*trailLength, false, 0, trailHeadGeometry, earth_group  );
      earth_trail.activate();
		break;

    case 'x':
     // Rocket_throttle = 0;
      Rocket_group.userData.velocity.x = 0;
      Rocket_group.userData.velocity.z = 0;
      console.log(Rocket_throttle);
      earth_trail.deactivate();
     // earth_trail.destroyMesh();
      et_act = false;
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
      camera.position.set ( 0, Rocket_group.position.y + 10, 10);
		break;
            
    case '2':
      camera.position.set ( 5000,  5000, 0);
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
