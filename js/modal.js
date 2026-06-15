const items = document.querySelectorAll(".item");
const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const desc = document.getElementById("modal-desc");
items.forEach(item => {
  item.addEventListener("click", () => {
    title.textContent = item.dataset.title;
    desc.textContent = item.dataset.desc;
    modal.style.display = "flex";

    setTimeout(()=> {
      modal.classList.add("show");
    },10);
  });
});
// 点击空白关闭
modal.addEventListener("click", () => {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  },300);
});
