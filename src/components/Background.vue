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
let sakuras = [];

// Configuration for Sakura
const config = {
  amount: 40,
  colors: [
      'rgba(255, 183, 197, 0.9)', 
      'rgba(255, 192, 203, 0.9)', 
      'rgba(255, 209, 220, 0.9)',
      'rgba(248, 24, 148, 0.3)' 
  ]
};

// Check mobile
const isMobile = window.innerWidth < 768;
if (isMobile) {
    config.amount = 20;
}

class Sakura {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset(true);
    }
    
    reset(initial = false) {
        this.x = Math.random() * this.w;
        this.y = initial ? Math.random() * this.h : -20;
        this.size = Math.random() * 6 + 6; // 6-12px
        this.speedX = Math.random() * 0.5 - 0.25; 
        this.speedY = Math.random() * 1.5 + 1; 
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.03 - 0.015;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        // Sway
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.x += this.speedX + Math.sin(this.sway) * 0.6;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.sway += this.swaySpeed;
        
        // Reset if out of bounds
        if (this.y > this.h + 20 || this.x > this.w + 20 || this.x < -20) {
            this.reset();
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = this.color;
        
        // Draw Petal Shape
        ctx.beginPath();
        const s = this.size;
        ctx.moveTo(0, 0); 
        // Left curve
        ctx.bezierCurveTo(-s/2, -s/2, -s, -s*1.5, 0, -s);
        // Right curve
        ctx.bezierCurveTo(s, -s*1.5, s/2, -s/2, 0, 0);
        
        ctx.fill();
        ctx.restore();
    }
}

const init = () => {
    if(!canvas.value) return;
    resize();
    sakuras = [];
    for (let i = 0; i < config.amount; i++) {
        sakuras.push(new Sakura(canvas.value.width, canvas.value.height));
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
    
    for (let i = 0; i < sakuras.length; i++) {
        sakuras[i].update();
        sakuras[i].draw(ctx);
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
    z-index: 1;
    pointer-events: none;
}
</style>
