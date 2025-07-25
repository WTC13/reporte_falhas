function mostrarCamposOutros() {
  const modulo = document.getElementById('modulo');
  const outrosCampos = document.getElementById('outrosCampos');
  const outroModuloInput = document.getElementById('outro_modulo');

  if (!modulo || !outrosCampos || !outroModuloInput) return;

  if (modulo.value === 'Outros') {
    outrosCampos.style.display = 'block';
    outroModuloInput.setAttribute('required', 'required'); // torna obrigatório
  } else {
    outrosCampos.style.display = 'none';
    outroModuloInput.removeAttribute('required'); // remove obrigatoriedade
    outroModuloInput.value = ''; // limpa valor
  }
}
