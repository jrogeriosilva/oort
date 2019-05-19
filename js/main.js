/* 
	Equipe: 
	José Rogério da Silva Júnior - Subturma 01C (Líder) 
	Etapa 2
*/

//Cenário

//BG
var bgImg;
var y1 = 0;
var y2;
var scrollSpeed = 0.1;

//---Background
function showBg(){
	imageMode(CORNER);
	image(bgImg, 0, -y1, canvasSize, canvasSize);
	image(bgImg, 0, -y2, canvasSize, canvasSize);

	y1 -= scrollSpeed * (canvasSize - character.y)
	y2 -= scrollSpeed * (canvasSize - character.y)

	if (y1 < -canvasSize){
		y1 = canvasSize;
	}
	if (y2 < -canvasSize){
		y2 = canvasSize;
	}
}

var canvasSize = 512;
var imgLife;

var character;
var imgCharacter;
function preload() {

	// imgCharacter = loadImage("assets/spaceship_small_blue.png");
	// imgLife = loadImage("assets/heart.png");
	// bgImg = loadImage("assets/bg.png");

}
var shoot = new Array(); //Array de Objetos que Grava os Tiros
delayShot = false;

var summon; //Objeto de Invocação
var enemmyNumber = 8; // Inimigos no Mapa
var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos

function setup() {
	createCanvas(canvasSize, canvasSize);
	y2 = canvasSize;
//Personagem
character = new Character();

//Inimigos
for (i = 0; i < enemmyNumber; i++) {
	enemmys.push(new EnemmyN1());
}

//Invocação  
summon = new summonEnemmy();

//FIM DA CONFIGURAÇAO
}

function draw() {
	clear();
	// showBg();
	objcsUpdate();
}

//Cooldown
function Delay(t) {
	setTimeout(
		() => {
			delayShot = false;
		},
		t * 100
		);
}

//EnemmyN1 
class EnemmyN1 {
	constructor() {
		this.x = random(width);
		this.y = random(-2000, 5);
		this.diameter = random(20, 50);
		this.vSpeed = character.y / 100;
		this.speed = random(10, 15) / this.diameter;
		
	}

	move() {
		this.x += random(1);
		this.y += this.speed * 8
		summon.positionTest();
	}

	display() {
		fill(200, 0, 0);
		ellipseMode(CENTER)
		ellipse(this.x, this.y, this.diameter, this.diameter);
		fill(0)
		textSize(12);
		text('1', this.x, this.y+5);
		
	}
}

//Classe de Muniçao
class ammoNv1 {
	constructor() {
		this.x = random(width);
		this.y = 5;
		this.diameter = random(15, 20);
		this.speed = 2;
	}

	move() {
		this.x += random(0.05 * this.y, -0.05 * this.y);
		this.y += 2.5 + random(-5, 1);
		summon.positionTest();
	}

	display() {
		ellipse(this.x, this.y, this.diameter, this.diameter);
		fill(0, 150, 200);
	}
}

//IMPLEMENTANDO PARA FUNCIONAR COM O ARRAY
class summonEnemmy {

	positionTest() {
		// for (i = 0; enemmys[i]< enemmys.length; i++){
		// 	if (enemmys.y >= canvasSize){
		// 		console.log(enemmys[i]+ 'Saiu')
		// 	}
		// }
	}

}

class Shoot {
	constructor() {
		this.x = character.x;
		this.y = character.y;
		this.diameter = 15;
		this.speed = 5;
	}

	move() {
		this.y -= this.speed;
	}

	display() {
		fill(255)
		ellipse(this.x, this.y, this.diameter, this.diameter)
		textAlign(CENTER)
		textSize(12);
		fill(0, 0, 0);
		text('1', this.x, this.y+5);
	}

}

//Classe do Protagonista
class Character {
	constructor() {
		this.life = 1;
		this.shootingSpeed = 7;
		this.x = width / 2;
		this.y = height - 60;
		this.speed = 3;
		this.diameter = 15;
		this.points = 0;
	}

	move() {


//Controles
//CIMA
if (keyIsDown(87) && this.y > 20) {
	this.y -= this.speed;
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
		// imageMode(CENTER);
		// image(imgCharacter, character.x, character.y);
	// rectMode(CENTER);
	fill(255, 255, 255);
	ellipse(this.x, this.y, this.diameter, this.diameter)
	fill(0)
	textAlign(CENTER)
	textSize(12);
	text('1', this.x, this.y+5);

}

setLife(x){
	this.life += x;
}

setPoints(x){
	this.points += x;
}

}

function objcsUpdate() {

//------Atualizar Posições dos Objetos
//-----Bonus
if (typeof ammo !== 'undefined') {
	ammo.move();
	ammo.display();
}

//-----Personagem
if (typeof character !== 'undefined') {
	character.move();
	character.display();
}
//---Tiro
if (typeof shoot !== 'undefined' && shoot.length > 0) {
	for (i = 0; i < shoot.length; i++) {
		shoot[i].move();
		shoot[i].display();

		//Verificar se o Tiro Saiu da Tela e o apaga do Array de objetos
		if (shoot[i].y < 0){
			shoot.splice(i, 1); 
			i--;		
		}

	}
}

//Atualiza a Posição de Todos os Inimigos
if (typeof enemmys !== 'undefined') {
	for (i = 0; i < enemmys.length; i++) {
		enemmys[i].move();
		enemmys[i].display();
	}
}

//HUD
fill(255, 255, 255);
textFont('Helvetica');
textSize(14);

fill(0, 0, 0);
text("Pontos: "+ character.points, width / 2 - 30, 15);

fill(0, 0, 0);
text("Nível: 1", width - 70, 15);


imageMode(CENTER);
textSize(14);
fill(0, 0, 0);
text("Bits", 30, height - 40);
text(character.life, 30, height - 20);



//Sistema de Colisões JOGADOR-IMIGO

for(i=0;i < enemmys.length; i++){
	var a = enemmys[i].x - character.x;
	var b = enemmys[i].y - character.y;
	var c = Math.sqrt((a*a) + (b*b));

	surface = character.diameter + enemmys[i].diameter;
	if (c <= surface/2) {
		console.log ("Game Over");
		document.location.reload()
	}
}

//Sistema de Colisões INIMIGO-TIRO (BETA)

for(i=0;i < shoot.length; i++){
	for (j=0; j < enemmys.length; j++){

		var xDistance = enemmys[j].x - shoot[i].x;
		var yDistance = enemmys[j].y - shoot[i].y;
		var diagonalDistance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));

		surface = shoot[i].diameter + enemmys[j].diameter;
		if (diagonalDistance <= surface/2) {
			console.log ("Acertou um Inimigo");
			character.setPoints(100);
			enemmys.splice(j, 1);
			j--;
		}
	}
	
}
//----FIM DO CÓDIGO----------

}