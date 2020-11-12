import react, { useEffect, useState, memo } from "react";

const MatrixEffect = memo(() => {
  const [mounted, setMounted] = useState(false);
  let canvas = "";
  let ctx = "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    // Initialising the canvas
    canvas = window.document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 600;
  }

  // Setting up the letters
  const letters = "xABCDEF0123456789ABCDEF0123456789ABCDEF0123456789x0xABCDEF0123456789x0ABCDEF0123456789xABCDEF0123456789x".split(
    ""
  );

  // Setting up the columns
  const fontSize = 9,
    columns = canvas.width / fontSize + 5;

  // Setting up the drops
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  // Setting up the draw function
  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight + 600);
    for (let i = 0; i < drops.length; i++) {
      let text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.99) {
        drops[i] = 0;
      }
    }
  };

  if (mounted) {
    // Loop the animation
    setInterval(draw, 80);
  }

  return <canvas id="matrix-canvas"></canvas>;
});

export default MatrixEffect;
