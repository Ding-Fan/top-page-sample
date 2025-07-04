"use strict";

const OmikujiGame = (function () {
  const { animate } = anime;
  const state = {
    result: null,
    results: {
      0: {
        text: "大吉!!!!!",
        color: "#FF0000",
        fontSize: "55px",
        maxSpeed: 10,
        maxSize: 30,
        image: "img/star.png",
      },
      1: {
        text: "吉!!!!",
        color: "#c71585",
        fontSize: "50px",
        maxSpeed: 10,
        maxSize: 30,
        image: "img/sakura_hanabira.png",
      },
      2: {
        text: "中吉!!!",
        color: "#ff1493",
        fontSize: "45px",
        maxSpeed: 8,
        maxSize: 20,
        image: "img/sakura_hanabira.png",
      },
      3: {
        text: "小吉!!",
        color: "#ff69b4",
        fontSize: "40px",
        maxSpeed: 5,
        maxSize: 15,
        image: "img/sakura_hanabira.png",
      },
      4: {
        text: "末吉!",
        color: "#ff8c00",
        fontSize: "35px",
        maxSpeed: 5,
        maxSize: 20,
        image: "img/leaf.png",
      },
      5: {
        text: "凶。。",
        color: "#1e90ff",
        fontSize: "30px",
        maxSpeed: 5,
        maxSize: 20,
        image: "img/snowflakes.png",
      },
    },
    particles: {
      number: 100,
    },
  };

  const UIController = {
    elements: {},
    setButtonResult: function (result) {
      const buttonElement = UIController.elements.button;

      buttonElement.innerText = result.text;
      buttonElement.style.color = result.color;
      buttonElement.style.fontSize = result.fontSize;
      UIController.showSnow(result.maxSize, result.maxSpeed, result.image);
    },
    setEvil: function () {
      UIController.elements.background.classList.add("evil");
      ParticleSystem.createParticles(state.result);

      // HeaderAnimation.headerGlitch();

      const audioElement = document.createElement("audio");
      audioElement.src = "assets/sad_disappointment_chime.wav";
      audioElement.play().catch((error) => {
        console.warn("Audio playback failed:", error);
      });
    },
    showSnow: function (
      maxSize = 20,
      maxSpeed = 5,
      image = "img/sakura_hanabira.png"
    ) {
      // snowfall stop
      $(document).snowfall("clear");
      // jQueryのsnowfall
      $(document).ready(function () {
        $(document).snowfall({
          maxSpeed, // 最大速度
          minSpeed: 1, // 最小速度
          maxSize, // 最大サイズ
          minSize: 1, // 最小サイズ
          image,
        });
      });
    },
  };
  const GameController = {
    getRandomResult: function () {
      return Math.floor(Math.random() * Object.keys(state.results).length);
    },
    handleResult: function (result) {
      state.result = result;
      UIController.setButtonResult(state.results[state.result]);

      // if (state.result !== 2) {
      //   switch (result) {
      //     case 0:
      //       state.result = 0;
      //       UIController.setButtonResult(state.results[state.result]);
      //       ParticleSystem.createParticles(state.result);
      //       break;
      //     case 1:
      //       state.result = 1;
      //       UIController.setButtonResult(state.results[state.result]);
      //       break;
      //     case 2:
      //       state.result = 2;
      //       UIController.setButtonResult(state.results[state.result]);
      //       break;
      //   }
      // } else {
      //   // get the number part of fontSize
      //   const currentSize = parseFloat(
      //     UIController.elements.button.style.fontSize
      //   );
      //   if (currentSize > 200) {
      //     UIController.setEvil();
      //   } else {
      //     UIController.elements.button.style.fontSize = currentSize * 2 + "px";
      //   }
      // }
    },
  };
  const ParticleSystem = {
    createParticles: function (result) {
      const particleContainerElement = UIController.elements.particleContainer;

      // Clear any existing particles
      particleContainerElement.innerHTML = "";

      const createParticle = () => {
        const particleItemElement = document.createElement("div");
        particleItemElement.innerText = state.results[state.result].text;
        particleItemElement.style.color = state.results[state.result].color;
        particleItemElement.style.fontSize =
          state.results[state.result].fontSize;
        particleItemElement.classList.add("particle-item");

        particleItemElement.style.left = Math.random() * 100 + "vw";
        particleItemElement.style.top = Math.random() * -10 - 10 + "vh";
        particleContainerElement.appendChild(particleItemElement);
        animateParticle(particleItemElement);
      };

      const animateParticle = (item) => {
        animate(item, {
          y: [
            {
              to: "110vh",
              duration: Math.random() * 2000 + 2000,
            },
          ],
          delay: Math.random() * 1000,
        });
      };

      // let the particles go
      for (let i = 0; i < state.particles.number; i++) {
        createParticle();
      }
    },
  };
  const HeaderAnimation = {
    headerGlitch: function () {
      const headerElement = UIController.elements.headerElement;
      if (!headerElement) {
        console.error("Header element not found");
        return;
      }

      console.log("Header element", headerElement);

      animate(headerElement, {
        // scale: 5,
        x: 100,

        // x: [
        //   { value: -100, duration: 100, easing: "easeInOutQuad" },
        //   { value: 100, duration: 100, easing: "easeInOutQuad" },
        //   { value: -100, duration: 100, easing: "easeInOutQuad" },
        //   { value: 0, duration: 100, easing: "easeInOutQuad" },
        // ],
        // loop: true,
      });
    },
  };
  const EventHandlers = {
    setupEventListeners: function () {
      const buttonElement = UIController.elements.button;
      buttonElement.addEventListener("click", () => {
        GameController.handleResult(GameController.getRandomResult());
      });
    },
  };

  return {
    init: function () {
      // Cache DOM elements
      UIController.elements = {
        button: document.querySelector("#btn1"),
        background: document.querySelector("body"),
        particleContainer: document.querySelector(".particle-container"),
        headerElement: document.querySelector("header"),
      };

      // Verify required elements exist
      if (
        !UIController.elements.button ||
        !UIController.elements.background ||
        !UIController.elements.particleContainer ||
        !UIController.elements.headerElement
      ) {
        console.error("Required DOM elements not found");
        return;
      }

      // Set up event listeners
      EventHandlers.setupEventListeners();

      // Show welcome message
      const popMessage = "いらっしゃい！おみくじ引いてって！";
      setTimeout(() => {
        window.alert(popMessage);
      }, 5000);

      // ヘッダーのテキストエフェクト
      $("header").textillate({
        loop: false, // ループのオンオフ
        minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
        initialDelay: 2000, // 遅延時間
        autoStart: true, // アニメーションを自動的にスタート
        in: {
          // フェードインのエフェクトの詳細設定
          effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
          delayScale: 1.5, // 遅延時間の指数
          delay: 50, // 文字ごとの遅延時間
          sync: false, // trueはアニメーションをすべての文字に同時に適用
          shuffle: true, // trueは文字を順番にではなく、ランダムに
        },
      });
      // おみくじボタン(id="btn1") ボヤァと表示させる
      $(function () {
        ScrollReveal().reveal("#btn1", { duration: 9000 });
      });

      UIController.showSnow();
    },
  };
})();

// Initialize the game when DOM is ready
document.addEventListener("DOMContentLoaded", OmikujiGame.init, false);
// The third parameter (false) is for backwards compatibility with older browsers
// It's not needed in modern browsers
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#specifications
