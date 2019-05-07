/* 
    Equipe: 
        José Rogério da Silva Júnior - Subturma 01C (Líder) 
        Etapa 2
*/

let imgLife;
function preload(){
  imgLife = loadImage("assets/heart.png")
}

let imgCharacter;
function preload() {
  imgCharacter = loadImage("assets/spaceship_small_blue.png");
}

let menu

// let ammo; //Objeto que Define um Bonus
let character;



//-----Ações
let summon; //Metodo de Invocação

var shoting = false;

let enemmyNumber = 5; // Inimigos no Mapa
var enemmys = new Array(); //Array de Objetos que Grava Estado e Posição dos Inimigos

var shoot = new Array(); //Array de Objetos que Grava os Tiros

//-----Variaveis de cenário
var canvasSize = 512;

function setup() {
  console.log("Inicio");
  createCanvas(canvasSize, canvasSize);
  // Criando Objetos
  // shoot = new Shoot();
 
  //Criando objeto do personagem
  character = new Character();
  // ammo = new ammoNv1(); // Objeto de Bonus
  
  //Criando objetos e os Inserindo no Array
  for(i=0;i<enemmyNumber;i++){
    enemmys.push(new EnemmyN1());
  }
  
// Objeto de Invocação  
  summon = new summonEnemmy();

  //Objeto do Menu
  menu = new Menu();
  
  //---FIM DA CONFIGURAÇAO
}

function draw() {
  background(0, 0, 0);
  objcsUpdate ();
  // menu.show();
}

class Menu{
  show(){
    // imageMode(CENTER);
    // image (imgLife, 50, 70);   
  }
}

//Classe Inimigo EnemmyN1 
class EnemmyN1 {
  constructor() {
    this.x = random(width);
    this.y = random(-100,5);
    this.diameter = random(10, 30);
    this.speed = random(1,2) / this. diameter;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(this.speed*3, this.speed*3);
    summon.positionTest();
  }

  display() {
    rect(this.x, this.y, this.diameter, this.diameter);
    fill (0,0,200);
    
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
    this.x += random(0.05*this.y, -0.05*this.y);
    this.y += 2.5 + random (-5,1);
    summon.positionTest();
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
    fill (0,150,200);
    
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
      this.diameter = 3;
      this.speed = 7;
      console.log("Atirando")
      
    }
  
    move() {
      this.y -= this.speed;
    }
  
    display() {
      fill (255,255,50);
      ellipse(this.x+7, this.y -15, this.diameter, this.diameter+2);
      ellipse(this.x-7, this.y -15, this.diameter, this.diameter+2);
 
    }
  } 

//Classe do Protagonista
class Character{
  constructor(){
    this.x = width/2;
    this.y = height-90;
    this.speed = 3
  }
 
  move(){
    if (keyIsDown(LEFT_ARROW) && this.x > 0){
      this.x -= this.speed;
      }

    if (keyIsDown(RIGHT_ARROW) && this.x < canvasSize){
      this.x += this.speed;
    }
    if (keyIsDown(DOWN_ARROW)){
      shoot.push(new Shoot());
    }
  }

  display(){
    imageMode(CENTER);
    image (imgCharacter, character.x, character.y); 
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
  if (typeof shoot !== 'undefined' && shoot.length>0){
    for (i=0; i < shoot.length;i++){
      shoot[i].move();
      shoot[i].display();
    }
  }

 //Atualiza a Posição de Todos os Inimigos
  if (typeof enemmys !== 'undefined'){
    for (i=0;i < enemmys.length;i++){
      enemmys[i].move();
      enemmys[i].display();
    }
  }


  //HUD

  fill(255,255,255)
  textFont('Helvetica');
  textSize(14);
  
  text("00000000", width/2-30, 15)

  text("Nível: ", width-70, 15)

  textSize(14);
  text("Vidas", 20, 460);
  
  imageMode(CENTER);
  image (imgCharacter, 20, 490,32,32); 
  image (imgCharacter, 60, 490,32,32);
  image (imgCharacter, 100, 490,32,32);

  //Atualiza a Posição de Todos os Tiros
// for (i=0;i < shoot.length;i++){
//   shoot[i].move();
//   shoot[i].display();
// }


// CONTROLE UNICO DE TIROS
// function keyPressed(){
//   if (keyCode === UP_ARROW) {
//     shoot.push(new Shoot());
//     console.log("Pew")
//     }
//   }


//----FIM DO CÓDIGO----------


}