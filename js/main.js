/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 2
*/

// let ammo; //Objeto que Define um Bonus
let character;  //Objeto do Personagem
//-----Ações
let summon; //Metodo de Invocação
var shoot;
var shoting = false;

let enemmyNumber = 5; // Inimigos no Mapa
var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos

//-----Variaveis de cenário
var canvasSize = 512;

function setup() {
  createCanvas(canvasSize, canvasSize);
  // Criando Objetos
  // shoot = new Shoot();
  character = new Character();
  // ammo = new ammoNv1(); // Objeto de Bonus
 
  //Insere os Inimigos no Array
  for(i=0;i<enemmyNumber;i++){
    enemmys.push(new enemmyNv1());
  }

// Nova Ivocação  
  summon = new summonEnemmy();
}

function draw() {
  background(0, 0, 0);
  objcsUpdate ()
}

//Classe Inimigo enemmyNv1 
class enemmyNv1 {
  constructor() {
    this.x = random(width);
    this.y = random(-100,5);
    this.diameter = random(10, 20);
    this.speed = random(1,3) / this. diameter;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(this.speed*3, this.speed*3);
    summon.positionTest();
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill (0,0,200)
    
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
    this.x += random(0.05*this.y, -0.05*this.y)
    this.y += 2.5 + random (-5,1)
    summon.positionTest();
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill (0,150,200)
    
  }
}


//Cria um novo Inimigo caso o anterior tenha saído da tela
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
      this.diameter = 3
      this.speed = 7;
    }
  
    move() {
      this.y -= this.speed
    }
  
    display() {
      fill (255,255,50)
      ellipse(this.x, this.y, this.diameter, this.diameter+2);
 
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
      if (keyIsDown(DOWN_ARROW)){
        shoot = new Shoot();
        shoting = true;
        console.log('PEW')
      }
  }

  display(){
    ellipse(this.x, this.y,25,25)
    fill(250,0,0) 
  }
}

function objcsUpdate(){
 //------Atualizar Posições dos Objetos
  
  //-----Bonus
  if (typeof ammo !== 'undefined'){
    ammo.move();
    ammo.display();
  }
  
  //-----Personagem
  if (typeof character !== 'undefined'){
    character.move();
    character.display();
  }
  //---Tiro
  if (typeof shoot !== 'undefined'){
  shoot.move();
  shoot.display();
  }

 //Atualiza a Posição de Todos os Inimigos
  if (typeof enemmys !== 'undefined'){
    for (i=0;i < enemmys.length;i++){
      enemmys[i].move();
      enemmys[i].display();
    }
  }

//Atualiza a Posição de Todos os Tiros
// for (i=0;i < shoot.length;i++){
//   shoot[i].move();
//   shoot[i].display();
// }


}