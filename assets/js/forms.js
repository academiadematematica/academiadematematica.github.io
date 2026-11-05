/* =========================================================
   Envio de formulários (Formspree) - substitui os três
   ficheiros sendmessage.js anteriores.

   Uso no HTML:
     <form action="https://formspree.io/f/XXXX" method="POST"
           data-ajax data-success="/pagina-de-sucesso.html">
       ...
       <p class="form-status" data-form-status role="status" aria-live="polite" hidden></p>
       <button type="submit" class="btn btn--primary">Enviar</button>
     </form>

   - Sem JavaScript o formulário continua a funcionar (envio normal).
   - Evita envios duplicados (botão desativado durante o envio).
   - Mostra erros reais (rede ou servidor) em vez de falhar em silêncio.
   ========================================================= */
(function () {
  'use strict';

  var MSG_SERVER = 'Não foi possível enviar o pedido. Tenta novamente dentro de instantes ou contacta-nos por email.';
  var MSG_NETWORK = 'Parece não haver ligação à internet. Verifica a ligação e tenta novamente.';

  document.querySelectorAll('form[data-ajax]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('[type="submit"]');
    var label = button ? button.textContent : '';

    function showStatus(text, type) {
      if (!status) return;
      status.textContent = text;
      status.className = 'form-status form-status--' + type;
      status.hidden = false;
    }

    function setBusy(busy) {
      if (!button) return;
      button.disabled = busy;
      button.textContent = busy ? 'A enviar…' : label;
      form.setAttribute('aria-busy', String(busy));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.hidden = true;
      setBusy(true);

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            window.location.assign(form.getAttribute('data-success') || '/mensagem-enviada.html');
            return;
          }
          showStatus(MSG_SERVER, 'error');
          setBusy(false);
        })
        .catch(function () {
          showStatus(MSG_NETWORK, 'error');
          setBusy(false);
        });
    });
  });
})();
