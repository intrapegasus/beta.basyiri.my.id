(function() {
	game.player = {};

	var player = game.player;


	player.energy = 100;
	player.active = false;
	player.bubbles = []; // eventually, multitouch?

	var timer, energyMeter;

	player.init = function() {
		energyMeter = document.getElementById('energy');


	};

	player.updateEnergy = function() {
		energyMeter.innerHTML = player.energy;
	}

	player.activate = function(bubble) {
		window.clearInterval(timer);

		timer = setInterval(function() {
			if (player.energy > 0) {
				player.energy -= 1;
				player.updateEnergy();
				bubble.energy += 1;
			}
		}, 1000 * game.config.expend_rate);
	};

	player.deactivate = function() {
		window.clearInterval(timer);

		timer = setInterval(function() {
			if (player.energy < 100) {
				player.energy += 1;
				player.updateEnergy();
			} else {
				window.clearInterval(timer);
				timer = null;
			}
		}, 1000 * game.config.regeneration_rate);
	}



}());