/* =========================================================
   Navegação principal
   - Menu mobile com botão (aria-expanded)
   - Submenus abrem por clique/teclado (não só por hover)
   - Fecha com Escape e ao clicar fora
   - Marca a página atual com aria-current
   - Atualiza o ano no rodapé
   Sem JavaScript, o menu fica sempre visível (melhoria progressiva).
   ========================================================= */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  if (!header) return;

  var toggle = header.querySelector('.nav-toggle');
  var nav = header.querySelector('#site-nav');
  var subToggles = header.querySelectorAll('.sub-toggle');

  header.classList.add('js-nav');

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    var use = toggle.querySelector('use');
    if (use) use.setAttribute('href', '/assets/img/icons.svg#' + (open ? 'close' : 'menu'));
  }

  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  /* ---------- Submenus ---------- */
  function closeSubs(except) {
    subToggles.forEach(function (btn) {
      if (btn !== except) btn.setAttribute('aria-expanded', 'false');
    });
  }

  subToggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeSubs(btn);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) closeSubs(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openSub = header.querySelector('.sub-toggle[aria-expanded="true"]');
    if (openSub) {
      closeSubs(null);
      openSub.focus();
    } else if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Ao passar para desktop, repõe o estado do menu mobile */
  var mq = window.matchMedia('(min-width: 960px)');
  var onChange = function () { if (mq.matches) setMenu(false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);

  /* ---------- Página atual ---------- */
  var path = location.pathname.replace(/index\.html$/, '');
  header.querySelectorAll('.site-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href').replace(/index\.html$/, '');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
