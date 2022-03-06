//musica original: https://www.newgrounds.com/audio/listen/350290
//variáveis globais
var ufoGroup,ufoSprite1,ufoSprite2,ufoSprite3,ufoSprite4,ufoSprite5;
var block,blockImg,blocksGroup;
var backGround,backgroundImg,backgroundSong;
var gamestate,score = 0,tentativas = 1;
var wall1,wall2;
var restartButton,restartImg;
var gameOver,gameOverImg;
gamestate = "play";

//preload
function preload() {
  //imagem
  blockImg = loadImage("BLOCK.png");
  backgroundImg = loadImage("spookyBg.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
   //música
   backgroundSong = loadSound("toe1.mp3");
}

//setup
function setup() {
  createCanvas(400,400);
  
  //sprites
  
  //PLANO DE FUNDO
  backGround = createSprite(200,200,400,0);
   backGround.addImage(backgroundImg);
    backGround.scale = 2.5;

  //BLOCK
  blocksGroup = new Group();

  //UFO
  ufoSprite1 = createSprite(200-100,200,50,30);
  ufoSprite1.shapeColor = "yellow";
   
   ufoSprite2 = createSprite(235-100,205,20,20);
   ufoSprite2.shapeColor = "gold";

    ufoSprite3 = createSprite(165-100,205,20,20);
    ufoSprite3.shapeColor = "gold";
     
     ufoSprite4 = createSprite(200-100,220,60,10);
     ufoSprite4.shapeColor = "HotPink";

      ufoSprite5 = createSprite(200-100,170,30,30);
      ufoSprite5.shapeColor = "HotPink";

       ufoGroup = new Group();
       ufoGroup.add(ufoSprite1);
       ufoGroup.add(ufoSprite2);
       ufoGroup.add(ufoSprite3);
       ufoGroup.add(ufoSprite4);
       ufoGroup.add(ufoSprite5);

      backgroundSong.loop();

//WALLS
wall1 = createSprite(200,450,400,10); 
wall2 = createSprite(200,-50,400,10);

//restartSprite
restartButton = createSprite(200,200,30,30);
restartButton.addImage(restartImg);

//gameOver sprite
gameOver = createSprite(200,150);
gameOver.addImage(gameOverImg);

}
//draw
function draw() {
  background(0);

  //GameStates
  if (gamestate === "play") {
    restartButton.visible = false; 
    gameOver.visible = false;
    score = score + Math.round(getFrameRate()/60);
    //background
     if(backGround.x < 0){
        backGround.x = 400 / 2;
     }
    backGround.velocityX = -2;
    //Ufo
    ufoGroup.setVelocityYEach(10);
    //FAZER O UFO PULAR
    if (keyDown("space")) {
        ufoGroup.setVelocityYEach(-20);
    }
    //MORTE
    if (ufoGroup.isTouching(blocksGroup)||ufoGroup.isTouching(wall1)||ufoGroup.isTouching(wall2)) {
      gamestate = "end";
    }
    //blocos
    createBlocks();
  }
  else if(gamestate === "end"){
    backGround.velocityX = 0;
    blocksGroup.setLifetimeEach(-1); 
    ufoGroup.setVelocityYEach(0);
     ufoSprite1.visible = false;
     ufoSprite2.visible = false;
     ufoSprite3.visible = false;
     ufoSprite4.visible = false;
     ufoSprite5.visible = false;
    ufoGroup.y = 200;
    blocksGroup.setVelocityXEach(0);
    restartButton.visible = true;
    gameOver.visible = true;
    restartButton.depth = 100;
    
    if (mousePressedOver(restartButton)) {
      blocksGroup.destroyEach();
       ufoSprite1.visible = true;
       ufoSprite2.visible = true;
       ufoSprite3.visible = true;
       ufoSprite4.visible = true;
       ufoSprite5.visible = true;

       ufoSprite1.y = 200;
       ufoSprite2.y = 205;
       ufoSprite3.y = 205;
       ufoSprite4.y = 220;
       ufoSprite5.y = 170;
       
       tentativas = tentativas + 1;
       score = 0;
       gamestate = "play";
     
      
    }
  }
  text("score: "+score,300,10);
  text("attempts: "+tentativas,100,10);
   drawSprites();
}
//CreateBlocks
function createBlocks() {
  if (frameCount % 60 == 0) {
     block = createSprite(600,Math.round(random(50,350)),50,50);
     block.addImage(blockImg);
     block.velocityX = -4
     block.lifetime = 200;
      block.setCollider("rectangle",0,0,80,80);
      //block.debug = true;
      block.depth = restartButton.depth -1;
      blocksGroup.add(block);
      
  }
}