
document.addEventListener("DOMContentLoaded", function () {

  const global = window.DEFAULT_ADS || {};
  const page = window.PAGE_ADS || {};

  const topAds = (page.top && page.top.length)
    ? page.top
    : (global.top || {});

  try {
    const track = document.querySelector(".track");
      
    track.innerHTML = topAds.map(ad => `
      <div class="slide">
        <a href="${ad.href}">
          <img src="${ad.img}" alt="${ad.alt || ''}">
        </a>
        ${ad.desc ? `<div class="description">${ad.desc}</div>` : ""}
      </div>
    `).join("");

    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const carousel = document.querySelector(".carousel");

    let index = 0;
    let interval = null;

    function updateSlide() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      updateSlide();
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      updateSlide();
    }

    function startAuto() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
    }

    function stopAuto() {
      clearInterval(interval);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    startAuto();
  } catch (error) {};

  // =========================
  // ⬅ LEFT (page override > global)
  // =========================
  function pickRandom(list) { 
    if (!list || !list.length) return null; 
    return list[Math.floor(Math.random() * list.length)]; 
  }
  
  const leftAds = (page.left && page.left.length)
    ? page.left
    : (global.left || {});

  try {
    const leftAd = pickRandom(leftAds);
    const leftBox = document.getElementById("ad-left");

    if (leftBox && leftAd) {
      leftBox.innerHTML = `
      <div class="ad-banner">
        <a href="${leftAd.href}">
          <img src="${leftAd.img}" alt="${leftAd.alt || ''}">
        </a>
        ${leftAd.desc ? `<div class="description">${leftAd.desc}</div>` : ""}
        </div>
      `;
    }
  } catch (error) {};

  // =========================
  // ➡ RIGHT (page override > global)
  // =========================
  const rightAds = (page.right && page.right.length)
    ? page.right
    : (global.right || {});

  try {
    const rightAd = pickRandom(rightAds);
    const rightBox = document.getElementById("ad-right");

    if (rightBox && rightAd) {
      rightBox.innerHTML = `
      <div class="ad-banner">
        <a href="${rightAd.href}">
          <img src="${rightAd.img}" alt="${rightAd.alt || ''}">
        </a>
        ${rightAd.desc ? `<div class="description">${rightAd.desc}</div>` : ""}
      </div>
      `;
    }
  } catch (error) {};

});
