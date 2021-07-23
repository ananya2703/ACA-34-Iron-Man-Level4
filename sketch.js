
var ironMan, ironMan_collide;
var bg, bgImage;
var stonesGroup, stoneImage;
var diamondsGroup, diamondImage;
var diamondScore=0;
var spikesGroup, spikeImage;

function preload() {
  bgImage = loadImage("images/bg.jpg");
  ironManImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1200, 630);
  
  bg = createSprite(580,300,2200,500);
  bg.addImage(bgImage);
  bg.scale = 1.8;
  bg.velocityY=3;

  ironMan = createSprite(100,500,20,50);
  ironMan.addImage(ironManImage);
  ironMan.scale = 0.3;

  
  ground = createSprite(130,825,1999,100);
  ground.visible = false;

  stonesGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
}

function draw() {

  background("black");

  if (bg.y > 600){
    bg.y=bg.width/4;
  }
  if(ironMan.x<50){
    ironMan.x=50;
  }
  if(ironMan.x<-50){
    ironMan.x=-50;
  }
  if(ironMan.y<50) {
    ironMan.y=40;
  }
  if(keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if(keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if(keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  
  
  ironMan.velocityY = ironMan.velocityY + 0.5;
  ironMan.collide(ground);
   
  generateStones();
  for (var i = 0; i <(stonesGroup).lenght; i++) {
    var temp = (stonesGroup).get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
    }
  }

  
  generateDiamonds();
  for(var i=0; i< (diamondsGroup).lenght ; i++) {
    var temp = diamondsGroup.get(i);

    if (temp.isTouching(ironMan)) {
      diamondScore++;
      temp.destroy();
      temp=null;
    }
  }

  drawSprites();
   
  textSize(20);
  fill("white")
  text("Diamonds Collected: "+ diamondScore, 500,50);

  generateSpikes();
  for(var i=0; i< (spikesGroup).length ; i++) {
    var temp = (spikesGroup).get(i);

    if (temp.isTouching(ironMan)) {
      temp.destroy();
      temp=null;
    }
  }
}

function generateStones() {
  if (frameCount % 70===0) {
    var stone = createSprite(1200,120,40,10);
    stone.y = random(50,450);
    stone.addImage(stoneImage);
    stone.scale = 0.5;
    stone.velocityX = -5;

    stone.lifetime = 250;
    stonesGroup.add(stone);
  }
}

function generateDiamonds() {
  if (frameCount % 50===0) {
      var diamond = createSprite(1200,120,40,10);
      coin.addImage("diamond", diamondImage);
      diamond.y = Math.round(random(80,350)) ;
      diamond.scale = 0.1;
      diamond.velocityX = -3;
      diamond.lifetime = 1200;
      diamondsGroup.add(diamond);
  }
}

function generateSpikes() {
  if (frameCount % 50===0) {
    var spike = createSprite(200,300,40,5);
    spiike,addImage("spike", spikeImage);
    spike.y = Math.round(random(80,350)) ;
    spike.scale = 1;
    spike.velocityX = -3;
    spike.lifetime = 1200; 
    spikesGroup.add(spike);
  }
}