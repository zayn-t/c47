var Start=0, Play=1, End=2
var gameState = Start 
var chances = 3

function preload() {
titleImg = loadImage("title1.jpg")
playButtonImg = loadImage("play.png") 
bgImg = loadImage("bg.jpg") 
gkImg = loadImage("p1.png")
playerImg = loadImage ("foot.png") 
ballImg = loadImage ("ball.png") 
}

function setup() {
  createCanvas(800,600) 
  title = createSprite(width/2, height/2)
  title.addImage(titleImg)
  title.scale = 1.2 
  playButton = createSprite(width/2, height/2+120)
  playButton.addImage(playButtonImg)
  playButton.scale = 0.15 
  bg = createSprite(width/2, height/2) 
  bg.addImage(bgImg) 
  bg.scale=2 
  bg.visible=false
  gk=createSprite(width/2, height/2-20) 
  gk.addImage(gkImg) 
  gk.scale=0.8
  gk.visible=false 
  player=createSprite(width/2,height-40) 
  player.addImage(playerImg)
  player.scale=0.7
  player.visible=false 
  ball=createSprite(width/2,height-150) 
  ball.addImage(ballImg)
  ball.scale=0.3
  ball.visible=false
}

function draw() {
  background("blue")
  drawSprites()
  if (gameState == Start) {
    if (mousePressedOver(playButton)) {
      gameState = Play
    }
  } 
  if (gameState==Play) {
    title.visible = false 
    playButton.visible = false 
    bg.visible=true 
    gk.visible=true
    player.visible=true 
    ball.visible=true 
    player.x=mouseX
    if(ball.x<width/2&&gk.x>width/2-100) {
      gk.velocityX=-2
    }
    if(ball.x>width/2&&gk.x<width/2+100) {
      gk.velocityX=2
    }
    updateChances()
    moveBall()
  }
} 

function updateChances() {
  chances=chances-1
  if(chances>=1) {
    gameState="play"
  } 
  if(chances<=0) {
    gameState ="end"

  }
}

function resetBall() {
  if(ball.y>-10) {
    ball.x=Math.round(random(width/2-100,width/2+100))
    ball.y=0
  }
}

function moveBall() {
  
  while (ball.y>height-10) {
    if(gameState=="play"&&keyDown("s")) {
      ball.visible=true
      ball.velocityY=5
      fill("yellow") 
      textSize(20)
      text("Press S To Start",width/2-50, height-150)
    
    }
    if(gameState==("play")) {
      resetBall()
      checkCollison()
    }
  }
} 

function checkCollision() {
  if(player.isTouching(ball)) {
    score=score+1 
    ball.velocityY=-ball.velocityY
  }
}