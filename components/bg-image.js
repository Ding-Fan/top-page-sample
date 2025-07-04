// Background Image Component
function createBgImage(imageSrc) {
  const bgContainer = document.createElement("div");
  const bgImg = document.createElement("img");

  bgImg.src = imageSrc;

  bgContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: -1;
    overflow: hidden;
  `;

  bgImg.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  `;

  bgContainer.appendChild(bgImg);
  return bgContainer;
}
