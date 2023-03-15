//Controls

function piloting_left()
{
	Rocket.rotation.y += 0.01745329251994; 
}

function piloting_right()
{
	Rocket.rotation.y -= 0.01745329251994; 
}

function piloting_acceleration()
{
	Rocket_velocity_x += Math.cos(Rocket.rotation.y) * 0.0005;
	Rocket_velocity_z += -Math.sin(Rocket.rotation.y) * 0.0005;
}
