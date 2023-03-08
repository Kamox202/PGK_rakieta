//Controls

function piloting_left()
{
	Rocket.rotation.y += 0.01745329251994;
}

function piloting_right()
{
	Rocket.rotation.y += -0.01745329251994;
}

function piloting_acceleration()
{
	Rocket.position.set();
}
