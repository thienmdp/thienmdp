import { useEffect } from 'react';

interface WaveConfig {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

interface LineConfig {
  spring: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

interface Position {
  x: number;
  y: number;
}

class Wave {
  private phase: number;
  private offset: number;
  private frequency: number;
  private amplitude: number;
  private value: number;

  constructor(config: WaveConfig = {}) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
    this.value = 0;
  }

  update(): number {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class Line {
  private spring: number = 0;
  private friction: number = 0;
  private nodes: Node[] = [];

  constructor(config: LineConfig) {
    this.init(config);
  }

  init(config: LineConfig): void {
    this.spring = config.spring + 0.1 * Math.random() - 0.02;
    this.friction = E.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];

    for (let i = 0; i < E.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];

      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * E.dampening;
        node.vy += prev.vy * E.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  }

  draw(): void {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const curr = this.nodes[i];
      const next = this.nodes[i + 1];
      x = 0.5 * (curr.x + next.x);
      y = 0.5 * (curr.y + next.y);
      ctx.quadraticCurveTo(curr.x, curr.y, x, y);
    }

    const i = this.nodes.length - 2;
    const curr = this.nodes[i];
    const next = this.nodes[i + 1];
    ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

let ctx: CanvasContext;
let wave: Wave;
const pos: Position = { x: 0, y: 0 };
const lines: Line[] = []; // Changed from let to const

function initLines(): void {
  // Clear the array while keeping the reference
  lines.splice(0, lines.length);
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
  }
}

function handlePointerMove(e: MouseEvent | TouchEvent): void {
  if ('touches' in e) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
  e.preventDefault();
}

function handleTouchStart(e: TouchEvent): void {
  if (e.touches.length === 1) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  }
}

function onMousemove(e: MouseEvent | TouchEvent): void {
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove);
  document.addEventListener('mousemove', handlePointerMove);
  document.addEventListener('touchmove', handlePointerMove);
  document.addEventListener('touchstart', handleTouchStart);

  handlePointerMove(e);
  initLines();
  render();
}

function render(): void {
  if (ctx.running) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = `hsla(${Math.round(wave.update())},50%,50%,0.2)`;
    ctx.lineWidth = 1;

    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw();
    }

    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas(): void {
  const canvas = ctx.canvas;
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
}

const useCanvasCursor = () => {
  // Remove ': void' return type
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    ctx = canvas.getContext('2d') as CanvasContext;
    ctx.running = true;
    ctx.frame = 1;

    wave = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    const handleFocus = () => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    };

    const handleBlur = () => {
      ctx.running = true;
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    resizeCanvas();

    return () => {
      ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);
};

export default useCanvasCursor;
