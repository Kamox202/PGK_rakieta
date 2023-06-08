//kształty i materiały
const sfera = new THREE.SphereGeometry( 6.378, 100, 10 );
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
comet1_group.position.x = d_comet1*((Math.random())+1);
comet1_group.position.z = d_comet1*((Math.random())+1);

//kometa2
const comet2 = new THREE.Mesh( sfera, moon_tex_mat );
comet2.scale.set(1, 1, 1);
const comet2_group = new THREE.Group();
comet2_group.add(comet2);
comet2_group.position.x = d_comet2*((Math.random())+1);
comet2_group.position.z = d_comet2*((Math.random())+1);

//kometa3
const comet3 = new THREE.Mesh( sfera, moon_tex_mat );
comet3.scale.set(1, 1, 1);
const comet3_group = new THREE.Group();
comet3_group.add(comet3);
comet3_group.position.x = d_comet3*((Math.random())+1);
comet3_group.position.z = d_comet3*((Math.random())+1);

//kometa4
const comet4 = new THREE.Mesh( sfera, moon_tex_mat );
comet4.scale.set(1, 1, 1);
const comet4_group = new THREE.Group();
comet4_group.add(comet4);
comet4_group.position.x = d_comet4*((Math.random())+1);
comet4_group.position.z = d_comet4*((Math.random())+1);

//kometa5
const comet5 = new THREE.Mesh( sfera, moon_tex_mat );
comet5.scale.set(1, 1, 1);
const comet5_group = new THREE.Group();
comet5_group.add(comet5);
comet5_group.position.x = d_comet5*((Math.random())+1);
comet5_group.position.z = d_comet5*((Math.random())+1);

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
Rocket_group.add( axes );


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
mars_group.userData.velocity = new THREE.Vector3(0, 0, 1);
jupiter_group.userData.velocity = new THREE.Vector3(0, 0, 1);
Rocket_group.userData.velocity = new THREE.Vector3(0, 0, 0);
comet1_group.userData.velocity = new THREE.Vector3((Math.random())-0.5, 0, (Math.random())-0.5);
comet2_group.userData.velocity = new THREE.Vector3((Math.random())-0.5, 0, (Math.random())-0.5);
comet3_group.userData.velocity = new THREE.Vector3((Math.random())-0.5, 0, (Math.random())-0.5);
comet4_group.userData.velocity = new THREE.Vector3((Math.random())-0.5, 0, (Math.random())-0.5);
comet5_group.userData.velocity = new THREE.Vector3((Math.random())-0.5, 0, (Math.random())-0.5);




//Masa obiektów
const grav_constans = 6.67430 * 250 * 0.0000000001;
earth_group.userData.mass = 17000;
sun.userData.mass = earth_group.userData.mass * 10;
mercury_group.userData.mass = earth_group.userData.mass * 0.4;
venus_group.userData.mass = earth_group.userData.mass * 0.9;
mars_group.userData.mass = earth_group.userData.mass * 1.4;
jupiter_group.userData.mass = earth_group.userData.mass * 1.7;
Rocket_group.userData.mass = 1000;
comet1_group.userData.mass = earth_group.userData.mass * 0.4;
comet2_group.userData.mass = earth_group.userData.mass * 0.4;
comet3_group.userData.mass = earth_group.userData.mass * 0.4;
comet4_group.userData.mass = earth_group.userData.mass * 0.4;
comet5_group.userData.mass = earth_group.userData.mass * 0.4;


//tablice

const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group,comet1_group,comet2_group,comet3_group,comet4_group,comet5_group ,Rocket_group];




//Grawitacja

function v_distance(grav_victim, attractor) {
    const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
    const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
    return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
  }


function crash_with_body(victim, attractor)
{
  if(v_distance(victim, attractor) < (attractor.scale.x)+(victim.scale.x) )
  {
    group.remove(victim);
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
  