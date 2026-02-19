// Prevent theme switch click from triggering navigation on parent links/overlays.
// This is necessary because some pages wrap large areas in <a> tags or have click reactions on ancestors.
(function () {
  function isThemeButton(el) {
    return el && (el.id === 'Theme_switch_button' || el.closest && el.closest('#Theme_switch_button'));
  }

  function guard(e) {
    if (!isThemeButton(e.target)) return;
    // Ensure the click doesn't bubble to <a> wrappers or other interactive parents.
    e.preventDefault();
    e.stopPropagation();
    // Some runtimes attach multiple listeners; stopImmediatePropagation is the safest here.
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

    // Ensure the element is not treated as a submit button anywhere.
    var btn = e.target.closest ? e.target.closest('#Theme_switch_button') : null;
    if (btn && btn.tagName === 'BUTTON' && !btn.getAttribute('type')) {
      btn.setAttribute('type', 'button');
    }
  }

  // Capture phase: intercept before anchor default navigation and before other handlers.
  document.addEventListener('click', guard, true);
  document.addEventListener('pointerdown', guard, true);
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && isThemeButton(e.target)) {
      guard(e);
    }
  }, true);
})();
