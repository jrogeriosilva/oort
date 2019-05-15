/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 2
*/

//Cenário

//BG
var bgImg;
var y1 = 0;
var y2
var scrollSpeed = 1;

function showBg(){
    //---Background
    imageMode(CORNER)
    image(bgImg, 0, -y1, canvasSize, canvasSize+18);
    image(bgImg, 0, -y2, canvasSize, canvasSize);

    
    y1 -= scrollSpeed;
    y2 -= scrollSpeed;

    if (y1 < -canvasSize){
      y1 = canvasSize;
      console.log("y1")
    }
    if (y2 < -canvasSize){
      y2 = canvasSize;
      console.log("y2")
    }
}


var canvasSize = 512;

let imgLife;

let character;
let imgCharacter;
function preload() {
  imgCharacter = loadImage("assets/spaceship_small_blue.png");
  imgLife = loadImage("assets/heart.png")
  bgImg = loadImage("assets/bg.png");
  
}
var shoot = new Array(); //Array de Objetos que Grava os Tiros
delayShot = false;

let summon; //Objeto de Invocação
let enemmyNumber = 5; // Inimigos no Mapa
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
  showBg()
  objcsUpdate();
}

//Cooldown
function Delay(t) {
setTimeout(
  () => {
    delayShot = false
  },
  t * 100
);
}

//EnemmyN1 
class EnemmyN1 {
  constructor() {
    this.x = random(width);
    this.y = random(5, 5);
    this.diameter = random(10, 30);
    this.vSpeed = character.y / 100
    this.speed = random(4, 5) / this.diameter;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(this.vSpeed + this.speed * 3, this.speed * 3 );
    summon.positionTest();
    fill(0, 0, 255);
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
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
  }

  // for (i = 0; enemmys[i]< enemmys.length; i++){
  ///   if (enemmy[i].y >= canvasSize){
  //     console.log(enemmys[i]+ 'Saiu')
  //   }
  // }
}

class Shoot {
  constructor() {
    this.x = character.x;
    this.y = character.y;
    this.diameter = 3;
    this.speed = 2;
    console.log("Atirando")

  }

  move() {
    this.y -= this.speed;
  }

  display() {
    fill(255, 255, 50);
    ellipse(this.x + 7, this.y - 15, this.diameter, this.diameter + 2);
    ellipse(this.x - 7, this.y - 15, this.diameter, this.diameter + 2);
  }

}

//Classe do Protagonista
class Character {
  constructor() {
    this.life = 3
    this.shootingSpeed = 7
    this.x = width / 2;
    this.y = height - 90;
    this.speed = 3
    this.diameter = 15
  }

  move() {
 
 
    //Controles
      if (keyIsDown(UP_ARROW) && this.y > 20) {
      this.y -= this.speed;
    }

    else if (keyIsDown(DOWN_ARROW) && this.y < canvasSize - 20) {
      this.y += this.speed;
    }

    if (keyIsDown(LEFT_ARROW) && this.x > 20) {
      this.x -= this.speed;
    }

    else if (keyIsDown(RIGHT_ARROW) && this.x < canvasSize - 20) {
      this.x += this.speed;
    }

    //Tiro simples
    if (keyIsDown(32) && delayShot === false) {
      shoot.push(new Shoot());
      delayShot = true
      Delay(character.shootingSpeed);
    }
  }

  display() {
    imageMode(CENTER);
    image(imgCharacter, character.x, character.y);
    rectMode(CENTER)
    rect(this.x, this.y, this.diameter, this.diameter);
  }

  setLife(x){
    this.life += x
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
      
      console.log("Y: "+ shoot[i].y)
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
  fill(255, 255, 255)
  textFont('Helvetica');
  textSize(14);

  text("00000000", width / 2 - 30, 15)

  text("Nível: ", width - 70, 15)

  textSize(14);
  text("Vidas", 20, height - 50);

  imageMode(CENTER);
  text(character.life, 20, height - 30);

  
//Sistema de Colisões JOGADOR-IMIGO

  for(i=0;i < enemmys.length; i++){
    var a = enemmys[i].x - character.x
    var b = enemmys[i].y - character.y
    var c = Math.sqrt((a*a) + (b*b))

    surface = character.diameter + enemmys[i].diameter
    if (c <= surface) {
      console.log ("Colisão Detectada")
    }
  }

//Sistema de Colisões INIMIGO-TIRO (BETA)
//j?
  for(i=0;i < shoot.length; i++){
    for (j=0; j < enemmys.length; j++){
      var a = enemmys[i].x - shoot[i].x
      var b = enemmys[i].y - shoot[i].y
      var c = Math.sqrt((a*a) + (b*b))

      surface = shoot[i].diameter + enemmys[i].diameter
      if (c <= surface) {
        console.log ("Colisão de Tiro Detectada")
        Character.setLife(1)
      }
    }
  }

  //----FIM DO CÓDIGO----------

}