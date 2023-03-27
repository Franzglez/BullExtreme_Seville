const Game = {
	ctx: undefined,
	width: innerWidth,
	height: innerHeight,
	scoreBoard: ScoreBoard,
	velocity: 0,
	fps: 60,
	keys: {
		JUMP: 'Space',
		CHARGE: 'KeyK',
		RIGHT: 'KeyD',
		LEFT: 'KeyA',
		
	},

	init() {
		const canvas = document.querySelector('canvas');

		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		this.setup();
		this.start();
	},

	setup() {
		
		this.player = new Player(0, 0, this);
		this.background = new Background(this);

		this.obstacles = [];

		this.score = 0;

		this.scoreBoard.init(this.ctx);
	},

	start() {
		this.frameCounter = 0;
		this.progress = 1;

		this.frameLastObstacle = 0

		this.animationLoopId = setInterval(() => {
			this.random = Math.random()*10;
			this.clear();

			this.frameCounter++;
			this.score += 0.01;

			if (this.velocity !== 0) {
				this.progress++;
			}
		

			
			if (this.progress % 60 === 0 && this.random > 3) this.generateObstacle();

			

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

		

			if (this.isCollisionCharge()) {
				this.killObstacles();
			}else if( this.isCollision()){
				this.gameOver();
			}

			

			this.clearObstacles();
		}, 1000 / this.fps);
	},

	drawAll() {
		this.background.draw();
		this.obstacles.forEach((obstacle) => {
			obstacle.draw(this.frameCounter);
		});

		

		this.player.draw(this.frameCounter);
	
	},

	moveAll() {
		this.background.move();

		this.obstacles.forEach((obstacle) => {
			obstacle.move();
		});



		this.player.move(this.frameCounter);
	},
	
	
	clearObstacles() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.pos.x + obstacle.width > 0
		);
	},

	killObstacles(){
		

			setTimeout(() => {this.obstacles = this.obstacles.filter(
				(obstacle) => obstacle.pos.x > this.player.pos.x + this.player.width)
				
			}, 300);
	},
	
	isCollisionCharge(){
		return this.obstacles.some(
			(obstacle) => 
				obstacle.img.src.includes('torero') && this.player.actions.charge && 
				this.player.pos.x + this.player.width - 50 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width 		 	
		)

},

	isCollision() {
		return this.obstacles.some(
			(obstacle) =>
		
				this.player.pos.x + this.player.width - 50 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width &&
				this.player.pos.y + this.player.height - 50 > obstacle.pos.y &&
				this.player.pos.y < obstacle.pos.y + obstacle.height
		);
	},

	

	

	generateObstacle() {
		if(Math.random() > .5) {
			this.obstacles.push(new Obstacle(this,1,1.5,'assets/torero-2.png'))
		} else {
			this.obstacles.push(new Obstacle(this,2,1.0,'assets/flamencas.png'))
		}
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?')) this.init();
	},
};
 