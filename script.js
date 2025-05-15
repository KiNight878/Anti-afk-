const fileInput = document.getElementById('fileInput');
const codeBox = document.getElementById('codeBox');
const toast = document.getElementById('toast');

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    showToast("⏳ Carregando arquivo...");
    const reader = new FileReader();
    reader.onload = function (e) {
      codeBox.value = e.target.result;
      showToast("✅ Arquivo carregado com sucesso!");
    };
    reader.onerror = function () {
      showToast("❌ Erro ao ler o arquivo!");
    };
    reader.readAsText(file);
  } else {
    showToast("⚠️ Nenhum arquivo selecionado.");
  }
});

function copyToClipboard() {
  const text = codeBox.value;
  if (!text.trim()) {
    showToast("⚠️ Nada para copiar!");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => showToast("📋 Código copiado para a área de transferência!"))
    .catch(() => showToast("❌ Erro ao copiar o código."));
}

function resetEditor() {
  codeBox.value = '';
  fileInput.value = '';
  showToast("♻️ Caixa de texto resetada.");
}

function showToast(message) {
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
