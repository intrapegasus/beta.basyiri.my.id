var game = {};


(function() {
	game.config = Object.freeze({
		numbubbles: 4,
		spring: 0.35,
		friction: -0.5,
		maxVelocity: 15,
		minVelocity: 0.1,
		regeneration_rate: 0.10,
		expend_rate: 0.025

	});

	game.width = 640;
	game.height = 480;
	game.bubbles = [];

	var canvas,
		mouseX = null,
		mouseY = null,
		paused;

	game.init = function() {
		canvas = game.gfx.setup(game.width, game.height);

		for (var i = 0; i < game.config.numbubbles; i++) {
			game.bubbles[i] = Object.create(game.bubble);
			game.bubbles[i].create(
				i,
				Math.floor(Math.random() * game.width),
				Math.floor(Math.random() * game.height),
				80
			);
		}

		game.player.init();

		setInterval(function() {
			game.draw();
		}, 25);

		function getMousePos(ev) {
			var rect = canvas.getBoundingClientRect();

			return {
				x: ev.clientX - rect.left,
				y: ev.clientY - rect.top
			};
		}

		canvas.addEventListener('mousedown', function(ev) {
			var mouse = getMousePos(ev);
        	mouseX = mouse.x;
        	mouseY = mouse.y;
		}, false);

		function releaseTrigger(ev) {
			var mouse = getMousePos(ev);

			if (paused !== null) {
				var bubble = game.bubbles[paused];

				//this calc is to continue in the same velocity
				//bubble.velocity.x = -(bubble.x - mouse.x) / Math.abs(bubble.x - mouse.x);
				//bubble.velocity.y = -(bubble.y - mouse.y) / Math.abs(bubble.y - mouse.y);

				//below is to go in the direction you swipe
				var dx = bubble.x - mouse.x,
					dy = bubble.y - mouse.y;

				var angle = Math.atan2(dy, dx),
					targetX = bubble.x + Math.cos(angle) * (bubble.diameter + bubble.energy) / 2 + 1 / 2,
					targetY = bubble.y + Math.sin(angle) * (bubble.diameter + bubble.energy) / 2 + 1 / 2,
					ax = (targetX - mouse.x) * game.config.spring / 10,
					ay = (targetY - mouse.y) * game.config.spring / 10;

				bubble.velocity.x = ax;
				bubble.velocity.y = ay;

				bubble.unpause();
			}
			paused = null;
			game.player.deactivate();
		}

		canvas.addEventListener('mouseup', releaseTrigger);
		canvas.addEventListener('mouseout', releaseTrigger);
	};

	game.draw = function() {
		game.gfx.cls();

		for (var i = 0; i < game.bubbles.length; i++) {
			if (game.bubbles[i]) {
				game.bubbles[i].collide();
				game.bubbles[i].move();
				game.bubbles[i].render();

				if (mouseX && mouseY) {
					var clicked = game.bubbles[i].clicked(mouseX, mouseY);

					if (clicked) {
						mouseX = null;
						mouseY = null;
						paused = i;
						game.player.activate(game.bubbles[i]);
					}
				}
			}
		}
	};
}());

window.onload = game.init;