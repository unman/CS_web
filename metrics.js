// metrics.js
const metrics = {
  k_events: [],
  movement_id: 1,
  previous_epoch: Date.now() / 1000,
  focused_field: null
};

document.addEventListener('keydown', (e) => {
  metrics.k_events.push({
    Key: e.code || e.key,
    Event: 'pressed',
    Input_Box: metrics.focused_field || 'null',
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('keyup', (e) => {
  metrics.k_events.push({
    Key: e.code || e.key,
    Event: 'released',
    Input_Box: metrics.focused_field || 'null',
    Timestamp: new Date().toISOString(),
    Epoch: (Date.now() / 1000).toString()
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ['nameInput', 'numInput', 'cvcInput', 'expMonth', 'expYear'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('focus', () => { metrics.focused_field = id; });
      el.addEventListener('blur', () => { metrics.focused_field = null; });
    }
  });

  const btn = document.getElementById('enterBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      console.log(metrics);
      metrics.k_events = [];
      metrics.m_events = [];
      metrics.movement_id = 1;
      metrics.previous_epoch = Date.now() / 1000;
    });
  }
});
