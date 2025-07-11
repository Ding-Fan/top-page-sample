(function () {
  const backButtonContainer = document.getElementById("back-button-container");
  const backButton = document.createElement("button");
  backButton.textContent = "戻る";
  backButton.style.position = "fixed";
  backButton.style.top = "10px";
  backButton.style.left = "10px";
  backButton.style.zIndex = "999";
  backButton.style.padding = "10px 10px";
  backButton.style.backgroundColor = "#007222";
  backButton.style.color = "#ffffff";
  backButton.style.border = "none";
  backButton.style.borderRadius = "5px";
  backButton.addEventListener("click", () => {
    window.history.back();
  });
  backButtonContainer.appendChild(backButton);
})();
