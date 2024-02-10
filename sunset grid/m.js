const lerp = (min, max, fraction) => (max - min) * fraction + min;
const normalize = (max, fraction) => max * (fraction + 0.5);
const distance = (x, y, x1, y1) => Math.sqrt((x1 -x)*(x1-x) + (y1 - y)*(y1- y));

const canvas = document.getElementById("canvas");
canvas.width = 320;
canvas.height = 320;
const ctx = canvas.getContext("2d");

let points = [];

let startX = -0.5;
let startY = -1;
let endY = startY + 4;
let c;
for (let j = startY; j <= endY; j+=0.1){
  c = points.push([]);
  for (let i = -2; i <= +2; i+=0.1) {
    points[c - 1].push([
      i,
      j,
      j + (Math.cos(i * 1.5 + Math.random()*0.35) / 12) * 6
    ])
  }
}

const generatePoints = (delta) => {
  let c = points.push([]);
  //startY = startY + delta;
  endY = startY + delta + 4;
  for (let i = -2; i <= +2; i+=0.1) {
    points[c - 1].push([
      i,
      endY,
      endY + (Math.cos(i * 1.5 + Math.random()*0.35) / 12) * 6
    ])
  }
 points.shift();
 // setTimeout(generatePoints, 2000, delta + 0.1);
}

// setTimeout(generatePoints, 2000, 0.1);

const camera = {
  x: 0,
  y: 0.4,
  z: 0.7
};


let d = 0.3;

const proj = (point) => {
   {
    let z = point[2] + camera.z;
    let x = (point[0] *-d) / z;
    let y = ((point[1] + camera.y) *-d) / z;
    
    return [
      normalize(window.innerWidth, x),
      normalize(window.innerHeight,y + 0.2),
      z
    ]
  }
}

let delta = 0;

function update() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
    
  camera.z-=0.0012;
  camera.y-=0.0012;
  delta+=1;
  if (delta % 80 === 0) {
    generatePoints(delta / 1000);
  }
    
  for (let i = 1; i < points.length - 1; i+=1) {
    for (let j = 1; j < points[0].length - 1; j+=1) {
      let [x, y, z] = proj(points[i][j]);
      let [x1, y1] = proj(points[i-1][j]);
      let [x2, y2] = proj(points[i][j-1]);
      let [x3, y3] = proj(points[i+1][j]);
      let [x4, y4] = proj(points[i][j+1]);
      let alpha = (points[i][j][2] + 1) / ((delta/1000) + 3.5);
      ctx.strokeStyle = `rgba(255, 95, 158, ${1 - alpha})`;
      ctx.fillStyle = `rgba(34, 40, 49, ${1 - alpha})`;
      const maxSegment = Math.max(window.innerWidth, window.innerHeight);
      
        if (
          distance(x, y, x1, y1) < maxSegment
          && distance(x, y, x2, y2) < maxSegment
          && distance(x, y, x3, y3) < maxSegment
          && distance(x, y, x4, y4) < maxSegment
        ) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x3, y3);
          ctx.lineTo(x4, y4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      
    
      if (distance(x, y, x1, y1) < window.innerWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.stroke();
      }
      
      
      if (distance(x, y, x2, y2) < window.innerWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      if (distance(x, y, x3, y3) < window.innerWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      }
      
      if (distance(x, y, x4, y4) < window.innerWidth) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x4, y4);
        ctx.stroke();
      }
      
    }
  }
  
  requestAnimationFrame(update);
}

update()