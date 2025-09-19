/* VARIABLES */

let menuButton, instButton, startButton, restartButton;
let bgImg0, bgImg2, bgImg3;
let asteroid1Img, asteroid2Img, asteroid3Img, rocketImg;
let player;
let asteroid1, asteroid2, asteroid3; 
let screen=0;
let timer=10;
let iTimer=3;

/* PRELOAD LOADS FILES */
function preload(){
  bgImg0 = loadImage('assets/bgImg0.png');
  bgImg2 = loadImage('assets/spacebg.jpg');
  bgImg3 = loadImage('assets/bgImg3.png');
  asteroid1Img = loadImage('assets/asteroid1.png');
  asteroid2Img = loadImage('assets/asteroid2.png');
  asteroid3Img = loadImage('assets/asteroid3.png');
  rocketImg = loadImage('assets/rocket.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
  // Resize Images
  asteroid1Img.resize(60,0);
  asteroid2Img.resize(60,70);
  asteroid3Img.resize(60,60);
  rocketImg.resize(0,85);

  // Create instructions button
  instButton = new Sprite (120,260,100,50,'k');
  instButton.color = '#eeeeee';
  instButton.textSize = 16;
  instButton.text = 'Instructions';

  // Create start button
  startButton = new Sprite (280,260,100,50,'k');
  startButton.color = '#eeeeee';
  startButton.textSize = 16;
  startButton.text = 'Start';

  // Create menu button
  menuButton = new Sprite (-300,270,90,60,'k');
  menuButton.color = '#eeeeee';
  menuButton.textSize = 18;
  menuButton.text = 'Menu';

  // Create restart button
  restartButton = new Sprite(-200,-200,100,50,'k');
  restartButton.color = '#eeeeee';
  restartButton.textSize = 18;
  restartButton.text = 'Restart';
}

/* DRAW LOOP REPEATS */
function draw() {
  
  if(screen==0){
    drawMenu();
    if(instButton.mouse.presses()){
      screen=1;
      drawInstScreen();
    } else if (startButton.mouse.presses()){
      screen=2;
      removeMenu();
      gameScreenAssets();     
    }
  }

  if(screen==1){
    if(menuButton.mouse.presses()){
      screen=0;
      menuButton.x = -200;
      drawMenu();
    }
  }

  if(screen==2){
    background(bgImg2);

    // Timer
    textSize(50);
    fill(255);
    text('0' + iTimer, width/2,100);
    
    if(frameCount % 60 == 0 && iTimer > 0){
      iTimer--;
    }

    // Start the game
    if (iTimer==0){
      gameScreen();
    }
    
  }

  if(screen==3){
    winScreen();
  }

  if(screen==4){
    loseScreen();
  }
}

/* FUNCTIONS */

function drawMenu(){
  /* SCREEN 0 */
  background(bgImg0);

  // Title text
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text('Stellar Navigator',width/2, 80);

  // Story text
  textSize(16);
  textWrap(WORD);
  text("In the distant future, Earth has become uninhabitable due to severe climate change and resource depletion. Humanity's last hope lies in finding a new star system where life can flourish. As the captain of the spaceship, you have been entrusted with this critical mission.",10,120,370)

  // Buttons
  instButton.pos = {x: 120, y: 300};
  startButton.pos = {x: 280, y: 300};
}

function removeMenu(){
  // Moving buttons off screen
  instButton.x = -500;
  startButton.x = -200;
}

function drawInstScreen(){
  /* SCREEN 1 */
  background(bgImg0);
  
  // Instruction title text
  fill(255);
  textSize(22);
  textAlign(CENTER);
  text('Instructions',width/2, 60);

  // Guide text
  textSize(17);
  textWrap(WORD);
  text("Navigate with the key arrows through challenging asteroid fields for 10 seconds to reach the new star system and secure a future for humanity. Remember not to desacelerate too much and lose sight of your ship.\nGood luck!",10,85,370);
      // L8: Collect stars in the way to make your path shorter.
  
  
  // Positioning the buttons
  menuButton.pos = {x: width/2, y: 320};
  instButton.x = -500;
  startButton.x = -300;
}

function gameScreenAssets(){
  
  // Create player
  player = new Sprite (rocketImg, width/2, height/2, 60,40);

  // Create asteroids
  asteroid1 = new Sprite (asteroid1Img,300,100,55, 'k');  
  asteroid2 = new Sprite (asteroid2Img,10,200,55,'k');  
  asteroid3 = new Sprite (asteroid3Img,250,300,55,'k');
}

function gameScreen(){
  /* SCREEN 2 */
  background(bgImg2);

  // Give rotation and speed to the asteroids
  asteroid1.rotationSpeed = 1;
  asteroid1.vel.x = -4;

  asteroid2.rotationSpeed = 1;
  asteroid2.vel.x = -3;

  asteroid3.rotationSpeed = 1;
  asteroid3.vel.x = -5;

  // Move the player
  if (kb.pressing("left")) {
     player.vel.x = -4;
   } else if (kb.pressing("right")) {
     player.vel.x = 3;
   } else if (kb.pressing("down")) {
     player.vel.y = 3;
   } else if (kb.pressing("up")) {
     player.vel.y = -3;
   } else {
     player.vel.x = -2;
     player.vel.y = 0;
   }

  // Reset asteroid locations once they reach edge of screen 
   if (asteroid1.x < -30) {
     asteroid1.x = 500;
     asteroid1.y = random(30,110);
     asteroid1.vel.x = random (-2,-7);
   } 

   if (asteroid2.x < -30) {
     asteroid2.x = 500;
     asteroid2.y = random(140,230);
     asteroid2.vel.x = random (-2,-7);
   } 

   if (asteroid3.x < -30) {
     asteroid3.x = 500;
     asteroid3.y = random(260,370);
     asteroid3.vel.x = random (-2,-7);
   } 

  // Don't let the player move off the screen
   if (player.y < 25) {
     player.y = 25;
   } else if (player.y > 380) {
     player.y = 380;
   }
  
  if (player.x >357){
     player.x = 357;
   } else if (player.x<-40) {
     screen=4;
   }

  // Check if player collides with asteroids
   if (player.collides(asteroid1) || player.collides(asteroid2) || player.collides(asteroid3)) {
     screen=4;
   } 

  // Timer
  textSize(30);
  fill(255);
  if (timer>=10){
    text('00:' + timer, 200,40);
  } else if (timer<10){
    text('00:0' + timer, 200,40);
  }
  
  if(frameCount % 60 == 0 && timer > 0){
    timer--;
  }
  
  // Win after 30/10 second alive
  if(timer==0){
    screen=3;
  }
}

function removeGame(){
  player.x = -700;

  asteroid1.y = -700;
  asteroid2.y = -800;
  asteroid3.y = -900;
}

function drawRestartButton(){
  restartButton.pos = {x: 100, y:310};
  timer=10;
  iTimer=3;
    
  if(restartButton.mouse.presses()){
    screen=0;
    restartButton.y = -600;
  }
}

function winScreen(){
  /* SCREEN 3 */
  removeGame();
  background(bgImg3);

  // Win text
  fill(255);
  textSize(25);
  textAlign(CENTER);
  text("You Win! You've reached the\nnew star system!",width/2, 125);

  // Win message
  textSize(17);
  textWrap(WORD);
  text("Congratulations! You have navigated through the dangerous asteroid fields and reached the new star system. Humanity has found a new hope thanks to your skills and perseverance!",15,175,365);

  // Restart
  drawRestartButton();  
}

function loseScreen(){
  /* SCREEN 4 */
  removeGame();
  background(bgImg2);

  // Lose text
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text('Game Over',width/2, 100);

  // Lose message
  textSize(16);
  textWrap(WORD);
  text("Your journey through the asteroid fields has come to an end. Don't give up, Captain! Humanity's hope depends on your perseverance. Try again and guide us to a new star system!",20,140,360);

  // Restart
  drawRestartButton();  
}