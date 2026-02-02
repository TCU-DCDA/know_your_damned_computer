(() => {
  const memoryStore = new Map();

  function safeGet(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch {
      return memoryStore.has(key) ? memoryStore.get(key) : fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      memoryStore.set(key, value);
    }
  }

  function getPageKey() {
    return window.location.pathname || 'index';
  }

  function ensureProgressBar() {
    if (document.querySelector('.kydc-progress')) return;

    const bar = document.createElement('div');
    bar.className = 'kydc-progress';
    bar.innerHTML = `
      <div class="kydc-progress__bar" aria-hidden="true"></div>
      <div class="kydc-progress__text" aria-live="polite">Progress: 0%</div>
    `;
    document.body.appendChild(bar);
  }

  function updateProgress() {
    const bar = document.querySelector('.kydc-progress__bar');
    const text = document.querySelector('.kydc-progress__text');
    if (!bar || !text) return;

    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const percent = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;

    bar.style.width = `${percent}%`;
    text.textContent = `Progress: ${percent}%`;

    const stored = JSON.parse(safeGet('kydc_progress', '{}'));
    stored[getPageKey()] = percent;
    safeSet('kydc_progress', JSON.stringify(stored));
  }

  function restoreProgress() {
    const stored = JSON.parse(safeGet('kydc_progress', '{}'));
    const percent = stored[getPageKey()];
    if (typeof percent === 'number') {
      const bar = document.querySelector('.kydc-progress__bar');
      const text = document.querySelector('.kydc-progress__text');
      if (bar && text) {
        bar.style.width = `${percent}%`;
        text.textContent = `Progress: ${percent}%`;
      }
    }
  }

  function setupProgressTracking() {
    ensureProgressBar();
    restoreProgress();

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  }

  function setupExerciseButtons() {
    const buttons = document.querySelectorAll('.kydc-exercise');
    if (!buttons.length) return;

    const store = JSON.parse(safeGet('kydc_exercises', '{}'));
    const pageKey = getPageKey();
    const completed = store[pageKey] || {};

    buttons.forEach((btn) => {
      const id = btn.getAttribute('data-exercise-id');
      if (!id) return;
      if (completed[id]) {
        btn.classList.add('is-complete');
        btn.textContent = 'Completed';
      }

      btn.addEventListener('click', () => {
        btn.classList.add('is-complete');
        btn.textContent = 'Completed';
        const next = JSON.parse(safeGet('kydc_exercises', '{}'));
        next[pageKey] = next[pageKey] || {};
        next[pageKey][id] = true;
        safeSet('kydc_exercises', JSON.stringify(next));
      });
    });
  }

  function buildReadingMode() {
    if (document.getElementById('kydc-reading-mode')) return;

    const overlay = document.createElement('div');
    overlay.id = 'kydc-reading-mode';
    overlay.innerHTML = `
      <div class="kydc-reading-overlay" role="dialog" aria-modal="true" aria-label="Reading mode">
        <button class="kydc-reading-close" type="button" aria-label="Close reading mode">Close</button>
        <div class="kydc-reading-content"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function openReadingMode() {
    buildReadingMode();
    const overlay = document.getElementById('kydc-reading-mode');
    const content = overlay.querySelector('.kydc-reading-content');
    const source = document.querySelector('main .content') || document.querySelector('main') || document.body;
    content.innerHTML = source.innerHTML;
    overlay.classList.add('is-open');
    document.body.classList.add('kydc-reading-active');

    trapFocus(overlay);
  }

  let lastFocusedElement = null;
  let readingModeKeydown = null;

  function closeReadingMode() {
    const overlay = document.getElementById('kydc-reading-mode');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('kydc-reading-active');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function trapFocus(container) {
    const focusableSelector = [
      'a[href]',
      'button',
      'textarea',
      'input',
      'select',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    const focusable = container.querySelectorAll(focusableSelector);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    lastFocusedElement = document.activeElement;
    first.focus();

    if (readingModeKeydown) {
      container.removeEventListener('keydown', readingModeKeydown);
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeReadingMode();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    readingModeKeydown = onKeydown;
    container.addEventListener('keydown', onKeydown);
  }

  function setupReadingModeButton() {
    if (!window.location.pathname.includes('/guides/')) return;
    if (document.querySelector('.kydc-reading-toggle')) return;

    const target = document.querySelector('main .content') || document.querySelector('main');
    if (!target) return;

    const button = document.createElement('button');
    button.className = 'kydc-reading-toggle';
    button.type = 'button';
    button.textContent = 'Reading Mode';
    button.addEventListener('click', openReadingMode);
    target.prepend(button);

    buildReadingMode();
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('kydc-reading-close')) {
        closeReadingMode();
      }
    });
  }

  function setupMobileTocToggle() {
    const toc = document.querySelector('.toc');
    if (!toc || document.querySelector('.kydc-toc-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'kydc-toc-toggle';
    toggle.type = 'button';
    toggle.textContent = 'Contents';
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('kydc-toc-open');
    });
    toc.parentElement.insertBefore(toggle, toc);
  }

  function setupPlatformTabs() {
    const tabSets = document.querySelectorAll('.platform-tabs');
    tabSets.forEach((tabSet) => {
      const buttons = tabSet.querySelectorAll('.tab-btn');
      const tabs = tabSet.querySelectorAll('.tab-content');
      if (!buttons.length || !tabs.length) return;

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('data-tab');
          buttons.forEach((btn) => btn.classList.remove('active'));
          tabs.forEach((tab) => tab.classList.remove('active'));
          button.classList.add('active');
          const activeTab = tabSet.querySelector(`.tab-content.${target}`);
          if (activeTab) {
            activeTab.classList.add('active');
          }
        });
      });

      if (!tabSet.querySelector('.tab-btn.active')) {
        buttons[0].classList.add('active');
        tabs[0].classList.add('active');
      }
    });
  }

  function init() {
    setupProgressTracking();
    setupExerciseButtons();
    setupReadingModeButton();
    setupMobileTocToggle();
    setupPlatformTabs();
  }

  window.kydc = {
    markExerciseComplete: (id) => {
      const store = JSON.parse(safeGet('kydc_exercises', '{}'));
      const pageKey = getPageKey();
      store[pageKey] = store[pageKey] || {};
      store[pageKey][id] = true;
      safeSet('kydc_exercises', JSON.stringify(store));
    },
    safeGet,
    safeSet
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('quarto:page-load', () => {
    init();
  });
})();
