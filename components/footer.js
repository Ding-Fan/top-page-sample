function createFooter() {
  const footer = document.createElement("footer");
  const p = document.createElement("p");

  const currentYear = new Date().getFullYear();
  p.textContent = `Copyright ${currentYear} s247142 Han Tei`;

  footer.style.cssText = `
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 1px;
    color: whitesmoke;
    font: 16px Rajdhani;
    text-align: center;
    background: rgba(1, 24, 31, 0.7);
  `;

  footer.appendChild(p);
  return footer;
}

// if not needed, comment out
document.addEventListener("DOMContentLoaded", function () {
  const footer = createFooter();
  document.body.appendChild(footer);
});
