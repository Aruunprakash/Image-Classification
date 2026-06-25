/* ════════════════════════════════════════
   SportVision AI — app.js
   Flask API: http://localhost:8000/classify_image
   ════════════════════════════════════════ */

'use strict';

const SERVER_URL = 'http://localhost:8000/classify_image';

/* ─── Athlete metadata ─── */
const ATHLETES = {
  virat_kohli:    { name: 'Virat Kohli',     sport: 'Cricket',  initials: 'VK', bg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', swatch: '#60a5fa' },
  messi:          { name: 'Lionel Messi',    sport: 'Football', initials: 'LM', bg: 'linear-gradient(135deg,#14532d,#22c55e)', swatch: '#4ade80' },
  roger_federer:  { name: 'Roger Federer',   sport: 'Tennis',   initials: 'RF', bg: 'linear-gradient(135deg,#78350f,#f59e0b)', swatch: '#fbbf24' },
  maria_sharapova:{ name: 'Maria Sharapova', sport: 'Tennis',   initials: 'MS', bg: 'linear-gradient(135deg,#881337,#f43f5e)', swatch: '#fb7185' },
  serena_williams:{ name: 'Serena Williams', sport: 'Tennis',   initials: 'SW', bg: 'linear-gradient(135deg,#4c1d95,#a855f7)', swatch: '#c084fc' },
};

/* Ticker content */
const TICKER_ITEMS = [
  '⚡ AI Face Recognition',
  '🏏 Virat Kohli',
  '⚽ Lionel Messi',
  '🎾 Roger Federer',
  '🎾 Maria Sharapova',
  '🎾 Serena Williams',
  '🔬 Wavelet Transform',
  '🤖 SVM Classifier',
  '📸 Upload & Identify',
];

/* ─── DOM refs ─── */
const dropZone      = document.getElementById('dropZone');
const dropInner     = document.getElementById('dropInner');
const imgPreviewWrap= document.getElementById('imgPreviewWrap');
const previewImg    = document.getElementById('previewImg');
const scanOverlay   = document.getElementById('scanOverlay');
const fileInput     = document.getElementById('fileInput');
const actionRow     = document.getElementById('actionRow');
const clearBtn      = document.getElementById('clearBtn');
const classifyBtn   = document.getElementById('classifyBtn');

const stateEmpty    = document.getElementById('stateEmpty');
const stateLoading  = document.getElementById('stateLoading');
const stateError    = document.getElementById('stateError');
const stateSuccess  = document.getElementById('stateSuccess');
const errTitle      = document.getElementById('errTitle');
const errMsg        = document.getElementById('errMsg');

const wbInitials    = document.getElementById('wbInitials');
const wbName        = document.getElementById('wbName');
const wbSport       = document.getElementById('wbSport');
const wbPct         = document.getElementById('wbPct');
const wbConfFill    = document.getElementById('wbConfFill');
const probList      = document.getElementById('probList');

const athleteCards  = document.querySelectorAll('.athlete-card');

let currentBase64   = null;

/* ════ INIT ════ */
buildTicker();
initDragDrop();
initFileInput();
initButtons();

/* ─── Ticker ─── */
function buildTicker() {
  const wrap = document.getElementById('tickerInner');
  if (!wrap) return;
  // Duplicate for seamless loop
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  wrap.innerHTML = doubled.map(t =>
    `<span class="ticker-item">${t}<span class="ticker-dot">●</span></span>`
  ).join('');
}

/* ─── Drag & Drop ─── */
function initDragDrop() {
  dropZone.addEventListener('click', (e) => {
    if (e.target === clearBtn || clearBtn.contains(e.target)) return;
    if (e.target === classifyBtn || classifyBtn.contains(e.target)) return;
    fileInput.click();
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-active');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) loadImage(file);
  });
}

/* ─── File Input ─── */
function initFileInput() {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) loadImage(file);
    fileInput.value = '';
  });
}

/* ─── Buttons ─── */
function initButtons() {
  clearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetAll();
  });
  classifyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentBase64) classifyImage(currentBase64);
  });
}

/* ─── Load Image ─── */
function loadImage(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    currentBase64 = dataUrl;

    previewImg.src = dataUrl;
    dropInner.style.display = 'none';
    imgPreviewWrap.style.display = 'block';
    actionRow.style.display = 'flex';

    showResult('empty');
    clearAthleteHighlight();
  };
  reader.readAsDataURL(file);
}

/* ─── Reset ─── */
function resetAll() {
  currentBase64 = null;
  previewImg.src = '';
  dropInner.style.display = 'flex';
  imgPreviewWrap.style.display = 'none';
  scanOverlay.classList.remove('active');
  actionRow.style.display = 'none';
  showResult('empty');
  clearAthleteHighlight();
}

/* ─── Classify ─── */
async function classifyImage(base64) {
  showResult('loading');
  scanOverlay.classList.add('active');
  classifyBtn.disabled = true;

  const formData = new FormData();
  formData.append('image_data', base64);

  try {
    const resp = await fetch(SERVER_URL, { method: 'POST', body: formData });

    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);

    const data = await resp.json();

    scanOverlay.classList.remove('active');
    classifyBtn.disabled = false;

    if (!data || data.length === 0) {
      showResult('error');
      errTitle.textContent = 'No Face Detected';
      errMsg.textContent = 'Please upload a clear photo where both eyes are fully visible.';
      return;
    }

    renderResult(data[0]);

  } catch (err) {
    scanOverlay.classList.remove('active');
    classifyBtn.disabled = false;
    showResult('error');
    errTitle.textContent = 'Connection Error';
    errMsg.textContent = 'Cannot reach the Flask server at localhost:8000. Make sure it is running.';
    console.error('Classify error:', err);
  }
}

/* ─── Render Result ─── */
function renderResult(result) {
  // Figure out which class key won
  const classDict = result.class_dictionary;  // { name: number }
  const classProbs = result.class_probability; // { number: prob }

  // Build a map: key -> probability
  const keyProbs = {};
  for (const [name, num] of Object.entries(classDict)) {
    keyProbs[name] = classProbs[num] ?? 0;
  }

  // Winner = the class with highest probability
  const winnerKey = Object.entries(keyProbs).sort((a, b) => b[1] - a[1])[0][0];
  const winnerProb = keyProbs[winnerKey];
  const winnerInfo = ATHLETES[winnerKey] || { name: winnerKey, sport: '—', initials: '??', bg: '#333', swatch: '#f59e0b' };

  // Update winner block
  wbInitials.textContent = winnerInfo.initials;
  wbInitials.style.background = winnerInfo.bg;
  wbName.textContent = winnerInfo.name;
  wbSport.textContent = winnerInfo.sport;
  wbPct.textContent = winnerProb.toFixed(1) + '%';

  showResult('success');

  // Animate confidence bar
  setTimeout(() => {
    wbConfFill.style.transform = `scaleX(${winnerProb / 100})`;
  }, 80);

  // Build probability bars — sorted descending
  const sorted = Object.entries(keyProbs).sort((a, b) => b[1] - a[1]);
  probList.innerHTML = '';

  sorted.forEach(([key, prob], i) => {
    const info = ATHLETES[key] || { name: key, initials: '?', swatch: '#888' };
    const isTop = i === 0;

    const item = document.createElement('div');
    item.className = 'prob-item';
    item.innerHTML = `
      <div class="prob-name">
        <span class="prob-swatch" style="background:${info.swatch}"></span>
        ${info.name}
      </div>
      <div class="prob-track">
        <div class="prob-fill${isTop ? ' top' : ''}" data-pct="${prob}"></div>
      </div>
      <span class="prob-val${isTop ? ' top' : ''}">${prob.toFixed(1)}%</span>
    `;
    probList.appendChild(item);
  });

  // Animate bars after DOM paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      probList.querySelectorAll('.prob-fill').forEach(bar => {
        const pct = parseFloat(bar.dataset.pct) / 100;
        bar.style.transform = `scaleX(${pct})`;
      });
    });
  });

  // Highlight the winning athlete card
  highlightAthlete(winnerKey);
}

/* ─── State Display ─── */
function showResult(state) {
  stateEmpty.style.display   = state === 'empty'   ? 'flex'  : 'none';
  stateLoading.style.display = state === 'loading' ? 'flex'  : 'none';
  stateError.style.display   = state === 'error'   ? 'flex'  : 'none';
  stateSuccess.style.display = state === 'success' ? 'flex'  : 'none';
}

/* ─── Athlete Card Highlight ─── */
function highlightAthlete(key) {
  clearAthleteHighlight();
  athleteCards.forEach(card => {
    if (card.dataset.key === key) card.classList.add('active');
  });
}
function clearAthleteHighlight() {
  athleteCards.forEach(c => c.classList.remove('active'));
}
