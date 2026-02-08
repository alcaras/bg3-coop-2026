(function() {
  var page = window.location.pathname;
  var storageKey = 'bg3-gear-' + page;

  // Load saved state
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch(e) {}

  // Find all task-list checkboxes
  var checkboxes = document.querySelectorAll('input.task-list-item-checkbox');
  for (var i = 0; i < checkboxes.length; i++) {
    (function(cb, idx) {
      var li = cb.parentElement;
      while (li && li.tagName !== 'LI') li = li.parentElement;
      if (!li) return;

      var label = li.textContent.trim().substring(0, 60);
      var key = idx + ':' + label;

      // Replace disabled checkbox with an enabled clone
      var newCb = document.createElement('input');
      newCb.type = 'checkbox';
      newCb.className = cb.className;
      newCb.style.cursor = 'pointer';
      newCb.style.accentColor = '#d4a843';
      newCb.style.marginRight = '0.4em';
      newCb.style.transform = 'scale(1.1)';
      cb.parentNode.replaceChild(newCb, cb);

      // Restore saved state
      if (saved[key]) {
        newCb.checked = true;
        li.style.opacity = '0.5';
        li.style.textDecoration = 'line-through';
      }

      // Save on change
      newCb.addEventListener('change', function() {
        if (newCb.checked) {
          saved[key] = true;
          li.style.opacity = '0.5';
          li.style.textDecoration = 'line-through';
        } else {
          delete saved[key];
          li.style.opacity = '';
          li.style.textDecoration = '';
        }
        localStorage.setItem(storageKey, JSON.stringify(saved));
      });
    })(checkboxes[i], i);
  }

  // Save/restore collapsed act state
  var actDetails = document.querySelectorAll('details.act-section');
  var actKey = 'bg3-acts-' + page;
  var actSaved = {};
  try {
    actSaved = JSON.parse(localStorage.getItem(actKey)) || {};
  } catch(e) {}

  for (var j = 0; j < actDetails.length; j++) {
    (function(det) {
      var summ = det.querySelector('summary');
      if (!summ) return;
      var label = summ.textContent.trim();
      if (actSaved[label] === false) {
        det.removeAttribute('open');
      }
      det.addEventListener('toggle', function() {
        actSaved[label] = det.open;
        localStorage.setItem(actKey, JSON.stringify(actSaved));
      });
    })(actDetails[j]);
  }
})();
