(function () {
  const backButtonContainer = document.getElementById("back-button-container");
  const backButton = document.createElement("button");
  backButton.textContent = "戻る";
  backButton.style.position = "fixed";
  backButton.style.top = "10px";
  backButton.style.left = "10px";
  backButton.addEventListener("click", () => {
    window.history.back();
  });
  backButtonContainer.appendChild(backButton);
})();
