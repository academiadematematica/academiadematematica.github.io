
const postsPerPage = 6;

function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}


let currentPage = getCurrentPage();

let artigos = [];

async function loadArtigos() {
  const res = await fetch("./conteudos/blog/artigos.json");
  artigos = await res.json();
}

function renderPosts() {
  const container = document.getElementById("blog-list");
  container.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  const posts = artigos.slice(start, end);

  posts.forEach(post => {
    container.innerHTML += `
      <div class="box box-grey">
        <div class="topo">
          <span class="titulo">${post.titulo}</span>
        </div>
        <div class="descricao">${post.descricao}</div>
        <a href="/conteudos/blog/${post.slug}.html">Ler artigo</a>
      </div>
    `;
  });
}

function renderPagination(currentPage, totalPages) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  function addButton(page, text = page) {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (page === currentPage) btn.classList.add("active");
    btn.onclick = () => goToPage(page);
    container.appendChild(btn);
  }

  if (currentPage > 3) {
    addButton(1);
    if (currentPage > 4) {
      const span = document.createElement("span");
      span.textContent = "...";
      container.appendChild(span);
    }
  }

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      addButton(i);
    }
  }

  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      const span = document.createElement("span");
      span.textContent = "...";
      container.appendChild(span);
    }
    addButton(totalPages);
  }
}

function goToPage(page) {
  currentPage = page;
  window.location.search = "?page=" + page;
  renderAll();
}

function renderAll() {
  renderPosts();

  const totalPages = Math.ceil(artigos.length / postsPerPage);
  renderPagination(currentPage, totalPages);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadArtigos();
  renderAll();
});