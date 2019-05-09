//Testes Background
var bgImg;
var x1 = 0;
var x2;

var scrollSpeed = 1;

function preload(){
	bgImg = loadImage("assets/bg2.png");
}

function setup() { 
  createCanvas(400, 400);
  
  x2 = width;
} 

function draw() { 
  image(bgImg, 0, -x1, width, height);
  image(bgImg, 0, -x2, width, height);
  
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  
}