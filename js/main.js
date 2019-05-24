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
var scrollSpeed = 0.1;

//Personagem
var character;
var characterImg;
var lifeImg;

//Tiros
var shoot = new Array(); //Array de Objetos que Grava os Tiros
delayShot = false;

//Recargad de tiros
function Delay(t) {
	setTimeout(
		() => {
			delayShot = false;
		},
		t * 100
	);
}

//Asteroides
var enemmysNumber = 4; // Inimigos no Mapa
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
		this.value = Math.round(Math.random(0, 1))
		this.x = random(width);
		this.y = random(-5, -20);
		this.diameter = random(30, 80);
		this.vSpeed = character.y / 100;
		this.speed = random(1, 3) / this.diameter;
		this.direction = random (-1,1)
	}

	move() {
		this.y += (this.speed) * (canvasSize - character.y)
		this.x +=this.direction / 2
	}

	display() {
		imageMode(CENTER);
		image(asteroidImg, this.x, this.y, this.diameter, this.diameter);

	}

}

class Shoot {
	constructor() {
		this.x = character.x;
		this.y = character.y;
		this.diameter = 10;
		this.speed = 30;
		this.shootColor = "#0055FF"
		console.log("Atirando");
	}

	move() {
		this.y -= this.speed
	}

	display() {
		fill(this.shootColor);
		rect(this.x, this.y, 4, this.diameter);
	}

}

//Classe do Protagonista
class Character {
	constructor() {
		this.life = 100;
		this.shootingSpeed = 5;
		this.x = width / 2;
		this.y = height - 60;
		this.speed = 2;
		this.diameter = 25;
		this.points = 0;
	}

	move() {


		//Controles
		//CIMA
		if (keyIsDown(87) && this.y > 20) {
			this.y -= this.speed / 2;
		}

		else if (keyIsDown(83) && this.y < canvasSize - 20) {
			this.y += this.speed;
		}

		if (keyIsDown(65) && this.x > 20) {
			this.x -= this.speed;
		}

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

}

function objcsUpdate() {

	//------Atualizar Posições dos Objetos

	//-----Personagem
	if (typeof character !== 'undefined') {
		character.move();
		character.display();
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
			console.log(enemmys[i].y)
			enemmys[i].move();
			enemmys[i].display();

			if (enemmys[i].y > canvasSize) {
				enemmys.splice(i, 1);
				i--;
			}
		}
	}

	else {
		for (i = 0; i < enemmysNumber; i++) {
			enemmys.push(new AsteroidN1());
		}
	}

	//HUD
	hudColor = "#39ff14"
	fill(hudColor);
	textSize(14);

	fill(hudColor);
	text("Pontos: " + character.points, width / 2 - 30, height - 30);

	fill(hudColor);
	text("Nível: 1", width - 70, 15);

	noFill()
	stroke(hudColor)
	rect(30, height - 15, 100, 15)
	fill(hudColor)
	rect(30, height - 15, character.life, 15)
	textSize(12);
	fill(255);
	text("Escudo: ", 30, height - 40);
	fill(0)
	text(character.life + "%", 30, height - 10);


	//Sistema de Colisões JOGADOR-IMIGO

	for (i = 0; i < enemmys.length; i++) {
		var a = enemmys[i].x - character.x;
		var b = enemmys[i].y - character.y;
		var c = Math.sqrt((a * a) + (b * b));

		surface = character.diameter + enemmys[i].diameter;
		if (c <= surface / 2) {
			console.log("Dano sofrido");
			character.setLife(-1)

			// document.location.reload()
		}
	}

	//Sistema de Colisões INIMIGO-TIRO (BETA)

	if (enemmys.length !== 0 && shoot.length !== 0) {
		for (i = 0; i < shoot.length; i++) {
			for (j = 0; j < enemmys.length; j++) {

				if (enemmys.length !== 0 && shoot.length !== 0) {
					var xDistance = enemmys[j].x - shoot[i].x;
					var yDistance = enemmys[j].y - shoot[i].y;
					var diagonalDistance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

					surface = shoot[i].diameter + enemmys[j].diameter;
				}
				if (diagonalDistance <= surface / 2) {
					console.log("Acertou um Inimigo");
					character.setPoints(100);
					enemmys.splice(j, 1);
					j--;
					shoot.splice(i, 1)
					i--;
				}
			}

		}
	}
	//----FIM DO CÓDIGO----------
}