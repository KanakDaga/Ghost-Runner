var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage,ghostJumpingImg;
var invisibleBlock;
var gameOver,gameOverImg;
var score = 0;
var gameState = 1;
var restartImage,restart;
var sound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  ghostJumpingImg = loadImage("ghost-jumping.png");
  gameOverImg = loadImage("gameover.png");
  restartImage = loadImage("reset-1.png");
  sound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  doorsGroup = new Group();
  climberGroup = new Group();
  
  tower = createSprite(300,300,50,50);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImage);
  
  invisibleBlock = createSprite(300,350,600,10)
  invisibleBlock.visible = false;
  
  gameOver = createSprite(300,230,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,330,20,20);
  restart.scale = 0.3;
  restart.addImage(restartImage);
  restart.visible = false;
}
function draw(){
  background("green");
  if(gameState === 1){
 score = score + Math.round(getFrameRate()/60)  ;
    
  if(tower.y>400){
    tower.y = 300;
  }
  if(keyDown("left")){
    ghost.x  = ghost.x-3;
  }
  if(keyDown("right")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -8;
  }
    if(ghost.isTouching(climberGroup)){
      gameState = 0;
      sound.play();
    }
  
  ghost.velocityY = ghost.velocityY+0.5;
  ghost.collide(invisibleBlock);  
  
  spawnDoors();
}
  else if(gameState === 0){
    tower.velocityY = 0;
    climberGroup.destroyEach();
    doorsGroup.destroyEach();
    ghost.addImage(ghostJumpingImg);
    gameOver.visible = true;
    restart.visible = true;
    ghost.velocityY = 3;
  if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
  fill("white");
  textSize(25)
  text("Score: " + score,400,30);
}
function spawnDoors(){
  if(frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY = 2;
    door.x = Math.round(random(120,400))
    doorsGroup.add(door);
    
    door.lifetime = 350;
    
    var climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 590;
    climberGroup.add(climber);
  }
}
function reset(){
  gameState = 1;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  ghost.velocityY = 0;
  ghost.y = 200;
  ghost.x = 200;
  ghost.addImage(ghostImage);
}