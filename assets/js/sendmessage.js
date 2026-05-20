function showToast() {
  const t = document.getElementById("toast");
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 3000);
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/mzdyzojw", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });


  if (response.ok) {
    window.location.href = "mensagem-enviada.html";
  } else {
    showToast("Erro ao enviar mensagem");
  }
});
