
var socketClient = io.connect('192.168.1.106:3000');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//canvas.style.height = innerHeight+'px';
//canvas.style.width = innerWidth+'px';
//ctx.clearRect(0,0,innerWidth,innerHeight);
resize();
var pos = { x: 0, y: 0 };
canvas.style.position = 'fixed';
window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('touchmove', drawTouch);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);
document.addEventListener('touchstart', setPositionTouch);

// new position from mouse event
function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
function setPositionTouch(e) {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
  }
  
// resize canvas
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e) {
  // mouse left button must be pressed
 // console.log(e.buttons)
  if (e.buttons !== 1) return;
  let th = innerHeight,
  tw = innerWidth; 
  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#c0392b';
//console.log('j')
  ctx.moveTo(pos.x, pos.y); // from
  let from = {
      x : pos.x,
      y:pos.y
  }
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to
  let to = {
    x : pos.x,
    y:pos.y
}

  ctx.stroke(); // draw it!
//console.log('e',e)
  socketClient.emit('mouse',{from,to,th,tw})
}
function drawTouch(e) {
    // mouse left button must be pressed
   // console.log(e.buttons)
   let th = innerHeight,
   tw = innerWidth; 
  
    ctx.beginPath(); // begin
  
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';
  //console.log('j')
  //setPosition(e.touches[0]);
    ctx.moveTo(pos.x, pos.y); // from
    let from = {
        x : pos.x,
        y:pos.y
    }
    setPosition(e.touches[0]);
    ctx.lineTo(pos.x, pos.y); // to
    let to = {
      x : pos.x,
      y:pos.y
  }
  
    ctx.stroke(); // draw it!
  //console.log('e',e)
    socketClient.emit('mouse',{from,to,th,tw})
  }
socketClient.on('mouse',(e)=>{
    ctx.beginPath(); // begin
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    ctx.moveTo((e.from.x/e.tw)*innerWidth, (e.from.y/e.th)*innerHeight); // from
    ctx.lineTo((e.to.x/e.tw)*innerWidth, (e.to.y/e.th)*innerHeight); // to
    ctx.stroke(); 
})