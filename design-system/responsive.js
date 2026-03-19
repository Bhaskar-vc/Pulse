// Pulse DS — Responsive sidebar toggle
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var ham     = document.querySelector('.sidebar-ham');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.sidebar-overlay');

    function openSidebar() {
      if (sidebar) sidebar.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      if (ham)     ham.classList.add('is-open');
      if (ham)     ham.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      if (ham)     ham.classList.remove('is-open');
      if (ham)     ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (ham)     ham.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Close on nav link click on mobile
    if (sidebar) {
      sidebar.querySelectorAll('.sidebar-link').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth < 768) closeSidebar();
        });
      });
    }

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeSidebar();
    });
  });
})();
