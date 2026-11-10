(function () {
  const clockEl = document.getElementById('clock');
  const countEl = document.getElementById('count');
  const logType = document.getElementById('log-type');
  const logKey = document.getElementById('log-key');
  const logCode = document.getElementById('log-code');
  const inc = document.getElementById('inc');
  const dec = document.getElementById('dec');
  const reset = document.getElementById('reset');

  let count = 0;

  function renderCount() {
    countEl.textContent = String(count);
  }

  function updateClock() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const get = (t) => parts.find((p) => p.type === t)?.value ?? '--';
    clockEl.textContent = `${get('hour')}:${get('minute')}:${get('second')} PT`;
  }

  function logEvent(event) {
    logType.textContent = `type: ${event.type}`;
    logKey.textContent = `key: ${event.key ?? '—'}`;
    logCode.textContent = `code: ${event.code ?? '—'}`;
  }

  inc.addEventListener('click', () => {
    count += 1;
    renderCount();
  });
  dec.addEventListener('click', () => {
    count -= 1;
    renderCount();
  });
  reset.addEventListener('click', () => {
    count = 0;
    renderCount();
  });

  // Observe wearable directional / activation keys (and keyboard preview).
  // Do not preventDefault — let Chromium spatial navigation own focus + Enter.
  window.addEventListener('keydown', logEvent, true);
  window.addEventListener('keyup', logEvent, true);

  updateClock();
  setInterval(updateClock, 1000);
  renderCount();

  // Prefer a sensible initial focus target for band / D-pad.
  inc.focus();
})();
