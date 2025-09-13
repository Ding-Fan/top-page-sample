function createFooter() {
  const footer = document.createElement("footer");
  const p = document.createElement("p");

  // Create animated icons
  const cogIcon = document.createElement("i");
  cogIcon.className = "fa fa-cog fa-spin animated";
  cogIcon.setAttribute("aria-hidden", "true");
  cogIcon.style.cssText = "font-size: 1.2em; margin-right: 0.5em;";

  const bicycleIcon = document.createElement("i");
  bicycleIcon.className = "fa fa-bicycle faa-passing animated";
  bicycleIcon.setAttribute("aria-hidden", "true");
  bicycleIcon.style.cssText = "font-size: 1.4em; margin-left: 0.5em;";

  // Create copyright text
  const currentYear = new Date().getFullYear();
  const copyrightText = document.createElement("span");
  copyrightText.className = "mgn-01";
  copyrightText.textContent = `Copyright ${currentYear} s247142 Han Tei`;

  // Assemble the footer content
  p.appendChild(cogIcon);
  p.appendChild(copyrightText);
  p.appendChild(bicycleIcon);

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
