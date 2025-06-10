// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para a seção de agendamento
  const btnAgendar = document.querySelector('header a[href="#agendamento"]');
  btnAgendar.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#agendamento');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Atualiza opções de horário conforme data selecionada
  const todosHorarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const horariosOcupados = {
    "2025-06-12": ["09:00", "14:00"],
    "2025-06-13": ["10:00", "15:00", "16:00"],
    // Pode adicionar mais datas aqui
  };
  const inputData = document.getElementById("data");
  const selectHorario = document.getElementById("horario");

  const hoje = new Date().toISOString().split("T")[0];
  inputData.min = hoje;

  selectHorario.disabled = true;
  selectHorario.innerHTML = '<option value="">Selecione uma data primeiro</option>';

  inputData.addEventListener("change", () => {
    const dataSelecionada = inputData.value;
    selectHorario.innerHTML = "";

    if (!dataSelecionada) {
      selectHorario.innerHTML = '<option value="">Selecione uma data primeiro</option>';
      selectHorario.disabled = true;
      return;
    }

    const ocupados = horariosOcupados[dataSelecionada] || [];
    const horariosLivres = todosHorarios.filter(h => !ocupados.includes(h));

    if (horariosLivres.length === 0) {
      selectHorario.innerHTML = '<option value="">Nenhum horário disponível neste dia</option>';
      selectHorario.disabled = true;
      return;
    }

    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
    horariosLivres.forEach(h => {
      const option = document.createElement("option");
      option.value = h;
      option.textContent = h;
      selectHorario.appendChild(option);
    });

    selectHorario.disabled = false;
  });

  // Validação e envio do formulário
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
      selectHorario.disabled = true;
      selectHorario.innerHTML = '<option value="">Selecione uma data primeiro</option>';
      info.textContent = "";
    }, 3000);
  });
});
