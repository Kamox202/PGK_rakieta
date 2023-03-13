//kształty i materiały
const sfera = new THREE.SphereGeometry( 1, 40, 40 );
const ambientLight = new THREE.AmbientLight( 0xffffff ) ;
	 var ALight = false;
const rocket_geo = new THREE.BoxGeometry( 0.05, 0.01, 0.01);
const rocket_mat = new THREE.MeshStandardMaterial;

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

//ustawienie textury pierścienia
ring_tex.offset.set(-0.2,0);
ring_tex.wrapS = THREE.RepeatWrapping;
ring_tex.wrapT = THREE.RepeatWrapping;
ring_tex.repeat.set(1,1);
ring_tex.rotation= 1.04;

//Rocket
const Rocket = new THREE.Mesh( rocket_geo, rocket_mat );
Rocket.position.y = 11;
var Rocket_velocity_x = 0;
var Rocket_velocity_z = 0;


//słońce i światło
const sun = new THREE.Mesh( sfera, sun_tex_mat);
sun.position.set( 0, 0, 0 );
sun.scale.set(10, 10, 10);
const sw = new THREE.PointLight(0xffffff, 1, 5000);
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

//venuus
const venus = new THREE.Mesh( sfera, venus_tex_mat );
venus.scale.set(0.95, 0.95, 0.95);
const venus_group = new THREE.Group();
venus_group.add(venus);

//ziemia i księżyc
const earth = new THREE.Mesh( sfera, earth_tex_mat );
earth.rotation.z = 0.35;
const earth_m = new THREE.Mesh( sfera, moon_tex_mat );
earth_m.position.set( 2, 1, 0 );
const earth_group = new THREE.Group();
earth_group.add(earth);
earth_group.add(earth_m);


//mars i księżyce
const mars = new THREE.Mesh( sfera, mars_tex_mat );
mars.scale.set(0.53, 0.53, 0.53);
const mars_group = new THREE.Group();
mars_group.add(mars);


//jowisz i księżyc
const jupiter = new THREE.Mesh( sfera, jupiter_tex_mat );
jupiter.scale.set(5, 5, 5);
const jupiter_group = new THREE.Group();
jupiter_group.add(jupiter);


//saturn i pierścień
const pierscien = new THREE.RingGeometry(10, 15, 20, 1, 1, 3.2);
const saturn = new THREE.Mesh( sfera, saturn_tex_mat );
saturn.scale.set(4.5, 4.5, 4.5);
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


//uran 
const uran = new THREE.Mesh( sfera, uran_tex_mat );
uran.scale.set(2.25, 2.25, 2.25);
const uran_group = new THREE.Group();
uran_group.add(uran);


//neptun
const neptun = new THREE.Mesh( sfera, neptun_tex_mat );
neptun.scale.set(2.2, 2.2, 2.2);
const neptun_group = new THREE.Group();
neptun_group.add(neptun);


//zmienne prędkości planet
var v_mercury = 0.005;
var v_venus = 0.004;
var v_earth = 0.000003;
var v_mars = 0.0025;
var v_jupiter = 0.001;
var v_saturn = 0.0008;
var v_uran = 0.0006;
var v_neptun = 0.0005;

//zmienne odległości planet od słońca
var d_earth = 30;
var d_mercury = d_earth * 0.38;
var d_venus = d_earth * 0.72;
var d_mars = d_earth * 1.5;
var d_jupiter = d_earth * 5.2;
var d_saturn = d_earth * 9.5;
var d_uran = d_earth * 19.2;
var d_neptun = d_earth * 30;
var d_moon = d_earth * 0.25;

//zmienna planety wybranej przez raycaster
var wybrana = 'reset';

//tablice

const speed_tab = [v_mercury, v_venus, v_earth, v_mars, v_jupiter, v_saturn, v_uran, v_neptun];
const sun_distance_tab = [d_mercury, d_venus, d_earth, d_mars, d_jupiter, d_saturn, d_uran, d_neptun];
const name_tab = [mercury, venus, earth, mars, jupiter, saturn, uran, neptun];
const group_tab = [mercury_group, venus_group, earth_group, mars_group, jupiter_group, saturn_group, uran_group, neptun_group];
