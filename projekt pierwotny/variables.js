//kształty i materiały
const sfera = new THREE.SphereGeometry( 6378, 100, 100 );
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

const rocket_body_geo = new THREE.CylinderGeometry( 0.001, 0.001, 0.005, 60);
const rocket_front_geo = new THREE.ConeGeometry( 0.001, 0.0015, 60, 1);
const rocket_back_geo = new THREE.LatheGeometry( 30, 0, 6.283185307179586 );
const rocket_mat = new THREE.MeshStandardMaterial;
const rocket_mat_red = new THREE.MeshStandardMaterial({color: 'red',});


//zmienne odległości planet od słońca
var d_earth = 2000000;
var d_mercury = d_earth * 0.3;
var d_venus = d_earth * 0.55;
var d_mars = d_earth * 1.4;
var d_jupiter = d_earth * 2.3;

//słońce i światło
const sun = new THREE.Mesh( sfera, sun_tex_mat);
sun.position.set( 0, 0, 0 );
sun.scale.set(15, 15, 15);
const sw = new THREE.PointLight(0xffffff, 1, 5000000);
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
mercury_group.position.x = d_mercury;
mercury_group.add(mercury);

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(0.95, 0.95, 0.95);
const venus_group = new THREE.Group();
venus_group.position.x = d_venus;
venus_group.add(venus);

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
const earth_m = new THREE.Mesh( sfera, moon_tex_mat );
earth_m.scale.set( 0.15, 0.15, 0.15 );
earth_m.position.set( 500000, 0, 0 );
const earth_group = new THREE.Group();
earth_group.position.x = d_earth;
earth_group.add(earth);


//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.scale.set(0.53, 0.53, 0.53);
const mars_group = new THREE.Group();
mars_group.position.x = d_mars;
mars_group.add(mars);


//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(4, 4, 4);
const jupiter_group = new THREE.Group();
jupiter_group.position.x = d_jupiter;
jupiter_group.add(jupiter);

//asteroida
const asteroid = new THREE.Mesh( sfera, moon_tex_mat );
asteroid.scale.set(1, 1, 1);
const asteroid_group = new THREE.Group();
asteroid_group.position.x = -d_mercury;
asteroid_group.add(asteroid);

//Rocket
const Rocket_front = new THREE.Mesh( rocket_front_geo, rocket_mat_red );
const Rocket_body = new THREE.Mesh( rocket_body_geo, rocket_mat );
const Rocket_back = new THREE.Mesh( rocket_back_geo, rocket_mat_red );

Rocket_front.position.y = 0.00325;
Rocket_back.position.y = -0.00325;

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

Rocket_group.position.x = 800000;


//zmienne prędkości obrotu planet
earth_group.userData.rotation = 0.001;
mercury_group.userData.rotation = 0.001;
venus_group.userData.rotation = 0.001;
mars_group.userData.rotation = 0.001;
jupiter_group.userData.rotation = 0.001;
asteroid_group.userData.rotation = 0;

//zmienne własne określające prędkość obiektów
earth_group.userData.velocity = new THREE.Vector3(0, 0, 500);
mercury_group.userData.velocity = new THREE.Vector3(0, 0, 500);
venus_group.userData.velocity = new THREE.Vector3(0, 0, 500);
mars_group.userData.velocity = new THREE.Vector3(0, 0, 500);
jupiter_group.userData.velocity = new THREE.Vector3(0, 0, 500);
asteroid_group.userData.velocity = new THREE.Vector3(200, 0, 200);
Rocket_group.userData.velocity = new THREE.Vector3(0, 0, 0);

//Masa obiektów
const grav_constans = 6.67430 * 0.00000000001;
earth_group.userData.mass = 60000000;
sun.userData.mass = earth_group.userData.mass * 332950;
mercury_group.userData.mass = earth_group.userData.mass;
venus_group.userData.mass = earth_group.userData.mass;
mars_group.userData.mass = earth_group.userData.mass;
jupiter_group.userData.mass = earth_group.userData.mass * 320;
asteroid_group.userData.mass = 100000000;
Rocket_group.userData.mass = 10;

//tablice

const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group, asteroid_group];




//Grawitacja

function v_distance(grav_victim, attractor) {
    const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
    const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
    return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
  }


function crash_with_body(victim, body)
{
  if(v_distance(victim, body) < ((6378 * victim.scale.x) + (6378 * body.scale.x)))
  {
    group.remove(victim);
    victim.userData.trail.deactivate();
  }
}

function Newton_Grav(Small_mass, Big_mass) {

   var r = v_distance(Small_mass,Big_mass);
   var sm = Small_mass.userData.mass;
   var bm = Big_mass.userData.mass;
   
   var rx = Small_mass.position.x-Big_mass.position.x;
   var rz = Small_mass.position.z-Big_mass.position.z;
   var force_scalar = -grav_constans*((bm*sm)/Math.pow(r,3));
   var fx = force_scalar*rx;
   var fz = force_scalar*rz;
   var Force = new THREE.Vector3(fx,0,fz);
    
  return Force;
  }
  