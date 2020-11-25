var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survival;
var gamestate = "PLAY";

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(450, 450);

  monkey = createSprite(50, 205, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.11;
  monkey.debug = false;

  ground = createSprite(275, 270, 900, 30);
  ground.velocityX = -10;
  ground.x = ground.width / 2;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  survival = 0;

}

function draw() {
  background("lightgreen");

  if (gamestate === "PLAY") {

    if (keyDown("space") && monkey.y >= 220) {
      monkey.velocityY = -8;
    }

    monkey.velocityY = monkey.velocityY + 0.4;

    monkey.collide(ground);


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(bananaGroup)) {
      score = score + 1;
      bananaGroup.destroyEach();
    }

    //console.log(monkey.y);

    console.log(ground.x);

    spawnbanana();
    spawnobstacles();

    survival = Math.ceil(frameCount / getFrameRate());

    if (monkey.isTouching(obstacleGroup)) {
      gamestate = "END";
    }

  } else if (gamestate === "END") {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.visible = false;
    ground.visible = false;
    fill("red");
    textSize(50);
    text("You Lose 😭 ", 100, 250);
  }


  drawSprites();

  fill("white");
  textSize(20);
  text("Score : " + score, 30, 30);

  fill("black");
  textSize(20);

  text("Survival Time : " + survival, 250, 30);

}

function spawnbanana() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(450, 200, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }

}

function spawnobstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(450, 245, 10, 10);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }

}