/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 2
*/

let enemmy;
let enemmy2;
let character;
var summon;

//Variaveis de cenário
var canvasSize = 512;


function setup() {
  createCanvas(canvasSize, canvasSize);
  // Criando Objetos
  character = new Character();
  enemmy = new enemmyNv1();
  summon = new summonEnemmy();
}

function draw() {
  background(130, 130, 130);
  objcsUpdate ()
}

//Classe Inimigo enemmyNv1 
class enemmyNv1 {
  constructor() {
    this.x = random(width);
    this.y = 5;
    this.diameter = random(15, 20);
    this.speed = 4;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed+2, this.speed+2);
    summon.positionTest();
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill (0,0,200)
    
  }
}

class summonEnemmy {

  positionTest() {
    if (enemmy.y >= canvasSize) { 
      enemmy = new enemmyNv1();   
    }
  }
}

//Classe do Protagonista
class Character{
  constructor(){
    this.x = 200;
    this.y = 400;
  }

  move(){
      if (keyIsDown(LEFT_ARROW) && this.x > 0){
        this.x -= 5
      }

      if (keyIsDown(RIGHT_ARROW) && this.x < canvasSize){
        this.x +=5
      }
  }

  display(){
    ellipse(this.x, this.y,25,25)
    fill(200,0,0)
  }
}

function objcsUpdate(){
  //Atualizar Posição
  //-----Inimigos
  enemmy.move();
  enemmy.display();

  //-----Personagem
  character.move();
  character.display();
}