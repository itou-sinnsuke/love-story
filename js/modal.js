const items = document.querySelectorAll(".item");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalClose = document.getElementById("modal-close");

function openModal(item) {
  const img = item.querySelector("img");
  modalImg.src = img ? img.src : "";
  modalImg.alt = item.dataset.title || "";
  modalTitle.textContent = item.dataset.title || "";
  modalDesc.textContent = item.dataset.desc || "";
  modal.style.display = "flex";
  // 触发过渡动画
  requestAnimationFrame(() => modal.classList.add("show"));
}

function closeModal() {
  modal.classList.remove("show");
  // 等过渡结束再隐藏
  modal.addEventListener("transitionend", () => {
    if (!modal.classList.contains("show")) modal.style.display = "none";
  }, { once: true });
}

items.forEach(item => item.addEventListener("click", () => openModal(item)));
modalClose.addEventListener("click", (e) => { e.stopPropagation(); closeModal(); });
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
