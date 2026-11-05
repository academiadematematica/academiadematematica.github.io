/* =========================================================
   Banners promocionais próprios (não são anúncios AdSense).
   - Sidebars dos artigos: #ad-left / #ad-right (escolha aleatória)
   - Carrossel do topo: .carousel .track (atualmente desativado no HTML)
   Dados por defeito em /assets/data/ads-default.js (window.DEFAULT_ADS);
   uma página pode sobrepor com window.PAGE_ADS.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var global = window.DEFAULT_ADS || {};
  var page = window.PAGE_ADS || {};

  function pick(name) {
    return (page[name] && page[name].length) ? page[name] : (global[name] || []);
  }

  function pickRandom(list) {
    if (!list || !list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
  }

  /* Cria o HTML de um banner com elementos DOM (sem innerHTML de dados) */
  function buildBanner(ad, className) {
    var wrap = document.createElement('div');
    wrap.className = className;

    var link = document.createElement('a');
    link.href = ad.href;

    var img = document.createElement('img');
    img.src = ad.img;
    img.alt = ad.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    if (ad.width) img.width = ad.width;
    if (ad.height) img.height = ad.height;

    link.appendChild(img);
    wrap.appendChild(link);

    if (ad.desc) {
      var desc = document.createElement('div');
      desc.className = 'description';
      desc.textContent = ad.desc;
      wrap.appendChild(desc);
    }
    return wrap;
  }

  /* ---------- Carrossel (só corre se existir no HTML) ---------- */
  var track = document.querySelector('.carousel .track');
  var topAds = pick('top');

  if (track && topAds.length) {
    topAds.forEach(function (ad) { track.appendChild(buildBanner(ad, 'slide')); });

    var carousel = track.closest('.carousel');
    var slides = track.querySelectorAll('.slide');
    var index = 0;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var go = function (step) {
      index = (index + step + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
    };
    var start = function () {
      if (reduceMotion || slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(function () { go(1); }, 5000);
    };
    var stop = function () { clearInterval(timer); };

    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    if (next) next.addEventListener('click', function () { go(1); });
    if (prev) prev.addEventListener('click', function () { go(-1); });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    start();
  }

  /* ---------- Sidebars ---------- */
  [['left', 'ad-left'], ['right', 'ad-right']].forEach(function (pair) {
    var box = document.getElementById(pair[1]);
    var ad = pickRandom(pick(pair[0]));
    if (box && ad) box.appendChild(buildBanner(ad, 'ad-banner'));
  });
});
