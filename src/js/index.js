function mostrarCamposOutros() {
  const modulo = document.getElementById('modulo');
  const outrosCampos = document.getElementById('outrosCampos');
  const outroModuloInput = document.getElementById('outro_modulo');

  if (!modulo || !outrosCampos || !outroModuloInput) return;

  if (modulo.value === 'Outros') {
    outrosCampos.style.display = 'block';
    outroModuloInput.setAttribute('required', 'required');
  } else {
    outrosCampos.style.display = 'none';
    outroModuloInput.removeAttribute('required');
    outroModuloInput.value = '';
  }
}

async function consultarProtocolo() {
  const protocoloInput = document.getElementById('protocolo');
  const resultadoDiv = document.getElementById('resultado'); // Essa div precisa existir no HTML

  if (!protocoloInput || !resultadoDiv) {
    console.error("Elemento #protocolo ou #resultado não encontrado.");
    return;
  }

  const protocolo = protocoloInput.value.trim();

  if (!protocolo) {
    resultadoDiv.innerHTML = `<p style="color:red;">Por favor, informe um protocolo.</p>`;
    return;
  }

  try {
    const res = await fetch(`/andamento?protocolo=${encodeURIComponent(protocolo)}`);
    const dados = await res.json();

    if (dados.sucesso) {
      resultadoDiv.innerHTML = `
        <p><strong>Nome:</strong> ${dados.dados.nome}</p>
        <p><strong>Email:</strong> ${dados.dados.email}</p>
        <p><strong>CNPJ:</strong> ${dados.dados.cnpj}</p>
        <p><strong>Data:</strong> ${dados.dados.data_reporte}</p>
        <p><strong>Módulo:</strong> ${dados.dados.modulo}</p>
        <p><strong>Outro Módulo:</strong> ${dados.dados.outro_modulo || '-'}</p>
        <p><strong>Mensagem:</strong> ${dados.dados.mensagem}</p>
      `;
    } else {
      resultadoDiv.innerHTML = `<p style="color:red;">${dados.mensagem}</p>`;
    }
  } catch (err) {
    resultadoDiv.innerHTML = `<p style="color:red;">Erro ao consultar protocolo.</p>`;
    console.error(err);
  }
}