//Controls

function piloting_left()
{
	Rocket_velocity_lr += 0.01; 
}

function piloting_right()
{
	Rocket_velocity_lr -= 0.01;
}

function piloting_acceleration()
{
	Rocket_velocity_x += Math.cos(Rocket.rotation.y) * Rocket_throttle;
	Rocket_velocity_z += -Math.sin(Rocket.rotation.y) * Rocket_throttle;
}
