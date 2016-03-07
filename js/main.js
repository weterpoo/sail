var w = bc.width = oc.width = window.innerWidth,
    h = bc.height = oc.height = window.innerHeight,
    bctx = bc.getContext('2d'),
    octx = oc.getContext('2d'),
    
    color = '#B99F65',
    chance = 1/8,
    minSize = w/50,
    maxSize = w/45,
    updatesBeforeRendering = 500,
    
    particles = [];

for(var i = 0; i < updatesBeforeRendering; ++i){
  if(Math.random() < chance){
    var ctx = Math.random() < .5,
        variation = Math.random() / 2.5;
    
    particles.push(new Particle(
      Math.random() * w,
      Math.random() * h,
      .5 + ctx/2 + variation,
      .2 + ctx/2 + variation,
      Math.random() * (maxSize - minSize) + minSize,
      ctx ? octx : bctx
    ));
  }
}

bctx.shadowColor = octx.shadowColor = '#B99F65';
bctx.fillStyle = octx.fillStyle = 'hsla(46, 39%, 54%, 0.77)';

function Particle(x, y, vx, vy, size, ctx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.ctx = ctx;
}
Particle.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
  
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.shadowBlur = this.size;
  ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

function anim(){
  window.requestAnimationFrame(anim);
  
  octx.clearRect(0, 0, w, h);
  bctx.clearRect(0, 0, w, h);
  
  tryInsertion();
  
  for(var i = 0; i < particles.length; ++i){
    
    particles[i].update();
    var p = particles[i];
    
    if(p.x - p.size > w ||
     p.y - this.size > h){
      particles.splice(i, 1);
      --i;
    }
  }
}

function tryInsertion(){
  if(Math.random() < chance){
    var x, y,
        size = Math.random() * (maxSize - minSize) + minSize,
        ctx = Math.random() < .5,
        variation = Math.random() / 2.5;
    
    if(Math.random() < .5){
      x = Math.random() * w - size;
      y = -size;
    } else {
      x = -size;
      y = Math.random() * h - size;
    }
    
    particles.push(new Particle(
      x,
      y,
      .5 + ctx/2 + variation,
      .2 + ctx/2 + variation,
      size,
      ctx ? octx : bctx
    ));
  }
}

anim();