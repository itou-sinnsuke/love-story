const progressBar = document.querySelector(".progress");
const loader = document.querySelector(".loader");

let progress = 0;

const timer = setInterval(() => {
  progress ++;

  progressBar.style.width = progress + "%";

  if (progress >= 100) {
    clearInterval(timer);

    // 淡出 loading
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";

      // 👉 显示主页
      document.body.classList.add("loaded");
    }, 500);
  }
}, 30);
