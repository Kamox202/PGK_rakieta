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

const saturn_tex = new THREE.TextureLoader().load('./tex/saturn.jfif');
const saturn_tex_mat = new THREE.MeshStandardMaterial( { map: saturn_tex});

const uran_tex = new THREE.TextureLoader().load('./tex/uran.jpg');
const uran_tex_mat = new THREE.MeshStandardMaterial( { map: uran_tex});

const neptun_tex = new THREE.TextureLoader().load('./tex/neptun.jfif');
const neptun_tex_mat = new THREE.MeshStandardMaterial( { map: neptun_tex});

const moon_tex = new THREE.TextureLoader().load('./tex/moon.jfif');
const moon_tex_mat = new THREE.MeshStandardMaterial( { map: moon_tex});

const ring_tex = new THREE.TextureLoader().load('./tex/ring.jfif');
const ring_tex_mat = new THREE.MeshBasicMaterial( { map: ring_tex, side: THREE.DoubleSide});

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
var v_saturn = v_earth * 0.27;
var v_uran = v_earth * 0.20;
var v_neptun = v_earth * 0.17;

//zmienne prędkości obrotu planet
var r_earth = 0.000003;
var r_mercury = r_earth * 1.67;
var r_venus = r_earth * 1.34;
var r_mars = r_earth * 0.83;
var r_jupiter = r_earth * 0.33;
var r_saturn = r_earth * 0.27;
var r_uran = r_earth * 0.20;
var r_neptun = r_earth * 0.17;

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
sun.scale.set(19, 19, 19);
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
mercury.position.x = d_mercury;
const mercury_group = new THREE.Group();
mercury_group.add(mercury);

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(0.95, 0.95, 0.95);
venus.position.x = d_venus;
const venus_group = new THREE.Group();
venus_group.add(venus);

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
earth.position.x = d_earth;
earth.rotation.z = 0.35;
const earth_m = new THREE.Mesh( sfera, moon_tex_mat );
earth_m.scale.set( 0.25, 0.25, 0.25 );
earth_m.position.set( 100, 0, 0 );
const earth_group = new THREE.Group();
earth_group.add(earth);
earth_group.add(earth_m);


//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.scale.set(0.53, 0.53, 0.53);
mars.position.x = d_mars;
const mars_group = new THREE.Group();
mars_group.add(mars);


//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(11.2, 11.2, 11.2);
jupiter.position.x = d_jupiter;
const jupiter_group = new THREE.Group();
jupiter_group.add(jupiter);


//saturn i pierścień
const pierscien = new THREE.RingGeometry(10, 15, 20, 1, 1, 3.2);
const saturn = new THREE.Mesh( sfera, saturn_tex_mat );
saturn.scale.set(9.4, 9.4, 9.4);
saturn.position.x = d_saturn;
const pierscien_s = new THREE.Mesh(pierscien, ring_tex_mat);
const pierscien2 = new THREE.Mesh();
pierscien2.copy(pierscien_s);
const saturn_group = new THREE.Group();
saturn_group.add(saturn);
// saturn_group.add(pierscien_s);
// saturn_group.add(pierscien2);
// pierscien_s.rotateX(1.57);
// pierscien2.rotateX(-1.57);
//pierscien2.rotateZ(-2.1);

//ustawienie textury pierścienia
ring_tex.offset.set(-0.2,0);
ring_tex.wrapS = THREE.RepeatWrapping;
ring_tex.wrapT = THREE.RepeatWrapping;
ring_tex.repeat.set(1,1);
ring_tex.rotation= 1.04;


//uran 
const uran = new THREE.Mesh( sfera, uran_tex_mat );
uran.scale.set(4, 4, 4);
uran.position.x = d_uran;
const uran_group = new THREE.Group();
uran_group.add(uran);


//neptun
const neptun = new THREE.Mesh( sfera, neptun_tex_mat );
neptun.scale.set(3.8, 3.8, 3.8);
neptun.position.x = d_neptun;
const neptun_group = new THREE.Group();
neptun_group.add(neptun);

//zmienne własne określające prędkość obiektów
mercury.userData.velocity_x = 0;
mercury.userData.velocity_z = 'mercury';
venus.userData.velocity_x = 0;
venus.userData.velocity_z = 'venus';
earth.userData.velocity_x  = 0;
earth.userData.velocity_z  = 0.000003;
mars.userData.velocity_x = 0;
mars.userData.velocity_z = 'mars';
jupiter.userData.velocity_x = 0;
jupiter.userData.velocity_z = 'jupiter';
saturn.userData.velocity_x = 0;
saturn.userData.velocity_z = 'saturn';
uran.userData.velocity_x = 0;
uran.userData.velocity_z = 'uran';
neptun.userData.velocity_x = 0;
neptun.userData.velocity_z = 'neptun';

//Masa
const grav_constans = 6.67430 * 0.00000000001;
sun.userData.mass = 19891000000000000000;
mercury.userData.mass = 10;
venus.userData.mass = 50;
earth.userData.mass = 100;
mars.userData.mass = 100;
jupiter.userData.mass = 800;
saturn.userData.mass = 800;
uran.userData.mass = 800;
neptun.userData.mass = 800;

//zmienne kamery



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

Rocket.userData.velocity_x = 0;
Rocket.userData.velocity_z = 0;
Rocket_velocity_lr = 0;

var Rocket_throttle = 0;
var max_throttle = 1;

Rocket.userData.mass = 10;

//tablice

const speed_tab = [v_mercury, v_venus, v_earth, v_mars, v_jupiter, v_saturn, v_uran, v_neptun];
const rotation_tab = [r_mercury, r_venus, r_earth, r_mars, r_jupiter, r_saturn, r_uran, r_neptun];
const sun_distance_tab = [d_mercury, d_venus, d_earth, d_mars, d_jupiter, d_saturn, d_uran, d_neptun];
const name_tab = [Rocket, mercury, venus, earth, mars, jupiter, saturn, uran, neptun];
const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group, saturn_group, uran_group, neptun_group];




//Grawitacja

function v_distance(grav_victim, attractor) {
  console.log("grav_victim.position.x: ", grav_victim.position.x);
  console.log("grav_attractor.position.x: ", attractor.position.x);
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
  