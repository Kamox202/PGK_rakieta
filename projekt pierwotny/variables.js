//kształty i materiały
const sfera = new THREE.SphereGeometry( 6378, 64, 50 );
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 ) ;
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

const rocket_body_geo = new THREE.CylinderGeometry( 0.01, 0.01, 0.05, 60);
const rocket_front_geo = new THREE.ConeGeometry( 0.01, 0.015, 60, 1);
const rocket_back_geo = new THREE.LatheGeometry( 30, 0, 6.283185307179586 );
const rocket_mat = new THREE.MeshStandardMaterial;

//zmienne prędkości planet
var v_earth = 0.000003;
var v_mercury = v_earth * 1.67;
var v_venus = v_earth * 1.34;
var v_mars = v_earth * 0.83;
var v_jupiter = v_earth * 0.33;

//zmienne prędkości obrotu planet
var r_earth = 0.000003;
var r_mercury = r_earth * 1.67;
var r_venus = r_earth * 1.34;
var r_mars = r_earth * 0.83;
var r_jupiter = r_earth * 0.33;

//zmienne odległości planet od słońca
var d_earth = 149597;
var d_mercury = d_earth * 0.38;
var d_venus = d_earth * 0.72;
var d_mars = d_earth * 1.5;
var d_jupiter = d_earth * 5.2;
var d_saturn = d_earth * 9.5;
var d_uran = d_earth * 19.2;
var d_neptun = d_earth * 30;
var d_moon = d_earth * 0.25;

//słońce i światło
const sun = new THREE.Mesh( sfera, sun_tex_mat);
sun.position.set( 0, 0, 0 );
sun.scale.set(190, 190, 190);
const sw = new THREE.PointLight(0xffffff, 1, 500000000);
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
const earth_m = new THREE.Mesh( sfera, moon_tex_mat );
earth_m.scale.set( 0.25, 0.25, 0.25 );
earth_m.position.set( 100, 0, 0 );
const earth_group = new THREE.Group();
earth_group.add(earth);
earth_group.add(earth_m);
earth_group.position.x = d_earth;


//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.scale.set(0.53, 0.53, 0.53);
const mars_group = new THREE.Group();
mars_group.add(mars);
mars_group.position.x = d_mars;


//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(11.2, 11.2, 11.2);
const jupiter_group = new THREE.Group();
jupiter_group.add(jupiter);
jupiter_group.position.x = d_jupiter;



//zmienne własne określające prędkość obiektów
mercury.userData.velocity = new THREE.Vector3(0, 0, 0);
venus.userData.velocity = new THREE.Vector3(0, 0, 0);
earth.userData.velocity = new THREE.Vector3(0, 0, 0);
mars.userData.velocity = new THREE.Vector3(0, 0, 0);
jupiter.userData.velocity = new THREE.Vector3(0, 0, 0);

//Masa
const grav_constans = 6.67430 * 0.00000000001;
sun.userData.mass = 19891000000000000000;
mercury.userData.mass = 10;
venus.userData.mass = 50;
earth.userData.mass = 100;
mars.userData.mass = 100;
jupiter.userData.mass = 800;


//Rocket
const Rocket_front = new THREE.Mesh( rocket_front_geo, rocket_mat );
const Rocket_body = new THREE.Mesh( rocket_body_geo, rocket_mat );
const Rocket_back = new THREE.Mesh( rocket_back_geo, rocket_mat );

Rocket_front.position.y = 0.0325;
Rocket_back.position.y = -0.0325;

const Rocket = new THREE.Group();
	Rocket.add( Rocket_body );
	Rocket.add( Rocket_front );
	Rocket.add( Rocket_back );

Rocket.rotation.z = -3.14/2;	
Rocket.rotation.y = -3.14/2;




//tablice

const speed_tab = [v_mercury, v_venus, v_earth, v_mars, v_jupiter];
const rotation_tab = [r_mercury, r_venus, r_earth, r_mars, r_jupiter];
const sun_distance_tab = [d_mercury, d_venus, d_earth, d_mars, d_jupiter];
const name_tab = [mercury, venus, earth, mars, jupiter];
const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group];




//Grawitacja

function v_distance(grav_victim, attractor) {
  console.log(grav_victim);
    const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
    const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
    return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
  }

  function crash_with_sun(victim, body)
{
  if(v_distance(victim, body)< 1)
  {
    group.remove(victim);
  }
}

function crash_with_body(victim, body)
{
  if(v_distance(victim, body) < (body.scale.x)+(victim.scale.x) )
  {
    group.remove(victim);
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

   console.log("R: ", r);
   console.log("Force_Scalar: ", force_scalar);
  return Force;
  }
  