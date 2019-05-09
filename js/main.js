/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 2
*/

//Cenário
var canvasSize = 512;

let imgLife;
function preload() {
  imgLife = loadImage("assets/heart.png")
}

let character;
let imgCharacter;
function preload() {
  imgCharacter = loadImage("assets/spaceship_small_blue.png");
}

let summon; //Objeto de Invocação
let enemmyNumber = 8; // Inimigos no Mapa

var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos
var shoot = new Array(); //Array de Objetos que Grava os Tiros

function setup() {
  createCanvas(canvasSize, canvasSize);

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

delayShot = false

function draw() {
  background(0, 0, 0);
  objcsUpdate();
}

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
    this.y = random(-100, 5);
    this.diameter = random(10, 30);
    this.speed = random(1, 2) / this.diameter;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(this.speed * 3, this.speed * 3);
    summon.positionTest();
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill(0, 0, 200);

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
    this.speed = 7;
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
    this.shootingSpeed = 7
    this.x = width / 2;
    this.y = height - 90;
    this.speed = 3
  }

  move() {
 
 
    //Controles
    if (keyIsDown(LEFT_ARROW) && this.x > 20) {
      this.x -= this.speed;
    }

    if (keyIsDown(RIGHT_ARROW) && this.x < canvasSize - 20) {
      this.x += this.speed;
    }

    //Tiro simples
    if (keyIsDown(90) && delayShot === false) {
      shoot.push(new Shoot());
      delayShot = true
      Delay(character.shootingSpeed);
    }
  }

  display() {
    imageMode(CENTER);
    image(imgCharacter, character.x, character.y);
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
  text("Vidas", 20, 460);

  imageMode(CENTER);
  image(imgCharacter, 20, 490, 32, 32);
  image(imgCharacter, 60, 490, 32, 32);
  image(imgCharacter, 100, 490, 32, 32);

  
  //----FIM DO CÓDIGO----------


}