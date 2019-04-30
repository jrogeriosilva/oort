/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 1
*/

let enemmy;
let enemmy2;
let character;

//Variaveis de cenário
let screenlimit = 512;

function setup() {
  createCanvas(screenlimit, screenlimit);
  // Criando Objetos
  character = new Character();
  enemmy = new Fraco();
}

function draw() {
  background(130, 130, 130);

  //Atualizar Posição
  //INIMIGOS
  enemmy.move();
  enemmy.display();

  //Personagem
  character.move();
  character.display();

}

//Classe Inimigo Fraco 
class Fraco {
  constructor() {
    this.x = random(width);
    this.y = 5;
    this.diameter = random(15, 20);
    this.speed = 2;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed+2, this.speed+2);
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill (0,0,200)
  }
}


//Classe do Protagonista
class Character{
  constructor(){
    this.x = 200;
    this.y = 300;
  }

  move(){
      if (keyIsDown(LEFT_ARROW) && this.x > 0){
        this.x -= 5
      }

      if (keyIsDown(RIGHT_ARROW) && this.x < screenlimit){
        this.x +=5
      }
  }

  display(){
    ellipse(this.x, this.y,25,25)
    fill(200,0,0)
  }
}