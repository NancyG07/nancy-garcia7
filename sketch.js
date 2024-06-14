var trex ,trex_running, trex_collided;
var ground, obstacle;
var groundImage, invisibleGround;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup, cloudsGroup;
var gameOverImg,restarImg,gameOver,restart;
var jumpSound, checkPoint, dieSound;
//var message = "Esto es un mensaje";
function preload (){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
 cloudImage = loadImage("cloud.png")
  obstacle1 =loadImage("obstacle1.png");
  obstacle2 =loadImage("obstacle2.png");
  obstacle3 =loadImage("obstacle3.png");
  obstacle4 =loadImage("obstacle4.png");
  obstacle5 =loadImage("obstacle5.png");
  obstacle6 =loadImage("obstacle6.png");

  restarImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

 trex_collided = loadImage("trex_collided.png");
  jumpSound = loadSound("jump.mp3");
  checkPoint = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
  
}

  function setup(){
 createCanvas(600,200)

  //crear sprite de Trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);

 //agregar tamaño y posicion al trex
 trex.scale = 0.5;

 //crear sprite del suelo
 ground = createSprite(200,180,400,20);
 ground.addImage("ground", groundImage);

 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;
 var rand = Math.round(random(1,100));
 console.log(rand)

 console.log("Hola" + "mundo");
 trex.setCollider("circle",0, 0,40);
 trex.debug = false;

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImg);

 restart = createSprite(300,140);
 restart.addImage(restarImg);

 gameOver.scale = 0.5;
 restart.scale = 0.5;



 // crear grupos de obstaculos y nubes
  obstacleGroup = new Group();
  cloudsGroup = new Group();
}

function draw(){
  background("white")
  //console.log(message)
  text("puntuacion" + score, 500, 50);
 
  console.log("el estado es:",gameState);

  gameOver.visible = false;
  restart.visible = false;

if(gameState === PLAY){
 //mover el suelo
 ground.velocityX = -(6 + score/100);

 //sumatoria de puntos
 score = score + Math.round(getFrameRate()/60);
 if(score>0 && score%100 === 0){
  checkPoint.play();
 }

 //reiniciar el suelo del trex
 if(ground.x<0){
  ground.x = ground.width/2;
 }

 //tecla de salto
if(keyDown("space") && trex.y >=100 ) {
  trex.velocityY = -10;
  jumpSound.play();
}
 //agregar gravedad 
trex.velocityY = trex.velocityY + 0.5;

 //llamado de la funcion de nubes y obstaculos
 spawnClouds();
 spawnObstacles();

  //detectar si el trex toca un obataculo
   if(obstacleGroup.isTouching(trex)){
     gameState = END
     dieSound.play();
 }

}
 else if(gameState === END){
 //el suelo se detiene
  ground.velocityX = 0;
  trex.velocityX = 0;

 //detener obstaculos y nubes
  obstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

 //cambiar la animacion del trex
 trex.changeAnimation("collided", trex_collided);

 if(mousePressedOver(restart)){
  reset();
}

if(keyDown("space")) {
  trex.velocityY = 0;      
}

 //establecer lifetime de los objectos del juego (nuves y obstaculos) para que no desaparezcan
  obstacleGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

   gameOver.visible = true;
   restart.visible = true;
 }
 

 //console.log(frameCount);
  //trex choca con el suelo
  trex.collide(invisibleGround);



    drawSprites();
}
   function spawnClouds(){
    if(frameCount % 60 === 0) {
  cloud = createSprite(600,100,40,10);
  cloud.addImage(cloudImage)
  cloud.y = Math.round(random(10,60));
  cloud.scale = 0.4;
  cloud.velocityX = -(6 + score/100);

  //tiempo de vida de un sprite
  cloud.lifetime = 230;
  
  //ajustar la profundidad de los sprites
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;

  //agregar cada nube al grupo
  cloudsGroup.add(cloud);
    }
  }
  
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);

var rand = Math.round(random(1,6));
  switch( rand){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: break
}
//asignar escala y lifetime
obstacle.scale = 0.5;
obstacle.lifetime = 230;

 //agregar cada obstaculo al grupo
 obstacleGroup.add(obstacle);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trex_running);
  score = 0;
}



    
