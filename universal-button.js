(function () {
  const backButtonContainer = document.getElementById("back-button-container");
  const backButton = document.createElement("button");
  backButton.textContent = "戻る";
  backButton.addEventListener("click", () => {
    window.history.back();
  });
  backButtonContainer.appendChild(backButton);
})();
