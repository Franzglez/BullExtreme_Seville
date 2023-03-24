// class Enemigo {
// 	constructor(game) {
// 		this.width = game.player.width / 2;
// 		this.height = game.player.height * 1.5;

// 		this.pos = {
// 			x: game.width,
// 			y: game.player.y0 + game.player.height - this.height,
// 		};

// 		this.game = game;

// 		this.img = new Image();
// 		this.img.src = 'assets/torero-2.png';

// 		this.img.currentFrame = 0;
// 		this.img.frameCount = 3;

// 	}

// 	draw(frameCounter) {
// 		const { ctx } = this.game;

// 		this.animateSprite(frameCounter);

// 		ctx.drawImage(
// 			this.img,
// 			this.img.currentFrame * (this.img.width / this.img.frameCount),
// 			0,
// 			this.img.width / this.img.frameCount,
// 			this.img.height,
// 			this.pos.x,
// 			this.pos.y,
// 			this.width,
// 			this.height
// 		);
// 		}
// 	move() {
// 		this.pos.x -= this.game.velocity;
// 	}
// 	animateSprite(frameCounter) {
// 		if (frameCounter % 6 === 0) {
// 			this.img.currentFrame++;

// 			if (this.img.currentFrame === this.img.frameCount) {
// 				this.img.currentFrame = 0;
// 			}
// 		}
// 	}
// }