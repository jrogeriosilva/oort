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
var scrollSpeed = 0.0005;
var wave = 0;
var explosionImg = [];
var explosion
var explosionFrame = 0
var cont = 0


//Bonus
var lifeBonus;
var shootSpeedbonus

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
var enemmysNumber = 1
var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos

//Efeito do Background
function showBg() {
	imageMode(CORNER);
	image(bgImg, 0, -y1, canvasSize, canvasSize);
	image(bgImg, 0, -y2, canvasSize, canvasSize);

	y1 -= scrollSpeed * canvasSize
	y2 -= scrollSpeed * canvasSize

	if (y1 < -canvasSize) {
		y1 = canvasSize;
	}
	if (y2 < -canvasSize) {
		y2 = canvasSize;
	}
}

//Carreganto das Imagens
function preload() {
	characterImg = []
	for (i=0; i < 8; i++){
		characterImg[i] = loadImage("assets/character/redfighter_"+i+".png");
	}

	for (i=0; i < 10; i++){
		explosionImg[i] = loadImage("assets/explosion/bubble_explo"+i+".png");
	}
	
	bgImg = loadImage("assets/bg.png");
	asteroidImg = loadImage("assets/asteroid.png");
}

//Configuração
function setup() {
	createCanvas(canvasSize, canvasSize);
	//Criando Personagem
	character = new Character();
	frame = 0
}

function draw() {
	clear();
	background(0)
	showBg();
	objcsUpdate();
	explosionUpdate();
}

//Explosão
class Explosion {
	constructor(x,y,diameter) {
		this.x = x;
		this.y = y;
		this.diameter = diameter
	}

	display(){
		if (explosionFrame >= 2){
			image(explosionImg[cont],this.x, this.y, this.diameter * 2, this.diameter * 2)
			cont++
			explosionFrame = 0
		}

	}
}

//Asteroide 
class AsteroidN1 {
	constructor() {
		this.x = random(width);
		this.y = random(0, 1);
		this.diameter = random(15, 80);
		this.speed = random(150, 180) / this.diameter;
		this.direction = random(-1, 1)
	}

	move() {
		this.y += this.speed
		this.x += this.direction
	}

	display() {
		imageMode(CENTER);
		image(asteroidImg, this.x, this.y, this.diameter, this.diameter);

	}

}
//BONUS
//Vida Bonus
class Lifebonus {
	constructor(x,y) {
		this.x = x
		this.y = y
		this.vSpeed = character.y / 100;
		this.speed = 0.008
	}

	
	move() {
		this.y += (this.speed) * (canvasSize - character.y)
	}

	display() {
		fill(100,255,100)
		ellipse(this.x, this.y, 25, 25);
		fill(0)
		text("HP", this.x-7, this.y+5)
	}

	

	checkCollect(){

			var a = lifeBonus.x - character.x;
			var b = lifeBonus.y - character.y;
			var c = Math.sqrt((a * a) + (b * b));
	
			if (c <= 20) {
				character.setLife(10)
				lifeBonus = undefined
			}		
		
	}

}

class Shootspeedbonus {
	constructor(x,y) {
		this.x = x
		this.y = y
		this.vSpeed = character.y / 100;
		this.speed = 0.008
	}

	
	move() {
		this.y += (this.speed) * (canvasSize - character.y)
	}

	display() {
		fill(100,255,100)
		ellipse(this.x, this.y, 25, 25);
		fill(0)
		text("S", this.x-7, this.y+5)
	}

	

	checkCollect(){

			var a = this.x - character.x;
			var b = this.y - character.y;
			var c = Math.sqrt((a * a) + (b * b));
	
			if (c <= 20) {
				character.setShootspeed(-0.0002)
				character.upgrade += 1
				shootSpeedbonus = undefined
			}		
		
	}

}


//Tiro
class Shoot {
	constructor(x,y, d) {
		this.d = d
		this.x = character.x + x;
		this.y = character.y - 20 + y;
		this.diameter = 10;
		this.speed = 10	;
		this.shootColor = "#00FFFF"

		noStroke()
		fill(this.shootColor);
		ellipse(this.x, this.y, 8, 8);


	}

	move() {
		this.y -= this.speed
		this.x += this.y / 800 * this.d
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
		this.shootingSpeed = 5.5;
		this.x = width / 2;
		this.y = height - 60;
		this.speed = 4;
		this.diameter = 80;
		this.points = 0;
		this.upgrade = 1
	}

	move() {
		//Controles
		//cima
		if (keyIsDown(87) && this.y > 200) {
			this.y -= this.speed;
		}
		//baixo
		else if (keyIsDown(83) && this.y < canvasSize - 20) {
			this.y += this.speed;
		}
		//desaceleração passiva
		// else if(this.y<canvasSize -50){
		// 	this.y += 1;
		// }
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
			// shoot.push(new Shoot(-8,5));//Cria um tiro e o insere no array de tiros. O valor apos o Shoot referece ao aliamento
			// shoot.push(new Shoot(+6,5))

			for (i= 0; i < character.upgrade; i++){
				shoot.push(new Shoot(-8/1+i - (i*8),5 + (i*15),-1))
				shoot.push(new Shoot(6/1+i + (i*8),5 + (i*15),1))
			}

			delayShot = true;
			Delay(character.shootingSpeed);
		}
	}

	display() {
		imageMode(CENTER);
		if (keyIsDown(65)){
			image(characterImg[0], character.x, character.y,character.diameter,character.diameter);
		}
		else if (keyIsDown(68)) {
			image(characterImg[1], character.x, character.y,character.diameter,character.diameter);
		  }
		else {
			image(characterImg[4], character.x, character.y,character.diameter,character.diameter);
		}
	}

	setLife(x) {
		this.life += x;
	}

	setPoints(x) {
		this.points += x;
	}

	setShootspeed(x) {
		this.shootingSpeed += x;
	}

	die(){
		document.location.reload()
	}

}

function explosionUpdate(){
	if (typeof explosion !== 'undefined') {
		explosion.display()
		explosionFrame++
	}
}



function objcsUpdate() {

	///Atualizar Posições dos Objetos

	//Personagem
	if (typeof character !== 'undefined') {
		character.move();
		character.display();

		if (character.y > canvasSize - 10){
			character.y -= 20
		}
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

	if (enemmys.length > enemmysNumber) {
		for (i = 0; i < enemmys.length; i++) {
			enemmys[i].move();
			enemmys[i].display();

			if (enemmys[i].y > canvasSize) {
				enemmys.splice(i, 1);
				i--;
			}
		}
	} 

		//Personagem

	//Passando de onda
	else {
		for (i = 0; i < enemmysNumber; i++) {
			enemmys.push(new AsteroidN1());
		}
		enemmysNumber = enemmysNumber * 1.02
		wave++
		character.setPoints(wave*50)
	}

	//Atualizando Posição dos Bonus
	if (typeof lifeBonus !== 'undefined') {
		lifeBonus.move();
		lifeBonus.display();
	}

	if (typeof shootSpeedbonus !== 'undefined') {
		shootSpeedbonus.move();
		shootSpeedbonus.display();
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
		if (c <= surface / 3) {
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
		if (random(1,100) <= 20 && lifeBonus == undefined) {
			lifeBonus = new Lifebonus(enemmys[j].x,enemmys[j].y);
		}
		else if (random(1,100) <= 80 && shootSpeedbonus == undefined){
			shootSpeedbonus = new Shootspeedbonus(enemmys[j].x,enemmys[j].y);
		}
		
		explosion = new Explosion(enemmys[j].x, enemmys[j].y, enemmys[j].diameter);

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

	if (typeof lifeBonus !== 'undefined'){
		lifeBonus.checkCollect()
	}
	if (typeof lifeBonus !== 'undefined') {
		if (lifeBonus.y > canvasSize){
			lifeBonus = undefined
		}
	}


	if (typeof shootSpeedbonus !== 'undefined'){
		shootSpeedbonus.checkCollect()
	}
	if (typeof shootSpeedbonus !== 'undefined') {
		if (shootSpeedbonus.y > canvasSize){
			shootSpeedbonus = undefined
		}
	}

}