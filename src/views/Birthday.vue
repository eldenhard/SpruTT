<template>
  <div class="img_block">
    <p>С днем рождения, <br> {{ user_name }}</p>
    <img src="../assets/new_box.jpg" alt="" />
    <canvas id="canvas" ref="canvas"></canvas>

    <button type="button" class="btn btn-danger" @click="closeCongratulation">
      Закрыть
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: localStorage.getItem("vuex").auth.user.user?.first_name,
      W: window.innerWidth,
      H: window.innerHeight,
      maxConfettis: 150,
      particles: [],
      possibleColors: [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "Pink",
        "SlateBlue",
        "LightBlue",
        "Gold",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson",
      ],
    };
  },
  methods: {
    closeCongratulation() {
      this.$emit("close"); // Отправляем событие "close" родительскому компоненту
    },
    randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    },
    confettiParticle() {
      this.particles.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H - this.H,
        r: this.randomFromTo(11, 33),
        d: Math.random() * this.maxConfettis + 11,
        color:
          this.possibleColors[
            Math.floor(Math.random() * this.possibleColors.length)
          ],
        tilt: Math.floor(Math.random() * 33) - 11,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        draw: function (context) {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(this.x + this.tilt + this.r / 3, this.y);
          context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
          context.stroke();
        },
      });
    },
    Draw() {
      const context = this.$refs.canvas.getContext("2d");
      context.clearRect(0, 0, this.W, this.H);

      for (let i = 0; i < this.maxConfettis; i++) {
        const particle = this.particles[i];
        if (particle) {
          particle.tiltAngle += particle.tiltAngleIncremental;
          particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
          particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

          // If a confetti has fluttered out of view, bring it back to above the viewport
          if (
            particle.x > this.W + 30 ||
            particle.x < -30 ||
            particle.y > this.H
          ) {
            particle.x = Math.random() * this.W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
          }

          particle.draw(context);
        }
      }
      requestAnimationFrame(this.Draw);
    },
    resizeCanvas() {
      this.W = window.innerWidth;
      this.H = window.innerHeight;
      this.$refs.canvas.width = this.W;
      this.$refs.canvas.height = this.H;
    },
  },
  mounted() {
    // Ensure the canvas element is available
    if (this.$refs.canvas) {
      this.$refs.canvas.width = this.W;
      this.$refs.canvas.height = this.H;

      // Create particles
      for (let i = 0; i < this.maxConfettis; i++) {
        this.confettiParticle();
      }

      // Start animation
      this.Draw();

      // Add event listener for window resize
      window.addEventListener("resize", this.resizeCanvas);
    }
  },
  beforeDestroy() {
    // Clean up event listener on component destruction
    window.removeEventListener("resize", this.resizeCanvas);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.img_block {
  height: 94vh;
  width: 100vw;
}
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
  font-family: "Great Vibes", cursive;
  font-size: 8em;
  color: brown;
}
img {
  width: 100%;
  height: 100%;
}
h1 {
  position: absolute;
  margin-top: 30vh;
  width: 100%;
  text-align: center;
  font-size: 333%;
  font-family: sans-serif;
  color: grey;
  opacity: 0.5;
}
h2 {
  position: absolute;
  margin-top: 40vh;
  width: 100%;
  text-align: center;
  font-size: 333%;
  font-family: sans-serif;
  color: grey;
  opacity: 0.5;
}
canvas {
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
}
button {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 25%;
}
</style>





