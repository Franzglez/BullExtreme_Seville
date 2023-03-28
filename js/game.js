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

		canvas.style.display =  'block';
		canvas.width = this.width;
		canvas.height = this.height;

		this.bso = new Audio('assets/pasodoble.mp3');
		this.bso1 = new Audio('assets/ole-aplausos.mp3');
		this.bso2 = new Audio('assets/cambiodetercio.mp3');
		


		this.ctx = canvas.getContext('2d');

		this.setup();
		this.start();
		

		
		this.bso.play();

	


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

		this.frameLastObstacle = 0;
		

		this.animationLoopId = setInterval(() => {
			this.random = Math.random()*10;
			this.clear();

			this.bso1.play();
			
			

			this.frameCounter++;
			this.score += 0.01;

			if (this.velocity !== 0) {
				this.progress++;
			}
		

			
			if (this.progress % 60 === 0 && this.random > 6) this.generateObstacle();

			

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

			this.isCollisionCharge()

			if( this.isCollision()){
				this.gameOver();
			
			}
			

			if(this.progress > 1000) {
				this.bso1.pause();
				this.bso2.play();
				this.player.showMuscles();
				this.obstacles = [];
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

	
	
	isCollisionCharge(){
		return this.obstacles.some(
			(obstacle) => {

				const isCollision = obstacle.img.src.includes('torero') && this.player.actions.charge && 
				this.player.pos.x + this.player.width - 50 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width

				if(isCollision) {
					this.obstacles = this.obstacles.filter((o) => o !== obstacle)
				}


				return isCollision 		 	

			}
		)

},

	isCollision() {
		return this.obstacles.some(
			(obstacle) =>
		
				this.player.pos.x + this.player.width - 80 > obstacle.pos.x &&
				this.player.pos.x < obstacle.pos.x + obstacle.width &&
				this.player.pos.y + this.player.height - 80 > obstacle.pos.y &&
				this.player.pos.y < obstacle.pos.y + obstacle.height
		);
	},

	

	

	generateObstacle() {


		let newObstacle;
		let isFirst = false
		let isFlamencaTheLast = false

		if(!this.obstacles.length) {
			isFirst = true
		} else {
			isFlamencaTheLast = this.obstacles[this.obstacles.length - 1].img.src.includes('flamencas')

		}

		if(Math.random() > .5) {
			newObstacle = new Obstacle(this,1,1.5,'assets/torero-2.png')
		} else {
			newObstacle = new Obstacle(this,2,1.2,'assets/flamencas.png')
		}


		if (isFlamencaTheLast) {
			newObstacle.pos.x += 400
		} else {

			if(!isFirst && newObstacle.pos.x - this.obstacles[this.obstacles.length - 1].pos.x < 350) {
				return
			}
		}

		
				
			
			
		this.obstacles.push(newObstacle)
		
			
		
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	win() {
		this.bso1.pause();
		clearInterval(this.animationLoopId);
		if (confirm('¿Volver a empezar?')) this.init();
	},

	gameOver() {
		this.bso1.pause();
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?')) this.init();
	},
};
 