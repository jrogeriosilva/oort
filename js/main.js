/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 1
*/

//Valores de posição inicial
let x = 200;
let y = 400;

let enemyx = 200
let enemyy =  200

let screenlimit = 512;

function setup() {
  createCanvas(screenlimit, screenlimit);
}

function draw(){

  clear();
  background (10)  
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }


  ellipse(x,y,25,25);
  fill(0,0,200);

  rect(enemyx, enemyy, 120, 40);
  fill(200,0,0);
}