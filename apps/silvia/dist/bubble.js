(function() {
	function constrainVelocity(velocity) {
		if (velocity === 0) return 0;

		if (Math.abs(velocity) > game.config.maxVelocity) {
			velocity = Math.abs(velocity) / velocity * game.config.maxVelocity;
		} else if (Math.abs(velocity) < game.config.minVelocity) {
			velocity = Math.abs(velocity) / velocity * game.config.minVelocity;
		}

		return velocity;
	}

	game.bubble = {
		id: null,
		x: null,
		y: null,
		diameter: null,
		paused: false,
		energy: 1,
		power: 100,
		velocity: {},

		create: function(id, x, y, diameter) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.diameter = diameter;

			this.velocity = Object.create({
				x: 0,
				y: 0
			});

			this.type = id % 2 === 1;
		},

		clicked: function(x, y) {
			var dx = this.x - x,
				dy = this.y - y,
				distance = Math.sqrt(dx*dx + dy*dy);

			if (distance < this.diameter / 2) {
				this.paused = true;
			} else {
				this.paused = false;
			}

			return this.paused;
		},

		destroy: function() {
			delete game.bubbles[this.id];
		},

		collide: function() {
			for (var i = this.id + 1; i < game.bubbles.length; i++) {
				if (!game.bubbles[i]) continue;

				var dx = game.bubbles[i].x - this.x,
					dy = game.bubbles[i].y - this.y,
					distance = Math.sqrt(dx*dx + dy*dy),
					minDist = (game.bubbles[i].diameter - game.bubbles[i].energy) / 2 + (this.diameter - this.energy) / 2;

				var spring = game.config.spring,
					bubbles = game.bubbles;

				if (distance <= minDist) {
					var angle = Math.atan2(dy, dx),
						targetX = this.x + Math.cos(angle) * minDist,
						targetY = this.y + Math.sin(angle) * minDist,
						ax = (targetX - game.bubbles[i].x) * spring,
						ay = (targetY - game.bubbles[i].y) * spring;

					this.velocity.x -= ax;
					this.velocity.y -= ay;

					this.velocity.x = constrainVelocity(this.velocity.x);
					this.velocity.y = constrainVelocity(this.velocity.y);

					if (bubbles[i].paused !== true) {
						bubbles[i].velocity.x += ax;
						bubbles[i].velocity.y += ay;

						bubbles[i].velocity.x = constrainVelocity(bubbles[i].velocity.x);
						bubbles[i].velocity.y = constrainVelocity(bubbles[i].velocity.y);
					}


					if (this.energy > 1 && bubbles[i].energy <= 1 && !this.paused) {
						bubbles[i].power = Math.floor(bubbles[i].power - this.energy / 2);
						if (bubbles[i].power <= 0) bubbles[i].destroy();
					} else if (this.energy <= 1 && bubbles[i].energy > 1 && !bubbles[i].paused) {
						this.power = Math.floor(this.power - bubbles[i].energy / 2);
						if (this.power <= 0) this.destroy();
					}
				}
			}
		},

		paused: function() {
			this.paused = true;
		},

		unpause: function() {
			this.paused = false;
		},

		move: function() {
			if (this.paused === true) return;

			var radius = (this.diameter - this.energy) / 2;

			//console.log(this.velocity.x + ' ' + this.velocity.x / this.velocity.x * (this.energy / 10));

			this.x += constrainVelocity(this.velocity.x * (this.energy <= 1 ? 1 : 1 + (this.energy / 2)));
			this.y += constrainVelocity(this.velocity.y * (this.energy <= 1 ? 1 : 1 + (this.energy / 2)));



			if ((this.x + radius) > game.width) {
				this.x = game.width - radius;
				this.velocity.x = this.velocity.x * game.config.friction;
			} else if ((this.x - radius) < 0) {
				this.x = radius;
				this.velocity.x = this.velocity.x * game.config.friction;
			}

			if ((this.y + radius) > game.height) {
				this.y = game.height - radius;
				this.velocity.y = this.velocity.y * game.config.friction;
			} else if ((this.y - radius) < 0) {
				this.y = radius;
				this.velocity.y = this.velocity.y * game.config.friction;
			}

			if (this.energy > 1) {
				this.energy -= 0.75;
				if (this.energy < 1) this.energy = 1;
			} else {
				//this.velocity.x *= 0.95
				//this.velocity.y *= 0.95
			}

		},

		render: function() {
			game.gfx.drawBubble(
				this.x,
				this.y,
				this.diameter - this.energy,
				this.type,
				this.paused ? this.paused : this.energy > 1,
				this.power
			);
		}
	}

}());