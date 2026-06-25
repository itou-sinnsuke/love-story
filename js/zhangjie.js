// 阅读进度条
const bar = document.getElementById("progress-bar");
if (bar) {
  window.addEventListener("scroll", () => {
    const scrolled = document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
  });
}
