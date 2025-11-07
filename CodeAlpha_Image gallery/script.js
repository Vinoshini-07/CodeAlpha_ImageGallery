let currentIndex = 0;
let images = [];

function openViewer(imgEl) {
  images = Array.from(document.querySelectorAll(".gallery img"))
  .filter(i => i.style.display !== "none");
  currentIndex = images.indexOf(imgEl);
  if (currentIndex === -1) currentIndex = 0;
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");
  viewerImg.src = images[currentIndex].src;
  viewerImg.alt = images[currentIndex].alt || "Image";
  viewer.style.display = "flex";
  viewer.setAttribute("aria-hidden", "false");
  document.addEventListener("keydown", keyHandler);
}
function closeViewer() {
  const viewer = document.getElementById("viewer");
  viewer.style.display = "none";
  viewer.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", keyHandler);
}
function nextImage() {
  if (!images.length) return;
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("viewerImg").src = images[currentIndex].src;
  document.getElementById("viewerImg").alt = images[currentIndex].alt || "Image";
}
function prevImage() {
  if (!images.length) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("viewerImg").src = images[currentIndex].src;
  document.getElementById("viewerImg").alt = images[currentIndex].alt || "Image";
}

function keyHandler(e) {
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowRight") nextImage();
  else if (e.key === "ArrowLeft") prevImage();
}
function showGallery(category) {
  const list = document.querySelectorAll(".gallery img");
  list.forEach(img => {
    const cat = img.dataset.category || "all";
    img.style.display = (category === "all" || category === cat) ? "block" : "none";
  })
  closeViewer();
}
document.getElementById("viewer").addEventListener("click", function (e) {
  // if user clicked the dark background (not the image or controls)
  if (e.target.id === "viewer") closeViewer();
});