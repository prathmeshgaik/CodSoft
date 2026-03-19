

'use strict';

/* ══════════════════════════
   STATE
══════════════════════════ */
const calc = {
  displayVal:   '0',   // number shown in the big display
  operandA:     null,  // stored first number (float)
  operator:     null,  // pending operator string
  enteringB:    false, // true while user is typing second operand
  justEqualed:  false, // true right after "=" was pressed
  repeatOp:     null,  // for repeat-equals: last operator
  repeatVal:    null,  // for repeat-equals: last b operand
  hasDecimal:   false, // whether current entry already has a dot
  exprString:   '',    // text shown in the expression bar
  history:      [],    // [{expr, result}]
  MAX_DIGITS:   10,
};

/* ══════════════════════════
   DOM REFS
══════════════════════════ */
const DOM = {
  result:        document.getElementById('result'),
  expression:    document.getElementById('expression'),
  clearBtn:      document.getElementById('clearBtn'),
  historyList:   document.getElementById('historyList'),
  historyToggle: document.getElementById('historyToggle'),
  historyPanel:  document.getElementById('historyPanel'),
  clearHistory:  document.getElementById('clearHistory'),
  cursor:        document.querySelector('.display__cursor'),
};

function decimalPlaces(n) {
  const s = String(n);
  const i = s.indexOf('.');
  return i === -1 ? 0 : s.length - i - 1;
}

function safeCalc(a, op, b) {
  let result;

  if (op === '+' || op === '−') {
    const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
    const ia = Math.round(a * factor);
    const ib = Math.round(b * factor);
    result   = op === '+' ? (ia + ib) / factor : (ia - ib) / factor;
  } else if (op === '×') {
    result = a * b;
  } else if (op === '÷') {
    if (b === 0) return null;
    result = a / b;
  } else {
    return b;
  }

  // Strip any residual floating-point noise (e.g. 0.30000000000000004)
  result = parseFloat(result.toPrecision(12));
  return result;
}

function fmtNum(raw) {
  if (raw === 'Error') return 'Error';

  const n = parseFloat(raw);
  if (!isFinite(n)) return 'Error';

  // Huge / tiny → exponential
  if (Math.abs(n) >= 1e13)                          return n.toExponential(4);
  if (n !== 0 && Math.abs(n) < 1e-8)                return n.toExponential(4);

  const parts   = raw.split('.');
  const intNum  = parseInt(parts[0], 10);
  const decPart = parts[1]; // undefined if no decimal

  const sign    = n < 0 ? '−' : '';
  const intFmt  = isNaN(intNum)
    ? '0'
    : Math.abs(intNum).toLocaleString('en-US');

  return decPart !== undefined
    ? sign + intFmt + '.' + decPart.slice(0, 8)
    : sign + intFmt;
}

/* ══════════════════════════
   RENDER
══════════════════════════ */
function render() {
  const fmt = fmtNum(calc.displayVal);
  DOM.result.textContent = fmt;

  // Font-size classes
  DOM.result.classList.remove('small', 'xsmall', 'error');
  if (fmt === 'Error') {
    DOM.result.classList.add('error');
  } else if (fmt.length > 10) {
    DOM.result.classList.add('xsmall');
  } else if (fmt.length > 7) {
    DOM.result.classList.add('small');
  }

  // Expression bar
  DOM.expression.textContent = calc.exprString || '\u00A0';

  // AC ↔ C toggle
  DOM.clearBtn.textContent =
    (calc.displayVal !== '0' || calc.operandA !== null) ? 'C' : 'AC';

  // Operator button highlight
  document.querySelectorAll('.btn--op').forEach(b => b.classList.remove('active'));
  if (calc.operator && !calc.enteringB && !calc.justEqualed) {
    const opBtn = document.querySelector(`.btn--op[data-value="${calc.operator}"]`);
    if (opBtn) opBtn.classList.add('active');
  }

  // Blinking cursor — only show while actively typing a number
  if (DOM.cursor) {
    const typing = !calc.justEqualed && calc.displayVal !== 'Error';
    DOM.cursor.classList.toggle('hidden', !typing);
  }
}

/** 0-9 digit input */
function inputDigit(d) {
  // After "=" — start fresh number (but allow chaining with operator next)
  if (calc.justEqualed) {
    calc.operandA    = null;
    calc.operator    = null;
    calc.enteringB   = false;
    calc.justEqualed = false;
    calc.hasDecimal  = false;
    calc.exprString  = '';
    calc.displayVal  = d === '0' ? '0' : d;
    render(); return;
  }

  // First digit of operand B
  if (calc.operator !== null && !calc.enteringB) {
    calc.enteringB  = true;
    calc.hasDecimal = false;
    calc.displayVal = d === '0' ? '0' : d;
    render(); return;
  }

  if (calc.displayVal === 'Error') {
    calc.displayVal = d === '0' ? '0' : d;
    calc.hasDecimal = false;
    render(); return;
  }

  // Digit limit
  const digits = calc.displayVal.replace(/^-/, '').replace('.', '');
  if (digits.length >= calc.MAX_DIGITS) return;

  // Replace leading zero (but not "0.")
  if (calc.displayVal === '0') {
    calc.displayVal = d;
  } else if (calc.displayVal === '-0') {
    calc.displayVal = '-' + d;
  } else {
    calc.displayVal += d;
  }
  render();
}

/** Decimal point */
function inputDecimal() {
  // After "=" — start "0."
  if (calc.justEqualed) {
    calc.operandA    = null;
    calc.operator    = null;
    calc.enteringB   = false;
    calc.justEqualed = false;
    calc.exprString  = '';
    calc.displayVal  = '0.';
    calc.hasDecimal  = true;
    render(); return;
  }
  // Start "0." for operandB
  if (calc.operator !== null && !calc.enteringB) {
    calc.enteringB  = true;
    calc.hasDecimal = true;
    calc.displayVal = '0.';
    render(); return;
  }
  if (calc.hasDecimal) return;       // Already has a dot
  if (calc.displayVal === 'Error') {
    calc.displayVal = '0.';
    calc.hasDecimal = true;
    render(); return;
  }
  calc.displayVal += '.';
  calc.hasDecimal  = true;
  render();
}

function inputOperator(op) {
  if (calc.displayVal === 'Error') return;
  const cur = parseFloat(calc.displayVal);

  if (calc.operandA !== null && calc.operator !== null && calc.enteringB) {
    // CHAIN — evaluate immediately
    const res = safeCalc(calc.operandA, calc.operator, cur);
    if (res === null) { showError(); return; }
    calc.operandA   = res;
    calc.displayVal = String(res);
    calc.exprString = fmtNum(String(res)) + ' ' + op;
  } else if (calc.justEqualed) {
    // Continue from result
    calc.operandA    = cur;
    calc.exprString  = fmtNum(calc.displayVal) + ' ' + op;
    calc.justEqualed = false;
  } else {
    // Store current display as operandA (or just change the operator)
    calc.operandA   = cur;
    calc.exprString = fmtNum(calc.displayVal) + ' ' + op;
  }

  calc.operator   = op;
  calc.enteringB  = false;
  calc.hasDecimal = false;
  calc.repeatOp   = null;
  calc.repeatVal  = null;
  render();
}


function inputEquals() {
  if (calc.displayVal === 'Error') return;

  // Nothing at all to compute
  if (calc.operandA === null && calc.repeatOp === null) {
    calc.exprString  = fmtNum(calc.displayVal) + ' =';
    calc.justEqualed = true;
    render(); return;
  }

  let a, op, b;

  if (calc.justEqualed && calc.repeatOp !== null) {
    // ── REPEAT EQUALS ──
    a  = parseFloat(calc.displayVal);
    op = calc.repeatOp;
    b  = calc.repeatVal;
    calc.exprString = fmtNum(String(a)) + ' ' + op + ' ' + fmtNum(String(b)) + ' =';
  } else {
    // ── NORMAL EQUALS ──
    a  = calc.operandA;
    op = calc.operator;
    // If user pressed "=" without typing B, re-use A as B (like 5+ then =)
    b  = calc.enteringB ? parseFloat(calc.displayVal) : parseFloat(calc.displayVal);
    calc.exprString = fmtNum(String(a)) + ' ' + op + ' ' + fmtNum(String(b)) + ' =';
    // Save for repeat
    calc.repeatOp  = op;
    calc.repeatVal = b;
  }

  const result = safeCalc(a, op, b);
  if (result === null) { showError(); return; }

  addHistory(calc.exprString, fmtNum(String(result)));

  calc.displayVal  = String(result);
  calc.operandA    = null;
  calc.operator    = null;
  calc.enteringB   = false;
  calc.hasDecimal  = calc.displayVal.includes('.');
  calc.justEqualed = true;
  render();
  animateResult();
}

/** AC or C */
function inputClear() {
  if (DOM.clearBtn.textContent === 'C') {
    // C — only clears the current entry; keeps operandA + operator
    calc.displayVal = '0';
    calc.hasDecimal = false;
    if (calc.operator) {
      // Restore expression to show just "A op"
      calc.exprString = fmtNum(String(calc.operandA)) + ' ' + calc.operator;
      calc.enteringB  = false;
    }
  } else {
    // AC — full reset
    Object.assign(calc, {
      displayVal:  '0',
      operandA:    null,
      operator:    null,
      enteringB:   false,
      justEqualed: false,
      repeatOp:    null,
      repeatVal:   null,
      hasDecimal:  false,
      exprString:  '',
    });
  }
  render();
}

/** Toggle negative / positive */
function inputSign() {
  if (calc.displayVal === '0' || calc.displayVal === 'Error') return;
  calc.displayVal = calc.displayVal.startsWith('-')
    ? calc.displayVal.slice(1)
    : '-' + calc.displayVal;
  render();
}


function inputPercent() {
  if (calc.displayVal === 'Error') return;
  const cur = parseFloat(calc.displayVal);
  let result;

  if (calc.operandA !== null && (calc.operator === '+' || calc.operator === '−')) {
    result = (calc.operandA * cur) / 100;
  } else {
    result = cur / 100;
  }

  result = parseFloat(result.toPrecision(12));
  calc.displayVal = String(result);
  calc.hasDecimal = calc.displayVal.includes('.');
  render();
}

/** Delete last character */
function inputBackspace() {
  if (calc.displayVal === 'Error') { inputClear(); return; }
  if (calc.justEqualed) return;  // Can't backspace a final result

  if (calc.displayVal.length <= 1 ||
      (calc.displayVal.length === 2 && calc.displayVal.startsWith('-'))) {
    calc.displayVal = '0';
    calc.hasDecimal = false;
  } else {
    if (calc.displayVal.endsWith('.')) calc.hasDecimal = false;
    calc.displayVal = calc.displayVal.slice(0, -1);
  }
  render();
}

/* ── ADVANCED ── */

function inputSqrt() {
  if (calc.displayVal === 'Error') return;
  const n = parseFloat(calc.displayVal);
  if (n < 0) { showError(); return; }
  const r = parseFloat(Math.sqrt(n).toPrecision(10));
  calc.exprString  = '√(' + fmtNum(calc.displayVal) + ')';
  calc.displayVal  = String(r);
  calc.hasDecimal  = calc.displayVal.includes('.');
  calc.operandA    = null;
  calc.operator    = null;
  calc.justEqualed = true;
  render(); animateResult();
}

function inputSquare() {
  if (calc.displayVal === 'Error') return;
  const n = parseFloat(calc.displayVal);
  const r = parseFloat((n * n).toPrecision(12));
  calc.exprString  = '(' + fmtNum(calc.displayVal) + ')²';
  calc.displayVal  = String(r);
  calc.hasDecimal  = calc.displayVal.includes('.');
  calc.operandA    = null;
  calc.operator    = null;
  calc.justEqualed = true;
  render(); animateResult();
}

function inputInverse() {
  if (calc.displayVal === 'Error') return;
  const n = parseFloat(calc.displayVal);
  if (n === 0) { showError(); return; }
  const r = parseFloat((1 / n).toPrecision(12));
  calc.exprString  = '1/(' + fmtNum(calc.displayVal) + ')';
  calc.displayVal  = String(r);
  calc.hasDecimal  = calc.displayVal.includes('.');
  calc.operandA    = null;
  calc.operator    = null;
  calc.justEqualed = true;
  render(); animateResult();
}

/* ══════════════════════════
   ERROR
══════════════════════════ */
function showError() {
  Object.assign(calc, {
    displayVal:  'Error',
    operandA:    null,
    operator:    null,
    enteringB:   false,
    justEqualed: false,
    repeatOp:    null,
    repeatVal:   null,
    exprString:  'Cannot divide by zero',
  });
  render();
  animateError();
}

/* ══════════════════════════
   ANIMATIONS
══════════════════════════ */
function animateError() {
  const el = document.getElementById('calculator');
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 450);
}

function animateResult() {
  DOM.result.classList.remove('pop');
  void DOM.result.offsetWidth;
  DOM.result.classList.add('pop');
  setTimeout(() => DOM.result.classList.remove('pop'), 270);
}

function animateBtn(btn) {
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 120);

  // Ripple
  const rpl = document.createElement('span');
  rpl.classList.add('ripple');
  const sz = Math.max(btn.offsetWidth, btn.offsetHeight);
  Object.assign(rpl.style, {
    width: sz + 'px', height: sz + 'px',
    left: '50%', top: '50%',
    marginLeft: -(sz / 2) + 'px',
    marginTop:  -(sz / 2) + 'px',
    position: 'absolute',
  });
  btn.appendChild(rpl);
  setTimeout(() => rpl.remove(), 550);
}

/* ══════════════════════════
   HISTORY PANEL
══════════════════════════ */
function addHistory(expr, result) {
  calc.history.unshift({ expr, result });
  if (calc.history.length > 60) calc.history.pop();
  renderHistory();
}

function renderHistory() {
  DOM.historyList.innerHTML = '';
  if (!calc.history.length) {
    DOM.historyList.innerHTML =
      '<li class="history-empty">No calculations yet…</li>';
    return;
  }
  calc.history.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML =
      `<div class="history-item__expr">${entry.expr}</div>` +
      `<div class="history-item__result">${entry.result}</div>`;
    li.addEventListener('click', () => {
      calc.displayVal  = String(parseFloat(entry.result.replace(/,/g, '').replace(/−/g, '-')));
      calc.operandA    = null;
      calc.operator    = null;
      calc.enteringB   = false;
      calc.justEqualed = true;
      calc.hasDecimal  = calc.displayVal.includes('.');
      calc.exprString  = entry.expr;
      render();
    });
    DOM.historyList.appendChild(li);
  });
}

DOM.historyToggle.addEventListener('click', () =>
  DOM.historyPanel.classList.toggle('open')
);

DOM.clearHistory.addEventListener('click', () => {
  calc.history = [];
  renderHistory();
});

/* ══════════════════════════
   CLICK DELEGATION
══════════════════════════ */
document.getElementById('calculator').addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  animateBtn(btn);

  const { action, value } = btn.dataset;
  switch (action) {
    case 'number':    inputDigit(value);    break;
    case 'decimal':   inputDecimal();       break;
    case 'operator':  inputOperator(value); break;
    case 'equals':    inputEquals();        break;
    case 'clear':     inputClear();         break;
    case 'sign':      inputSign();          break;
    case 'percent':   inputPercent();       break;
    case 'backspace': inputBackspace();     break;
    case 'sqrt':      inputSqrt();          break;
    case 'square':    inputSquare();        break;
    case 'inverse':   inputInverse();       break;
  }
});

/* ══════════════════════════
   KEYBOARD SUPPORT
══════════════════════════ */
const KEYS = {
  '0':() => inputDigit('0'), '1':() => inputDigit('1'),
  '2':() => inputDigit('2'), '3':() => inputDigit('3'),
  '4':() => inputDigit('4'), '5':() => inputDigit('5'),
  '6':() => inputDigit('6'), '7':() => inputDigit('7'),
  '8':() => inputDigit('8'), '9':() => inputDigit('9'),
  '.': inputDecimal,   ',': inputDecimal,
  '+': () => inputOperator('+'),
  '-': () => inputOperator('−'),
  '*': () => inputOperator('×'),
  '/': () => inputOperator('÷'),
  'Enter': inputEquals,  '=': inputEquals,
  'Backspace': inputBackspace,
  'Delete': inputClear,  'Escape': inputClear,
  '%': inputPercent,
};

const KEY_SELECTORS = {
  'Enter':     '[data-action="equals"]',
  '=':         '[data-action="equals"]',
  'Backspace': '[data-action="backspace"]',
  'Escape':    '[data-action="clear"]',
  'Delete':    '[data-action="clear"]',
  '+': '[data-value="+"][data-action="operator"]',
  '-': '[data-value="−"][data-action="operator"]',
  '*': '[data-value="×"][data-action="operator"]',
  '/': '[data-value="÷"][data-action="operator"]',
  '%': '[data-action="percent"]',
};

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const fn = KEYS[e.key];
  if (!fn) return;
  e.preventDefault();
  fn();
  const sel = KEY_SELECTORS[e.key] ||
    `[data-value="${e.key}"][data-action="number"]`;
  const btn = document.querySelector(sel);
  if (btn) animateBtn(btn);
});

/* ══════════════════════════
   INIT
══════════════════════════ */
render();
renderHistory();
