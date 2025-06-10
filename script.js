document.addEventListener('DOMContentLoaded', () => {
  const btnAgendar = document.querySelector('header a[href="#agendamento"]');

  btnAgendar.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#agendamento');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-agendamento");
  const info = document.querySelector(".info");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const data = form.data.value;
    const horario = form.horario.value;

    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (!nome || !telefone || !data || !horario) {
      info.style.color = "red";
      info.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    if (!telefoneRegex.test(telefone)) {
      info.style.color = "red";
      info.textContent = "Por favor, informe um telefone válido.";
      return;
    }

    info.style.color = "#25d366";
    info.textContent = `Agendamento enviado! ${nome}, aguarde nossa confirmação pelo telefone ${telefone}.`;

    setTimeout(() => {
      form.reset();
      info.textContent = "";
    }, 3000);
  });
});
