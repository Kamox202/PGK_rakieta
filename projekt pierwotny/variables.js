//kształty i materiały
const sfera = new THREE.SphereGeometry( 6.378, 100, 50 );
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 ) ;
	 var ALight = false;


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

const moon_tex = new THREE.TextureLoader().load('./tex/moon.jfif');
const moon_tex_mat = new THREE.MeshStandardMaterial( { map: moon_tex});

const rocket_body_geo = new THREE.CylinderGeometry( 5, 5, 50, 60);
const rocket_front_geo = new THREE.ConeGeometry( 5, 20.15, 6000, 100);
const rocket_back_geo = new THREE.LatheGeometry( 300, 0, 600.283185307179586 );
const rocket_mat = new THREE.MeshStandardMaterial;
const rocket_mat_red = new THREE.MeshStandardMaterial({color: 'red',});

function rand_1() {
  var rand = Math.random();
  if(rand < 0.5)
  {
    return -1;
  }else return 1;
}

//zmienne odległości planet od słońca
var d_earth = 420;
var d_mercury = d_earth * 0.4;
var d_venus = d_earth * 0.75;
var d_mars = d_earth * 1.5;
var d_jupiter = d_earth * 1.9;
var d_comet1 = d_jupiter;
var d_comet2 = d_jupiter;
var d_comet3 = d_jupiter;
var d_comet4 = d_jupiter;
var d_comet5 = d_jupiter;

var d_comet6 = d_jupiter;
var d_comet7 = d_jupiter;
var d_comet8 = d_jupiter;
var d_comet9 = d_jupiter;
var d_comet10 = d_jupiter;

//słońce i światło
const sun = new THREE.Mesh( sfera, sun_tex_mat);
sun.position.set( 0, 0, 0 );
sun.scale.set(15, 15, 15);
const sw = new THREE.PointLight(0xffffff, 1, 50000);
sw.position.set(0,0,0);
sw.castShadow = true;
sun.position.copy(sw.position);
const sun_group = new THREE.Group();
sun_group.add(sun);
sun_group.add(sw);

//merkury
const mercury = new THREE.Mesh( sfera, mercury_tex_mat );
mercury.scale.set(0.38, 0.38, 0.38);
const mercury_group = new THREE.Group();
mercury_group.add(mercury);
mercury_group.position.x = d_mercury;

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(0.95, 0.95, 0.95);
const venus_group = new THREE.Group();
venus_group.add(venus);
venus_group.position.x = d_venus;

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
const earth_group = new THREE.Group();
earth_group.add(earth);
earth_group.position.x = d_earth;


//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.scale.set(0.53, 0.53, 0.53);
const mars_group = new THREE.Group();
mars_group.add(mars);
mars_group.position.x = d_mars;


//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(4, 4, 4);
const jupiter_group = new THREE.Group();
jupiter_group.add(jupiter);
jupiter_group.position.x = d_jupiter;


//kometa1
const comet1 = new THREE.Mesh( sfera, moon_tex_mat );
comet1.scale.set(1, 1, 1);
const comet1_group = new THREE.Group();
comet1_group.add(comet1);
comet1_group.position.x = d_comet1*((Math.random())+1)*rand_1();
comet1_group.position.z = d_comet1*((Math.random())+1)*rand_1();

//kometa2
const comet2 = new THREE.Mesh( sfera, moon_tex_mat );
comet2.scale.set(1, 1, 1);
const comet2_group = new THREE.Group();
comet2_group.add(comet2);
comet2_group.position.x = d_comet2*((Math.random())+1)*rand_1();
comet2_group.position.z = d_comet2*((Math.random())+1)*rand_1();

//kometa3
const comet3 = new THREE.Mesh( sfera, moon_tex_mat );
comet3.scale.set(1, 1, 1);
const comet3_group = new THREE.Group();
comet3_group.add(comet3);
comet3_group.position.x = d_comet3*((Math.random())+1)*rand_1();
comet3_group.position.z = d_comet3*((Math.random())+1)*rand_1();

//kometa4
const comet4 = new THREE.Mesh( sfera, moon_tex_mat );
comet4.scale.set(1, 1, 1);
const comet4_group = new THREE.Group();
comet4_group.add(comet4);
comet4_group.position.x = d_comet4*((Math.random())+1)*rand_1();
comet4_group.position.z = d_comet4*((Math.random())+1)*rand_1();

//kometa5
const comet5 = new THREE.Mesh( sfera, moon_tex_mat );
comet5.scale.set(1, 1, 1);
const comet5_group = new THREE.Group();
comet5_group.add(comet5);
comet5_group.position.x = d_comet5*((Math.random())+1)*rand_1();
comet5_group.position.z = d_comet5*((Math.random())+1)*rand_1();

//kometa6
const comet6 = new THREE.Mesh( sfera, moon_tex_mat );
comet6.scale.set(1, 1, 1);
const comet6_group = new THREE.Group();
comet6_group.add(comet6);
comet6_group.position.x = d_comet6*((Math.random())+1)*rand_1();
comet6_group.position.z = d_comet6*((Math.random())+1)*rand_1();

//kometa7
const comet7 = new THREE.Mesh( sfera, moon_tex_mat );
comet7.scale.set(1, 1, 1);
const comet7_group = new THREE.Group();
comet7_group.add(comet7);
comet7_group.position.x = d_comet7*((Math.random())+1)*rand_1();
comet7_group.position.z = d_comet7*((Math.random())+1)*rand_1();

//kometa8
const comet8 = new THREE.Mesh( sfera, moon_tex_mat );
comet8.scale.set(1, 1, 1);
const comet8_group = new THREE.Group();
comet8_group.add(comet8);
comet8_group.position.x = d_comet8*((Math.random())+1)*rand_1();
comet8_group.position.z = d_comet8*((Math.random())+1)*rand_1();


//kometa9
const comet9 = new THREE.Mesh( sfera, moon_tex_mat );
comet9.scale.set(1, 1, 1);
const comet9_group = new THREE.Group();
comet9_group.add(comet9);
comet9_group.position.x = d_comet9*((Math.random())+1)*rand_1();
comet9_group.position.z = d_comet9*((Math.random())+1)*rand_1();

//kometa10
const comet10 = new THREE.Mesh( sfera, moon_tex_mat );
comet10.scale.set(1, 1, 1);
const comet10_group = new THREE.Group();
comet10_group.add(comet10);
comet10_group.position.x = d_comet10*((Math.random())+1)*rand_1();
comet10_group.position.z = d_comet10*((Math.random())+1)*rand_1();

//Rocket
const Rocket_front = new THREE.Mesh( rocket_front_geo, rocket_mat_red );
const Rocket_body = new THREE.Mesh( rocket_body_geo, rocket_mat );
const Rocket_back = new THREE.Mesh( rocket_back_geo, rocket_mat_red );

Rocket_front.position.y = 35.0;
Rocket_back.position.y = -25.0;

const Rocket = new THREE.Group();
	Rocket.add( Rocket_body );
	Rocket.add( Rocket_front );
	Rocket.add( Rocket_back );

Rocket.rotation.z = -3.14/2;	
Rocket.rotation.y = -3.14/2;

const axes = new THREE.AxesHelper(200);

const Rocket_group = new THREE.Group();
Rocket_group.add( Rocket );


var Rocket_velocity_lr = 0;

var Rocket_throttle = 0;
var max_throttle = 1;

Rocket_group.position.x = 1000.000;


//zmienne prędkości obrotu planet
earth_group.userData.rotation = 0.001;
mercury_group.userData.rotation = 0.001;
venus_group.userData.rotation = 0.001;
mars_group.userData.rotation = 0.001;
jupiter_group.userData.rotation = 0.001;



//zmienne własne określające prędkość obiektów
earth_group.userData.velocity = new THREE.Vector3(0, 0, 1);
mercury_group.userData.velocity = new THREE.Vector3(0, 0, 1);
venus_group.userData.velocity = new THREE.Vector3(0, 0, 1);
mars_group.userData.velocity = new THREE.Vector3(0, 0, 0.65);
jupiter_group.userData.velocity = new THREE.Vector3(0, 0, 1);
Rocket_group.userData.velocity = new THREE.Vector3(0, 0, 0);
comet1_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet2_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet3_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet4_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet5_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);

comet6_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet7_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet8_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet9_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);
comet10_group.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);

//flagi rozbić komet
comet1_group.userData.is_comet = true;
comet2_group.userData.is_comet = true;
comet3_group.userData.is_comet = true;
comet4_group.userData.is_comet = true;
comet5_group.userData.is_comet = true;

comet6_group.userData.is_comet = true;
comet7_group.userData.is_comet = true;
comet8_group.userData.is_comet = true;
comet9_group.userData.is_comet = true;
comet10_group.userData.is_comet = true;


//Masa obiektów
const grav_constans = 6.67430 * 250 * 0.0000000001;
earth_group.userData.mass = 17000;
sun.userData.mass = earth_group.userData.mass * 10;
mercury_group.userData.mass = earth_group.userData.mass * 0.4;
venus_group.userData.mass = earth_group.userData.mass * 0.9;
mars_group.userData.mass = earth_group.userData.mass * 0.7;
jupiter_group.userData.mass = earth_group.userData.mass * 1.7;
Rocket_group.userData.mass = 1000;
comet1_group.userData.mass = earth_group.userData.mass * 0.4;
comet2_group.userData.mass = earth_group.userData.mass * 0.4;
comet3_group.userData.mass = earth_group.userData.mass * 0.4;
comet4_group.userData.mass = earth_group.userData.mass * 0.4;
comet5_group.userData.mass = earth_group.userData.mass * 0.4;

comet6_group.userData.mass = earth_group.userData.mass * 0.4;
comet7_group.userData.mass = earth_group.userData.mass * 0.4;
comet8_group.userData.mass = earth_group.userData.mass * 0.4;
comet9_group.userData.mass = earth_group.userData.mass * 0.4;
comet10_group.userData.mass = earth_group.userData.mass * 0.4;


//tablice

const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group,comet1_group,comet2_group,comet3_group,comet4_group,comet5_group, comet6_group, comet7_group, comet8_group, comet9_group, comet10_group ,Rocket_group];

const comet_group = [comet1_group,comet2_group,comet3_group,comet4_group,comet5_group, comet6_group, comet7_group, comet8_group, comet9_group, comet10_group];

//funkcja odrodzeń komet
function respawn(res_target)
{
  
  res_target.position.x = d_comet5*((Math.random())+1)*rand_1();
  res_target.position.z = d_comet5*((Math.random())+1)*rand_1();
  res_target.userData.velocity = new THREE.Vector3((Math.random()*0.2)-0.1, 0, (Math.random()*0.2)-0.1);

  group.add(res_target);
}


//Grawitacja

function v_distance(grav_victim, attractor) {
    const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
    const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
    return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
  }


function crash_with_body(victim, attractor, victim_trail, victim_trailmat)
{
  if(v_distance(victim, attractor) < (6.378*attractor.scale.x)+(6.378*victim.scale.x) )
  {
    group.remove(victim);
    if (victim.userData.is_comet == true) {
      victim_trail.deactivate();
      respawn(victim);

      victim_trailmat.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
      victim_trailmat.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

      victim_trail.initialize( victim_trailmat, trailLength, false, 0, trailHeadGeometry, victim  );
      victim_trail.activate();
      
    }
  }
}

function Out_of_Bounds(stranded, stranded_trail, stranded_trailmat)
{
  if(v_distance(stranded, sun) > 1800)
  {
    group.remove(stranded);
    stranded_trail.deactivate();
    respawn(stranded);

    stranded_trailmat.uniforms.headColor.value.set( Math.random(), Math.random(), Math.random(), 0.75 );
    stranded_trailmat.uniforms.tailColor.value.set( Math.random(), Math.random(), Math.random(), Math.random() );

    stranded_trail.initialize( stranded_trailmat, trailLength, false, 0, trailHeadGeometry, stranded  );
    stranded_trail.activate();
  }
}

function Newton_Grav(Small_mass, Big_mass) {

   var r = v_distance(Small_mass,Big_mass);
   var sm = Small_mass.userData.mass;
   var bm = Big_mass.userData.mass;
   //if(r > 10) {
   var rx = Small_mass.position.x-Big_mass.position.x;
   var rz = Small_mass.position.z-Big_mass.position.z;
   var force_scalar = -grav_constans*((bm*sm)/Math.pow(r,3));
   var fx = force_scalar*rx;
   var fz = force_scalar*rz;
   var Force = new THREE.Vector3(fx,0,fz);
//}else {var Force = new THREE.Vector3(0,0,0);}
   return Force;
  }
  