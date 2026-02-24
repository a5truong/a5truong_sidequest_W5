class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.bg = json.world?.bg ?? [235, 235, 235];
    this.gridStep = json.world?.gridStep ?? 160;
    this.symbols = json.symbols ?? [];
    this.obstacles = json.obstacles ?? [];

    // NEW: camera tuning knob from JSON (data-driven)
    this.camLerp = json.camera?.lerp ?? 0.12;
  }

  drawBackground() {
    background(220);
  }

  drawWorld() {
    noStroke();
    fill(this.bg[0], this.bg[1], this.bg[2]);
    rect(0, 0, this.w, this.h);

    stroke(245);
    for (let x = 0; x <= this.w; x += this.gridStep) line(x, 0, x, this.h);
    for (let y = 0; y <= this.h; y += this.gridStep) line(0, y, this.w, y);

    noStroke();
    fill(170, 190, 210);
    for (const o of this.obstacles) rect(o.x, o.y, o.w, o.h, o.r ?? 0);

    noStroke();
    fill(255, 120, 170, 230);

    for (const s of this.symbols) {
      const size = (s.r ?? 8) * 1.9;
      circle(s.x - size * 0.45, s.y - size * 0.25, size * 1.05);

      circle(s.x + size * 0.45, s.y - size * 0.25, size * 1.05);

      triangle(s.x - size, s.y, s.x + size, s.y, s.x, s.y + size * 1.25);
    }
  }
}
