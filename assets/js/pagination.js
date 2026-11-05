/* =========================================================
   Paginação da lista de artigos do blog.
   A lista completa já vem no HTML (gerada por blog/build.py),
   o que é bom para SEO; este script mostra 6 artigos por página.
   ========================================================= */
(function () {
  'use strict';

  var POSTS_PER_PAGE = 6;
  var JSON_URL = '/conteudos/blog/artigos.json'; // caminho absoluto (já não há <base href>)

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function getCurrentPage(total) {
    var page = parseInt(new URLSearchParams(location.search).get('page'), 10) || 1;
    return Math.min(Math.max(page, 1), Math.max(total, 1));
  }

  function renderPosts(artigos, page) {
    var container = document.getElementById('blog-list');
    var start = (page - 1) * POSTS_PER_PAGE;

    container.innerHTML = artigos.slice(start, start + POSTS_PER_PAGE).map(function (post) {
      var url = '/conteudos/blog/' + encodeURIComponent(post.slug) + '.html';
      return '' +
        '<article class="card card--link post-card">' +
          '<h3><a class="card__title-link" href="' + url + '">' + escapeHTML(post.titulo) + '</a></h3>' +
          '<p class="post-card__desc">' + escapeHTML(post.descricao) + '</p>' +
          '<span class="card__footer link-arrow" aria-hidden="true">Ler artigo ' +
            '<svg class="icon"><use href="/assets/img/icons.svg#arrow-right"></use></svg></span>' +
        '</article>';
    }).join('');
  }

  function renderPagination(current, totalPages) {
    var container = document.getElementById('pagination');
    container.innerHTML = '';
    if (totalPages <= 1) return;

    function addButton(page) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = page;
      btn.setAttribute('aria-label', 'Página ' + page);
      if (page === current) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'page');
      }
      btn.addEventListener('click', function () {
        // recarrega com ?page=N (o URL pode ser partilhado)
        location.search = '?page=' + page;
      });
      container.appendChild(btn);
    }

    function addEllipsis() {
      var span = document.createElement('span');
      span.textContent = '…';
      span.setAttribute('aria-hidden', 'true');
      container.appendChild(span);
    }

    if (current > 3) {
      addButton(1);
      if (current > 4) addEllipsis();
    }

    for (var i = current - 2; i <= current + 2; i++) {
      if (i > 0 && i <= totalPages) addButton(i);
    }

    if (current < totalPages - 2) {
      if (current < totalPages - 3) addEllipsis();
      addButton(totalPages);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('blog-list')) return;

    fetch(JSON_URL)
      .then(function (res) { return res.json(); })
      .then(function (artigos) {
        var totalPages = Math.ceil(artigos.length / POSTS_PER_PAGE);
        var page = getCurrentPage(totalPages);
        renderPosts(artigos, page);
        renderPagination(page, totalPages);
      })
      .catch(function () {
        /* Se falhar, fica a lista completa gerada no HTML */
      });
  });
})();
