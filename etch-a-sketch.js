console.log('connected!');
// select the elements on the page- canvas, context, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');

//set up move amount variable
const MOVE_AMOUNT = 50; // values never change, use uppercase and underscore

//set up hue value for color of the strokes
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// set up canvas for drawing
const {width, height} = canvas; // const width = canvas.width
//create random x and y starting points on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
//to get smooth drawing
ctx.lineJoin = 'round'; // create a round corner when two lines meet
ctx.lineCap = 'round'; // draw a line with rounded end caps
// to define thickness of the line
ctx.lineWidth = 20;
initialize();

// listen for keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clear);

//define keys handler (handleKey)
function handleKey(e){
  if(e.key.includes('Arrow')){
    //prevent default page scrolling
    e.preventDefault();
    draw({key:e.key}); 
  }
}

//define draw function
function draw({key}){ //{key} equals to options.key
  //increment the hue value and update the stroke style
  hue += 1;
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  //to start drawing
  ctx.beginPath();
  // to go to a random start point
  ctx.moveTo(x,y);
  // to move our x and y values depending on what the user did
  switch(key){
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x,y);
  // stroke the line
  ctx.stroke();
}

//define clear function
function clear(){
  canvas.classList.add('shake');
  //clear the canvas
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend', function(){
    console.log('Done the shake');
    canvas.classList.remove('shake');
  },{once: true});
  setTimeout(initialize, 1500);
}

function initialize(){
  // to start drawing
  ctx.beginPath();
  // to make a visible line
  ctx.moveTo(x,y);
  ctx.lineTo(x,y);
  // stroke the line
  ctx.stroke(); 
}