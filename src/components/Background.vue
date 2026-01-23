<template>
  <div class="background-animation">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref(null);
let ctx = null;
let animationFrameId = null;
let particles = [];

// Configuration
const config = {
  particleColor: 'rgba(255, 255, 255, 0.7)',
  lineColor: 'rgba(255, 255, 255, 0.2)',
  particleAmount: 60,
  defaultSpeed: 0.5,
  variantSpeed: 0.5,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 150,
};

// Check mobile
const isMobile = window.innerWidth < 768;
if (isMobile) {
    config.particleAmount = 25;
}

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = config.defaultSpeed + Math.random() * config.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = config.particleColor;
    this.radius = config.defaultRadius + Math.random() * config.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }

  update(w, h) {
    this.border(w, h);
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border(w, h) {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

const init = () => {
    if(!canvas.value) return;
    resize();
    particles = [];
    for (let i = 0; i < config.particleAmount; i++) {
        particles.push(new Particle(canvas.value.width, canvas.value.height));
    }
    animate();
};

const resize = () => {
    if(!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
};

const draw = () => {
    if(!ctx || !canvas.value) return;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.value.width, canvas.value.height);
        particles[i].draw(ctx);
        
        // Draw connections
        for (let j = i; j < particles.length; j++) {
            let distance = Math.sqrt(
                Math.pow((particles[i].x - particles[j].x), 2) + 
                Math.pow((particles[i].y - particles[j].y), 2)
            );
            if (distance < config.linkRadius) {
                ctx.beginPath();
                ctx.strokeStyle = config.lineColor;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
};

const animate = () => {
    draw();
    animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
    if (canvas.value) {
        ctx = canvas.value.getContext('2d');
        window.addEventListener('resize', resize);
        init();
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
    if(animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* Above background image (-2 maybe?), below content */
    pointer-events: none;
}
</style>
