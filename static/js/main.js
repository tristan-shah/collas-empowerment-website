// BibTeX copy button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copy-bibtex');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const text = document.getElementById('bibtex-content').textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  });
});
