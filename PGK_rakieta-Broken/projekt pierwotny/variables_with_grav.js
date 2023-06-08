//zmienne prędkości planet
var v_mercury = 0.005;
var v_venus = 0.004;
var v_earth = 0.003;
var v_mars = 0.0025;
var v_jupiter = 0.001;
var v_saturn = 0.0008;
var v_uran = 0.0006;
var v_neptun = 0.0005;

//zmienne odległości planet od słońca
var d_mercury = 35;
var d_venus = 50;
var d_earth = 60;
var d_mars = 100;
var d_jupiter = 150;
var d_saturn = 180;
var d_uran = 220;
var d_neptun = 240;

//zmienna planety wybranej przez raycaster
var wybrana = 'reset';

//tablice
const nazwa_tab = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uran', 'neptun'];



const grav_constans = 0.11;
sun.userData.mass = 1000;
mercury.userData.mass = 10;
venus.userData.mass = 50;
earth.userData.mass = 100;
jupiter.userData.mass = 800;


function v_distance(grav_victim, attractor) {
    const target = new THREE.Vector3(grav_victim.position.x, grav_victim.position.y, grav_victim.position.z) //tworzy wektor dla ofiary grawitacji
    const grav_sorce = new THREE.Vector3(attractor.position.x, attractor.position.y, attractor.position.z) //tworzy wektor dla źródła grawitacji
    return target.distanceTo(grav_sorce);//oblicza odległość między obiektami
  }

  function crash_with_sun(victim, body)
{
  if(v_distance(victim, body)< 22)
  {
    group.remove(victim);
  }
}
function crash_with_body(victim, body)
{
  if(v_distance(victim, body)< (2*body.scale.x)+(2*victim.scale.x) )
  {
    group.remove(victim);
  }
}

function Newton_Grav(Small_mass, Big_mass, soi ) {
    if(v_distance(Small_mass, Big_mass) < soi);
   var r= v_distance(Small_mass,Big_mass);
   var sm = Small_mass.userData.mass;
   var bm = Big_mass.userData.mass;
   
   var rx = Small_mass.position.x-Big_mass.position.x;
   var rz = Small_mass.position.z-Big_mass.position.z;
   var force_scalar = -grav_constans*((bm*sm)/Math.pow(r,3));
   var fx = force_scalar*rx;
   var fz = force_scalar*rz;
   var Force = new THREE.Vector3(fx,0,fz);
  
   Small_mass.position.x += Force.x;
   Small_mass.position.z += Force.z;
   
   console.log(fx);
  
  return Force;
  }
  