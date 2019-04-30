/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 1
*/

let enemmy; // Declarar Objetos
let spaceship;

let screenlimit = 512;

function setup() {
  createCanvas(screenlimit, screenlimit);
  // Criando Objetos
  enemmy = new Fraco();
  spaceship = new Actor();
}

function draw() {
  background(50, 89, 100);
  enemmy.move();
  enemmy.display();

  spaceship.move();
  spaceship.display();

}

//Classe Inimigo Fraco 
class Fraco {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(15, 45);
    this.speed = 0.8;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill (0,0,200)
  }
}


//Classe do Protagonista
class Actor{
  constructor(){
    this.x = 200;
    this.y = 300;
  }

  move(){
      if (keyIsDown(LEFT_ARROW)){
        this.x -= 5
      }

      if (keyIsDown(RIGHT_ARROW)){
        this.x +=5
      }
  }

  display(){
    ellipse(this.x, this.y,50,50)
    fill(200,0,0)
  }
}