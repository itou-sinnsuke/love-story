// ============================================================
//  在这里维护照片数据，src 填相对于 photos.html 的路径
// ============================================================
const PHOTOS = [
  {
    src: "../img/photos/机场.jpg",
    title: "初见",
    date: "2026-03-13",
    location: "兰州中川国际机场",
    desc: "你是我放在心上的人，我愿意跨过三千公里只为陪在你身边",
    tag: "初次见面",
  },
  {
    src: "../img/photos/初见.jpg",
    title: "第一晚",
    date: "2026-03-13",
    location: "兰州中川机场酒店",
    desc: "被你看到我的小习惯了",
    tag: "初次见面",
  },
  {
    src: "../img/photos/中山桥.jpg",
    title: "出门玩",
    date: "2026-03-14",
    location: "兰州市白塔山",
    desc: "原来这就是兰州呀",
    tag: "初次见面",
  },
  {
    src: "../img/photos/电玩.jpg",
    title: "第一次一起去电玩城",
    date: "2026-03-15",
    location: "兰州市南关十字",
    desc: "我们一起打电玩，一起唱歌，好幸福",
    tag: "初次见面",
  },
  {
    src: "../img/photos/万达.jpg",
    title: "在万达广场",
    date: "2025-03-16",
    location: "城关区万达广场",
    desc: "我希望自己是寒冷冬天里的一杯奶茶，为你带来温暖和甜蜜",
    tag: "初次见面",
  },
  {
    src: "../img/photos/KTV.jpg",
    title: "放声歌唱",
    date: "2026-03-17",
    location: "兰州中山路",
    desc: "唉，都说我唱歌跑调啦~\n想和你合唱《有点甜》",
    tag: "初次见面",
  },
  {
    src: "../img/photos/省博.jpg",
    title: "这个地方要避雷",
    date: "2026-03-18",
    location: "甘肃省博物馆",
    desc: "堂堂省博物馆，好无聊欸，倒是收集到了我喜欢的章",
    tag: "初次见面",
  },
  {
    src: "../img/photos/兰大.jpg",
    title: "这就是双一流大学欸",
    date: "2026-03-19",
    location: "兰州大学",
    desc: "原来这就是985・211大学，果然比我的学校大多了，但看起来好冷清是什么鬼",
    tag: "初次见面",
  },
  {
    src: "../img/photos/火车站.jpg",
    title: "相见时难别亦难",
    date: "2026-03-22",
    location: "兰州火车站",
    desc: "短暂的见面后又要分开，如果时间可以重来，我想我不会选择出国了",
    tag: "初次见面",
  },
];

// ============================================================
//  以下无需修改
// ============================================================
const wall = document.getElementById("photo-wall");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbTitle = document.getElementById("lb-title");
const lbDate = document.getElementById("lb-date");
const lbLoc = document.getElementById("lb-loc");
const lbDesc = document.getElementById("lb-desc");
const lbTag = document.getElementById("lb-tag");
const lbClose = document.getElementById("lb-close");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");

let current = 0;

// 渲染照片墙
PHOTOS.forEach((photo, i) => {
  const item = document.createElement("div");
  item.className = "photo-item";
  item.innerHTML = `
    <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    <div class="photo-overlay">
      <p class="overlay-title">${photo.title}</p>
      ${photo.location ? `<p class="overlay-loc">📍 ${photo.location}</p>` : ""}
    </div>
    ${photo.tag ? `<span class="photo-tag">${photo.tag}</span>` : ""}
  `;
  item.addEventListener("click", () => openLightbox(i));
  wall.appendChild(item);
});

// 入场动画
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".photo-item").forEach(el => observer.observe(el));

// 灯箱
function openLightbox(index) {
  current = index;
  renderLightbox();
  lightbox.style.display = "flex";
  requestAnimationFrame(() => lightbox.classList.add("show"));
}

function renderLightbox() {
  const p = PHOTOS[current];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbDate.textContent = p.date || "—";
  lbLoc.textContent = p.location || "—";
  lbDesc.textContent = p.desc || "";
  lbTag.textContent = p.tag || "";
  lbTag.style.display = p.tag ? "inline-block" : "none";
  lbPrev.disabled = current === 0;
  lbNext.disabled = current === PHOTOS.length - 1;
  lbPrev.style.opacity = current === 0 ? "0.4" : "1";
  lbNext.style.opacity = current === PHOTOS.length - 1 ? "0.4" : "1";
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.addEventListener("transitionend", () => {
    if (!lightbox.classList.contains("show")) lightbox.style.display = "none";
  }, { once: true });
}

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
lbPrev.addEventListener("click", () => { if (current > 0) { current--; renderLightbox(); } });
lbNext.addEventListener("click", () => { if (current < PHOTOS.length - 1) { current++; renderLightbox(); } });

// 键盘控制
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft" && current > 0) { current--; renderLightbox(); }
  if (e.key === "ArrowRight" && current < PHOTOS.length - 1) { current++; renderLightbox(); }
});
