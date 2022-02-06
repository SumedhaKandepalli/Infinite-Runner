var bomb, coin, energyDrink, path, power, runner1;
var bombImg, coinImg, energyDrinkImg, pathImg, powerImg, runnerImg;
var gameState=PLAY;
var PLAY=1;
var END=0;
var obstacle1;
var bombGroup, coinGroup, drinkGroup;
var score=0;


function preload(){
  runner_running=loadAnimation("Runner-1.png", "Runner-2.png");

  bombImg=loadImage("bomb.png");

  coinImg=loadImage("coin.png");

  energyDrinkImg=loadImage("energyDrink.png");

  pathImg=loadImage("path.png");

  powerImg=loadImage("power.png");

  runner_power=loadImage("power.png");
}

function setup(){
  createCanvas(400,400);
  
  obstacle1=createSprite(25, 200, 100, 400);
  obstacle1.visible=false;
  obstacle2=createSprite(375, 200, 100, 400);
  obstacle2.visible=false;


  path=createSprite(200, 200, 50, 400);
  path.addImage(pathImg);
  path.scale=1;


 
  runner1=createSprite(200, 250, 50, 50);
  runner1.addAnimation("running", runner_running);
  runner1.scale =0.05;
  runner1.addAnimation("powerGain", runner_power);

  bombGroup = new Group();
  
  coinGroup = new Group();
 
  drinkGroup = new Group();
}

function createBomb(){
  if (frameCount % 500 ==0){
    bomb=createSprite(Math.round(random(50, 350), 50, 50, 50));
    bombGroup.add(bomb);
    bomb.velocityY=4;
    bomb.addImage(bombImg);
    bomb.scale=0.05;
  }

}

function createDrink(){
  if (frameCount %  200 == 0){
   energyDrink=createSprite(Math.round(random(50,350), 50, 50, 50));
   drinkGroup.add(energyDrink);
   energyDrink.velocityY=4;
   energyDrink.addImage(energyDrinkImg);
   energyDrink.scale=0.05;
  }
}

function createCoin(){
  if(frameCount % 30 == 0 ){
    coin=createSprite(Math.round(random(50, 350), 50, 50, 50));
    coinGroup.add(coin);
    coin.velocityY=4;
    coin.addImage(coinImg);
    coin.scale=0.2;
  
  }
}


function draw() {
  background(0);

      if (path.y>400) {
      path.y=height/2;
    }
    path.velocityY=4;



  
  runner1.x=World.mouseX;
  runner1.collide(obstacle1);
  runner1.collide(obstacle2);


  createBomb();
  createDrink();
  createCoin();

  if (coinGroup.isTouching(runner1)){
    score=score+1;
    for(var i=0; i<coinGroup.length; i++){
      coinGroup[i].destroy();
    }
  }

  if (drinkGroup.isTouching(runner1)){
    score=score+5;
    for(var i=0; i<drinkGroup.length; i++){
      drinkGroup[i].destroy();
    }
  }
  
  if (bombGroup.isTouching(runner1)){
    coinGroup.destoryEach();
    drinkGroup.destoryEach();
    bombGroup.destroyEach();
    }
  drawSprites();
  textSize(15);
  text("score:"+score, 320, 30);

}
