/* 
    Equipe: 
    José Rogério da Silva Júnior - Subturma 01C (Líder) 
    Etapa 2
*/

//Cenário
var canvasSize = 512;
var y2 = canvasSize;
var bgImg;
var y1 = 0;
var y2;
var scrollSpeed = 0.03;
var wave = 0

//Bonus
var lifeBonus;

//Personagem
var character;
var characterImg;

//Tiros
var shoot = new Array(); //Array de Objetos que Grava os Tiros
delayShot = false;

//Recarga de tiros
function Delay(t) {
	setTimeout(
		() => {
			delayShot = false;
		},
		t * 100
	);
}

//Asteroides
var enemmysNumber = 10
var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos

//Efeito do Background
function showBg() {
	imageMode(CORNER);
	image(bgImg, 0, -y1, canvasSize, canvasSize);
	image(bgImg, 0, -y2, canvasSize, canvasSize);

	y1 -= scrollSpeed * (canvasSize - character.y)
	y2 -= scrollSpeed * (canvasSize - character.y)

	if (y1 < -canvasSize) {
		y1 = canvasSize;
	}
	if (y2 < -canvasSize) {
		y2 = canvasSize;
	}
}

//Carreganto das Imagens
function preload() {
	characterImg = loadImage("assets/spaceship_small_blue.png");
	bgImg = loadImage("assets/bg.png");
	asteroidImg = loadImage("assets/asteroid.png");
}

//Configuração
function setup() {
	createCanvas(canvasSize, canvasSize);
	//Criando Personagem
	character = new Character();
	lifeBonus = new Lifebonus();
}

function draw() {
	clear();
	background(0)
	showBg();
	objcsUpdate();
}

//Asteroide 
class AsteroidN1 {
	constructor() {
		this.x = random(width);
		this.y = random(-5, -20);
		this.diameter = random(18, 90);
		this.vSpeed = character.y / 100;
		this.speed = random(1, 3) / this.diameter;
		this.direction = random(-1, 1)
	}

	move() {
		this.y += (this.speed) * (canvasSize - character.y)
		this.x += this.direction / 2
	}

	display() {
		imageMode(CENTER);
		image(asteroidImg, this.x, this.y, this.diameter, this.diameter);

	}

}

//Vida Bonus
class Lifebonus {
	constructor() {
		this.x = random(width);
		this.y = random(-5, -20);
		this.vSpeed = character.y / 100;
		this.speed = random(0.5,1)
	}

	
	move() {
		this.y += (this.speed) * (canvasSize - character.y)
	}

	display() {
		fill(255)
		ellipse(this.x, this.y, 50, 50);
	}

}

//Tiro
class Shoot {
	constructor() {
		this.x = character.x;
		this.y = character.y - 30;
		this.diameter = 10;
		this.speed = 8	;
		this.shootColor = "#00FFFF"

		noStroke()
		fill(this.shootColor);
		ellipse(this.x, this.y+8,15, 15);


	}

	move() {
		this.y -= this.speed
	}

	display() {
		noStroke()
		fill(this.shootColor);
		rect(this.x, this.y, 2, this.diameter);
	}

}

//Personagem
class Character {
	constructor() {
		this.life = 100;
		this.shootingSpeed = 2;
		this.x = width / 2;
		this.y = height - 60;
		this.speed = 2;
		this.diameter = 25;
		this.points = 0;
	}

	move() {
		//Controles
		//cima
		if (keyIsDown(87) && this.y > 200) {
			this.y -= this.speed / 2;
		}
		//baixo
		else if (keyIsDown(83) && this.y < canvasSize - 20) {
			this.y += this.speed;
		}
		//desaceleração passiva
		else if(this.y<canvasSize -50){
			this.y += 1;
		}
		//esquerda
		if (keyIsDown(65) && this.x > 20) {
			this.x -= this.speed;
		}
		//direita
		else if (keyIsDown(68) && this.x < canvasSize - 20) {
			this.x += this.speed;
		}

		//Tiro simples
		if (keyIsDown(32) && delayShot === false) {
			shoot.push(new Shoot());
			delayShot = true;
			Delay(character.shootingSpeed);
		}
	}

	display() {
		imageMode(CENTER);
		image(characterImg, character.x, character.y);
	}

	setLife(x) {
		this.life += x;
	}

	setPoints(x) {
		this.points += x;
	}

	die(){
		document.location.reload()
	}

}

function objcsUpdate() {

	///Atualizar Posições dos Objetos

	//Personagem
	if (typeof character !== 'undefined') {
		character.move();
		character.display();
	}

	if (character.life <= 0){
		character.die()
	}

	//---Tiro
	if (shoot.length > 0) {
		for (i = 0; i < shoot.length; i++) {
			shoot[i].move();
			shoot[i].display();

			//Verificar se o Tiro Saiu da Tela e o apaga do Array de objetos
			if (shoot[i].y < 0) {
				shoot.splice(i, 1);
				i--;
			}

		}
	}

	//Atualiza a Posição de Todos os Inimigos

	if (enemmys.length !== 0) {
		for (i = 0; i < enemmys.length; i++) {
			enemmys[i].move();
			enemmys[i].display();

			if (enemmys[i].y > canvasSize) {
				enemmys.splice(i, 1);
				i--;
			}
		}
	} 
	//Passando de onda
	else {
		for (i = 0; i < enemmysNumber; i++) {
			enemmys.push(new AsteroidN1());
		}
		enemmysNumber = enemmysNumber * 1.2
		wave++
		character.setPoints(wave*50)
	}


	if (typeof lifeBonus !== 'undefined') {
	}



	//HUD
	hudColor = "#39ff14"
	fill(hudColor);
	textSize(14);

	fill(hudColor);
	text("Pontos: " + character.points, width / 2 - 30, height - 15);

	fill(hudColor);
	text("Onda: "+ wave, width - 70, 15);

	
	fill(80);
	rect(30, height - 17, 100, 15)
	fill(hudColor)
	rect(30, height - 17, character.life, 15)
	textSize(12);
	fill(255);
	text("HP: ", 30, height - 20);
	fill(0)
	text(character.life + "%", 30, height - 5);


	//Sistema de Colisões JOGADOR-IMIGO

	for (i = 0; i < enemmys.length; i++) {
		var a = enemmys[i].x - character.x;
		var b = enemmys[i].y - character.y;
		var c = Math.sqrt((a * a) + (b * b));

		surface = character.diameter + enemmys[i].diameter;
		if (c <= surface / 2) {
			console.log("Dano sofrido");
			character.setLife(-3)
			if ( enemmys[i].y + enemmys[i].diameter > character.y){
				character.y += 10
			}
		}
	}

	//Sistema de Colisões INIMIGO-TIRO (BETA)

//Destroi Tiro e Asteroide ao colidirem
	function destroyBoth(){
		character.setPoints(100);
		enemmys.splice(j, 1);
		j--;
		shoot.splice(i, 1);
		i--;
	}

	if (enemmys.length !== 0 && shoot.length !== 0) {
		for (i = 0; i < shoot.length; i++) {
			for (j = 0; j < enemmys.length; j++) {

				if (enemmys[j] !== undefined && shoot[i] !== undefined) {
					var xDistance = enemmys[j].x - shoot[i].x;
					var yDistance = enemmys[j].y - shoot[i].y;
					var diagonalDistance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
					surface = shoot[i].diameter + enemmys[j].diameter;
				}
				if (diagonalDistance <= surface / 2) {
					destroyBoth();
					break
				}
			}

		}
	}
	//----FIM DO CÓDIGO----------
}