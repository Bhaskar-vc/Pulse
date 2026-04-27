/* ══════════════════════════════════════════════
   PULSE DS — Page load skeleton + scroll reveal
   ══════════════════════════════════════════════ */
(function () {

  /* ── 1. Skeleton page-load overlay ── */
  function buildSkeleton() {
    var overlay = document.createElement('div');
    overlay.id = 'pulse-skeleton';
    overlay.innerHTML = [
      '<style>',
      '#pulse-skeleton{',
      '  position:fixed;inset:0;z-index:9998;',
      '  display:flex;align-items:stretch;',
      '  pointer-events:none;',
      '}',
      '#pulse-skeleton .sk-sidebar{',
      '  width:240px;min-width:240px;',
      '  background:var(--color-surface-card,#fff);',
      '  border-right:1px solid var(--color-border-subtle,#ebebf2);',
      '  padding:24px 16px;display:flex;flex-direction:column;gap:12px;',
      '}',
      '#pulse-skeleton .sk-main{',
      '  flex:1;padding:48px 56px;display:flex;flex-direction:column;gap:20px;',
      '  background:var(--color-surface-page,#f6f6fc);',
      '}',
      '.sk-bar{border-radius:6px;}',
      '.sk-animate{',
      '  background:linear-gradient(90deg,',
      '    var(--sk-a,#f0f0f8) 25%,',
      '    var(--sk-b,#e4e4f0) 50%,',
      '    var(--sk-a,#f0f0f8) 75%);',
      '  background-size:200% 100%;',
      '  animation:sk-pulse 1.4s ease-in-out infinite;',
      '}',
      'html[data-theme="dark"] .sk-animate{',
      '  --sk-a:#1e1e30;--sk-b:#252540;',
      '}',
      '@keyframes sk-pulse{',
      '  0%{background-position:200% 0}',
      '  100%{background-position:-200% 0}',
      '}',
      '#pulse-skeleton.fade-out{',
      '  transition:opacity .3s ease;',
      '  opacity:0;',
      '}',
      '@media(max-width:767px){',
      '  #pulse-skeleton .sk-sidebar{display:none;}',
      '  #pulse-skeleton .sk-main{padding:64px 16px 24px;}',
      '}',
      '</style>',
      /* sidebar skeleton */
      '<div class="sk-sidebar">',
      '  <div class="sk-bar sk-animate" style="height:40px;margin-bottom:8px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:60%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:80%;margin-top:4px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:70%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:85%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:60%;margin-top:16px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:75%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:90%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:65%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:80%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:10px;width:55%;"></div>',
      '</div>',
      /* main skeleton */
      '<div class="sk-main">',
      '  <div class="sk-bar sk-animate" style="height:12px;width:200px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:32px;width:340px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:14px;width:480px;max-width:100%;"></div>',
      '  <div class="sk-bar sk-animate" style="height:14px;width:380px;max-width:100%;margin-top:-8px;"></div>',
      '  <div style="display:flex;gap:8px;margin-top:4px;">',
      '    <div class="sk-bar sk-animate" style="height:22px;width:80px;border-radius:20px;"></div>',
      '    <div class="sk-bar sk-animate" style="height:22px;width:80px;border-radius:20px;"></div>',
      '    <div class="sk-bar sk-animate" style="height:22px;width:60px;border-radius:20px;"></div>',
      '  </div>',
      '  <div class="sk-bar sk-animate" style="height:1px;margin:8px 0;"></div>',
      '  <div class="sk-bar sk-animate" style="height:20px;width:160px;"></div>',
      '  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;">',
      '    <div class="sk-bar sk-animate" style="height:100px;"></div>',
      '    <div class="sk-bar sk-animate" style="height:100px;"></div>',
      '    <div class="sk-bar sk-animate" style="height:100px;"></div>',
      '    <div class="sk-bar sk-animate" style="height:100px;"></div>',
      '  </div>',
      '  <div class="sk-bar sk-animate" style="height:20px;width:200px;margin-top:8px;"></div>',
      '  <div class="sk-bar sk-animate" style="height:160px;border-radius:10px;"></div>',
      '</div>'
    ].join('');
    document.body.insertBefore(overlay, document.body.firstChild);
    return overlay;
  }

  /* ── 2. Dismiss skeleton when content is ready ── */
  function dismissSkeleton(overlay) {
    overlay.classList.add('fade-out');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 320);
  }

  /* ── 3. Scroll reveal ── */
  function initScrollReveal() {
    // Add reveal class to sections, demo boxes, and cards
    var selectors = [
      '.section',
      '.demo-box',
      '.stat-card',
      '.component-card',
      '.foundation-card',
      '.for-card',
      '.a11y-card',
      '.do-card',
      '.dont-card',
    ];
    var els = document.querySelectorAll(selectors.join(','));

    // Only apply if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      els.forEach(function (el) { el.style.opacity = '1'; });
      return;
    }

    els.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition =
        'opacity 0.45s cubic-bezier(0.16,1,0.3,1) ' + (i % 4) * 0.05 + 's,' +
        'transform 0.45s cubic-bezier(0.16,1,0.3,1) ' + (i % 4) * 0.05 + 's';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── 4. Stat counter animation ── */
  function animateCounters() {
    document.querySelectorAll('.stat-value[data-count]').forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      var duration = 900;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ── 5. Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    var overlay = buildSkeleton();

    // Short deliberate pause so skeleton is visible (feels like loading)
    var minTime = 400;
    var startTime = Date.now();

    function maybeRemove() {
      var elapsed = Date.now() - startTime;
      var wait = Math.max(0, minTime - elapsed);
      setTimeout(function () {
        dismissSkeleton(overlay);
        initScrollReveal();
        animateCounters();
      }, wait);
    }

    if (document.readyState === 'complete') {
      maybeRemove();
    } else {
      window.addEventListener('load', maybeRemove);
    }
  });

})();
