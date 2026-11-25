jQuery(function ($) {
  const canvas = document.querySelector('#field');
  const ctx = canvas.getContext('2d');
  const {width, height} = canvas;
  const ground = height - 25;
  const birdX = 135;
  const pipeWidth = 54;
  const pipeSpacing = 245;
  const levels = [
    { min: 0, interval: 40, speed: 145, gap: 174 },
    { min: 5, interval: 30, speed: 161, gap: 163 },
    { min: 20, interval: 25, speed: 179, gap: 152 },
    { min: 40, interval: 20, speed: 194, gap: 142 }
  ];
  let state = 'ready';
  let birdY = 195;
  let velocity = 0;
  let pipes = [];
  let score = 0;
  let best = 0;
  let level = 0;
  let elapsed = 0;
  let previous = null;

  try { best = Number(localStorage.getItem('bamboo-flight-best')) || 0; } catch {}
  updateHud();

  function updateHud() {
    $('#level').text('Level ' + (level + 1));
    $('#score').text(score + ' / 50');
    $('#best').text('Kỷ lục ' + best);
  }

  function showOverlay(message, action) {
    $('#message').text(message);
    $('#start').text(action);
    $('#overlay').prop('hidden', false);
  }

  function addPipe(x) {
    const lastCenter = pipes.at(-1)?.center ?? 195;
    const center = Math.max(125, Math.min(270, lastCenter + (Math.random() - .5) * 108));
    const half = levels[level].gap / 2;
    pipes.push({x, center, top: center - half, bottom: center + half, passed: false});
  }

  function start() {
    birdY = 195;
    velocity = -215;
    pipes = [];
    score = 0;
    level = 0;
    addPipe(width - 110);
    updateHud();
    resume();
  }

  function resume() {
    state = 'playing';
    elapsed = 0;
    previous = null;
    $('#overlay').prop('hidden', true);
    $('#pause').text('Tạm dừng').prop('disabled', false);
  }

  function finish(won) {
    state = won ? 'won' : 'lost';
    try { localStorage.setItem('bamboo-flight-best', String(best)); } catch {}
    $('#pause').prop('disabled', true);
    showOverlay(won ? 'Chiến thắng! Đã vượt 50 cặp ống tre' : 'Kết thúc · ' + score + ' điểm', 'Chơi lại');
  }

  function update(seconds) {
    const {speed} = levels[level];
    velocity += 640 * seconds;
    birdY += velocity * seconds;
    if (birdY - 10 < 0 || birdY + 10 >= ground) {
      finish(false);
      return;
    }

    for (const pipe of pipes) {
      pipe.x -= speed * seconds;
      if (birdX + 10 > pipe.x - 3 && birdX - 10 < pipe.x + pipeWidth + 3 &&
          (birdY - 10 < pipe.top || birdY + 10 > pipe.bottom)) {
        finish(false);
        return;
      }
      if (!pipe.passed && pipe.x + pipeWidth + 3 < birdX - 10) {
        pipe.passed = true;
        score += 1;
        best = Math.max(best, score);
        if (levels[level + 1]?.min === score) level += 1;
        updateHud();
        if (score === 50) {
          finish(true);
          return;
        }
      }
    }

    const last = pipes.at(-1);
    if (last.x <= width - pipeSpacing) addPipe(last.x + pipeSpacing);
    pipes = pipes.filter(pipe => pipe.x + pipeWidth + 3 > 0);
  }

  function paint(animationOffset) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#a4e2d0');
    sky.addColorStop(1, '#fff2bf');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff3b5';
    ctx.beginPath();
    ctx.arc(527, 100, 38, 0, Math.PI * 2);
    ctx.fill();
    for (let hill = 0; hill < 5; hill += 1) {
      ctx.fillStyle = hill % 2 ? '#73ae83' : '#8ec095';
      ctx.beginPath();
      ctx.ellipse(hill * 154, ground + 12, 124, 92 + hill * 7, 0, Math.PI, 2 * Math.PI);
      ctx.fill();
    }
    for (const pipe of pipes) {
      const x = pipe.x - levels[level].speed * animationOffset;
      bamboo(x, 0, pipe.top, pipe.top - 10);
      bamboo(x, pipe.bottom, ground - pipe.bottom, pipe.bottom);
    }
    ctx.fillStyle = '#61935d';
    ctx.fillRect(0, ground, width, 6);
    ctx.fillStyle = '#c79b64';
    ctx.fillRect(0, ground + 6, width, height - ground - 6);

    ctx.save();
    ctx.translate(birdX, birdY + velocity * animationOffset);
    ctx.rotate(Math.max(-.28, Math.min(.45, velocity / 800)));
    ctx.fillStyle = '#135944';
    ctx.beginPath();
    ctx.moveTo(-9, 3); ctx.lineTo(-27, 12); ctx.lineTo(-11, -6); ctx.fill();
    oval(0, 0, 15, 11, '#137c67');
    oval(-5, 4, 9, 5, '#58c4a2');
    oval(8, -5, 9, 9, '#f3bf44');
    oval(11, -7, 2, 2, '#19382b');
    oval(17, -2, 4, 3, '#ed7752');
    ctx.restore();
  }

  function oval(x, y, rx, ry, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function bamboo(x, y, length, cap) {
    ctx.fillStyle = '#426638';
    ctx.fillRect(x, y, pipeWidth, length);
    ctx.fillStyle = '#a3be5a';
    ctx.fillRect(x + 4, y, pipeWidth - 8, length);
    ctx.fillStyle = '#c5d886';
    ctx.fillRect(x + 8, y, 7, length);
    ctx.fillStyle = '#6e8e44';
    for (let ring = y + 29; ring < y + length; ring += 38) ctx.fillRect(x, ring, pipeWidth, 3);
    ctx.fillRect(x - 3, cap, pipeWidth + 6, 10);
  }

  function frame(now) {
    if (state === 'playing') {
      elapsed += previous === null ? 0 : Math.min(now - previous, 80);
      while (state === 'playing' && elapsed >= levels[level].interval) {
        const interval = levels[level].interval;
        elapsed -= interval;
        update(interval / 1000);
      }
    }
    previous = now;
    paint(state === 'playing' ? elapsed / 1000 : 0);
    requestAnimationFrame(frame);
  }

  function flap() {
    if (state === 'paused') resume();
    else if (state !== 'playing') start();
    else velocity = -230;
  }

  $('#flap').on('click', flap);
  $('#start').on('click', () => state === 'paused' ? resume() : start());
  $('#pause').on('click', () => {
    if (state === 'paused') {
      resume();
    } else if (state === 'playing') {
      state = 'paused';
      $('#pause').text('Tiếp tục');
      showOverlay('Đã tạm dừng', 'Tiếp tục');
    }
  });
  $(document).on('keydown', event => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    if (!event.repeat) flap();
  });
  requestAnimationFrame(frame);
});


