(function() {
	var canvas, ctx, width, height;

	game.gfx = {};

	game.gfx.setup = function(in_width, in_height) {
		width = in_width;
		height = in_height;

		canvas = document.getElementById('canvas');
		canvas.width = width;
		canvas.height = height;

		ctx = canvas.getContext('2d');

		return canvas;
	};

	game.gfx.drawBubble = function(x, y, diameter, type, fill, text) {
		if (type == 1) {
			ctx.strokeStyle = '#B9FF73';
			if (fill === true) {
				ctx.fillStyle = '#DFFFBF';
			}
		} else {
			ctx.strokeStyle = '#FF7A4D';
			if (fill === true) {
				ctx.fillStyle = '#FF7A4D';
			}
		}

		ctx.beginPath();
		ctx.arc(x, y,diameter / 2, 0 , 2*Math.PI);
		ctx.stroke();

		if (fill === true) {
			ctx.fill();
		} else {
			ctx.fillStyle = "#555";
			var font = diameter / 5 +"px impact";
			ctx.font = font;

			var width = ctx.measureText(text).width;
			var height = ctx.measureText("_").width;
			ctx.fillText(text, x - (width/2) ,y + (height/2));
		}
	};

	game.gfx.cls = function() {
		ctx.clearRect(0, 0, width, height);
	};
}());