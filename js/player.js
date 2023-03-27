class Player {
	constructor(x, y,game) {
		this.game = game;

		this.sprites = {
			jump: {
				img: createImage('assets/jump-toro.png'),
				frames: 4,
				frameIndex: 0,
			},
			runRight: {
				img: createImage('assets/run-toro2.png'),
				frames: 5,
				frameIndex: 0,
			},
			
			calm: {
				img: createImage('assets/calmtoro.png'),
				frames: 6,
				frameIndex: 0,
			},
			charge: {
				img: createImage('assets/cornada.png'),
				frames: 6,
				frameIndex: 0,
			}
		};

		this.currentSprite = this.sprites.runRight

		this.setCotrols();

		this.actions = {
			right: false,
			left: false,
			jump: false,
			charge: false
		}


	
		this.width = 212 * 1;
		this.height = 150 * 1;

		this.y0 = game.height * 0.6;
		this.x0 = game.width * 0.1;

		this.pos = {
			x: this.x0,
			y: this.y0,
		};
		
		this.speed = {
			x: 0,
			y: 0,
		};

		
		
	}

	setCotrols() {
		const { JUMP, CHARGE, LEFT, RIGHT } = this.game.keys;

		addEventListener('keydown', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y && !this.actions.left) {
						this.speed.y = -16;
						this.pos.y -= 1;
						this.actions.jump = true;
						this.sprites.jump.frameIndex = 0
					}
					break;
				
				case RIGHT:
					this.actions.right = true;
					break;
				case LEFT:
					this.actions.left = true;
					break;
				case CHARGE:
					if (!this.actions.charge) {
						this.sprites.charge.frameIndex = 0
						this.actions.charge = true;
						setTimeout(() => {
							this.actions.charge = false;
						}, 200)
					}
					break;				
				}
				
			
		});

		addEventListener('keyup', ({ code }) => {
			switch (code) {
				case RIGHT:
					this.actions.right = false;
					break;
				case LEFT:
					this.actions.left = false;
					break;
		
			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;


		if(this.actions.jump) {
			this.currentSprite = this.sprites.jump
		} else if (this.actions.charge) {
			this.currentSprite = this.sprites.charge
		} else if (this.actions.right){
			this.currentSprite = this.sprites.runRight
		} else this.currentSprite = this.sprites.calm


		this.animateSprite(frameCounter);

		ctx.drawImage(
			this.currentSprite.img,
			this.currentSprite.frameIndex * (this.currentSprite.img.width / this.currentSprite.frames),
			0,
			this.currentSprite.img.width / this.currentSprite.frames,
			this.currentSprite.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

		
	}
	

	

	animateSprite(frameCounter) {
		
		if (frameCounter % 6 === 0) {
			this.currentSprite.frameIndex++;


			// Ha llegado al ultimo frame del sprite
			if (this.currentSprite.frameIndex >= this.currentSprite.frames) {

				// Si esta saltando y va subiendo o si esta saltando y está a una distancia mayor de la altura del toro se queda en el ultimo frame planeando
				if((this.actions.jump && this.speed.y < 0) || this.actions.jump && (this.y0 - this.pos.y) > this.height) {
	
					this.currentSprite.frameIndex = 3
					return 
				} 

				if(this.actions.charge) {

				this.currentSprite.frameIndex = 5
					return;
				}



				this.currentSprite.frameIndex = 0;
			}
		}
	}


	move() {
		const gravity = 0.4;
				
		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.actions.jump = false;
			this.speed.y = 0;
			this.pos.y = this.y0;
			
		}

		

		if(this.actions.jump && this.actions.right && this.pos.x < 400) {
			this.speed.x = 7
		} else if (this.actions.charge && this.pos.x < 400){
			this.speed.x = 50
		} else if (this.actions.charge) {
			this.speed.x = 0
			this.game.velocity= 50
		}else if(this.actions.right && this.pos.x < 400) {
			this.speed.x = 5
		} else if(this.actions.jump && this.actions.right) {
			this.speed.x = 0
			this.game.velocity= 8
		}else if(this.actions.right) {
			this.speed.x = 0
			this.game.velocity = 5
		} else if (this.actions.left && this.pos.x > this.x0) {
			this.speed.x = -5
			this.velocity = 0			
		} else {
			this.speed.x = 0
			this.game.velocity = 0
		}


		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;

	}
}
