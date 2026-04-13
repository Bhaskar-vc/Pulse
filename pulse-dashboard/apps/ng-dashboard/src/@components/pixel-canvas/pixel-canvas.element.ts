class Pixel {
  width: number; height: number; ctx: CanvasRenderingContext2D;
  x: number; y: number; color: string; speed: number;
  size: number; sizeStep: number; minSize: number;
  maxSizeInteger: number; maxSize: number;
  delay: number; counter: number; counterStep: number;
  isIdle: boolean; isReverse: boolean; isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width; this.height = canvas.height;
    this.ctx = ctx; this.x = x; this.y = y; this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.size = 0; this.sizeStep = Math.random() * 0.4; this.minSize = 0.5;
    this.maxSizeInteger = 2; this.maxSize = Math.random() * (2 - 0.5) + 0.5;
    this.delay = delay; this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false; this.isReverse = false; this.isShimmer = false;
  }
  draw() {
    const o = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + o, this.y + o, this.size, this.size);
  }
  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep;
    this.draw();
  }
  disappear() {
    this.isShimmer = false; this.counter = 0;
    if (this.size <= 0) { this.isIdle = true; return; }
    this.size -= 0.1; this.draw();
  }
  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.isReverse ? this.size -= this.speed : this.size += this.speed;
  }
}

class PixelCanvasElement extends HTMLElement {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixels: Pixel[];
  animation: number | null;
  timeInterval: number;
  timePrevious: number;
  reducedMotion: boolean;
  _initialized: boolean;
  _parent: Element | null;
  _ro?: ResizeObserver;
  _onEnter?: () => void;
  _onLeave?: () => void;

  constructor() {
    super();
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.pixels = []; this.animation = null;
    this.timeInterval = 1000 / 60; this.timePrevious = performance.now();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    this._initialized = false; this._parent = null;
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = ':host{display:grid;inline-size:100%;block-size:100%;overflow:hidden;}';
    shadow.appendChild(style); shadow.appendChild(this.canvas);
  }
  get colors(): string[] { return (this.dataset['colors'] as string)?.split(',') || ['#f8fafc','#f1f5f9','#cbd5e1']; }
  get gap(): number { return Math.max(4, Math.min(50, Number(this.dataset['gap']) || 5)); }
  get speed(): number { return this.reducedMotion ? 0 : Math.max(0, Math.min(100, Number(this.dataset['speed']) || 35)) * 0.001; }
  get noFocus(): boolean { return this.hasAttribute('data-no-focus'); }
  get variant(): string { return this.dataset['variant'] || 'default'; }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;
    this._parent = this.parentElement;
    requestAnimationFrame(() => {
      this.handleResize();
      const ro = new ResizeObserver(() => requestAnimationFrame(() => this.handleResize()));
      ro.observe(this); this._ro = ro;
    });
    this._onEnter = () => this.handleAnimation('appear');
    this._onLeave = () => this.handleAnimation('disappear');
    this._parent?.addEventListener('mouseenter', this._onEnter);
    this._parent?.addEventListener('mouseleave', this._onLeave);
  }
  disconnectedCallback() {
    this._initialized = false; this._ro?.disconnect();
    this._parent?.removeEventListener('mouseenter', this._onEnter!);
    this._parent?.removeEventListener('mouseleave', this._onLeave!);
    if (this.animation) { cancelAnimationFrame(this.animation); this.animation = null; }
    this._parent = null;
  }
  handleResize() {
    if (!this.ctx || !this._initialized) return;
    const rect = this.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(rect.width) * dpr;
    this.canvas.height = Math.floor(rect.height) * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.setTransform(1,0,0,1,0,0); this.ctx.scale(dpr, dpr);
    this.createPixels();
  }
  getDistanceToBottomLeft(x: number, y: number): number {
    return Math.sqrt(x * x + (this.canvas.height - y) ** 2);
  }
  createPixels() {
    if (!this.ctx) return; this.pixels = [];
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = this.reducedMotion ? 0 : this.getDistanceToBottomLeft(x, y);
        this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay));
      }
    }
  }
  handleAnimation(name: 'appear' | 'disappear') {
    if (this.animation) cancelAnimationFrame(this.animation);
    const animate = () => {
      this.animation = requestAnimationFrame(animate);
      const now = performance.now(), passed = now - this.timePrevious;
      if (passed < this.timeInterval) return;
      this.timePrevious = now - (passed % this.timeInterval);
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let allIdle = true;
      for (const p of this.pixels) { p[name](); if (!p.isIdle) allIdle = false; }
      if (allIdle) { cancelAnimationFrame(this.animation!); this.animation = null; }
    };
    animate();
  }
}

if (!customElements.get('pixel-canvas')) {
  customElements.define('pixel-canvas', PixelCanvasElement);
}
