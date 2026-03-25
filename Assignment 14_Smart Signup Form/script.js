/* ================================================
   SMART SIGNUP FORM — script.js
   Real-time validation + password strength meter
   ================================================ */

'use strict';

// ── Helpers ──────────────────────────────────────
const $ = id => document.getElementById(id);

function showError(fieldGroupId, errId, msg) {
  const fg  = $(fieldGroupId);
  const err = $(errId);
  if (!fg || !err) return;
  fg.classList.remove('valid');
  fg.classList.add('invalid');
  err.textContent = msg;
  err.classList.add('visible');
}

function clearError(fieldGroupId, errId) {
  const fg  = $(fieldGroupId);
  const err = $(errId);
  if (!fg || !err) return;
  fg.classList.remove('invalid');
  fg.classList.add('valid');
  err.textContent = '';
  err.classList.remove('visible');
}

function clearNeutral(fieldGroupId, errId) {
  const fg  = $(fieldGroupId);
  const err = $(errId);
  if (!fg || !err) return;
  fg.classList.remove('valid', 'invalid');
  err.textContent = '';
  err.classList.remove('visible');
}

function shake(inputEl) {
  inputEl.classList.remove('shake');
  void inputEl.offsetWidth; // reflow
  inputEl.classList.add('shake');
  inputEl.addEventListener('animationend', () => inputEl.classList.remove('shake'), { once: true });
}

// ── Validators ───────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?\d[\d\s\-().]{6,18}\d)$/;

function validateName(value, label) {
  if (!value.trim()) return `${label} is required.`;
  if (value.trim().length < 2) return `${label} must be at least 2 characters.`;
  if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return `${label} contains invalid characters.`;
  return '';
}

function validateEmail(value) {
  if (!value.trim()) return 'Email address is required.';
  if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
  return '';
}

function validatePhone(value) {
  if (!value.trim()) return ''; // optional
  if (!PHONE_RE.test(value.trim())) return 'Please enter a valid phone number.';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  const score = getPasswordScore(value);
  if (score.level < 2) return 'Password is too weak. Add more character types.';
  return '';
}

function validateConfirm(value) {
  const pw = $('password').value;
  if (!value) return 'Please confirm your password.';
  if (value !== pw) return 'Passwords do not match.';
  return '';
}

// ── Password Strength ────────────────────────────
const REQUIREMENTS = [
  { id: 'req-length',  test: v => v.length >= 8,          label: 'At least 8 characters'  },
  { id: 'req-upper',   test: v => /[A-Z]/.test(v),        label: 'Uppercase letter'         },
  { id: 'req-lower',   test: v => /[a-z]/.test(v),        label: 'Lowercase letter'         },
  { id: 'req-number',  test: v => /\d/.test(v),           label: 'Number'                   },
  { id: 'req-special', test: v => /[^a-zA-Z0-9]/.test(v), label: 'Special character'        },
];

const STRENGTH_LEVELS = [
  { class: '',                label: 'Enter a password' },
  { class: 'strength-weak',   label: '🔴 Weak'          },
  { class: 'strength-fair',   label: '🟡 Fair'          },
  { class: 'strength-good',   label: '🔵 Good'          },
  { class: 'strength-strong', label: '🟢 Strong'        },
];

function getPasswordScore(value) {
  if (!value) return { level: 0, passed: 0 };
  const passed = REQUIREMENTS.filter(r => r.test(value)).length;
  let level;
  if (passed <= 1)      level = 1;
  else if (passed === 2) level = 1;
  else if (passed === 3) level = 2;
  else if (passed === 4) level = 3;
  else                   level = 4;
  return { level, passed };
}

function updateStrengthUI(value) {
  const meter       = $('strengthMeter');
  const reqList     = $('pwRequirements');
  const labelEl     = $('strengthLabel');
  const meterEl     = meter;

  if (!value) {
    meter.classList.remove('show');
    reqList.classList.remove('show');
    // Reset bars
    STRENGTH_LEVELS.forEach(s => meterEl.classList.remove(s.class));
    labelEl.textContent = STRENGTH_LEVELS[0].label;
    REQUIREMENTS.forEach(r => $(r.id) && $(r.id).classList.remove('met'));
    return;
  }

  meter.classList.add('show');
  reqList.classList.add('show');

  const { level } = getPasswordScore(value);

  // Remove all strength classes then apply current
  STRENGTH_LEVELS.forEach(s => { if (s.class) meterEl.classList.remove(s.class); });
  if (STRENGTH_LEVELS[level].class) meterEl.classList.add(STRENGTH_LEVELS[level].class);
  labelEl.textContent = STRENGTH_LEVELS[level].label;

  // Update requirement items
  REQUIREMENTS.forEach(req => {
    const el = $(req.id);
    if (!el) return;
    if (req.test(value)) {
      el.classList.add('met');
    } else {
      el.classList.remove('met');
    }
  });
}

// ── Toggle Password Visibility ───────────────────
function setupToggle(btnId, inputId, openId, closedId) {
  const btn    = $(btnId);
  const input  = $(inputId);
  const open   = $(openId);
  const closed = $(closedId);
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    open.style.display   = isPassword ? 'none'  : '';
    closed.style.display = isPassword ? ''      : 'none';
  });
}

// ── Inline Validation Listeners ──────────────────
function bindField(inputId, fgId, errId, validator) {
  const input = $(inputId);
  if (!input) return;

  // Validate on blur
  input.addEventListener('blur', () => {
    if (!input.value && !input.dataset.touched) return; // skip empty-untouched
    input.dataset.touched = 'true';
    const err = validator(input.value);
    if (err) { showError(fgId, errId, err); shake(input); }
    else      { clearError(fgId, errId); }
  });

  // Re-validate on input (if already touched)
  input.addEventListener('input', () => {
    if (!input.dataset.touched) return;
    const err = validator(input.value);
    if (err) showError(fgId, errId, err);
    else     clearError(fgId, errId);
  });
}

// ── Full Form Validation (on submit) ─────────────
function validateAll() {
  let ok = true;

  const checks = [
    { inputId: 'firstname', fgId: 'fg-firstname', errId: 'err-firstname', validate: v => validateName(v, 'First name') },
    { inputId: 'lastname',  fgId: 'fg-lastname',  errId: 'err-lastname',  validate: v => validateName(v, 'Last name')  },
    { inputId: 'email',     fgId: 'fg-email',     errId: 'err-email',     validate: validateEmail    },
    { inputId: 'phone',     fgId: 'fg-phone',     errId: 'err-phone',     validate: validatePhone    },
    { inputId: 'password',  fgId: 'fg-password',  errId: 'err-password',  validate: validatePassword },
    { inputId: 'confirm',   fgId: 'fg-confirm',   errId: 'err-confirm',   validate: validateConfirm  },
  ];

  checks.forEach(c => {
    const input = $(c.inputId);
    if (!input) return;
    input.dataset.touched = 'true';
    const err = c.validate(input.value);
    if (err) {
      showError(c.fgId, c.errId, err);
      shake(input);
      ok = false;
    } else {
      // phone optional — don't mark green if empty
      if (c.inputId === 'phone' && !input.value.trim()) {
        clearNeutral(c.fgId, c.errId);
      } else {
        clearError(c.fgId, c.errId);
      }
    }
  });

  // Terms
  const terms   = $('terms');
  const errTerms = $('err-terms');
  const fgTerms  = $('fg-terms');
  if (!terms.checked) {
    errTerms.textContent = 'You must agree to the terms to continue.';
    errTerms.classList.add('visible');
    fgTerms.classList.add('invalid');
    shake(terms.closest('.checkbox-label'));
    ok = false;
  } else {
    errTerms.textContent = '';
    errTerms.classList.remove('visible');
    fgTerms.classList.remove('invalid');
  }

  return ok;
}

// ── Init ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Toggle visibility
  setupToggle('togglePassword', 'password',  'eyeOpen',  'eyeClosed');
  setupToggle('toggleConfirm',  'confirm',   'eyeOpen2', 'eyeClosed2');

  // Inline validation
  bindField('firstname', 'fg-firstname', 'err-firstname', v => validateName(v, 'First name'));
  bindField('lastname',  'fg-lastname',  'err-lastname',  v => validateName(v, 'Last name'));
  bindField('email',     'fg-email',     'err-email',     validateEmail);
  bindField('phone',     'fg-phone',     'err-phone',     validatePhone);
  bindField('confirm',   'fg-confirm',   'err-confirm',   validateConfirm);

  // Password: strength meter + inline validation
  const pwInput = $('password');
  pwInput.addEventListener('input', () => {
    updateStrengthUI(pwInput.value);
    if (pwInput.dataset.touched) {
      const err = validatePassword(pwInput.value);
      if (err) showError('fg-password', 'err-password', err);
      else     clearError('fg-password', 'err-password');
    }
    // Live-update confirm if already touched
    const cfm = $('confirm');
    if (cfm.dataset.touched) {
      const err = validateConfirm(cfm.value);
      if (err) showError('fg-confirm', 'err-confirm', err);
      else     clearError('fg-confirm', 'err-confirm');
    }
  });
  pwInput.addEventListener('blur', () => {
    pwInput.dataset.touched = 'true';
    const err = validatePassword(pwInput.value);
    if (err) { showError('fg-password', 'err-password', err); shake(pwInput); }
    else      { clearError('fg-password', 'err-password'); }
  });

  // Form submit
  const form    = $('signupForm');
  const submitBtn = $('submitBtn');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateAll()) return;

    // Simulate async submission
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    await new Promise(res => setTimeout(res, 1800));

    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');

    // Show success
    const overlay = $('successOverlay');
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('show');
  });

  // Success → back
  $('btnBack').addEventListener('click', () => {
    const overlay = $('successOverlay');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('show');
    form.reset();
    // Reset all field states
    ['fg-firstname','fg-lastname','fg-email','fg-phone','fg-password','fg-confirm'].forEach(id => {
      const fg = $(id);
      if (fg) fg.classList.remove('valid','invalid');
    });
    ['err-firstname','err-lastname','err-email','err-phone','err-password','err-confirm','err-terms'].forEach(id => {
      const el = $(id);
      if (el) { el.textContent = ''; el.classList.remove('visible'); }
    });
    ['firstname','lastname','email','phone','password','confirm'].forEach(id => {
      const el = $(id);
      if (el) delete el.dataset.touched;
    });
    updateStrengthUI('');
  });

});
