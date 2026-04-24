// Pulse DS — Dark/Light theme toggle
(function() {
  var STORAGE_KEY = 'pulse-ds-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update all toggle button labels
    document.querySelectorAll('.theme-toggle-label').forEach(function(el) {
      el.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply saved theme immediately (before paint to avoid flash)
  var saved = localStorage.getItem(STORAGE_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  // Apply label text after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.theme-toggle-label').forEach(function(el) {
      el.textContent = saved === 'dark' ? 'Light mode' : 'Dark mode';
    });
  });

  window.__pulseToggleTheme = toggleTheme;
})();
