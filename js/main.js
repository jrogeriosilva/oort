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
var scrollSpeed = 0.006;
var wave = 0;
var explosion = [];
var frame = 0

var explosionImg = [];

//Bonus
var lifeBonus;
var laserSpeedbonus

//Personagem
var character;
var characterImg;
var cannon = 0

var hud;

//Tiros
var laserSound;
var laser = new Array(); //Array de Objetos que Grava os Tiros
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
	explosionSound = loadSound("assets/sounds/explosion.mp3")
	laserSound = loadSound("assets/sounds/laser1.mp3");
	characterImg = loadImage("assets/spaceship_small_blue.png");
	bgImg = loadImage("assets/bg.png");
	asteroidImg = loadImage("assets/asteroid.png");
	// plasma = loadImage("assets/plasma.png");

	for(i = 0; i < 90; i++){
		explosionImg[i] = loadImage("assets/explosion/explo"+ i +".png");
	}
//Sons
	
}

//Configuração
function setup() {
	createCanvas(canvasSize, canvasSize);
	
	//Criando Personagem
	character = new Character();
	hud = new Hud();
}

function draw() {
	clear();
	background(0)
	showBg();
	hud.update();
	hud.showAll();
	objcsUpdate();
	if (explosion.length > 0){
		for (i = 0; i < explosion.length; i++)
		explosion[i].updateExplosion()
	}
	frame++
}
//HUD
class Hud{
	constructor(){
		this.color = "#42a1f4"
	}

	update(){
		this.points = character.points
		this.hp = character.hp
		this.wave = wave
	}

	showWave(){
		fill(this.color);
		textSize(14);
		text("Dificuldade: "+ this.wave, width - 120, 15);
	}

	showWeapon(){
		fill(this.color);
		textSize(14);
		text("Gatling Laser LV "+ character.weaponLv, width - 150, height - 10);
	}

	showPoints(){
		fill(this.color);
		textSize(14);
		text("Pontos: " + this.points, width / 2 - 30, 15);
	}

	showHpbar(){
		fill(this.color)
		rect(30, height - 17, this.hp, 15)
		textSize(12);
		fill(255);
		text("HP: ", 30, height - 20);
		fill(0)
		text(this.hp + "%", 30, height - 5);
	}
	

	
	showAll(){
		this.showWave();
		this.showPoints();
		this.showHpbar();
		this.showWeapon();
	}
}

//Asteroide 
class AsteroidN1 {
	constructor(xo,yo,diameter) {
		this.x = xo
		this.y = yo
		this.diameter = diameter
		this.vSpeed = character.y / 100;
		this.speed = random(1, 2) / this.diameter;
		this.direction = random(-3, 3)
	}

	move() {
		this.y += (this.speed) * (canvasSize - character.y) + wave/100
		this.x += this.direction / 2
	}

	display() {
		imageMode(CENTER);
		image(asteroidImg, this.x, this.y, this.diameter, this.diameter);

	}

}


//Explosão
class Explosion {
	constructor(x,y,diameter) {
		this.x = x;
		this.y = y;
		this.diameter = diameter
		this.explosionFrame = 0
	}

	updateExplosion(){
		
			image(explosionImg[this.explosionFrame],this.x, this.y, this.diameter * 2, this.diameter * 2)
			this.explosionFrame++
			if (this.explosionFrame >= explosionImg.length){
				explosion.splice(i, 1);
				i--;
			}


	}
}

//BONUS
//Vida Bonus
class Lifebonus {
	constructor(x,y) {
		this.x = x
		this.y = y
		this.speed = 0.003
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
		
		this.distance = dist(this.x,this.y, character.x,character.y)
		if (this.distance <= 20) {
			character.setLife(10)
			if (character.life > 100){
					character.life = 100
			}
			lifeBonus = undefined
		}


		
	}

}

class Laserspeedbonus {
	constructor(x,y) {
		this.x = x
		this.y = y
		this.speed = 0.003
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

		this.distance = dist(this.x,this.y, character.x,character.y)
		if (this.distance <= 20) {
		character.laserSpeed -= 0.2;
		character.weaponLv += 1
			if (character.laserSpeed < 2){
				character.weaponLv = 10
				character.laserSpeed = 3
			}
			laserSpeedbonus = undefined
		}
		
	}

}


//Tiro
class Laser {
	constructor(x) {
		this.x = character.x + x
		this.y = character.y - 15;
		this.diameter = 10;
		this.speed = 5	;
		this.laserColor = "#00FFFF"

		noStroke()
		fill(this.laserColor);
		ellipse(this.x, this.y, 20,20);
		ellipse(this.x, this.y, 10,10);

		laserSound.play();
	}

	move() {
		this.y -= this.speed
	}

	display() {
		noStroke()
		fill(this.laserColor);
		rect(this.x, this.y, 2, this.diameter);
	}

}

//Personagem
class Character {
	constructor() {
		this.x = width / 2;
		this.y = height - 60;
		this.diameter = 25;
		this.points = 0;
		this.hp = 100;
		this.speed = 5;
		this.laserSpeed = 4;
		this.weaponLv = 1
	}

	move() {
		//Controles
		//cima
		if (keyIsDown(87) && this.y > 200) {
			this.y -= this.speed / (canvasSize-character.y)*20;
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
		if (keyIsDown(32) && delayShot === false && cannon == 0) {
			laser.push(new Laser(-6))
			cannon = 1
			delayShot = true;
			Delay(character.laserSpeed);
		}

		if (keyIsDown(32) && delayShot === false && cannon == 1) {
			laser.push(new Laser(+5))

			cannon = 0
			delayShot = true;
			Delay(character.laserSpeed);
		}

	}

	display() {
		imageMode(CENTER);
		image(characterImg, character.x, character.y);
	}

	setLife(x) {
		if (x < 0 || this.hp < 100)
		this.hp += Math.round(x);
	}

	setPoints(x) {
		this.points += x;
	}

	setLaserspeed(x) {
		this.laserSpeed += x;
	}

	die(){

		// explosion.push(new Explosion(character.x, character.y, 50,50))

		document.location.reload()
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

	if (character.hp <= 0){
		character.die()
	}

	//---Tiro
	if (laser.length > 0) {
		for (i = 0; i < laser.length; i++) {
			laser[i].move();
			laser[i].display();

			//Verificar se o Tiro Saiu da Tela e o apaga do Array de objetos
			if (laser[i].y < 0) {
				laser.splice(i, 1);
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
			xo = random(5,canvasSize)
			yo = random(-5, -400)
			diameter = random(10,100)
			enemmys.push(new AsteroidN1(xo,yo,diameter));
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

	if (typeof laserSpeedbonus !== 'undefined') {
		laserSpeedbonus.move();
		laserSpeedbonus.display();
	}
	//Sistema de Colisões JOGADOR-IMIGO

	for (i = 0; i < enemmys.length; i++) {
		var a = enemmys[i].x - character.x;
		var b = enemmys[i].y - character.y;
		var c = Math.sqrt((a * a) + (b * b));

		surface = character.diameter + enemmys[i].diameter;
		if (c <= surface / 2) {
			console.log("Dano sofrido");
			character.setLife(- enemmys[i].speed * enemmys[i].diameter * 8)
			if ( enemmys[i].y + enemmys[i].diameter > character.y){
				character.y += enemmys[i].speed * enemmys[i].diameter * 8


				if (enemmys[i].diameter >= 50){
					xo = enemmys[i].x
					yo = enemmys[i].y
					diameter = enemmys[i].diameter / 2
					enemmys.push(new AsteroidN1(xo,yo,diameter))
					enemmys.push(new AsteroidN1(xo,yo,diameter))
				}
				
				explosion.push(new Explosion(enemmys[i].x, enemmys[i].y, enemmys[i].diameter))
				explosionSound.rate(100/enemmys[i].diameter)
				explosionSound.play();
		
				enemmys.splice(i, 1);
				i--;
			}
		}
	}

	//Sistema de Colisões INIMIGO-TIRO (BETA)

//Destroi Tiro e Asteroide ao colidirem
	function destroyBoth(){
		if (enemmys[j].diameter >= 50){
			xo = enemmys[j].x
			yo = enemmys[j].y
			diameter = enemmys[j].diameter / 2
			enemmys.push(new AsteroidN1(xo,yo,diameter))
			enemmys.push(new AsteroidN1(xo,yo,diameter))
		}

		if (random(1,100) <= 20 && lifeBonus == undefined) {
			lifeBonus = new Lifebonus(enemmys[j].x,enemmys[j].y);
		}
		else if (random(1,100) <= 80 && laserSpeedbonus == undefined){
			laserSpeedbonus = new Laserspeedbonus(enemmys[j].x,enemmys[j].y);
		}
		explosion.push(new Explosion(enemmys[j].x, enemmys[j].y, enemmys[j].diameter))
		
		
		character.setPoints(Math.round(enemmys[j].diameter*10));
		enemmys.splice(j, 1);
		j--;
		laser.splice(i, 1);
		i--;
	}

	if (enemmys.length !== 0 && laser.length !== 0) {
		for (i = 0; i < laser.length; i++) {
			for (j = 0; j < enemmys.length; j++) {

				if (enemmys[j] !== undefined && laser[i] !== undefined) {
					var xDistance = enemmys[j].x - laser[i].x;
					var yDistance = enemmys[j].y - laser[i].y;
					var diagonalDistance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
					surface = laser[i].diameter + enemmys[j].diameter;
				}
				if (diagonalDistance <= surface / 2) {
					explosionSound.rate(100/enemmys[j].diameter)
					explosionSound.play();
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


	if (typeof laserSpeedbonus !== 'undefined'){
		laserSpeedbonus.checkCollect()
	}
	if (typeof laserSpeedbonus !== 'undefined') {
		if (laserSpeedbonus.y > canvasSize){
			laserSpeedbonus = undefined
		}
	}

}